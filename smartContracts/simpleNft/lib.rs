#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod simpleNft 
{
    use ink::storage::Mapping;
    


    ////////////////////////////////////////////////////////////////////////////
    /////"inkStorageVariablesStruct"////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    #[ink(storage)]
    pub struct SimpleNft 
    {
        owners: Mapping<u8, AccountId>,
        balances: Mapping<AccountId, u8>,
        idCounter: u8,
    }

    ////////////////////////////////////////////////////////////////////////////
    /////"inkFunctionMessages"//////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////    
    impl SimpleNft 
    {
        //Simple constructor to initialize the contractInstance.///
        #[ink(constructor)]
        pub fn new() -> Self 
        {
            let emptyMapping = Mapping::default();
            let emptyMappingTwo = Mapping::default();

            Self {owners: emptyMapping, balances: emptyMappingTwo, idCounter: 1}
        }



        

        //Message function to mint a nonFungibleToken with the nextId available to the paramNftMinter address.///
        #[ink(message)]
        pub fn mintNft(&mut self, paramNftMinter: AccountId)
        {            
            self.owners.insert(&self.idCounter, &paramNftMinter);
            self.idCounter += 1;

            //let mut actualCallerBalance = self.balances.get(paramNftMinter).unwrap();
            let mut actualCallerBalance = self.balances.get(paramNftMinter).unwrap_or(0);
            actualCallerBalance += 1;
            self.balances.insert(&paramNftMinter, &actualCallerBalance);
        }

        //Message function to transfer a specific nonFungibleToken with the paramIdToTransfer ID from the paraNftTransferer address to the paramAddressTo address.///
        #[ink(message)]
        pub fn transfer(&mut self, paraNftTransferer: AccountId, paramIdToTransfer: u8, paramAddressTo: AccountId)
        {
            //let idToTransferOwner = self.owners.get(paramIdToTransfer).unwrap();
            let addressDefault = [0u8; 32].into();
            let idToTransferOwner = self.owners.get(paramIdToTransfer).unwrap_or(addressDefault);
                                                                                

            assert!(paraNftTransferer == idToTransferOwner, "Not the nftOwner.");

            //let mut actualCallerBalance = self.balances.get(paraNftTransferer).unwrap();
            let mut actualCallerBalance = self.balances.get(paraNftTransferer).unwrap_or(0);
            actualCallerBalance -= 1;
            self.balances.insert(&paraNftTransferer, &actualCallerBalance);

            self.owners.insert(&paramIdToTransfer, &paramAddressTo);

            let mut actualAddressToBalance = self.balances.get(paramAddressTo).unwrap_or(0);
            actualAddressToBalance += 1;

            self.balances.insert(&paramAddressTo, &actualAddressToBalance);
        }

        //Message function to get the owner of the nonFungibleToken with the paramIdToCheck ID.///
        #[ink(message)]
        pub fn ownerOf(&self, paramIdToCheck: u8) -> AccountId
        {
            //self.owners.get(paramIdToCheck).unwrap()
            let addressDefault = [0u8; 32].into();
            self.owners.get(paramIdToCheck).unwrap_or(addressDefault)
        }

        //Message function to get the balance of nonFungibleTokens that owns the paramAddressToCheck address.///
        #[ink(message)]
        pub fn balanceOf(&self, paramAddressToCheck: AccountId) -> u8
        {
            //self.balances.get(paramAddressToCheck).unwrap()
            self.balances.get(paramAddressToCheck).unwrap_or(0)
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    /////"Tests"////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    #[cfg(test)]
    mod tests 
    {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;

        /// We test if the default constructor does its job.
        #[ink::test]
        fn default_works() {
            let simpleNft = SimpleNft::default();
            assert_eq!(simpleNft.get(), false);
        }

        /// We test a simple use case of our contract.
        #[ink::test]
        fn it_works() {
            let mut simpleNft = SimpleNft::new(false);
            assert_eq!(simpleNft.get(), false);
            simpleNft.flip();
            assert_eq!(simpleNft.get(), true);
        }
    }
}
