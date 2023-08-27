import { useState } from 'react';

import {useBalance, useBlockHeader, useBlockHeaders, useCall, useCallSubscription, useChainRpc, useChainRpcList, useContract, useDryRun, useEventSubscription, useEvents, useInstalledWallets, useTx, useTxPaymentInfo, useUninstalledWallets, useWallet,} from 'useink';
import abstractedAccountMetadata from '../../metadata/abstractedAccount.json';
import { RustResult, formatBalance, isBroadcast, isFinalized, isInBlock, isPendingSignature, pickDecoded, pickDecodedError, pickResultErr, pickResultOk, pickTxInfo, shouldDisable,} from 'useink/utils';
import { useNotifications, useTxNotifications } from 'useink/notifications';



function AaInstanceComponent(props) 
{
    /*///////////////////////////////////////////////////////////////////////////////*/
    /*///////////////////////////////////////////////////////////////////////////////*/
    /*///  accountFactorySmartContract setUp  ///////////////////////////////////////*/
    /*///////////////////////////////////////////////////////////////////////////////*/
    /*///////////////////////////////////////////////////////////////////////////////*/

    /*///  dataSetUp  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
    const abstractedAccountAddress = props.address;
    const accountAddressConnectedToAa = props.userConnected;

    const abstractedAccountContract = useContract(abstractedAccountAddress, abstractedAccountMetadata, 'shibuya-testnet');


    /*///  stateParamValuesForSubscriptions  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
    const [nftAssetToCheckParamTx, setNftAssetToCheckParamTx] = useState('');
    const [changingNftAssetToCheckParamTx, setChangingNftAssetToCheckParamTx] = useState('');

    const handleCheckNftParam = event => 
    {
        setChangingNftAssetToCheckParamTx(event.target.value);
        console.log(event.target.value);
    };

    function setNftAssetToCheck()
    {
        setNftAssetToCheckParamTx(changingNftAssetToCheckParamTx);
        console.log(changingNftAssetToCheckParamTx);
    }


    const [tokenAssetToCheckParamTx, setTokenAssetToCheckParamTx] = useState('');
    const [changingTokenAssetToCheckParamTx, setChangingTokenAssetToCheckParamTx] = useState('');

    const handleCheckTokenParam = event => 
    {
        setChangingTokenAssetToCheckParamTx(event.target.value);
        console.log(event.target.value);
    };

    function setTokenAssetToCheck()
    {
        setTokenAssetToCheckParamTx(changingTokenAssetToCheckParamTx);
        console.log(changingTokenAssetToCheckParamTx);
    }

    
    /*///  stateParamValuesForTransactions  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
    const [setNftAddressParamTx, setSetNftAddressParamTx] = useState('');
    const [changingSetNftAddressParamTx, setChangingSetNftAddressParamTx] = useState('');

    const handleSetNftAddressParam = event => 
    {
        setChangingSetNftAddressParamTx(event.target.value);
        console.log(event.target.value);
    };

    function setNftAddressFunction()
    {
        setSetNftAddressParamTx(changingSetNftAddressParamTx);
        console.log(changingSetNftAddressParamTx);
    }


    const [setTokenAddressParamTx, setSetTokenAddressParamTx] = useState('');
    const [changingSetTokenAddressParamTx, setChangingSetTokenAddressParamTx] = useState('');

    const handleSetTokenAddressParam = event => 
    {
        setChangingSetTokenAddressParamTx(event.target.value);
        console.log(event.target.value);
    };

    function setTokenAddressFunction()
    {
        setSetTokenAddressParamTx(changingSetTokenAddressParamTx);
        console.log(changingSetTokenAddressParamTx);
    }


    const [nftAssetAddressToMintParamTx, setNftAssetAddressToMintParamTx] = useState('');
    const [changingNftAssetAddressToMintParamTx, setChangingNftAssetAddressToMintParamTx] = useState('');

    const handleNftAssetAddressToMintParam = event => 
    {
        setChangingNftAssetAddressToMintParamTx(event.target.value);
        console.log(event.target.value);
    };

    function setNftAssetAddressToMintFunction()
    {
        setNftAssetAddressToMintParamTx(changingNftAssetAddressToMintParamTx);
        console.log(changingNftAssetAddressToMintParamTx);
    }


    const [tokenAssetAddressToMintParamTx, setTokenAssetAddressToMintParamTx] = useState('');
    const [changingTokenAssetAddressToMintParamTx, setChangingTokenAssetAddressToMintParamTx] = useState('');

    const handleTokenAssetAddressToMintParam = event => 
    {
        setChangingTokenAssetAddressToMintParamTx(event.target.value);
        console.log(event.target.value);
    };

    function setTokenAssetAddressToMintFunction()
    {
        setTokenAssetAddressToMintParamTx(changingTokenAssetAddressToMintParamTx);
        console.log(changingTokenAssetAddressToMintParamTx);
    }
    
    
    const [tokenAssetQuantityToMintParamTx, setTokenAssetQuantityToMintParamTx] = useState(0);
    const [changingTokenAssetQuantityToMintParamTx, setChangingTokenAssetQuantityToMintParamTx] = useState(0);

    const handleTokenAssetQuantityToMintParam = event => 
    {
        setChangingTokenAssetQuantityToMintParamTx(event.target.value);
        console.log(event.target.value);
    };

    function setTokenAssetQuantityToMintFunction()
    {
        setTokenAssetQuantityToMintParamTx(changingTokenAssetQuantityToMintParamTx);
        console.log(changingTokenAssetQuantityToMintParamTx);
    }


    const [nftAssetToTransferAddressParamTx, setNftAssetToTransferAddressParamTx] = useState('');
    const [changingNftAssetToTransferAddressParamTx, setChangingNftAssetToTransferAddressParamTx] = useState('');

    const handleNftAssetToTransferAddressParam = event => 
    {
        setChangingNftAssetToTransferAddressParamTx(event.target.value);
        console.log(event.target.value);
    };
    
    function setNftAssetToTransferAddressFunction()
    {
        setNftAssetToTransferAddressParamTx(changingNftAssetToTransferAddressParamTx);
        console.log(changingNftAssetToTransferAddressParamTx);
    }


    const [nftAssetToTransferIdParamTx, setNftAssetToTransferIdParamTx] = useState(0);
    const [changingNftAssetToTransferIdParamTx, setChangingNftAssetToTransferIdParamTx] = useState(0);

    const handleNftAssetToTransferIdParam = event => 
    {
        setChangingNftAssetToTransferIdParamTx(event.target.value);
        console.log(event.target.value);
    };
    
    function setNftAssetToTransferIdFunction()
    {
        setNftAssetToTransferIdParamTx(changingNftAssetToTransferIdParamTx);
        console.log(changingNftAssetToTransferIdParamTx);
    }


    const [nftAssetToTransferReceiverAddressParamTx, setNftAssetToTransferReceiverAddressParamTx] = useState('');
    const [changingNftAssetToTransferReceiverAddressParamTx, setChangingNftAssetToTransferReceiverAddressParamTx] = useState('');

    const handleNftAssetToTransferReceiverAddressParam = event => 
    {
        setChangingNftAssetToTransferReceiverAddressParamTx(event.target.value);
        console.log(event.target.value);
    };
    
    function setNftAssetToTransferReceiverAddressFunction()
    {
        setNftAssetToTransferReceiverAddressParamTx(changingNftAssetToTransferReceiverAddressParamTx);
        console.log(changingNftAssetToTransferReceiverAddressParamTx);
    }


    const [tokenAssetToTransferAddressParamTx, setTokenAssetToTransferAddressParamTx] = useState('');
    const [changingTokenAssetToTransferAddressParamTx, setChangingTokenAssetToTransferAddressParamTx] = useState('');

    const handleTokenAssetToTransferAddressParam = event => 
    {
        setChangingTokenAssetToTransferAddressParamTx(event.target.value);
        console.log(event.target.value);
    };
    
    function setTokenAssetToTransferAddressFunction()
    {
        setTokenAssetToTransferAddressParamTx(changingTokenAssetToTransferAddressParamTx);
        console.log(changingNftAssetToTransferAddressParamTx);
    }


    const [tokenAssetToTransferQuantityParamTx, setTokenAssetToTransferQuantityParamTx] = useState(0);
    const [changingTokenAssetToTransferQuantityParamTx, setChangingTokenAssetToTransferQuantityParamTx] = useState(0);

    const handleTokenAssetToTransferQuantityParam = event => 
    {
        setChangingTokenAssetToTransferQuantityParamTx(event.target.value);
        console.log(event.target.value);
    };
    
    function setTokenAssetToTransferQuantityFunction()
    {
        setTokenAssetToTransferQuantityParamTx(changingTokenAssetToTransferQuantityParamTx);
        console.log(changingTokenAssetToTransferQuantityParamTx);
    }


    const [tokenAssetToTransferReceiverAddressParamTx, setTokenAssetToTransferReceiverAddressParamTx] = useState('');
    const [changingTokenAssetToTransferReceiverAddressParamTx, setChangingTokenAssetToTransferReceiverAddressParamTx] = useState('');

    const handleTokenAssetToTransferReceiverAddressParam = event => 
    {
        setChangingTokenAssetToTransferReceiverAddressParamTx(event.target.value);
        console.log(event.target.value);
    };
    
    function setTokenAssetToTransferReceiverAddressFunction()
    {
        setTokenAssetToTransferReceiverAddressParamTx(changingTokenAssetToTransferReceiverAddressParamTx);
        console.log(changingTokenAssetToTransferReceiverAddressParamTx);
    }


    /*///  getDataSubscriptions  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
    const shibuyaGetAaOwner = useCallSubscription<boolean>(abstractedAccountContract, 'getAccountOwner');
    const shibuyaGetAaAddressFromCode = useCallSubscription<boolean>(abstractedAccountContract, 'getAccountAddress');

    const shibuyaGetNftAssetsQuantity = useCallSubscription<boolean>(abstractedAccountContract, 'getVecNftLength');
    const shibuyaGetNftAddresssesVec = useCallSubscription<boolean>(abstractedAccountContract, 'getAaNftVec');

    const shibuyaGetTokenAssetsQuantity = useCallSubscription<boolean>(abstractedAccountContract, 'getVecTokenLength');
    const shibuyaGetTokenAddresssesVec = useCallSubscription<boolean>(abstractedAccountContract, 'getAaTokentVec');

    const shibuyaGetNftAssetBalance = useCallSubscription<boolean>(abstractedAccountContract, 'balanceOfNft', [nftAssetToCheckParamTx]);
    const shibuyaGetTokenAssetBalance = useCallSubscription<boolean>(abstractedAccountContract, 'balanceOfTokens', [tokenAssetToCheckParamTx]);


    const { addNotification } = useNotifications();


    /*///  transactions  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
    const setNftAddressTx = useTx(abstractedAccountContract, 'setNft');
    useTxNotifications(setNftAddressTx);

    const setTokenAddressTx = useTx(abstractedAccountContract, 'setToken');
    useTxNotifications(setNftAddressTx);


    const mintNftAssetTx = useTx(abstractedAccountContract, 'mintNft');
    useTxNotifications(mintNftAssetTx);

    const mintTokenAssetTx = useTx(abstractedAccountContract, 'mintTokens');
    useTxNotifications(mintNftAssetTx);


    const transferNftAssetTx = useTx(abstractedAccountContract, 'transferNft');
    useTxNotifications(transferNftAssetTx);

    const transferTokenAssetTx = useTx(abstractedAccountContract, 'transferTokens');
    useTxNotifications(transferTokenAssetTx);









    return (
        <div>
            <div>
                <h1 className="text-pink-500 text-[64px]">abstractedAccountData</h1>
            </div>


            <div style={{paddingTop: '2rem'}}>
                <div>
                    <h2 className="text-pink-500" style={{display: 'inline'}}>aaOwner: </h2>
                    <h2 style={{display: 'inline'}}>{pickDecoded(shibuyaGetAaOwner.result)?.toString() || '--'}</h2>
                </div>

                <div>
                    <h2 className="text-pink-500" style={{display: 'inline'}}>aaAddressFromCode: </h2>
                    <h2 style={{display: 'inline'}}>{pickDecoded(shibuyaGetAaAddressFromCode.result)?.toString() || '--'}</h2>
                </div>
            </div>

            <div style={{paddingTop: '8rem'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><h1 className="text-pink-500 text-[40px]">abstractedAccountAssets:</h1></div>


                <div style={{paddingTop: '3rem', display: 'flex'}}>
                    <div>
                        <div><h1 className="text-pink-500">//NFTs/////</h1></div>

                        <div>
                            <h2 className="text-pink-500" style={{display: 'inline'}}>aaNftAssetsQuantity: </h2>
                            <h2 style={{display: 'inline'}}>{pickDecoded(shibuyaGetNftAssetsQuantity.result)?.toString() || '--'}</h2>
                        </div>


                        <div style={{paddingTop: '2.5rem'}}>
                            <div><h2 className="text-pink-500">nftAssetsAddresses</h2></div>
                            {/*<div>{pickDecoded(shibuyaGetNftAddresssesVec.result)?.toString() || '--'}</div>*/}
                            {
                                pickDecoded(shibuyaGetNftAddresssesVec.result)?.map
                                (
                                    (w) => 
                                    (
                                    <li>
                                        {w}
                                    </li>
                                    )
                                )
                            }
                        </div>


                        <div style={{paddingTop: '0.45rem'}}>
                            <div>
                                <input type="text" placeholder="nftAddressToAdd" style={{background: 'rgb(105, 103, 116)'}} onChange={handleSetNftAddressParam} value={changingSetNftAddressParamTx}></input>
                                <button onClick={setNftAddressFunction} className="w-[240px] h-[28px] mt-[20px] bg-pink-500 text-white rounded-lg">setNftAddressToAdd</button>
                            </div>


                            <button onClick={() => setNftAddressTx.signAndSend([changingSetNftAddressParamTx])} style={{paddingTop: '0.13rem'}} className="w-[150px] h-[50px] mt-[20px] bg-pink-500 text-white rounded-lg">
                                {shouldDisable(setNftAddressTx) ? 'SETTING' : 'addNftAddress'}
                            </button>
                        </div>


                        <div style={{paddingTop: '4rem'}}>
                            <div><h2 className="text-pink-500">checkNftAssetBalance:</h2></div>
                            
                            <div>
                                <input type="text" placeholder="nftAssetToCheck" style={{background: 'rgb(105, 103, 116)'}} onChange={handleCheckNftParam} value={changingNftAssetToCheckParamTx}></input>
                                <button onClick={setNftAssetToCheck} className="w-[240px] h-[28px] mt-[20px] bg-pink-500 text-white rounded-lg">checkBalance</button>
                            </div>

                            <div style={{paddingTop: '0.35rem'}}>
                                <h2 style={{display: 'inline'}} className="text-pink-500">Asset: </h2>
                                <h2 style={{display: 'inline'}}>{nftAssetToCheckParamTx}</h2>
                            </div>

                            <div>
                                <h2 style={{display: 'inline'}} className="text-pink-500">assetBalance: </h2>
                                <h2 style={{display: 'inline'}}> {pickDecoded(shibuyaGetNftAssetBalance.result)?.toString() || '--'}</h2>
                            </div>    
                        </div>


                        <div style={{paddingTop: '4rem'}}>
                            <div><h2 className="text-pink-500">mintNftAsset:</h2></div>

                            <div>
                                <input type="text" placeholder="nftAssetToMintAddress" style={{background: 'rgb(105, 103, 116)'}} onChange={handleNftAssetAddressToMintParam} value={changingNftAssetAddressToMintParamTx}></input>
                                <button onClick={setNftAssetAddressToMintFunction} className="w-[240px] h-[28px] mt-[20px] bg-pink-500 text-white rounded-lg">setNftAssetAddressToMint</button>
                            </div>


                            <button onClick={() => mintNftAssetTx.signAndSend([nftAssetAddressToMintParamTx])} style={{paddingTop: '0.3rem'}} className="w-[150px] h-[50px] mt-[20px] bg-pink-500 text-white rounded-lg">
                                {shouldDisable(mintNftAssetTx) ? 'SETTING' : 'mintNftAsset'}
                            </button>
                        </div>


                        <div style={{paddingTop: '4rem'}}>
                            <div className="text-pink-500">transferNftAsset:</div>


                            <div>
                                <input type="text" placeholder="nftAssetAddressToTransfer" style={{background: 'rgb(105, 103, 116)'}} onChange={handleNftAssetToTransferAddressParam} value={changingNftAssetToTransferAddressParamTx}></input>
                                <button onClick={setNftAssetToTransferAddressFunction} className="w-[240px] h-[28px] mt-[20px] bg-pink-500 text-white rounded-lg">setNftAddressToTransfer</button>
                            </div>


                            <div style={{paddingTop: '0.6rem'}}>
                                <input type="text" placeholder="nftAssetIdToTransfer" style={{background: 'rgb(105, 103, 116)'}} onChange={handleNftAssetToTransferIdParam} value={changingNftAssetToTransferIdParamTx}></input>
                                <button onClick={setNftAssetToTransferIdFunction} className="w-[240px] h-[28px] mt-[20px] bg-pink-500 text-white rounded-lg">setNftIdToTransfer</button>
                            </div>


                            <div style={{paddingTop: '0.6rem'}}>
                                <input type="text" placeholder="nftAssetReceiverAddress" style={{background: 'rgb(105, 103, 116)'}} onChange={handleNftAssetToTransferReceiverAddressParam} value={changingNftAssetToTransferReceiverAddressParamTx}></input>
                                <button onClick={setNftAssetToTransferReceiverAddressFunction} className="w-[240px] h-[28px] mt-[20px] bg-pink-500 text-white rounded-lg">setNftReceiverAddress</button>
                            </div>


                            <button onClick={() => transferNftAssetTx.signAndSend([nftAssetToTransferAddressParamTx, nftAssetToTransferIdParamTx, nftAssetToTransferReceiverAddressParamTx])} style={{paddingTop: '0.3rem'}} className="w-[150px] h-[50px] mt-[20px] bg-pink-500 text-white rounded-lg">
                                {shouldDisable(transferNftAssetTx) ? 'SETTING' : 'transferNftAsset'}
                            </button>
                        </div>
                    </div>


                    {/*<div style={{paddingTop: '8.5rem'}}>*/}
                    <div style={{paddingLeft: '23rem'}}>
                        <div><h1 className="text-pink-500">//TOKENs/////</h1></div>
                        
                        <div>
                            <h2 className="text-pink-500" style={{display: 'inline'}}>aaTokenAssetsQuantity: </h2>
                            <h2 style={{display: 'inline'}}>{pickDecoded(shibuyaGetTokenAssetsQuantity.result)?.toString() || '--'}</h2>
                        </div>


                        <div style={{paddingTop: '2.5rem'}}>
                            <div><h2 className="text-pink-500">tokenAssetsAddresses</h2></div>
                           {/*<div>{pickDecoded(shibuyaGetTokenAddresssesVec.result)?.toString() || '--'}</div>*/}

                            {
                                pickDecoded(shibuyaGetTokenAddresssesVec.result)?.map
                                (
                                    (w) => 
                                    (
                                    <li>
                                        {w}
                                    </li>
                                    )
                                )
                            }
                        </div>


                        <div style={{paddingTop: '0.45rem'}}>
                            <div>
                                <input type="text" placeholder="tokenAddressToAdd" style={{background: 'rgb(105, 103, 116)'}} onChange={handleSetTokenAddressParam} value={changingSetTokenAddressParamTx}></input>
                                <button onClick={setTokenAddressFunction} className="w-[240px] h-[28px] mt-[20px] bg-pink-500 text-white rounded-lg">setTokenAddressToAdd</button>
                            </div>


                            <button onClick={() => setTokenAddressTx.signAndSend([changingSetTokenAddressParamTx])} style={{paddingTop: '0.13rem'}} className="w-[150px] h-[50px] mt-[20px] bg-pink-500 text-white rounded-lg">
                                {shouldDisable(setTokenAddressTx) ? 'SETTING' : 'addTokenAddress'}
                            </button>
                        </div>


                        <div style={{paddingTop: '2.5rem'}}>
                            <div><h2 className="text-pink-500">checkTokenAssetBalance:</h2></div>
                        
                            <div>
                                <input type="text" placeholder="tokenAssetToCheck" style={{background: 'rgb(105, 103, 116)'}} onChange={handleCheckTokenParam} value={changingTokenAssetToCheckParamTx}></input>
                                <button onClick={setTokenAssetToCheck} className="w-[240px] h-[28px] mt-[20px] bg-pink-500 text-white rounded-lg">checkBalance</button>
                            </div>

                            <div style={{paddingTop: '0.35rem'}}>
                                <h2 style={{display: 'inline'}} className="text-pink-500">Asset: </h2>
                                <h2 style={{display: 'inline'}}>{tokenAssetToCheckParamTx}</h2>
                            </div>

                            <div>
                                <h2 style={{display: 'inline'}} className="text-pink-500">assetBalance: </h2>
                                <h2 style={{display: 'inline'}}>{pickDecoded(shibuyaGetTokenAssetBalance.result)?.toString() || '--'}</h2>
                            </div>    
                        </div>


                        <div style={{paddingTop: '2.5rem'}}>
                            <div><h2 className="text-pink-500">mintTokenAsset:</h2></div>


                            <div>
                                <input type="text" placeholder="tokenAssetToMintAddress" style={{background: 'rgb(105, 103, 116)'}} onChange={handleTokenAssetAddressToMintParam} value={changingTokenAssetAddressToMintParamTx}></input>
                                <button onClick={setTokenAssetAddressToMintFunction} className="w-[240px] h-[28px] mt-[20px] bg-pink-500 text-white rounded-lg">setTokenAssetAddressToMint</button>
                            </div>


                            <div style={{paddingTop: '0.6rem'}}>
                                <input type="text" placeholder="tokenAssetToMintQuantity" style={{background: 'rgb(105, 103, 116)'}} onChange={handleTokenAssetQuantityToMintParam} value={changingTokenAssetQuantityToMintParamTx}></input>
                                <button onClick={setTokenAssetQuantityToMintFunction} className="w-[240px] h-[28px] mt-[20px] bg-pink-500 text-white rounded-lg">setTokenAssetQuantityToMint</button>
                            </div>


                            <button onClick={() => mintTokenAssetTx.signAndSend([tokenAssetAddressToMintParamTx, tokenAssetQuantityToMintParamTx])} style={{paddingTop: '0.3rem'}} className="w-[150px] h-[50px] mt-[20px] bg-pink-500 text-white rounded-lg">
                                {shouldDisable(mintTokenAssetTx) ? 'SETTING' : 'mintTokenAsset'}
                            </button>
                        </div>


                        <div style={{paddingTop: '2.5rem'}}>
                            <div className="text-pink-500">transferTokenAsset:</div>


                            <div>
                                <input type="text" placeholder="tokenAssetAddressToTransfer" style={{background: 'rgb(105, 103, 116)'}} onChange={handleTokenAssetToTransferAddressParam} value={changingTokenAssetToTransferAddressParamTx}></input>
                                <button onClick={setTokenAssetToTransferAddressFunction} className="w-[240px] h-[28px] mt-[20px] bg-pink-500 text-white rounded-lg">setTokenAddressToTransfer</button>
                            </div>


                            <div style={{paddingTop: '0.6rem'}}>
                                <input type="text" placeholder="tokenAssetQuantityToTransfer" style={{background: 'rgb(105, 103, 116)'}} onChange={handleTokenAssetToTransferQuantityParam} value={changingTokenAssetToTransferQuantityParamTx}></input>
                                <button onClick={setTokenAssetToTransferQuantityFunction} className="w-[240px] h-[28px] mt-[20px] bg-pink-500 text-white rounded-lg">setTokenQuantityToTransfer</button>
                            </div>


                            <div style={{paddingTop: '0.6rem'}}>
                                <input type="text" placeholder="tokenAssetReceiverAddress" style={{background: 'rgb(105, 103, 116)'}} onChange={handleTokenAssetToTransferReceiverAddressParam} value={changingTokenAssetToTransferReceiverAddressParamTx}></input>
                                <button onClick={setTokenAssetToTransferReceiverAddressFunction} className="w-[240px] h-[28px] mt-[20px] bg-pink-500 text-white rounded-lg">setTokenReceiverAddress</button>
                            </div>


                            <button onClick={() => transferTokenAssetTx.signAndSend([tokenAssetToTransferAddressParamTx, tokenAssetToTransferQuantityParamTx, tokenAssetToTransferReceiverAddressParamTx])} style={{paddingTop: '0.3rem'}} className="w-[150px] h-[50px] mt-[20px] bg-pink-500 text-white rounded-lg">
                                {shouldDisable(transferTokenAssetTx) ? 'SETTING' : 'transferTokenAsset'}
                            </button>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
}

  export default AaInstanceComponent;