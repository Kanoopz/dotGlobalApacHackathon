import {useBalance, useBlockHeader, useBlockHeaders, useCall, useCallSubscription, useChainRpc, useChainRpcList, useContract, useDryRun, useEventSubscription, useEvents, useInstalledWallets, useTx, useTxPaymentInfo, useUninstalledWallets, useWallet,} from 'useink';
import abstractedAccountMetadata from '../../metadata/abstractedAccount.json';
import { RustResult, formatBalance, isBroadcast, isFinalized, isInBlock, isPendingSignature, pickDecoded, pickDecodedError, pickResultErr, pickResultOk, pickTxInfo, shouldDisable,} from 'useink/utils';
import { useNotifications, useTxNotifications } from 'useink/notifications';



function Car(props) 
{
    /*
        const accountManagerFactoryAddress = props.address;
        const accountManagerFactoryContract = useContract(accountManagerFactoryAddress, accountManagerFactoryMetadata, 'shibuya-testnet');

        const accountAddressConnectedToFactory = props.userConnected;
        const shibuyaGetAaVectorSubscriptionComponent = useCallSubscription<boolean>(accountManagerFactoryContract, 'getAccountAaVec', [accountAddressConnectedToFactory]);
    */

    const abstractedAccountAddress = props.address;
    const abstractedAccountContract = useContract(abstractedAccountAddress, abstractedAccountMetadata, 'shibuya-testnet');

    const accountAddressConnectedToAa = props.userConnected;
    const shibuyaGetAaOwner = useCallSubscription<boolean>(abstractedAccountContract, 'getAccountOwner');
    const shibuyaGetAaAddressFromCode = useCallSubscription<boolean>(abstractedAccountContract, 'getAccountAddress');


    const { addNotification } = useNotifications();

    return (
        <div>
            <div>
                <h2>Hi, I am a Car! with the address: {props.address}</h2>
            </div>


            <div style={{paddingTop: '2rem'}}>
                <h2>aaOwner: {pickDecoded(shibuyaGetAaOwner.result)?.toString() || '--'}</h2>
                <h2>aaAddressFromCode: {pickDecoded(shibuyaGetAaAddressFromCode.result)?.toString() || '--'}</h2>
            </div>


            <div style={{paddingTop: '2rem'}}>
                <h2>USER CONNECTED ADDRESS: {props.userConnected}</h2>
            </div>
        </div>
    );
}

  export default Car;