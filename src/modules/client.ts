import {Client, TxResponse} from '@bnb-chain/greenfield-chain-sdk';
import * as fs from 'fs';

export default class CliClient {
    static #client: Client;

    static get client() {
        if (CliClient.#client) {
            return CliClient.#client;
        }
        try {
            const loadedConfig = fs.readFileSync('./config.json', 'utf-8');
            const config = JSON.parse(loadedConfig);
            console.log(config);
            CliClient.#client = Client.create(config.rpcAddr, config.chainId);
            return CliClient.#client;
        } catch {
            CliClient.#client = Client.create('https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org', '5600');
            return CliClient.#client;
        }
    }
}
