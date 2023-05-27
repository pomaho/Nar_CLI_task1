import type { Arguments, CommandBuilder } from 'yargs';
import {Client} from "@bnb-chain/greenfield-chain-sdk";

type Options = {
    name: string;
    head: boolean | undefined;
};

export const command: string = 'bucket <name>';
export const desc: string = 'Greet <name> with Hello';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
        .options({
            head: { type: 'boolean' },
        })
        .positional('name', { type: 'string', demandOption: true });

export const handler = async (argv: Arguments<Options>): Promise<void> => {
    const { name, head } = argv;
    const greeting = `Hello, ${name}!`;

    const client = Client.create('https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org', '5600');
    if (head) {
        const buckets = await client.bucket.headBucket(name);
        console.log(buckets)
    }

    process.stdout.write(head ? greeting.toUpperCase() : greeting);
    process.exit(0);
};
