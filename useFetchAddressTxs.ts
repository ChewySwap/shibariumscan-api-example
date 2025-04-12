// hooks/useAddressTokenBalances.ts
import { useQuery } from "@tanstack/react-query";
import {
  BlockscoutApi,
  type Transaction,
  type TokenBalance,
} from "./blockscoutApi";

const apiBaseUrl = "https://www.shibariumscan.io/api/v2/";

export interface GetAddressTxsData {
  items: Transaction[];
  /** @example {"block_number":27736955,"index":4,"items_count":50} */
  next_page_params: object;
}

export interface TransactionData {
  block: number;
  hash: string;
  from: string;
  to: string;
  value: string;
  gas: number;
  gasPrice: string;
  gasUsed: string;
  nonce: number;
  input: string;
  timestamp: string;
  status: string;
  transactionIndex: number;
  confirmations: number;
  fee: Fee; // Update the type of fee
  gas_limit: string;
  method: string;
  type: string;
}

interface Fee {
  amount: string;
  currency: string;
  type: string;
  value: string;
}

interface ApiResponse {
  message: string;
  result: {
    blockHash: string;
    blockNumber: string;
    confirmations: string;
    contractAddress: string;
    cumulativeGasUsed: string;
    from: string;
    gas: string;
    gasPrice: string;
    gasUsed: string;
    hash: string;
    input: string;
    isError: string;
    nonce: string;
    timeStamp: string;
    to: string;
    transactionIndex: string;
    txreceipt_status: string;
    value: string;
  }[];
  status: string;
}

export function convertApiResponseToGetAddressTxsData(
  apiResponse: ApiResponse
): GetAddressTxsData {
  const items: Transaction[] = apiResponse.result.map((tx) => ({
    block: Number.parseInt(tx.blockNumber, 10),
    hash: tx.hash,
    from: {
      hash: tx.from,
    },
    to: {
      hash: tx.to,
    },
    method: "",
    value: tx.value,
    gas: Number.parseInt(tx.gas, 10),
    gasPrice: tx.gasPrice,
    gasUsed: tx.gasUsed,
    nonce: Number.parseInt(tx.nonce, 10),
    input: tx.input,
    timestamp: new Date(Number.parseInt(tx.timeStamp, 10) * 1000).toISOString(),
    status: tx.isError === "1" ? "execution reverted" : "success",
    transactionIndex: Number.parseInt(tx.transactionIndex, 10),
    confirmations: Number.parseInt(tx.confirmations, 10),
    // Add other missing properties with appropriate values
  }));

  return {
    items,
    next_page_params: {}, // Assuming no pagination info is provided in the API response
  };
}

const fetchTransactions = async (
  address: string): Promise<Transaction[]> => {
  try {
    const api = new BlockscoutApi({
      baseUrl: apiBaseUrl,
    });

    const response = await api.addresses.getAddressTxs(address);

    const transactions = response.data.items;

    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

export const useAddressTransactions = (address: string) => {
  return useQuery({
    queryKey: [`txs`, address],
    queryFn: () => fetchTransactions(address),
  });
};
