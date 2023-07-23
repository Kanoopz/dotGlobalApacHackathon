#![cfg_attr(not(feature = "std"), no_std, no_main)]


use abstractedAccount::AbstractedAccountRef;

#[ink::contract]
mod accountManagerFactory 
{
    use abstractedAccount::{*}; 
    
    use ink::storage::Mapping;
    use ink::env::call::{ExecutionInput, Selector};
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;


    ////////////////////////////////////////////////////////////////////////////
    /////"inkStorageVariablesStruct"////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    #[ink(storage)]
    pub struct AccountManagerFactory 
    {
        accountAddressesInstances: Mapping<AccountId, AbstractedAccountRef>,
        accountAddressesOwners: Mapping<AccountId, AccountId>,
        userAccountsBoundedQuantity: Mapping<AccountId, u8>,
        userAccountsBounded: Mapping<AccountId, Vec<AccountId>>,
        userLastCreatedAccountAddress: Mapping<AccountId, AccountId>,

        contractCodeHash: Hash,
        counter: u32,
    }

    ////////////////////////////////////////////////////////////////////////////
    /////"inkFunctionMessages"//////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    impl AccountManagerFactory 
    {
        #[ink(constructor)]
        pub fn new(paramHashCode: Hash) -> Self //, paramAddress: AccountId) -> Self 
        {    
            //let emptyInstance: NumberSmartContractToInstanceRef;
            let emptyMapping = Mapping::default();
            let emptyMappingTwo = Mapping::default();
            let emptyMappingThree = Mapping::default();
            let emptyMappingFour = Mapping::default();
            let emptyMappingFive = Mapping::default();

            Self
            {
                accountAddressesInstances: emptyMapping,
                accountAddressesOwners: emptyMappingTwo,
                userAccountsBoundedQuantity: emptyMappingThree,
                userAccountsBounded: emptyMappingFour,
                //lastInstanceAddress: paramAddress,
                userLastCreatedAccountAddress: emptyMappingFive,
                contractCodeHash: paramHashCode,
                counter: 1,
            }
        }
        
        #[ink(message)]
        pub fn createAccount(&mut self, paramAccountPassword: [u8; 32]) -> AccountId
        {
            let salt = self.counter.to_le_bytes();

            let caller = self.env().caller();
            let factoryAddress = self.env().account_id();


            let newInstance = ink::env::call::build_create::<AbstractedAccountRef>()
                .code_hash(self.contractCodeHash)
                .gas_limit(0)
                .endowment(0)
                .exec_input(
                    ExecutionInput::new(Selector::new(ink::selector_bytes!("new")))
                        .push_arg(caller)
                        .push_arg(factoryAddress)
                        .push_arg(paramAccountPassword)
                )
                .salt_bytes(salt)
                .returns::<AbstractedAccountRef>()
                .instantiate();

            let instanceAddress = newInstance.getAccountAddress();
            //self.lastInstanceAddress = instanceAddress;
            //let returnedAddress = instanceAddress;
            self.userLastCreatedAccountAddress.insert(&caller, &instanceAddress);

            self.accountAddressesInstances.insert(&instanceAddress, &newInstance);
            self.accountAddressesOwners.insert(&instanceAddress, &caller);
            
            let mut numberOfAccounts = self.userAccountsBoundedQuantity.get(caller).unwrap_or(0);
            numberOfAccounts += 1;
            self.userAccountsBoundedQuantity.insert(&caller, &numberOfAccounts);
            
            let mut vectorAccountsBounded = self.userAccountsBounded.get(caller).unwrap_or(Vec::default());
            vectorAccountsBounded.push(instanceAddress);
            self.userAccountsBounded.insert(&caller, &vectorAccountsBounded);

            self.counter += 1;


            //instanceAddress
            instanceAddress
        }

        #[ink(message)]
        pub fn recoverAccountOnInstance(&mut self, paramAccountAddress: AccountId, paramPassword: String, paramNewPasswordHash: [u8; 32])
        {
            let caller = self.env().caller();
            let mut accountInstance = self.accountAddressesInstances.get(paramAccountAddress).unwrap();

            accountInstance.recoverFromFactoryContract(paramPassword, paramNewPasswordHash, caller);

            let pastOwner = self.accountAddressesOwners.get(paramAccountAddress).unwrap();




            //accountAddressesOwners: Mapping<AccountId, AccountId>///
            self.accountAddressesOwners.insert(&paramAccountAddress, &caller);
            



            //userAccountsBounded: Mapping<AccountId, Vec<AccountId>>///
            let pastOwnerAccountsVector = self.userAccountsBounded.get(pastOwner).unwrap();
            let mut newPastOwnerVector = Vec::default();
            let mut i = 0;
            let length = pastOwnerAccountsVector.len().try_into().unwrap();
            let mut index;
            let mut actualValue;

            while(i < length)
            {
                index = i as usize;
                actualValue = pastOwnerAccountsVector[index];

                if(actualValue != paramAccountAddress)
                {
                    newPastOwnerVector.push(actualValue);
                }

                i += 1;
            }

            self.userAccountsBounded.insert(&pastOwner, &newPastOwnerVector);

            let mut newOwnerVec = self.userAccountsBounded.get(caller).unwrap_or(Vec::default());
            newOwnerVec.push(paramAccountAddress);
            self.userAccountsBounded.insert(&caller, &newOwnerVec);




            //userAccountsBoundedQuantity: Mapping<AccountId, u8>///
            let mut pastOwnerNumberAccounts = self.userAccountsBoundedQuantity.get(pastOwner).unwrap();
            pastOwnerNumberAccounts -= 1;
            self.userAccountsBoundedQuantity.insert(&pastOwner, &pastOwnerNumberAccounts);

            let mut newOwnerNumberAccounts = self.userAccountsBoundedQuantity.get(caller).unwrap_or(0);
            newOwnerNumberAccounts += 1;
            self.userAccountsBoundedQuantity.insert(&caller, &newOwnerNumberAccounts);
        }

        #[ink(message)]
        pub fn notifyRecovery(&mut self, paramAccountRecovered: AccountId)
        {
            let caller = self.env().caller();
            let accountRecovered = self.accountAddressesInstances.get(paramAccountRecovered).unwrap();
            let accountRecoveredActualOwner = accountRecovered.getAccountOwner();

            assert!(caller == accountRecoveredActualOwner, "The caller didnt recover any account.");

            let pastOwner = self.accountAddressesOwners.get(paramAccountRecovered).unwrap();




            //accountAddressesOwners: Mapping<AccountId, AccountId>///
            self.accountAddressesOwners.insert(&paramAccountRecovered, &caller);




            //userAccountsBounded: Mapping<AccountId, Vec<AccountId>>///
            let pastOwnerAccountsVector = self.userAccountsBounded.get(pastOwner).unwrap();
            let mut newPastOwnerVector = Vec::default();
            let mut i = 0;
            let length = pastOwnerAccountsVector.len().try_into().unwrap();
            let mut index;
            let mut actualValue;

            while(i < length)
            {
                index = i as usize;
                actualValue = pastOwnerAccountsVector[index];

                if(actualValue != paramAccountRecovered)
                {
                    newPastOwnerVector.push(actualValue);
                }

                i += 1;
            }

            self.userAccountsBounded.insert(&pastOwner, &newPastOwnerVector);

            let mut newOwnerVec = self.userAccountsBounded.get(caller).unwrap_or(Vec::default());
            newOwnerVec.push(paramAccountRecovered);
            self.userAccountsBounded.insert(&caller, &newOwnerVec);




            //userAccountsBoundedQuantity: Mapping<AccountId, u8>///
            let mut pastOwnerNumberAccounts = self.userAccountsBoundedQuantity.get(pastOwner).unwrap();
            pastOwnerNumberAccounts -= 1;
            self.userAccountsBoundedQuantity.insert(&pastOwner, &pastOwnerNumberAccounts);

            let mut newOwnerNumberAccounts = self.userAccountsBoundedQuantity.get(caller).unwrap_or(0);
            newOwnerNumberAccounts += 1;
            self.userAccountsBoundedQuantity.insert(&caller, &newOwnerNumberAccounts);
        }

        #[ink(message)]
        pub fn checkOwnerOfAccount(&self, paramAccountAddress: AccountId) -> AccountId
        {
            let accountOwner = self.accountAddressesOwners.get(paramAccountAddress).unwrap();

            accountOwner
        }

        #[ink(message)]
        pub fn getEoaAccountsQuantity(&self, paramAccountAddress: AccountId) -> u8
        {
            let ownerAccountsQuantity = self.userAccountsBoundedQuantity.get(paramAccountAddress).unwrap();

            ownerAccountsQuantity
        }

        #[ink(message)]
        pub fn getEoaAccountsQuantityFromVec(&self, paramAddress: AccountId) -> u8
        {
            let ownerAccountsQuantity = self.userAccountsBounded.get(paramAddress).unwrap();
            let length = ownerAccountsQuantity.len().try_into().unwrap();

            length
        }

        #[ink(message)]
        pub fn getAccountAddressFromVec(&self, paramAddress: AccountId, index: u8) -> AccountId
        {
            let ownerAccounts = self.userAccountsBounded.get(paramAddress).unwrap();

            let uIndex = index as usize;
            let accountAddress = ownerAccounts[uIndex];

            accountAddress
        }

        #[ink(message)]
        pub fn getLastAddressCreated(&self) -> AccountId
        {
            let caller = self.env().caller();
            self.userLastCreatedAccountAddress.get(caller).unwrap()
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    /////"Tests"////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    #[cfg(test)]
    mod tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;

        /// We test if the default constructor does its job.
        #[ink::test]
        fn default_works() {
            let accountManagerFactory = AccountManagerFactory::default();
            assert_eq!(accountManagerFactory.get(), false);
        }

        /// We test a simple use case of our contract.
        #[ink::test]
        fn it_works() {
            let mut accountManagerFactory = AccountManagerFactory::new(false);
            assert_eq!(accountManagerFactory.get(), false);
            accountManagerFactory.flip();
            assert_eq!(accountManagerFactory.get(), true);
        }
    }
}