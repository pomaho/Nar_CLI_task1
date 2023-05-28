import type { Arguments, CommandBuilder } from 'yargs';
import {Client, TxResponse} from '@bnb-chain/greenfield-chain-sdk';
import {QueryHeadBucketResponse} from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/query';
import {VisibilityType} from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/common';
import {ISpInfo} from '@bnb-chain/greenfield-chain-sdk/dist/esm/types/storage';

type Options = {
    subcommand: string;
    options: string[];
};

type Subcommands = {
    head: Function;
    create: Function;
}
export const command: string = 'bucket <subcommand> [options..]';
export const desc: string = 'Call <subcommand> with [options..] for work with buckets in Greenfield';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
        .positional('subcommand', { type: 'string', demandOption: true });

export const handler = async (argv: Arguments<Options>): Promise<void> => {
    const {subcommand, options} = argv;
    const greeting = `Hello, ${subcommand}!`;
    console.log(JSON.stringify(argv));

    const subCommandKey = subcommand as keyof Subcommands;

    if (typeof subCommands[subCommandKey] === 'function') {
        const client = Client.create('https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org', '5600');
        console.log(await subCommands[subCommandKey](client, options));
    }

    process.stdout.write(options ? greeting.toUpperCase() : greeting);
    process.exit(0);
};

const createBucket = async (client: Client, commandOptions: string[]): Promise<TxResponse> => {
    const bucketName = commandOptions[0];
    return await client.bucket.createBucket({
        bucketName: bucketName,
        creator: '0xCc9DB4cf17b3c5B21811921b40C6f34e55f99fB2',
        visibility: 'VISIBILITY_TYPE_PUBLIC_READ',
        chargedReadQuota: '2000',
        spInfo: {
            endpoint: 'https://gnfd-testnet-sp-1.bnbchain.org',
            sealAddress: '0xCc9DB4cf17b3c5B21811921b40C6f34e55f99fB2',
            secondarySpAddresses: [
                'https://gnfd-testnet-sp-2.bnbchain.org',
                'https://gnfd-testnet-sp-3.bnbchain.org',
                'https://gnfd-testnet-sp-4.bnbchain.org',
                'https://gnfd-testnet-sp-5.bnbchain.org'
            ]
        }
    });

    /**
     * https://gnfd-testnet-sp-1.bnbchain.org
     * https://gnfd-testnet-sp-2.bnbchain.org
     * https://gnfd-testnet-sp-3.bnbchain.org
     * https://gnfd-testnet-sp-4.bnbchain.org
     * https://gnfd-testnet-sp-5.bnbchain.org
     */

};

const headBucket = async (client: Client, commandOptions: string[]): Promise<QueryHeadBucketResponse> => {
    const bucketName = commandOptions[0];
    return await client.bucket.headBucket(bucketName);
};

const subCommands = {
    head: headBucket,
    create: createBucket
};
