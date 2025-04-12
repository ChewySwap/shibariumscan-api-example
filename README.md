# ShibariumScan API Example

This is a simple example of how to fetch data from the ShibariumScan API using the included typesafe API client including a Tanstack Query hook.

## Usage

Install Tanstack Query. Not required, you can also use with nodejs's built-in fetch in any typescript project

```bash
npm install @tanstack/react-query
```

Add blockscoutApi.ts to your project, example implementation can be found in useFetchAddressTxs hook. The generated types are included in the blockscoutApi.ts file and it includes every API endpoint Blockscout supports.

## License

GPL-v3
