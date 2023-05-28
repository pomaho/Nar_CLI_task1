Instuction CLI on Typescript for wok with Greenfield

Maybe need type 'sudo su' and SU pass if npm install ends with: code EACCES
```bash
npm install
```

```bash
npx tsc
```

Make cli.js executable

```bash
chmod u+x ./build/cli.js
```

Call our CLI to get info about bucket 'nat-test1'

```bash
./build/cli.js bucket head nat-test1
```

Get all user's buckets
```bash
./build/cli.js bucket userBuckets '"0x1cfC76dE9589952925a414842FF5ac3eb57A6483"'
```

Get user info
```bash
./build/cli.js account get '"0x1cfC76dE9589952925a414842FF5ac3eb57A6483"'
```
