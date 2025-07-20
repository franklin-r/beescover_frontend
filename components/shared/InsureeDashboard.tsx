"use client";

import { BaseError, useAccount, useReadContract, useReadContracts } from "wagmi";

import InsureePositionCard from "./InsureePositionCard";

import { poolIdToPoolInfo } from "@/constants";
import { Skeleton } from "../ui/skeleton";
import { coverageProofAbi, coverageProofAddress } from "@/constants/coverageProof";
import { ReadContractErrorType } from "viem";
import { useEffect, useState } from "react";

const InsureeDashboard = () => {

	const {address} = useAccount();



	// const {
	// 	data: nftBalance,
	// 	isLoading: nftBalanceIsLoading,
	// 	isSuccess: nftBalanceIsSuccess,
	// 	error: nftBalanceError
	// } = useReadContract({
	// 	address: coverageProofAddress,
	// 	abi: coverageProofAbi,
	// 	functionName: "balanceOf",
	// 	args: [address]
	// });
	// const balance = Number(nftBalance) || 0;

	// let nftTokenIDArray = Array(balance);
	// let nftTokenIDIsLoading: boolean = false;
	// let nftTokenIDIsSuccess: boolean = false;
	// let nftTokenIDError = null;
	// for (let i = 0; i < balance; i++) {
	// 	const {
	// 		data: nftTokenID,
	// 		isLoading: tokenIDIsLoading,
	// 		isSuccess: tokenIDIsSuccess,
	// 		error: tokenIDError
	// 	} = useReadContract({
	// 		address: coverageProofAddress,
	// 		abi: coverageProofAbi,
	// 		functionName: "tokenOfOwnerByIndex",
	// 		args: [address, i]
	// 	});
	// 	nftTokenIDArray.push(nftTokenID);
	// 	nftTokenIDIsLoading = nftTokenIDIsLoading && tokenIDIsLoading;
	// 	nftTokenIDIsSuccess = nftTokenIDIsSuccess && tokenIDIsSuccess;
	// 	nftTokenIDError = nftTokenIDError && tokenIDError;
	// }

	// let nftInfoArray = Array(balance);
	// let nftInfoIsLoading: boolean = false;
	// let nftInfoIsSuccess: boolean = false;
	// let nftInfoError = null;
	// for (let i = 0; i < balance; i++) {
	// 	const {
	// 		data: nftInfo,
	// 		isLoading: infoIsLoading,
	// 		isSuccess: infoIsSucces,
	// 		error: infoError
	// 	} = useReadContract({
	// 		address: coverageProofAddress,
	// 		abi: coverageProofAbi,
	// 		functionName: "getCoverageInfo",
	// 		args: [nftTokenIDArray[i]]
	// 	});
	// 	nftInfoArray.push(nftInfo);
	// 	nftInfoIsLoading = nftTokenIDIsLoading && infoIsLoading;
	// 	nftInfoIsSuccess = nftTokenIDIsSuccess && infoIsSucces;
	// 	nftInfoError = nftTokenIDError && infoError;
	// }

	return (
		<>
			<div className="space-y-6 w-full">
				<h1 className="text-3xl font-bold text-center">Insurer Dashboard</h1>
				{/* {nftInfoIsLoading && (
					<Skeleton className="h-[250px] w-[590px]" />
				)}
				{nftInfoError && (
					<div className="text-red-500">Looks like there is a mistake...</div>
				)}
				{nftInfoIsSuccess && (
					poolInfos.map(([poolId, info]) => {
						const balance = lpBalances[poolId]?.result;
						if (!balance || BigInt(Number(balance)) === 0n) return null;
						return <InsurerPositionCard key={poolId} poolId={poolId} />
					})
				)} */}
			</div>
		</>
	);
}

export default InsureeDashboard;