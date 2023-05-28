import type { Arguments, CommandBuilder } from 'yargs';
import {BaseAccount} from '@bnb-chain/greenfield-cosmos-types/cosmos/auth/v1beta1/auth';
import CliClient from '../modules/client';

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
    console.log(JSON.stringify(argv));

    const subCommandKey = subcommand as keyof Subcommands;

    if (typeof subCommands[subCommandKey] === 'function') {
        const result = await subCommands[subCommandKey](options);
        console.log(result);
    }

    process.exit(0);
};

const getAccount = async (commandOptions: string[]): Promise<BaseAccount> => {
    const address = (commandOptions[0] as string).replace(/\"/g, '');
    return await CliClient.client.account.getAccount(address);
};

const subCommands = {
    get: getAccount,
};
