import type { Arguments, CommandBuilder } from 'yargs';
import {Client} from "@bnb-chain/greenfield-chain-sdk";
import {QueryHeadBucketResponse} from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/query';

type Options = {
    head: boolean | undefined;
    subcommand: string;
    options: string[];
};

type Subcommands = {
    head: Function;
}
export const command: string = 'bucket <subcommand> [options..]';
export const desc: string = 'Call <subcommand> with [options..] for work with buckets in Greenfield';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
        .options({
            head: { type: 'boolean' },
        })
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

const headBucket = async (client: Client, commandOptions: string[]): Promise<QueryHeadBucketResponse> => {
    const bucketName = commandOptions[0];
    return await client.bucket.headBucket(bucketName);
};

const subCommands = {
    head: headBucket
};
