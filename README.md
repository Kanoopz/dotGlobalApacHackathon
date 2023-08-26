# dotGlobalApacHackathon

accountAbstraction implementation in ink! language with a private onChain password as accountRecoveryMechanism.

The idea of the project is to abstract away the ownership of assets from an EOA and make a smart contract holds them (this is known as smartAccounts) so that in case of hack to the EOA wallet, loss of seedPhrase or that it gets compromised, the funds are still safe in the smartAccount and can be recovered with a socialRecoveryMechanism. 
The problem today with this type of accounts is that theres no such thing as a genuine recovery, theres only a "delegator" or another EOA that has rights to manage the smartAccount which is not different from a multiSig. What onChainMerklePasswords propose is a mechanism that use hashing functions to have a public password onChain yet private since whats stored is the resulting hash instead of a string, and because of hashingFunctions that are oneWayOperations, theres no way to know the actual string that generated the hash stored onChain.
The process of the generation of the password is taking two strings to generate their hashes and then generate the hash of them to make a merkleRoot, this has to be done offChain. Whats stored onChain is the merkleRoot and one of the leafs, with the other one maintained offChain to be the actual password. To process to recover the smartAccount is providing the string of the leaf and then onChain it gets hashed, then its hashed again together with the other leafHash that is onChain and if the resulting hash of that operation is equal to the merkleRoot onChain, then it means the string provided as a password to recover the account was correct. Its important to note that when a recovery has been done, a new merkleRootPassword and one of the leafHahses that produced it have to be provided to maintain a way to recover again the account in the future if needed.

**The recovery mechanims wasnt fully implemented due to the lack of a solidity abi.encoded() similar method. The actual implementation uses just one string, but a hashing function is applied twice to reinforce the security and avoid bruteForce exploits.


The project uses two contracts; accountManagerFactory and abstractedAccount to work, along with any other pspAsset that the account is going to hold.
AccountManagerFactory instantiates new abstractedAccounts for users using build_create method and records them in a dataStructure. AbstractedAccount holds assets like psp22 and psp34 and manages them using build_call method to call the originalPspAsset contrcact functions. The abstractedAccountContract implements the merklePasswords recoveryMechanism to gain access again to the smartAccount through another EOA if the originalOne that created the smartAccount has been compromised or lost.
The assets that can be hold by the smartAccount is asset compatible with psp22 and psps34 standards and have the same nameFunctions.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

shibuyaTestnetOnchain deployedAddresses and info:

abstractedAccounts shibuyaOnchainInfo:

abstractedAccountOneAddress: YWcb6nFYTf25AUoqiRhYKJiwQXt1DjZ6QQt84ZNQef3h6dh
 originalPassword of abstractedAccountOne
  string: one
  onChainPasswordHash: 0x27c6c71cb1580957733487f400f1561954f19f8bbb05d154225f7da324e6e9ca

 newPostRecoveryPassword of abstractedAccountOne
  string: two
  onChainPasswordHash: 0x02e7adc81baad7e10705fc6cc462714d471049e08a6a7fb84d6e999f46c5b6d7


abstractedAccountTwoAddress: W8FaExHSfPtfDND2hSA1zxwFkdTH8xpevv66Mz3h8hu2ret
 originalPassword of abstractedAccountTwo
  string: three
  onChainPasswordHash: 0x6611311e44f536dbb9b7f3bec6b776ec5105e5f822c2c6c427b50853cbd25187

 newPostRecoveryPassword of abstractedAccountTwo
  string: four
  onChainPasswordHash: 0xf98b9e2b2df297b58c7866629398b25b09158b4155e96ca487e81ba8dd6419a7
---------------------------------------------------------------------------------------------------------------------------------------------------------------
Assets shibuyaOnchainInfo: 
 simpleNftAddress: Y1fAvzAhP2cfnNkKJ5dWRcZDAgNHkPyz8wSFnfWEZ3P7uvy
 simpleTokenAddress:YnvQR3jsYhi2npr8n1b4pSMWRxmaBCz6tJMLQoz72FBxCg5
