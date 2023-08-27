/* eslint-disable @next/next/no-img-element */
import {useBalance, useBlockHeader, useBlockHeaders, useCall, useCallSubscription, useChainRpc, useChainRpcList, useContract, useDryRun, useEventSubscription, useEvents, useInstalledWallets, useTx, useTxPaymentInfo, useUninstalledWallets, useWallet,} from 'useink';
import { RustResult, formatBalance, isBroadcast, isFinalized, isInBlock, isPendingSignature, pickDecoded, pickDecodedError, pickResultErr, pickResultOk, pickTxInfo, shouldDisable,} from 'useink/utils';
import { ChainId } from 'useink/chains';
import { useEffect, useMemo, useState } from 'react';
import { useNotifications, useTxNotifications } from 'useink/notifications';
import { Notifications } from '../Notifications';

import kusama_gif from "./images/KUSAMA-GIFS_3.gif";
import Pattern_1 from "./images/Pattern_1";
import Pattern_2 from "./images/Pattern_2";

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









  const [isAlreadyConnected, setIsAlreadyConnected] = useState(false);

  function walletConnect()
  {
    setIsAlreadyConnected(true);
  }

  function walletDisconnect()
  {
    setIsAlreadyConnected(false);
  }






  return (
    <div className="w-full h-full mx-auto" style={{background: '#000000'}}>
      <section style={{background: '#000000'}}>
        <Notifications/>

        <div className="w-full h-full mx-auto" style={{background: '#000000'}}>
          <header>
            <div className="relative w-full h-full" style={{paddingTop: '35rem'}}>
              <div className="absolute inset-0 flex items-center justify-center z-0">
                <img src={kusama_gif.src} style={{paddingRight: '15rem'}} alt="Kusama GIF" className="object-cover" />
              </div>

              <h1 className="absolute inset-x-0 inset-y-0 flex items-center justify-center text-white text-[64px] z-10">
                <pre className="flex flex-row ">
                  "/onChainMerklePasswords"
                  <p className="text-pink-500 ml-[18px]">Project</p>
                </pre>
              </h1>
            </div>

            <div className="bottom-0 left-0 right-0 text-center mb-40" style={{position: 'absolute', paddingLeft: '42rem'}}>
              <h1 className="text-white text-[48px]">
                <pre className="flex flex-row justify-center">
                  by <p className="text-pink-500 font-bold">"/oneManArmy"</p>
                </pre>
              </h1>
            </div>
          </header>


          <body style={{paddingTop: '6rem', background: '#000000'}}>
            <div style={{paddingTop: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
            {
              (!isAlreadyConnected) ?
                <>
                  <button onClick={walletConnect} className="rounded-2xl text-white px-6 py-4 bg-pink-500 hover:bg-pink-600 transition duration-75">
                    connectWalletToApp
                  </button>
                </>
              :
                <>
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
                                      <h2 className="text-xl font-bold">Select a wallet to connect</h2>
                                      <h3 className="text-md">Installed Wallets</h3>


                                      {
                                        installedWallets.map
                                        (
                                          (w) => 
                                          (
                                            <li key={w.title}>
                                              <button
                                                onClick={() => connect(w.extensionName)}
                                                className="flex items-center w-full rounded-2xl text-white px-6 py-4 bg-pink-500 hover:bg-pink-600 transition duration-75"
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
                                          className="flex items-center w-full rounded-2xl text-white px-6 py-4 bg-pink-500 hover:bg-pink-600 transition duration-75"
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
                          {/*///  CONNECTED WALLET DATA ////////////////////////////////////////////////////*/}
                          <li>
                            <b>You are connected as:</b>


                            <span className="ml-4 dark:bg-slate-600 bg-slate-200 rounded-lg py-2 px-2">
                              {account?.name || account?.address}
                            </span>
                          </li>

                          <li>
                            <b>With address:</b>


                            <span className="ml-4 dark:bg-slate-600 bg-slate-200 rounded-lg py-2 px-2">
                              {account?.address}
                            </span>
                          </li>


                          {/*///  DISCONNECT BUTTON  ///////////////////////////////////////////////////////*/}
                          <li style={{display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
                              <button
                                onClick={disconnect, walletDisconnect}
                                className="rounded-2xl text-white px-6 py-4 bg-pink-500 hover:bg-pink-600 transition duration-75"
                                style={{display: 'flex', alignItems: 'center', justifyContent: 'center',}}
                              >
                                Disconnect
                              </button>
                            </div>
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
                        </>
                      )
                    }
                    </ul>
                  </div>
                </>
            }
            </div>

            <div style={{paddingTop: '5rem'}}>
              {
                isAlreadyConnected ?
                <>
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
                            <div style={{paddingTop: '1rem', paddingLeft: '15rem'}}>
                              <button className="w-[220px] h-[50px] mt-[20px] bg-pink-500 text-white rounded-lg" onClick={initializeAbstractedAccountsFunction}><h1>initializeAbstractedAccounts</h1></button>

                              {
                                /*
                                <div style={{paddingTop: '2rem'}}>
                                  <h2>checking: {accountAddressConnectedToFactory}</h2>
                                </div>
                                */
                              }


                              {/*///  DISPLAY SUBSCRIPTIONS  ///////////////////////////////////////////////////*/}
                              <div style={{paddingTop: '6rem'}}>
                                {/*///  eoaCreatedAaQuantity  ////////////////////////////////////////////////////*/}
                                <div style={{paddingTop: '4rem', display: 'inline'}}>
                                  <h2 style={{display: 'inline'}} className="text-pink-500">userAbstractedAccountsCreated: </h2> <h2 style={{display: 'inline'}}>{pickDecoded(shibuyaGetAaQuantitySubcription.result)?.toString() || '--'}</h2>
                                </div>
                          

                                {/*///  accountAddressesVec  /////////////////////////////////////////////////////*/}
                                <div style={{paddingTop: '1.5rem'}}>
                                  <h2 className="text-pink-500">userAbstractedAccountsAvailable: {/*{pickDecoded(shibuyaGetAaVectorSubscription.result)?.toString() || '--'}*/}</h2>

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
                                <div style={{paddingTop: '1.5rem'}}>
                                  <h2 className="text-pink-500">eoaLastAaCreatedAddress: </h2> <h2>{pickDecoded(shibuyaGetLastAaCreatedAddressSubscription.result)?.toString() || '--'}</h2>
                                </div>


                                {/*///  aaAddressFromVecIndex  ///////////////////////////////////////////////////*/}
                                <div style={{paddingTop: '1.5rem'}}>
                                  <h2 className="text-pink-500"> getAaAddressFromVecIndex:</h2>


                                  <div>
                                    <input type="text" placeholder="vecIdToCheck" style={{background: 'rgb(105, 103, 116)', display: 'inline', justifyContent: 'space-between'}} onChange={handleSpecificAddressIndexParam} value={changingGetSpecificAaAddressIndexParamTx}></input>
                                    <button onClick={getSpecificAaAndressFromVecFunc} style={{display: 'inline', justifyContent: 'space-between'}} className="w-[240px] h-[28px] mt-[20px] bg-pink-500 text-white rounded-lg">checkAddress</button>
                                  </div>
                                  
                                  <h2 className="text-pink-500" style={{display: 'inline'}}>Result: </h2><h2 style={{display: 'inline'}}>{pickDecoded(shibuyaGetSpecificAaFromVectorSubscription.result)?.toString() || '--'}</h2>
                                </div>
                              </div>


                              {/*///  DISPLAY TRANSACTIONS  ////////////////////////////////////////////////////*/}
                              <div style={{paddingTop: '6rem'}}>
                                <div style={{paddingTop: '4rem'}}>
                                  <div>
                                    <h2 className="text-pink-500">createAccountTransaction:</h2>

                                    <div>
                                      <input type="text" placeholder="passwordForNewAccount" style={{background: 'rgb(105, 103, 116)'}} onChange={handleCreatePasswordParam} value={changingCreateAccountPasswordParamTx}></input>
                                      <button onClick={createAccountFunc} className="w-[240px] h-[28px] mt-[20px] bg-pink-500 text-white rounded-lg">setPasswordForNewAccount</button>
                                    </div>
                                    <button onClick={() => createAccountTx.signAndSend([createAccountPasswordParamTx])} className="w-[150px] h-[50px] mt-[20px] bg-pink-500 text-white rounded-lg"> 
                                      {shouldDisable(createAccountTx) ? 'SETTING' : 'createAccount'}
                                    </button>
                                  </div>


                                  <div style={{paddingTop: '3rem'}}>
                                    <h2 className="text-pink-500">recoverAccountTransaction:</h2>

                                    <div>
                                      <input type="text" placeholder="accountAddress" style={{background: 'rgb(105, 103, 116)'}} onChange={handleRecoverAddressParamTx} value={changingRecoverAaAddressParamTx}></input>
                                      <button onClick={setRecoverAddressParamFunc} className="w-[240px] h-[28px] mt-[20px] bg-pink-500 text-white rounded-lg">setAccountAddressToRecover</button>
                                    </div>


                                    <div>
                                      <input type="text" placeholder="accountPasswordString" style={{background: 'rgb(105, 103, 116)'}} onChange={handleRecoverPasswordParamTx} value={changingRecoverAaPasswordParamTx}></input>
                                      <button onClick={setRecoverPasswordParamFunc} className="w-[240px] h-[28px] mt-[20px] bg-pink-500 text-white rounded-lg">setAccountPasswordToRecover</button>
                                    </div>


                                    <div>
                                      <input type="text" placeholder="accountNewPasswordHash" style={{background: 'rgb(105, 103, 116)', display: 'inline'}} onChange={handleRecoverNewPasswordHashParamTx} value={changingRecoverAaNewPasswordHashParamTx}></input>
                                      <button onClick={setRecoverNewPasswordHashParamFunc} className="w-[280px] h-[28px] mt-[20px] bg-pink-500 text-white rounded-lg" style={{display: 'inline'}}>setNewPasswordHashForAccount</button>
                                    </div>


                                    <button onClick={() => recoverAccountTx.signAndSend([recoverAaAddressParamTx, recoverAaPasswordParamTx, recoverAaNewPasswordHashParamTx])} className="w-[150px] h-[50px] mt-[20px] bg-pink-500 text-white rounded-lg">
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

                          <div style={{paddingTop: '13rem', paddingLeft: '15rem'}}>
                            <div>
                              <input type="text" placeholder="aaInstanceAddress" style={{background: 'rgb(105, 103, 116)'}} onChange={handleAaToInteractAddress} value={changingAaToInteractAddress}></input>
                              <button onClick={setAaToInteractAddressFunc} className="w-[240px] h-[28px] mt-[20px] bg-pink-500 text-white rounded-lg">setAaAddressToInteractWith</button>
                            </div>
                            <div><button onClick={goToComponent} className="w-[190px] h-[50px] mt-[20px] bg-pink-500 text-white rounded-lg">interactWithAaInstance</button></div>
                          </div>
                        </div>
                      </>
                      :
                      <>
                        {/*///////////////////////////////////////////////////////////////////////////////*/}
                        {/*///  DISPLAY ABSTRACTED ACCOUNT CONTRACT INSTANCE   ///////////////////////////*/}
                        {/*///////////////////////////////////////////////////////////////////////////////*/}
                        <div style={{paddingLeft: '5rem'}}>
                          <div>
                            <AaInstanceComponent address={testVar} userConnected={accountAddressConnectedToFactory}/>
                          </div>


                          <div style={{paddingTop: '8rem'}}>
                            <button onClick={returnToMain} className="w-[190px] h-[50px] mt-[20px] bg-pink-500 text-white rounded-lg">returnToMain</button>
                          </div>


                          <div style={{paddingTop: '6rem'}}>
                          </div>
                        </div>
                      </>
                    }
                  </div>
                </>
                :
                <></>
              }
            </div>
          </body>
        </div>
      </section>
    </div>
  );
};








        