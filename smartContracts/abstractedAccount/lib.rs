#![cfg_attr(not(feature = "std"), no_std, no_main)]

//pub use self::numberSmartContractToInstance::{NumberSmartContractToInstance, NumberSmartContractToInstanceRef}; //, NumberContractToInstantiateRef};
pub use self::abstractedAccount::{AbstractedAccount, AbstractedAccountRef};

#[ink::contract]
mod abstractedAccount 
{
    use ink::prelude::vec::Vec;
    use ink::env::hash::{Sha2x256, HashOutput};
    use ink::prelude::string::String;
    use ink::env::call::{ExecutionInput, Selector};



    ////////////////////////////////////////////////////////////////////////////
    /////"inkStorageVariablesStruct"////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    #[ink(storage)]
    pub struct AbstractedAccount 
    {
        owner: AccountId,
        factoryAddress: AccountId,
        
        password: [u8; 32],

        nftCounter: u8,
        tokenCounter: u8,

        vecNftAddresses: Vec<AccountId>,
        vecTokenAddresses: Vec<AccountId>,
    }

    ////////////////////////////////////////////////////////////////////////////
    /////"inkFunctionMessages"//////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////  
    impl AbstractedAccount 
    {
        //Customized constructor to initialize the contractInstance with the paramOwner address that owns this///
        //abstractedAccount instance, the paramFactoryAddress smartContract address that instantiated this///
        //abstractedAccount smartContract and the paramPassword passwors to recover this abstractedAccount.///
        #[ink(constructor)]
        pub fn new(paramOwner: AccountId, paramFactoryAddress: AccountId, paramPassword: [u8; 32]) -> Self 
        {
            let emptyVec = Vec::default();
            let emptyVecTwo = Vec::default();
        
            Self {owner: paramOwner, factoryAddress: paramFactoryAddress, password: paramPassword, nftCounter: 0, tokenCounter: 0, vecNftAddresses: emptyVec, vecTokenAddresses: emptyVecTwo}
        }


        /////"accountAbstractionRelatedFunctions"///////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////
        
        //Message function to recover this abstractedAccount (directly in this contractInstance) in case that the EOA///
        //owner seedPhrase gets compromised somehow by providing paramPassword that is the original string that was///
        //derived into the actual hashPasword and paramNewPasswordHash to set a the new password./// 
        #[ink(message)]
        pub fn recover(&mut self, paramPassword: String, paramNewPasswordHash: [u8; 32])
        {
            //First hashing:
            let mut output = <Sha2x256 as HashOutput>::Type::default(); // 256-bit buffer
            ink::env::hash_encoded::<Sha2x256, _>(&paramPassword, &mut output);
             
            //Second hashing:
            let input = output;
            let mut outputTwo = <Sha2x256 as HashOutput>::Type::default(); // 256-bit buffer
            ink::env::hash_bytes::<Sha2x256>(&input, &mut outputTwo);
 
            assert!(outputTwo == self.password, "The password doesnt match.");

            let caller = self.env().caller();

            self.password = paramNewPasswordHash;
            self.owner = caller;
        }

        //Message function to recover this abstractedAccount (by calling this function through a crossContractCall///
        //from the accountManagerFactory smartContract) in case that the EOA owner seedPhrase gets compromised somehow///
        //by providing paramPassword that is the original string that was derived into the actual hashPasword and///
        //paramNewPasswordHash to set a the new password./// 
        #[ink(message)]
        pub fn recoverFromFactoryContract(&mut self, paramPassword: String, paramNewPasswordHash: [u8; 32], paramNewOwner: AccountId)
        {
            let caller = self.env().caller();

            assert!(caller == self.factoryAddress, "Caller is not the contractFactory.");

            let hashOne = self.hashProcessOne(paramPassword);
            let hashTwo = self.hashProcessTwo(hashOne);

            assert!(hashTwo == self.password, "The password doesnt match.");

            self.password = paramNewPasswordHash;
            self.owner = paramNewOwner;
        }

        //Message function to calculate the merklePassword in a single function call.///
        #[ink(message)]
        pub fn calculatePasswordHash(&self, paramPassword: String) -> [u8; 32]
        {
            let hashOne = self.hashProcessOne(paramPassword);
            let hashTwo = self.hashProcessTwo(hashOne);

            hashTwo
        }

        //Message function to process the original paramPassword string and derive it into a hash.///
        #[ink(message)]
        pub fn hashProcessOne(&self, paramPassword: String) -> [u8; 32]
        {
            let mut output = <Sha2x256 as HashOutput>::Type::default(); // 256-bit buffer
            ink::env::hash_encoded::<Sha2x256, _>(&paramPassword, &mut output);
            
            output
        }

        //Message function to process the second step to derive the merklePassword.///
        #[ink(message)]
        pub fn hashProcessTwo(&self, paramHashOne: [u8; 32]) -> [u8; 32]
        {
            let input = paramHashOne;
            let mut outputTwo = <Sha2x256 as HashOutput>::Type::default(); // 256-bit buffer
            ink::env::hash_bytes::<Sha2x256>(&input, &mut outputTwo);

            outputTwo
        }

        //Message function to get the address of this abstractedAccount smartContract instance.///
        #[ink(message)]
        pub fn getAccountAddress(&self) -> AccountId
        {
            self.env().account_id()
        }

        //Message functio to get the address of the owner of this abstractedAccount smartContract instance.///
        #[ink(message)]
        pub fn getAccountOwner(&self) -> AccountId
        {
            self.owner
        }


        /////"nftRelatedFunctions"//////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////
    
        //Message function to add a NFT address to the list of assets that this abstractedAccount owns (even if its zero).///
        #[ink(message)]
        pub fn setNft(&mut self, paramNftAddress: AccountId)
        {
            let caller = self.env().caller();

            assert!(caller == self.owner, "Not accountOwner");

            self.nftCounter += 1;
            self.vecNftAddresses.push(paramNftAddress);
        }

        //Message function to calculate the number of NFT assets that this abstractedAccount owns.///
        #[ink(message)]
        pub fn getVecNftLength(&mut self) -> u8 
        {
            self.vecNftAddresses.len().try_into().unwrap()
        }

        //Message function to get a specific NFT address from the list (vector) in the paramIndex position that///
        //this abstractedAccount owns (even if its zero).///
        #[ink(message)]
        pub fn getVecNftIndexValue(&mut self, paramIndex: u64) -> AccountId
        {
            let index = paramIndex as usize;

            self.vecNftAddresses[index]
        }

        //Message function to get the list (vector) of NFT assets addresses that this bstractedAccount owns (even///
        //if theyre zero).///
        #[ink(message)]
        pub fn getAaNftVec(&self) -> Vec<AccountId>
        {
            let vecToReturn = &self.vecNftAddresses;

            vecToReturn.to_vec()
        }

        /////"functionCallsOnNftContract"///////////////////////////////////////////
        
        //Message function to do a crossContractCall to the NFT smartContract instance with the paramNftAddress address///
        //to mint an NFT.///
        #[ink(message)]
        pub fn mintNft(&mut self, paramNftAddress: AccountId)
        {
            let caller = self.env().caller();

            assert!(caller == self.owner, "Not accountOwner");

            ink::env::call::build_call::<Environment>()
            .call(paramNftAddress)
            .gas_limit(0)
            .transferred_value(0)
            .exec_input(
                ExecutionInput::new(Selector::new(ink::selector_bytes!("mintNft")))
                    .push_arg(self.env().account_id())
            )
            .returns::<()>()
            .invoke();
        }

        //Message function to do a crossContractCall to the NFT smartContract instance with the paramNftAddress address///
        //to transfer the NFT with the paramIdToTransfer ID to the paramAddressTo address.///
        #[ink(message)]
        pub fn transferNft(&mut self, paramNftAddress: AccountId, paramIdToTransfer: u8, paramAddressTo: AccountId)
        {
            let caller = self.env().caller();

            assert!(caller == self.owner, "Not accountOwner");

            ink::env::call::build_call::<Environment>()
            .call(paramNftAddress)
            .gas_limit(0)
            .transferred_value(0)
            .exec_input(
                ExecutionInput::new(Selector::new(ink::selector_bytes!("transfer")))
                    .push_arg(self.env().account_id())
                    .push_arg(paramIdToTransfer)
                    .push_arg(paramAddressTo)
            )
            .returns::<()>()
            .invoke();
        }

         //Message function to do a crossContractCall to the NFT smartContract instance with the paramNftAddress address///
        //to get the owner address of the NFT with the paramIdToCheck ID.///        
        #[ink(message)]
        pub fn ownerOfNft(&mut self, paramNftAddress: AccountId, paramIdToCheck: u8) -> AccountId
        {
            let returnValue = ink::env::call::build_call::<Environment>()
            .call(paramNftAddress)
            .gas_limit(0)
            .transferred_value(0)
            .exec_input(
                ExecutionInput::new(Selector::new(ink::selector_bytes!("ownerOf")))
                    .push_arg(paramIdToCheck)
            )
            .returns::<AccountId>()
            .invoke();

            returnValue
        }

        //Message function to do a crossContractCall to the NFT smartContract instance with the paramNftAddress address///
        //to get balance of NFTs that this abstractedAccount intance owns.///        
        #[ink(message)]
        pub fn balanceOfNft(&mut self,paramNftAddress: AccountId) -> u8
        {
            let returnValue = ink::env::call::build_call::<Environment>()
            .call(paramNftAddress)
            .gas_limit(0)
            .transferred_value(0)
            .exec_input(
                ExecutionInput::new(Selector::new(ink::selector_bytes!("balanceOf")))
                    .push_arg(self.env().account_id())
            )
            .returns::<u8>()
            .invoke();

            returnValue
        }


        /////"tokenRelatedFunctions"////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////
        
        //Message function to add a fungibleToken address to the list of assets that this abstractedAccount owns (even if its zero).///
        #[ink(message)]
        pub fn setToken(&mut self, paramTokenAddress: AccountId)
        {
            let caller = self.env().caller();

            assert!(caller == self.owner, "Not accountOwner");

            self.tokenCounter += 1;
            self.vecTokenAddresses.push(paramTokenAddress);
        }
    
        //Message function to calculate the number of fungibleToken assets that this abstractedAccount owns.///
        #[ink(message)]
        pub fn getVecTokenLength(&mut self) -> u8 
        {
            self.vecTokenAddresses.len().try_into().unwrap()
        }

        //Message function to calculate the number of fungibleToken assets that this abstractedAccount own.///
        #[ink(message)]
        pub fn getVecTokenIndexValue(&mut self, paramIndex: u64) -> AccountId
        {
            let index = paramIndex as usize;

            self.vecTokenAddresses[index]
        }      
        
         //Message function to get the list (vector) of fungibleToken assets addresses that this bstractedAccount owns (even///
        //if theyre zero).///
        #[ink(message)]
        pub fn getAaTokentVec(&self) -> Vec<AccountId>
        {
            let vecToReturn = &self.vecTokenAddresses;

            vecToReturn.to_vec()
        }

        /////"functionCallsOnTokenContract"/////////////////////////////////////////
        
        //Message function to do a crossContractCall to the fungibleToken smartContract instance with the paramTokenAddress address///
        //to mint paramQuantity number of tokens.///
        #[ink(message)]
        pub fn mintTokens(&mut self, paramTokenAddress: AccountId, paramQuantity: u8)
        {
            let caller = self.env().caller();

            assert!(caller == self.owner, "Not accountOwner");

            ink::env::call::build_call::<Environment>()
            .call(paramTokenAddress)
            .gas_limit(0)
            .transferred_value(0)
            .exec_input(
                ExecutionInput::new(Selector::new(ink::selector_bytes!("mintTokens")))
                    .push_arg(self.env().account_id())
                    .push_arg(paramQuantity)
            )
            .returns::<()>()
            .invoke();
        }

        //Message function to do a crossContractCall to the fungibleToken smartContract instance with the paramTokenAddress address///
        //to transfer paramQuantity number of tokens to the paramAddressTo address.///
        #[ink(message)]
        pub fn transferTokens(&mut self, paramTokenAddress: AccountId, paramQuantity: u8, paramAddressTo: AccountId)
        {
            let caller = self.env().caller();

            assert!(caller == self.owner, "Not accountOwner");

            ink::env::call::build_call::<Environment>()
            .call(paramTokenAddress)
            .gas_limit(0)
            .transferred_value(0)
            .exec_input(
                ExecutionInput::new(Selector::new(ink::selector_bytes!("transfer")))
                    .push_arg(self.env().account_id())
                    .push_arg(paramQuantity)
                    .push_arg(paramAddressTo)
            )
            .returns::<()>()
            .invoke();
        }

        //Message function to do a crossContractCall to the fungibleToken smartContract instance with the paramTokenAddress address///
        //to get the balance of tokens that this abstractedAccount intance owns.///        
        #[ink(message)]
        pub fn balanceOfTokens(&mut self, paramTokenAddress: AccountId) -> u8
        {
            let returnValue = ink::env::call::build_call::<Environment>()
            .call(paramTokenAddress)
            .gas_limit(0)
            .transferred_value(0)
            .exec_input(
                ExecutionInput::new(Selector::new(ink::selector_bytes!("balanceOf")))
                    .push_arg(self.env().account_id())
            )
            .returns::<u8>()
            .invoke();

            returnValue
        }

        //Message function to do a crossContractCall to the fungibleToken smartContract instance with the paramTokenAddress address///
        //to get the decimals that uses.///
        #[ink(message)]
        pub fn decimalsOfTokens(&mut self, paramTokenAddress: AccountId) -> u8
        {
            let returnValue = ink::env::call::build_call::<Environment>()
            .call(paramTokenAddress)
            .gas_limit(0)
            .transferred_value(0)
            .exec_input(
                ExecutionInput::new(Selector::new(ink::selector_bytes!("getDecimals")))
            )
            .returns::<u8>()
            .invoke();

            returnValue
        }
    }

    #[cfg(test)]
    mod tests 
    {
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