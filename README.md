Instuction CLI on Typescript for wok with Greenfield

Maybe need type 'sudo su' and SU pass if npm install ends with: code EACCES
```bash
npm install
```

```bash
npx tsc
```

```bash
chmod u+x ./build/cli.js
```
And now you can test first query for getting info about bucket 'nat-test1'

```bash
./build/cli.js bucket nat-test1 --head
```

Create package for make executable CLI module
```bash
npm i pkg -D
```

```bash
npm run package
```
Call our CLI for same query for backet 'nat-test1'

```bash
./grnfd-nar bucket head nat-test1
```
