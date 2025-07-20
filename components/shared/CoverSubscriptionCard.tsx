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
import { Slider } from "../ui/slider";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

import { useEffect, useState } from "react";

import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import { BaseError, parseUnits } from "viem";

import { poolIdToPoolInfo, PoolInfo } from "@/constants";

const CoverSubscriptionCard = ({ poolId }: { poolId: number }) => {
	const poolInfo = poolIdToPoolInfo.get(poolId) as PoolInfo;
	const [amount, setAmount] = useState<string>("");
	const [inputError, setInputError] = useState<string | null>(null);
	const [duration, setDuration] = useState<number>(1);
	const [approved, setApproved] = useState<boolean>(false);
	const {address} = useAccount();

	const {
		data: freeLiquidityBits,
		isLoading: freeLiquidityIsLoading,
		isSuccess: freeLiquidityIsSuccess,
		error: freeLiquidityError
	} = useReadContract({
		address: poolInfo.address,
		abi: poolInfo.abi,
		functionName: "freeLiquidity"
	});
	const freeLiquidity = Number(freeLiquidityBits) / (10**poolInfo.assetDecimals);
	const canQuery = !!amount && !(isNaN(Number(amount)) || Number(amount) <= 0);
	const {
		data: premiumBits,
		isLoading: premiumIsLoading,
		isSuccess: premiumIsSuccess,
		error: premiumError,
		refetch: premiumRefetch
	} = useReadContract({
		address: poolInfo.address,
		abi: poolInfo.abi,
		functionName: "computePremium",
		args: canQuery ? [parseUnits(amount, poolInfo.assetDecimals).toString(), duration.toString()] : undefined,
	});
	const premium = Number(premiumBits) / (10**poolInfo.assetDecimals);

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

	const handleBuyCoverage = async () => {
		if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
			setInputError("Please enter a valid amount.");
			return;
		}
		writeContract({
			address: poolInfo.address,
			abi: poolInfo.abi,
			functionName: "buyCoverage",
			account: address,
			args: [parseUnits(amount, poolInfo.assetDecimals).toString(), duration.toString()]
		});
	}

	return (
		<Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
					<p className="text-lg">Listing</p>
					<p>{poolInfo.name}</p>
				</div>
				<div className="space-y-4">
					<div className="flex justify-between">
						<p className="text-lg">Cover Amount</p>
						{freeLiquidityIsLoading && (
							<Skeleton className="h-[20px] w-[150px] rounded-full" />
						)}
						{freeLiquidityError && (
							<div className="text-red-500">Looks like there is a mistake...</div>
						)}
						{freeLiquidityIsSuccess && (
							<p>Max: {freeLiquidity} {poolInfo.assetSymbol}</p>
						)}
					</div>
					<Input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
				</div>
				{!!inputError && (
					<div className="text-red-500">{inputError}</div>
				)}
				<div className="space-y-4">
					<div className="flex justify-between">
						<p className="text-lg">Cover Duration</p>
						<p>{duration} {duration > 1 ? "days" : "day"}</p>
					</div>
					<Slider
						defaultValue={[1]}
						min={1}
						max={365}
						step={1}
						onValueChange={(val) => setDuration(val[0])}
					/>
				</div>
				<div className="flex justify-between">
					<p className="text-lg">Premium</p>
					{premiumIsLoading && (
						<Skeleton className="h-[20px] w-[150px] rounded-full" />
					)}
					{premiumError && (
						<div className="text-red-500">Looks like there is a mistake...</div>
					)}
					{premiumIsSuccess && (
						<p>{premium} {poolInfo.assetSymbol}</p>
					)}
				</div>
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
						onClick={handleBuyCoverage}
						disabled={isPending || isLoading}
					>
						Get Covered
					</Button>
				)}
      </CardFooter>
    </Card>
	)
}

export default CoverSubscriptionCard