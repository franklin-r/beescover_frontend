"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { poolIdToPoolInfo, PoolInfo } from "@/constants";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { BaseError } from "viem";
import { arbitratorAbi, arbitratorAddress } from "@/constants/arbitrator";

const Claim = () => {
	const searchParams = useSearchParams();
	const poolId = searchParams.get("poolId");
	const tokenId = searchParams.get("tokenId");
	const poolInfo = poolIdToPoolInfo.get(Number(poolId)) as PoolInfo;

	const [link, setLink] = useState<string>("");
	const [inputError, setInputError] = useState<string | null>(null);
	const {address} = useAccount();

	const {
		data: arbitrationCost,
		isSuccess: costSuccess
	} = useReadContract({
		address: arbitratorAddress,
		abi: arbitratorAbi,
		functionName: "arbitrationCost",
		args: ["0x"]
	});
	const cost = arbitrationCost as bigint;
	console.log(`arbitrationCost: ${arbitrationCost}`);
	console.log(`typeof(arbitrationCost): ${typeof(arbitrationCost)}`);

	const {data: hash, error, isPending, writeContract} = useWriteContract();
	const {isLoading, isSuccess, error: errorConfirmation} = useWaitForTransactionReceipt({
		hash	// Transaction hash to watch
	});

	useEffect(() => {
		const pattern = /^https:\/\/.*\.ipfs\.dweb\.link\//
		if (link && !pattern.test(link)) {
			setInputError("Please enter a valid link.")
		}
		else {
			setInputError(null);
		}
	}, [link]);

	useEffect(() => {
		if (isSuccess) {
			setLink("");
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

	const handleCreateClaim = async () => {
		if (!costSuccess) {
			return;
		}

		writeContract({
			address: poolInfo.address,
			abi: poolInfo.abi,
			functionName: "createClaim",
			account: address,
			args: [(tokenId!)?.toString(), link],
			value: cost
		});
	}

	return (
		<Card className="w-full max-w-sm flex flex-col">
			<CardHeader>
				<CardTitle className="text-2xl">File a Claim</CardTitle>
			</CardHeader>
			<CardDescription className="ml-5 mr-5">
				Please review the <Link href={poolInfo?.policy} className="hover:underline"><span className="font-bold">insurance policy</span></Link> to make sure your claim is valid
			</CardDescription>
			<CardContent className="space-y-8 flex-grow">
				<div className="flex justify-between">
					<p className="text-lg">Pool</p>
					<p>{poolInfo?.name}</p>
				</div>
				<div className="space-y-4">
					<p className="text-lg">Provide Evidence</p>
					<Input type="text" placeholder="Link to evidence" value={link} onChange={(e) => setLink(e.target.value)} />
				</div>
				{!!inputError && (
					<div className="text-red-500">{inputError}</div>
				)}
			</CardContent>
			<CardFooter className="justify-center">
				<Button
					className="bg-black"
					onClick={handleCreateClaim}
					disabled={!link || !!inputError || isPending || isLoading}
				>
					Submit Claim
				</Button>
			</CardFooter>
		</Card>
	);
}

export default Claim;