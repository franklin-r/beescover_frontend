"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { BaseError, useAccount, useReadContracts, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import { poolIdToPoolInfo, PoolInfo } from "@/constants";
import { parseUnits } from "viem";

const LiquidityProvidingCard = () => {
	const searchParams = useSearchParams();
	const poolId = searchParams.get("poolId");
	const poolInfo = poolIdToPoolInfo.get(Number(poolId)) as PoolInfo;
	const [amount, setAmount] = useState<string>("");
	const [inputError, setInputError] = useState<string | null>(null);
	const [approved, setApproved] = useState<boolean>(false);
	const {address} = useAccount();

	const {
		data: readData,
		isLoading: readIsLoading,
		isSuccess: readIsSuccess,
		error: readError
	} = useReadContracts({
		contracts: [
			{
				address: poolInfo.address,
				abi: poolInfo.abi,
				functionName: "govTokenApr"
			},
			{
				address: poolInfo.address,
				abi: poolInfo.abi,
				functionName: "getAavePoolAPR"
			}
		]
	});
	const govTokenApr = Number(readData?.[0]?.result) / 100;
	const aavePoolApr = ((Number(readData?.[1]?.result) / 1e27) * 100).toFixed(2);

	const {data: hash, error, isPending, writeContract} = useWriteContract();
	const {isLoading, isSuccess, error: errorConfirmation} = useWaitForTransactionReceipt({
		hash	// Transaction hash to watch
	});

	useEffect(() => {
		if (amount && (isNaN(Number(amount)) || Number(amount) <= 0)) {
			setInputError("Please enter a valid amount.")
		}
		else {
			setInputError(null);
		}
	}, [amount]);

	useEffect(() => {
		if (isSuccess) {
			if (approved) {
				setAmount("");
			}
			setApproved(prevApproved => !prevApproved);
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isSuccess) {
			toast.success(`Transaction confirmed.\nView transaction: https://sepolia.etherscan.io/tx/${hash}`);
		}
		if (errorConfirmation) {
			toast.error("Transaction failed.");
		}
		if (isLoading) {
			toast.info("Waiting for block confirmation...");
		}
		if (error) {
			toast.error(`Transaction cancelled: ${(error as BaseError).shortMessage || error.message}`);
		}
	}, [isSuccess, errorConfirmation, isLoading, error]);

	const handleApprove = async () => {
		writeContract({
			address: poolInfo.assetAddress,
			abi: poolInfo.assetAbi,
			functionName: "approve",
			account: address,
			args: [poolInfo.address, parseUnits(amount, poolInfo.assetDecimals).toString()]
		});
	}

	const handleDeposit = async () => {
		if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
			setInputError("Please enter a valid amount.");
			return;
		}
		writeContract({
			address: poolInfo.address,
			abi: poolInfo.abi,
			functionName: "deposit",
			account: address,
			args: [parseUnits(amount, poolInfo.assetDecimals).toString()]
		});
	}

	return (
		<Card className="w-full max-w-sm flex flex-col">
      <CardHeader className="mb-5">
        <CardTitle className="text-2xl">Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 flex-grow">
        <div className="flex justify-between">
					<p className="text-lg">Listing</p>
					<p>{poolInfo.name}</p>
				</div>
				<div className="flex justify-between">
					<p className="text-lg">APR</p>
					{readIsLoading && (
						<Skeleton className="h-[20px] w-[150px] rounded-full" />
					)}
					{readError && (
						<div className="text-red-500">Looks like there is a mistake...</div>
					)}
					{readIsSuccess && (
						<div>{aavePoolApr} % {poolInfo.assetSymbol} + {govTokenApr?.toString()} % $BEE</div>
					)}
				</div>
				<div className="space-y-4">
					<p className="text-lg">Liquidity Provision</p>
					<Input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
				</div>
				{!!inputError && (
					<div className="text-red-500">{inputError}</div>
				)}
      </CardContent>
      <CardFooter className="justify-center">
				{!approved ? (
					<Button
						className="bg-black"
						onClick={handleApprove}
						disabled={!amount || !!inputError || isPending || isLoading}
					>
						Approve
					</Button>
				) : (
					<Button
						className="bg-black"
						onClick={handleDeposit}
						disabled={isPending || isLoading}
					>
						Provide Liquidity
					</Button>
				)}
      </CardFooter>
    </Card>
	);
}

export default LiquidityProvidingCard;