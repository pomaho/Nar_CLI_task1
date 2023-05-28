import type { Arguments, CommandBuilder } from 'yargs';
import {Client} from '@bnb-chain/greenfield-chain-sdk';
import {BaseAccount} from '@bnb-chain/greenfield-cosmos-types/cosmos/auth/v1beta1/auth';

type Options = {
    subcommand: string;
    options: string[];
};

type Subcommands = {
    get: Function;
}
export const command: string = 'account <subcommand> [options..]';
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

    process.exit(0);
};

const getAccount = async (client: Client, commandOptions: string[]): Promise<BaseAccount> => {
    const address = (commandOptions[0] as string).replace(/\"/g, '');
    return await client.account.getAccount(address);
};

const subCommands = {
    get: getAccount,
};
