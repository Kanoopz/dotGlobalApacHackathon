/* eslint-disable @next/next/no-img-element */
import {useBalance, useBlockHeader, useBlockHeaders, useCall, useCallSubscription, useChainRpc, useChainRpcList, useContract, useDryRun, useEventSubscription, useEvents, useInstalledWallets, useTx, useTxPaymentInfo, useUninstalledWallets, useWallet,} from 'useink';
import { RustResult, formatBalance, isBroadcast, isFinalized, isInBlock, isPendingSignature, pickDecoded, pickDecodedError, pickResultErr, pickResultOk, pickTxInfo, shouldDisable,} from 'useink/utils';
import { ChainId } from 'useink/chains';
import { useEffect, useMemo, useState } from 'react';
import { useNotifications, useTxNotifications } from 'useink/notifications';
import { Notifications } from '../Notifications';

import accountManagerFactoryMetadata from '../../metadata/accountManagerFactory.json';
import abstractedAccountMetadata from '../../metadata/abstractedAccount.json';


import AaInstanceComponent from './AaInstanceComponent';



export const HomePage: React.FC = () => 
{
  /*///////////////////////////////////////////////////////////////////////////////*/
  /*///////////////////////////////////////////////////////////////////////////////*/
  /*///  pageLogicFlow  ///////////////////////////////////////////////////////////*/
  /*///////////////////////////////////////////////////////////////////////////////*/
  /*///////////////////////////////////////////////////////////////////////////////*/

  const [testVar, setTestVar] = useState('thisIsATest');

  /*///  accountManagerFactory initialConnection with EOA  ///////////////////////////////////////////////////////////////////////////////////////////////////////*/
  const [accountAddressConnectedToFactory, setAccountAddressConnectedToFactory] = useState('aSm6mfhnD698n79P7AmgtmJQR35F7Q1NegNhQ9MvcuaN5bj');
  const [accountCreatedAasVector, setAccountCreatedAasVector] = useState(null);

  const [aaAddressToUseChangingValue, setAaAddressToUseChangingValue] = useState('');


  function initializeAbstractedAccountsFunction()
  {
    console.log("EOA accountAddres:");
    console.log(account.address);

    console.log("acrualSettedAddress");
    console.log(accountAddressConnectedToFactory);

    setAccountAddressConnectedToFactory(account.address);
  }

  function interactWithAa()
  {
    setInteractingWithAa(true);
  }

  const handleAaAddressToUse = event => 
  {
    setAaAddressToUseChangingValue(event.target.value);
  };

  function setStateAaAddressToUse()
  {
    //setAaToInteractAddress(aaAddressToUseChangingValue);
    abstractedAccountAddressToUse = aaAddressToUseChangingValue;

    let abstractedAccountContractInstance = useContract(abstractedAccountAddressToUse, abstractedAccountMetadata, 'shibuya-testnet');
    //setAbstractedAccountContractsToUse(abstractedAccountContractInstance);
    abstractedAccountContractsToUse = abstractedAccountContractInstance;
  }


  /*///  Flow between accountFactoryManager and abstractedAccount instances  /////////////////////////////////////////////////////////////////////////////////////*/
  const [checkingAa, setCheckingAa] = useState(false);

  function goToComponent()
  {
    setCheckingAa(true);
  }

  function returnToMain()
  {
    setCheckingAa(false);
  }


  
  /*///  abstractedAccountComponentInteraction  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
  const [aaToInteractAddress, setAaToInteractAddress] = useState('');
  const [changingAaToInteractAddress, setChangingAaToInteractAddress] = useState('');
  

  const handleAaToInteractAddress = event => 
  {
    setChangingAaToInteractAddress(event.target.value);
    console.log(changingAaToInteractAddress);
  };

  function setAaToInteractAddressFunc()
  {
    setAaToInteractAddress(changingAaToInteractAddress);
    //testVar = "aSm6mfhnD698n79P7AmgtmJQR35F7Q1NegNhQ9MvcuaN5bj";
    //setTestVar('aSm6mfhnD698n79P7AmgtmJQR35F7Q1NegNhQ9MvcuaN5bj');
    console.log("CHANGING VALUE:");
    console.log(changingAaToInteractAddress);
    setTestVar(changingAaToInteractAddress);

    console.log("ACTUAL VALUE:");
    console.log(aaToInteractAddress);
  }

  function returnToAccountManagerFactory()
  {
    setInteractingWithAa(false);
  }





  /*///////////////////////////////////////////////////////////////////////////////*/
  /*///////////////////////////////////////////////////////////////////////////////*/
  /*///  connectionData  //////////////////////////////////////////////////////////*/
  /*///////////////////////////////////////////////////////////////////////////////*/
  /*///////////////////////////////////////////////////////////////////////////////*/

  /*///  walletSetup  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
  const installedWallets = useInstalledWallets();
  const uninstalledWallets = useUninstalledWallets();


  /*///  connectedAccountData  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
  const { account, accounts, setAccount, connect, disconnect } = useWallet();
  const balance = useBalance(account);

  
  /*///  rpcConnection  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
  const { rpcs, setChainRpc } = useChainRpcList('astar');
  const astarRpc = useChainRpc('astar');

  
  /*///  chainBlockData  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
  const block = useBlockHeader(); // with no arguments it defaults to the first item in the chains config
  const astarBlockNumber = useBlockHeader('astar');
  const allChainBlockHeaders = useBlockHeaders();





  /*///////////////////////////////////////////////////////////////////////////////*/
  /*///////////////////////////////////////////////////////////////////////////////*/
  /*///  accountFactorySmartContract setUp  ///////////////////////////////////////*/
  /*///////////////////////////////////////////////////////////////////////////////*/
  /*///////////////////////////////////////////////////////////////////////////////*/

  /*///  dataSetUp  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
  const accountManagerFactoryAddress = 'Y7bwfFcCsesFTGgaSbfzJcDJ6FUw5rBWx9Bmx8EXMyeFEov';
  const accountManagerFactoryContract = useContract(accountManagerFactoryAddress, accountManagerFactoryMetadata, 'shibuya-testnet');

  const { addNotification } = useNotifications();


  /*///  stateParamValuesForSubscriptions  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
  const [getSpecificAaAddressIndexParamTx, setGetSpecificAaAddressIndexParamTx] = useState(-1);
  const [changingGetSpecificAaAddressIndexParamTx, setChangingGetSpecificAaAddressIndexParamTx] = useState(-1);

  const handleSpecificAddressIndexParam = event => 
  {
    setChangingGetSpecificAaAddressIndexParamTx(event.target.value);
  };

  function getSpecificAaAndressFromVecFunc()
  {
    setGetSpecificAaAddressIndexParamTx(changingGetSpecificAaAddressIndexParamTx);
  }


  /*///  stateParamValuesForTransactions  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
  const [createAccountPasswordParamTx, setCreateAccountPasswordParamTx] = useState('');
  const [changingCreateAccountPasswordParamTx, setChangingCreateAccountPasswordParamTx] = useState('');

  const handleCreatePasswordParam = event => 
  {
    setChangingCreateAccountPasswordParamTx(event.target.value);
    console.log(event.target.value);
  };

  function createAccountFunc()
  {
    setCreateAccountPasswordParamTx(changingCreateAccountPasswordParamTx);
    console.log(changingCreateAccountPasswordParamTx);
  }


  const [recoverAaAddressParamTx, setRecoverAaAddressParamTx] = useState('');
  const [changingRecoverAaAddressParamTx, setChangingRecoverAaAddressParamTx] = useState('');

  const handleRecoverAddressParamTx = event => 
  {
    setChangingRecoverAaAddressParamTx(event.target.value);
    console.log(event.target.value);
  };

  function setRecoverAddressParamFunc()
  {
    setRecoverAaAddressParamTx(changingRecoverAaAddressParamTx);
    console.log(changingRecoverAaAddressParamTx);
  }


  const [recoverAaPasswordParamTx, setRecoverAaPasswordParamTx] = useState('');
  const [changingRecoverAaPasswordParamTx, setChangingRecoverAaPasswordParamTx] = useState('');

  const handleRecoverPasswordParamTx = event => 
  {
    setChangingRecoverAaPasswordParamTx(event.target.value);
    console.log(event.target.value);
  };

  function setRecoverPasswordParamFunc()
  {
    setRecoverAaPasswordParamTx(changingRecoverAaPasswordParamTx);
    console.log(changingRecoverAaPasswordParamTx);
  }


  const [recoverAaNewPasswordHashParamTx, setRecoverAaNewPasswordHashParamTx] = useState('');
  const [changingRecoverAaNewPasswordHashParamTx, setChangingRecoverAaNewPasswordHashParamTx] = useState('');

  const handleRecoverNewPasswordHashParamTx = event => 
  {
    setChangingRecoverAaNewPasswordHashParamTx(event.target.value);
    console.log(event.target.value);
  };

  function setRecoverNewPasswordHashParamFunc()
  {
    setRecoverAaNewPasswordHashParamTx(changingRecoverAaNewPasswordHashParamTx);
    console.log(changingRecoverAaNewPasswordHashParamTx);
  }


  /*///  getDataSubscriptions  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
  let shibuyaGetAaQuantitySubcription = useCallSubscription<boolean>(accountManagerFactoryContract, 'getEoaAccountsQuantity', [accountAddressConnectedToFactory]);
  let shibuyaGetSpecificAaFromVectorSubscription = useCallSubscription<boolean>(accountManagerFactoryContract, 'getAccountAddressFromVec', [accountAddressConnectedToFactory, getSpecificAaAddressIndexParamTx]);
  let shibuyaGetAaVectorSubscription = useCallSubscription<boolean>(accountManagerFactoryContract, 'getAccountAaVec', [accountAddressConnectedToFactory]);
  let shibuyaGetLastAaCreatedAddressSubscription = useCallSubscription<boolean>(accountManagerFactoryContract, 'getLastAddressCreated');

  
  /*///  transactions  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
  const createAccountTx = useTx(accountManagerFactoryContract, 'createAccount');
  useTxNotifications(createAccountTx);

  const recoverAccountTx = useTx(accountManagerFactoryContract, 'recoverAccountOnInstance');
  useTxNotifications(recoverAccountTx);









  return (
    <section className="w-full mx-auto">
      <Notifications />
      {/*///////////////////////////////////////////////////////////////////////////////*/}
      {/*///  DISPLAY CONNECTED EOA DATA & CONNECTION (RPCS & CHAINS BLOCKS) DATA  /////*/}
      {/*///////////////////////////////////////////////////////////////////////////////*/}
      <div style={{paddingLeft: '15rem'}} >
        {/*///////////////////////////////////////////////////////////////////////////////*/}
        {/*///  TILTE AND SUBTITLE  //////////////////////////////////////////////////////*/}
        {/*///////////////////////////////////////////////////////////////////////////////*/}
        <h1 className="text-5xl font-bold text-blue-500">useink Kitchen Sink</h1>

        <h2 className="text-2xl text-blue-500 mb-16">
          See the contract definitions{' '}
          <a
            className="underline hover:opacity-80 transition duration-75"
            href="https://github.com/paritytech/useink-kitchen-sink/blob/master/lib.rs"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
        .
        </h2>

        {/*TEST CONNECTED*/}

        {
          account &&
          (
            <h1>CONECTED AS: {account.address}</h1>
          )
        }


        {/*///////////////////////////////////////////////////////////////////////////////*/}
        {/*///  DISPLAY WALLET CONNECTION SECTION IF NOT CONNECTED ALREADY  //////////////*/}
        {/*///////////////////////////////////////////////////////////////////////////////*/}

        <div className="mt-8">
          {
            !account && 
            (
              <ul className="flex flex-col gap-4">

                {/*///  DISPLAY INSTALLED WALLETS  ///////////////////////////////////////////////*/}
                {
                  installedWallets.length > 0 ? 
                      (
                          <>
                            <h2 className="text-xl font-bold">Connect a Wallet</h2>
                            <h3 className="text-md">Installed Wallets</h3>


                            {
                              installedWallets.map
                              (
                                (w) => 
                                (
                                  <li key={w.title}>
                                    <button
                                      onClick={() => connect(w.extensionName)}
                                      className="flex items-center w-full rounded-2xl text-white px-6 py-4 bg-blue-500 hover:bg-blue-600 transition duration-75"
                                    >
                                      <img className="w-12 mr-2" src={w.logo.src} alt={w.logo.alt} />
                                            
                                            
                                      Connect to {w.title}
                                    </button>
                                  </li>
                                )
                              )
                            }
                          </>
                      ) 
                  : 
                      (
                          <h2 className="text-xl font-bold">You don&apos;t have any wallets installed...</h2>
                      )
                }


                {/*///  DISPLAY UNINSTALLED WALLETS  /////////////////////////////////////////////*/}
                {
                  uninstalledWallets.length > 0 && 
                  (
                    <>
                      <h3 className="text-md">Uninstalled Wallets</h3>

                      {
                        uninstalledWallets.map
                        (
                          (w) => 
                          (
                            <li key={w.title}>
                              <a
                                href={w.installUrl}
                                target="_blank"
                                className="flex items-center w-full rounded-2xl text-white px-6 py-4 bg-blue-500 hover:bg-blue-600 transition duration-75"
                              >
                                  <img className="w-12 mr-2" src={w.logo.src} alt={w.logo.alt} />
                                  Install {w.title}
                              </a>
                            </li>
                          )
                        )
                      }
                    </>
                  )
                }
              </ul>
            )
           }


          {/*///////////////////////////////////////////////////////////////////////////////*/}
          {/*///  DISPLAY CONNECTED WALLET DATA  ///////////////////////////////////////////*/}
          {/*///////////////////////////////////////////////////////////////////////////////*/}
          <ul className="list-none flex flex-col gap-12 mt-8">
          {
            account && 
            (
              <>
                {/*///  DISCONNECT BUTTON  ///////////////////////////////////////////////////////*/}
                <li>
                  <button
                    onClick={disconnect}
                    className="rounded-2xl text-white px-6 py-4 bg-blue-500 hover:bg-blue-600 transition duration-75"
                  >
                    Disconnect
                  </button>
                </li>

                {/*///  CONNECTED WALLET DATA ////////////////////////////////////////////////////*/}
                <li>
                  <b>You are connected as:</b>


                  <span className="ml-4 dark:bg-slate-600 bg-slate-200 rounded-lg py-2 px-2">
                    {account?.name || account?.address}
                  </span>
                </li>

                {
                  accounts?.map
                  (
                    (acc) => account !== acc && 
                    (
                        <li key={acc.address} className="flex flex-col">

                          <b>Connect to {acc.name ? acc.name : 'wallet'}</b>


                          <button
                            onClick={() => setAccount(acc)}
                            className="rounded-2xl text-white px-4 py-2 mt-2 bg-blue-500 hover:bg-blue-600 transition duration-75"
                          >
                            {acc.address}
                          </button>

                        </li>
                    ),
                  )
                }

                <li>
                  <b>Your Free Balance:</b>

                  <span className="ml-4 dark:bg-slate-600 bg-slate-200 rounded-lg py-2 px-2">
                    {formatBalance(balance?.freeBalance, { decimals: 12, withSi: true })}
                  </span>
                </li>
              </>
            )
          }
                
                
          <li>
            <b>Astar Current Block:</b>
                  
                  
            <span className="ml-4 dark:bg-slate-600 bg-slate-200 rounded-lg py-2 px-2">
              {astarBlockNumber?.blockNumber === undefined ? '--' : astarBlockNumber.blockNumber.toLocaleString()}
            </span>
          </li>


            {/*///////////////////////////////////////////////////////////////////////////////*/}
            {/*///  DISPLAY AVAILABLE RPC OPTIONS  ///////////////////////////////////////////*/}
            {/*///////////////////////////////////////////////////////////////////////////////*/}
            <li>
              <b>Change a chain&apos;s active RPC url: (e.g. Astar)</b>

              <ul className="px-0 m-0 mt-6 gap-4 grid grid-cols-2 items-center">
              {
                rpcs.map
                (
                  (rpc) => 
                  (
                    <li key={rpc} className="p-0">
                      <button
                        className="rounded-2xl w-full text-white px-6 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 hover:disabled:bg-blue-300 transition duration-75"
                        disabled={rpc === astarRpc}
                        onClick={() => setChainRpc(rpc, 'astar')}
                       >

                        {rpc}
                      </button>

                    </li>
                  )
                )
              }
              </ul>
            </li>


            {/*///////////////////////////////////////////////////////////////////////////////*/}
            {/*///  DISPLAY CHAINS MINED BLOCKS STATUS  ///////////////////////////////////////*/}
            {/*///////////////////////////////////////////////////////////////////////////////*/}
            <li>
              <b>
                Get all blocks from configured chains using:{' '}
                <code className="p-2 rounded-md bg-slate-500">useBlockHeaders()</code>
              </b>


              <ul className="px-0 m-0 mt-6 gap-4 flex items-center flex-col md:flex-row">
              {
                (Object.keys(allChainBlockHeaders) as ChainId[]).map
                (
                  (chainId) => 
                  (
                    <li key={chainId} className="p-0">
                      <span>
                        <b>{chainId}:</b> {allChainBlockHeaders[chainId]?.blockNumber?.toLocaleString() || '--'}{' '}
                      </span>
                    </li>
                  )
                )
              }
              </ul>
            </li>
          </ul>
        </div>
      </div>


      {/*///////////////////////////////////////////////////////////////////////////////*/}
      {/*///  DISPLAY CONTRACT INSTANCES  //////////////////////////////////////////////*/}
      {/*///////////////////////////////////////////////////////////////////////////////*/}
      <div style={{paddingTop: '5rem'}}>
        {
          (!checkingAa) ?
          <>
            {/*///////////////////////////////////////////////////////////////////////////////*/}
            {/*///  DISPLAY ACCOUNT MANAGER FACTORY CONTRACT INTANCE  ////////////////////////*/}
            {/*///////////////////////////////////////////////////////////////////////////////*/}
            <div className="max-w-3xl w-full mx-auto py-16 px-4">
              {/*///////////////////////////////////////////////////////////////////////////////*/}
              {/*///  DIRECT INTERACTION WITH ACCOUNT MANAGER FACTORY SMART CONTRACTS  /////////*/}
              {/*///////////////////////////////////////////////////////////////////////////////*/}

              <div>
                {/*///  DISPLAY ACCOUNT MANAGER FACTORY SECTION  /////////////////////////////////*/}
                <div style={{paddingTop: '7rem', paddingLeft: '15rem'}}>
                  <button onClick={initializeAbstractedAccountsFunction}><h1>initializeAbstractedAccounts</h1></button>


                  <div style={{paddingTop: '2rem'}}>
                    <h2>checking: {accountAddressConnectedToFactory}</h2>
                  </div>


                  {/*///  DISPLAY SUBSCRIPTIONS  ///////////////////////////////////////////////////*/}
                  <div style={{paddingTop: '6rem'}}>
                    {/*///  eoaCreatedAaQuantity  ////////////////////////////////////////////////////*/}
                    <div style={{paddingTop: '4rem'}}>
                      <h2>eoaCreatedAaQuantity: {pickDecoded(shibuyaGetAaQuantitySubcription.result)?.toString() || '--'}</h2>
                    </div>
              

                    {/*///  accountAddressesVec  /////////////////////////////////////////////////////*/}
                    <div style={{paddingTop: '4rem'}}>
                      <h2>aaAddressesDisplay: {/*{pickDecoded(shibuyaGetAaVectorSubscription.result)?.toString() || '--'}*/}</h2>

                      {
                        pickDecoded(shibuyaGetAaVectorSubscription.result)?.map
                        (
                          (aa) => 
                          (
                            <li>
                              {aa}
                            </li>
                          )
                        )
                      }
                    </div>


                    {/*///  eoaLastAddressCreated  ///////////////////////////////////////////////////*/}
                    <div style={{paddingTop: '4rem'}}>
                      <h2>eoaLastAaCreatedAddress: {pickDecoded(shibuyaGetLastAaCreatedAddressSubscription.result)?.toString() || '--'}</h2>
                    </div>


                    {/*///  aaAddressFromVecIndex  ///////////////////////////////////////////////////*/}
                    <div style={{paddingTop: '4rem'}}>
                      <h2> getAaAddressFromVecIndex:</h2>


                      <div>
                        <div><input type="text" placeholder="vecIdToCheck" style={{background: 'rgb(105, 103, 116)'}} onChange={handleSpecificAddressIndexParam} value={changingGetSpecificAaAddressIndexParamTx}></input></div>
                        <div><button onClick={getSpecificAaAndressFromVecFunc}>checkAddress</button></div>
                      </div>
                      
                      <h2>Result: {pickDecoded(shibuyaGetSpecificAaFromVectorSubscription.result)?.toString() || '--'}</h2>
                    </div>
                  </div>


                  {/*///  DISPLAY TRANSACTIONS  ////////////////////////////////////////////////////*/}
                  <div style={{paddingTop: '6rem'}}>
                    <div style={{paddingTop: '4rem'}}>
                      <div>
                        <div><h2>createAccountTransaction:</h2></div>

                        <div><input type="text" placeholder="passwordForNewAccount" style={{background: 'rgb(105, 103, 116)'}} onChange={handleCreatePasswordParam} value={changingCreateAccountPasswordParamTx}></input></div>
                        <div><button onClick={createAccountFunc}>setPasswordForNewAccount</button></div>
                        <button onClick={() => createAccountTx.signAndSend([createAccountPasswordParamTx])} style={{paddingTop: '1rem'}}>
                          {shouldDisable(createAccountTx) ? 'SETTING' : 'createAccount'}
                        </button>
                      </div>


                      <div style={{paddingTop: '6rem'}}>
                        <h2>recoverAccountTransaction:</h2>

                        <div><input type="text" placeholder="accountAddress" style={{background: 'rgb(105, 103, 116)'}} onChange={handleRecoverAddressParamTx} value={changingRecoverAaAddressParamTx}></input></div>
                        <div><button onClick={setRecoverAddressParamFunc}>setAccountAddressToRecover</button></div>


                        <div style={{paddingTop: '0.55rem'}}><input type="text" placeholder="accountPasswordString" style={{background: 'rgb(105, 103, 116)'}} onChange={handleRecoverPasswordParamTx} value={changingRecoverAaPasswordParamTx}></input></div>
                        <div><button onClick={setRecoverPasswordParamFunc}>setAccountPasswordToRecover</button></div>


                        <div style={{paddingTop: '0.55rem'}}><input type="text" placeholder="accountNewPasswordHash" style={{background: 'rgb(105, 103, 116)'}} onChange={handleRecoverNewPasswordHashParamTx} value={changingRecoverAaNewPasswordHashParamTx}></input></div>
                        <div><button onClick={setRecoverNewPasswordHashParamFunc}>setNewPasswordHashForAccountToRecover</button></div>


                        <button onClick={() => recoverAccountTx.signAndSend([recoverAaAddressParamTx, recoverAaPasswordParamTx, recoverAaNewPasswordHashParamTx])} style={{paddingTop: '1rem'}}>
                          {shouldDisable(recoverAccountTx) ? 'SETTING' : 'recoverAccount'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/*///////////////////////////////////////////////////////////////////////////////*/}
              {/*///  INTERACTION WITH COMPONENT ABSTRACTED ACOCUNT INSTANCE  //////////////////*/}
              {/*///////////////////////////////////////////////////////////////////////////////*/}

              <div style={{paddingTop: '10rem', paddingLeft: '15rem'}}>
                <div><input type="text" placeholder="aaInstanceAddress" style={{background: 'rgb(105, 103, 116)'}} onChange={handleAaToInteractAddress} value={changingAaToInteractAddress}></input></div>
                <div><button onClick={setAaToInteractAddressFunc}>setAaAddressToInteractWith</button></div>
                <div><button onClick={goToComponent}>interactWithAaInstance</button></div>
              </div>
            </div>
          </>
          :
          <>
            {/*///////////////////////////////////////////////////////////////////////////////*/}
            {/*///  DISPLAY ABSTRACTED ACCOUNT CONTRACT INSTANCE   ///////////////////////////*/}
            {/*///////////////////////////////////////////////////////////////////////////////*/}
            <div style={{paddingLeft: '15rem'}}>
              <div>
                <h2>aaInstanceComponent:</h2>
              </div>


              <div style={{paddingTop: '3rem'}}>
                <AaInstanceComponent address={testVar} userConnected={accountAddressConnectedToFactory}/>
              </div>

              <button onClick={returnToMain} style={{paddingTop: '4rem'}}>returnToMain</button>
            </div>
          </>
        }
      </div>
    </section>
  );
};