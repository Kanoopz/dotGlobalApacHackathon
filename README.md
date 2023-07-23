# dotGlobalApacHackathon
accountAbstraction implementation in ink! language implementation with a private onChain password as accountRecoveryMechanism.

This project uses two contracts; accountManagerFactory and abstractedAccount to work.
AccountManagerFactory instantiates new abstractedAccounts for users and records them to have it organized.
AbstractedAccount holds assets like psp22 and psp34 and manages them to be able to transfer the assets. Also the abstractedAccountContract implements the merklePasswords recoveryMechanism to gain access again to the smartAccount through another EOA if the originalOne that created the smartAccount has been compromised or lost.
