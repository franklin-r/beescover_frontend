"use client";

import { useAccount, useReadContracts } from "wagmi";

import InsurerPositionCard from "./InsurerPositionCard";

import { poolIdToPoolInfo } from "@/constants";
import { Skeleton } from "../ui/skeleton";

const InsurerDashboard = () => {

	const {address} = useAccount();
	const poolInfos = Array.from(poolIdToPoolInfo.entries()); // [[0, info], [1, info], ...]

  const {
    data: lpBalances,
    isLoading: lpBalancesIsLoading,
		isSuccess: lpBalancesIsSuccess,
    error: lpBalancesError
  } = useReadContracts({
    contracts: poolInfos.map(([poolId, info]) => ({
      address: info.lpTokenAddress,
      abi: info.lpTokenAbi,
      functionName: "balanceOf",
      args: [address],
    }))
  });

	return (
		<>
			<div className="space-y-6 w-full">
				<h1 className="text-3xl font-bold text-center">Insurer Dashboard</h1>
				{lpBalancesIsLoading && (
					<Skeleton className="h-[250px] w-[590px]" />
				)}
				{lpBalancesError && (
					<div className="text-red-500">Looks like there is a mistake...</div>
				)}
				{lpBalancesIsSuccess && (
					poolInfos.map(([poolId, info]) => {
						const balance = lpBalances[poolId]?.result;
						if (!balance || BigInt(Number(balance)) === 0n) return null;
						return <InsurerPositionCard key={poolId} poolId={poolId} />
					})
				)}
			</div>
		</>
	);
}

export default InsurerDashboard;