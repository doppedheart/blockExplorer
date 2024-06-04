import { Network } from 'alchemy-sdk';
import {atom} from 'recoil';


export const alchemySettings = atom({
    key: 'alchemySettings',
    default: {
        apiKey: import.meta.env.VITE_APP_ALCHEMY_API_KEY,
        network: Network.ETH_MAINNET,
    },
})
