# ShibariumScan API Example

This is a simple example of how to fetch data from the ShibariumScan API using the included typesafe API client and a Tanstack Query hook.

## Usage

Install Tanstack Query. Not required, you can also use nodejs's built-in fetch api in any typescript project

```bash
npm install @tanstack/react-query
```

Add blockscoutApi.ts to your project, example implementation can be found in useFetchAddressTxs hook. The generated types are included in the blockscoutApi.ts file and it supports every [API endpoint documented on ShibariumScan](https://www.shibariumscan.io/api/v2/docs).

This could also be used on other chains, just change the supplied baseUrl to the blockscout instance you want to use.

For example on base:

```typescript
const api = new BlockscoutApi({
    baseUrl: "https://base.blockscout.com/api/v2/",
  });
```

or on Ethereum:

```typescript
const api = new BlockscoutApi({
    baseUrl: "https://eth.blockscout.com/api/v2/",
  });
```

## License

GPL-v3
