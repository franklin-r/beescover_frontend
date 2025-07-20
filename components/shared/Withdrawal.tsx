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

import { BaseError, useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import { poolIdToPoolInfo, PoolInfo } from "@/constants";
import { parseUnits } from "viem";

const Withdrawal = ({ poolId }: { poolId: number }) => {
	const poolInfo = poolIdToPoolInfo.get(poolId) as PoolInfo;
	const [amount, setAmount] = useState<string>("");
	const [inputError, setInputError] = useState<string | null>(null);
	const [approved, setApproved] = useState<boolean>(false);
	const {address} = useAccount();

	const {
		data: readData,
		isLoading: readIsLoading,
		isSuccess: readIsSuccess,
		error: readError
	} = useReadContract({
		address: poolInfo.address,
		abi: poolInfo.abi,
		functionName: "withdrawalRequests",
		args: [address!],
		query: {
			enabled: true
		}
	});
	const date = new Date();
	const currentTimestamp = Math.floor(date.getTime() / 1000);
	const reqAmount = readData?.[0];
	const reqTimestamp = readData?.[1];
	const withdrawalPending = (reqAmount !== 0n) && (reqTimestamp > currentTimestamp);
	const withdrawalReady = (reqAmount !== 0n) && (reqTimestamp <= currentTimestamp);

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
		}
		if (isSuccess && !withdrawalPending && withdrawalReady) {
			setApproved(true);
		}
		else if (isSuccess && !withdrawalPending && !withdrawalReady) {
			setApproved(false);
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
			address: poolInfo.lpTokenAddress,
			abi: poolInfo.lpTokenAbi,
			functionName: "approve",
			account: address,
			args: [poolInfo.address, reqAmount.toString()]
		});
	}

	const handleRequestWithdrawal = async () => {
		if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
			setInputError("Please enter a valid amount.");
			return;
		}
		writeContract({
			address: poolInfo.address,
			abi: poolInfo.abi,
			functionName: "requestWithdrawal",
			account: address,
			args: [parseUnits(amount, poolInfo.assetDecimals).toString()]
		});
	}

	const handleExecuteWithdrawal = async () => {
		writeContract({
			address: poolInfo.address,
			abi: poolInfo.abi,
			functionName: "executeWithdrawal",
			account: address,
			args: []
		});
	}

	return (
		<Card className="w-full max-w-sm flex flex-col">
			<CardHeader className="mb-5">
				<CardTitle className="text-2xl">Withdrawal</CardTitle>
			</CardHeader>
			<CardContent className="space-y-8 flex-grow">
				<div className="flex justify-between">
					<p className="text-lg">Pool</p>
					<p>{poolInfo.name}</p>
				</div>
				<div className="flex justify-between">
					<p className="text-lg">Withdrawal Status</p>
					<div className="text-right">
						{readIsLoading && (
							<Skeleton className="h-[20px] w-[150px] rounded-full" />
						)}
						{readError && (
							<div className="text-red-500">Looks like there is a mistake...</div>
						)}
						{readIsSuccess && !withdrawalPending && !withdrawalReady && (
							<div>No withdrawal request pending</div>
						)}
						{readIsSuccess && withdrawalPending && (
							<div>
								Your withdrawal request of an amount of {reqAmount} {poolInfo.assetSymbol} 
								will be able to be processed on {new Date(Number(reqTimestamp) * 1000).toString()}
							</div>
						)}
						{readIsSuccess && withdrawalReady &&  (
							<div>Your withdrawal is ready to be processed</div>
						)}
					</div>
					
				</div>
				<div className="space-y-4">
					{!withdrawalPending && !withdrawalReady && (
						<>
							<p className="text-lg">Request Withdrawal</p>
							<Input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
						</>
					)}
				</div>
				{!!inputError && (
					<div className="text-red-500">{inputError}</div>
				)}
			</CardContent>
			<CardFooter className="justify-center">
				{!approved && !withdrawalPending && !withdrawalReady && (
					<Button
						className="bg-black"
						onClick={handleRequestWithdrawal}
						disabled={!amount || !!inputError || isPending || isLoading}
					>
						Request Withdrawal
					</Button>
				)}
				{!approved && !withdrawalPending && withdrawalReady && (
					<Button
						className="bg-black"
						onClick={handleApprove}
						disabled={isPending || isLoading}
					>
						Approve
					</Button>
				)}
				{approved && !withdrawalPending && withdrawalReady && (
					<Button
						className="bg-black"
						onClick={handleExecuteWithdrawal}
						disabled={isPending || isLoading}
					>
						Withdraw
					</Button>
				)}
			</CardFooter>
		</Card>
	);
}

export default Withdrawal;