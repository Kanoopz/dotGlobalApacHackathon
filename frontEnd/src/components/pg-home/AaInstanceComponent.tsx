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
            <div style={{paddingTop: '2rem'}}>
                <h2>USER CONNECTED ADDRESS: {props.userConnected}</h2>
            </div>


            <div>
                <h1>abstractedAccountInstance: {props.address}</h1>
            </div>


            <div style={{paddingTop: '2rem'}}>
                <h2>aaOwner: {pickDecoded(shibuyaGetAaOwner.result)?.toString() || '--'}</h2>
                <h2>aaAddressFromCode: {pickDecoded(shibuyaGetAaAddressFromCode.result)?.toString() || '--'}</h2>
            </div>

            <div style={{paddingTop: '8rem'}}>
                <div><h1>abstractedAccountAssets:</h1></div>


                <div style={{paddingTop: '3rem'}}>
                    <div>
                        <div><h1>//NFTs/////</h1></div>
                        <div><h2>aaNftAssetsQuantity: {pickDecoded(shibuyaGetNftAssetsQuantity.result)?.toString() || '--'}</h2></div>


                        <div style={{paddingTop: '2.5rem'}}>
                            <div><h2>nftAssetsAddresses</h2></div>
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
                            <div><input type="text" placeholder="nftAddressToAdd" style={{background: 'rgb(105, 103, 116)'}} onChange={handleSetNftAddressParam} value={changingSetNftAddressParamTx}></input></div>
                            <div><button onClick={setNftAddressFunction}>setNftAddressToAdd</button></div>


                            <button onClick={() => setNftAddressTx.signAndSend([changingSetNftAddressParamTx])} style={{paddingTop: '0.13rem'}}>
                                {shouldDisable(setNftAddressTx) ? 'SETTING' : 'addNftAddress'}
                            </button>
                        </div>


                        <div style={{paddingTop: '2.5rem'}}>
                            <div><h2>checkNftAssetBalance:</h2></div>
                            <div><input type="text" placeholder="nftAssetToCheck" style={{background: 'rgb(105, 103, 116)'}} onChange={handleCheckNftParam} value={changingNftAssetToCheckParamTx}></input></div>
                            <div><button onClick={setNftAssetToCheck}>checkBalance</button></div>

                            <div style={{paddingTop: '0.35rem'}}><h2>Asset: {nftAssetToCheckParamTx}</h2></div>
                            <div><h2>assetBalance: {pickDecoded(shibuyaGetNftAssetBalance.result)?.toString() || '--'}</h2></div>    
                        </div>


                        <div style={{paddingTop: '2.5rem'}}>
                            <div><h2>mintNftAsset:</h2></div>
                            <div><input type="text" placeholder="nftAssetToMintAddress" style={{background: 'rgb(105, 103, 116)'}} onChange={handleNftAssetAddressToMintParam} value={changingNftAssetAddressToMintParamTx}></input></div>
                            <div><button onClick={setNftAssetAddressToMintFunction}>setNftAssetAddressToMint</button></div>


                            <button onClick={() => mintNftAssetTx.signAndSend([nftAssetAddressToMintParamTx])} style={{paddingTop: '0.3rem'}}>
                                {shouldDisable(mintNftAssetTx) ? 'SETTING' : 'mintNftAsset'}
                            </button>
                        </div>


                        <div style={{paddingTop: '2.5rem'}}>
                            <div>transferNftAsset:</div>


                            <div><input type="text" placeholder="nftAssetAddressToTransfer" style={{background: 'rgb(105, 103, 116)'}} onChange={handleNftAssetToTransferAddressParam} value={changingNftAssetToTransferAddressParamTx}></input></div>
                            <div><button onClick={setNftAssetToTransferAddressFunction}>setNftAddressToTransfer</button></div>


                            <div style={{paddingTop: '0.6rem'}}><input type="text" placeholder="nftAssetIdToTransfer" style={{background: 'rgb(105, 103, 116)'}} onChange={handleNftAssetToTransferIdParam} value={changingNftAssetToTransferIdParamTx}></input></div>
                            <div><button onClick={setNftAssetToTransferIdFunction}>setNftIdToTransfer</button></div>


                            <div style={{paddingTop: '0.6rem'}}><input type="text" placeholder="nftAssetReceiverAddress" style={{background: 'rgb(105, 103, 116)'}} onChange={handleNftAssetToTransferReceiverAddressParam} value={changingNftAssetToTransferReceiverAddressParamTx}></input></div>
                            <div><button onClick={setNftAssetToTransferReceiverAddressFunction}>setNftReceiverAddress</button></div>


                            <button onClick={() => transferNftAssetTx.signAndSend([nftAssetToTransferAddressParamTx, nftAssetToTransferIdParamTx, nftAssetToTransferReceiverAddressParamTx])} style={{paddingTop: '0.3rem'}}>
                                {shouldDisable(transferNftAssetTx) ? 'SETTING' : 'transferNftAsset'}
                            </button>
                        </div>
                    </div>


                    <div style={{paddingTop: '8.5rem'}}>
                        <div><h1>//TOKENs/////</h1></div>
                        <div><h2>aaTokenAssetsQuantity: {pickDecoded(shibuyaGetTokenAssetsQuantity.result)?.toString() || '--'}</h2></div>


                        <div style={{paddingTop: '2.5rem'}}>
                            <div><h2>tokenAssetsAddresses</h2></div>
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
                            <div><input type="text" placeholder="tokenAddressToAdd" style={{background: 'rgb(105, 103, 116)'}} onChange={handleSetTokenAddressParam} value={changingSetTokenAddressParamTx}></input></div>
                            <div><button onClick={setTokenAddressFunction}>setTokenAddressToAdd</button></div>


                            <button onClick={() => setTokenAddressTx.signAndSend([changingSetTokenAddressParamTx])} style={{paddingTop: '0.13rem'}}>
                                {shouldDisable(setTokenAddressTx) ? 'SETTING' : 'addTokenAddress'}
                            </button>
                        </div>


                        <div style={{paddingTop: '2.5rem'}}>
                            <div><h2>checkTokenAssetBalance:</h2></div>
                            <div><input type="text" placeholder="tokenAssetToCheck" style={{background: 'rgb(105, 103, 116)'}} onChange={handleCheckTokenParam} value={changingTokenAssetToCheckParamTx}></input></div>
                            <div><button onClick={setTokenAssetToCheck}>checkBalance</button></div>

                            <div style={{paddingTop: '0.35rem'}}><h2>Asset: {tokenAssetToCheckParamTx}</h2></div>
                            <div><h2>assetBalance: {pickDecoded(shibuyaGetTokenAssetBalance.result)?.toString() || '--'}</h2></div>    
                        </div>


                        <div style={{paddingTop: '2.5rem'}}>
                            <div><h2>mintTokenAsset:</h2></div>
                            <div><input type="text" placeholder="tokenAssetToMintAddress" style={{background: 'rgb(105, 103, 116)'}} onChange={handleTokenAssetAddressToMintParam} value={changingTokenAssetAddressToMintParamTx}></input></div>
                            <div><button onClick={setTokenAssetAddressToMintFunction}>setTokenAssetAddressToMint</button></div>


                            <div style={{paddingTop: '0.6rem'}}><input type="text" placeholder="tokenAssetToMintQuantity" style={{background: 'rgb(105, 103, 116)'}} onChange={handleTokenAssetQuantityToMintParam} value={changingTokenAssetQuantityToMintParamTx}></input></div>
                            <div><button onClick={setTokenAssetQuantityToMintFunction}>setTokenAssetQuantityToMint</button></div>


                            <button onClick={() => mintTokenAssetTx.signAndSend([tokenAssetAddressToMintParamTx, tokenAssetQuantityToMintParamTx])} style={{paddingTop: '0.3rem'}}>
                                {shouldDisable(mintTokenAssetTx) ? 'SETTING' : 'mintTokenAsset'}
                            </button>
                        </div>


                        <div style={{paddingTop: '2.5rem'}}>
                            <div>transferTokenAsset:</div>


                            <div><input type="text" placeholder="tokenAssetAddressToTransfer" style={{background: 'rgb(105, 103, 116)'}} onChange={handleTokenAssetToTransferAddressParam} value={changingTokenAssetToTransferAddressParamTx}></input></div>
                            <div><button onClick={setTokenAssetToTransferAddressFunction}>setTokenAddressToTransfer</button></div>


                            <div style={{paddingTop: '0.6rem'}}><input type="text" placeholder="tokenAssetQuantityToTransfer" style={{background: 'rgb(105, 103, 116)'}} onChange={handleTokenAssetToTransferQuantityParam} value={changingTokenAssetToTransferQuantityParamTx}></input></div>
                            <div><button onClick={setTokenAssetToTransferQuantityFunction}>setTokenQuantityToTransfer</button></div>


                            <div style={{paddingTop: '0.6rem'}}><input type="text" placeholder="tokenAssetReceiverAddress" style={{background: 'rgb(105, 103, 116)'}} onChange={handleTokenAssetToTransferReceiverAddressParam} value={changingTokenAssetToTransferReceiverAddressParamTx}></input></div>
                            <div><button onClick={setTokenAssetToTransferReceiverAddressFunction}>setTokenReceiverAddress</button></div>


                            <button onClick={() => transferTokenAssetTx.signAndSend([tokenAssetToTransferAddressParamTx, tokenAssetToTransferQuantityParamTx, tokenAssetToTransferReceiverAddressParamTx])} style={{paddingTop: '0.3rem'}}>
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