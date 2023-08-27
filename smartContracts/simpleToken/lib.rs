#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod simpleToken 
{
    use ink::storage::Mapping;



    ////////////////////////////////////////////////////////////////////////////
    /////"inkStorageVariablesStruct"////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    
    #[ink(storage)]
    pub struct SimpleToken 
    {
        balances: Mapping<AccountId, u8>,
        decimals: u8,
    }

    ////////////////////////////////////////////////////////////////////////////
    /////"inkFunctionMessages"//////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////// 
    impl SimpleToken 
    {
        #[ink(constructor)]
        pub fn new(paramDecimals: u8) -> Self 
        {
            let emptyMapping = Mapping::default();

            Self {balances: emptyMapping, decimals: paramDecimals}
        }



        #[ink[message]]
        pub fn mintTokens(&mut self, paramAddressToMint: AccountId, paramQuantity: u8)
        {
            let mut actualAddressToMintBalance = self.balances.get(paramAddressToMint).unwrap_or(0);
            actualAddressToMintBalance += paramQuantity;

            self.balances.insert(&paramAddressToMint, &actualAddressToMintBalance);
        }

        #[ink(message)]
        pub fn transfer(&mut self, paramAddressTransferer: AccountId, paramQuantity: u8, paramAddressTo: AccountId)
        {
            let mut actualTransfererBalance = self.balances.get(&paramAddressTransferer).unwrap_or(0);

            assert!(actualTransfererBalance >= paramQuantity, "Not enough funds.");

            actualTransfererBalance -= paramQuantity;
            self.balances.insert(&paramAddressTransferer, &actualTransfererBalance);

            let mut actualToBalance = self.balances.get(paramAddressTo).unwrap_or(0);
            actualToBalance += paramQuantity;
            self.balances.insert(&paramAddressTo, &actualToBalance);
        }

        #[ink(message)]
        pub fn balanceOf(&self, paramAddressToCheck: AccountId) -> u8
        {
            self.balances.get(paramAddressToCheck).unwrap_or(0)
        }

        #[ink(message)]
        pub fn getDecimals(&self) -> u8
        {
            self.decimals
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
            let simpleToken = SimpleToken::default();
            assert_eq!(simpleToken.get(), false);
        }

        /// We test a simple use case of our contract.
        #[ink::test]
        fn it_works() {
            let mut simpleToken = SimpleToken::new(false);
            assert_eq!(simpleToken.get(), false);
            simpleToken.flip();
            assert_eq!(simpleToken.get(), true);
        }
    }
}