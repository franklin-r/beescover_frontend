"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "../ui/skeleton";

import Link from "next/link";

import { useReadContracts } from "wagmi";

import { poolIdToPoolInfo, PoolInfo } from "@/constants";

const InsuranceCard = ({ poolId }: { poolId: number }) => {

	const poolInfo = poolIdToPoolInfo.get(poolId) as PoolInfo;
	const {
		data,
		isLoading,
		isSuccess,
		error,
		refetch
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
			},
			{
				address: poolInfo.address,
				abi: poolInfo.abi,
				functionName: "totalLiquidity"
			},
			{
				address: poolInfo.address,
				abi: poolInfo.abi,
				functionName: "totalLocked"
			}
		]
	});
	const govTokenApr = Number(data?.[0]?.result) / 100;
	const aavePoolApr = ((Number(data?.[1]?.result) / 1e27) * 100).toFixed(2);
	const totalLiquidity = Number(data?.[2]?.result) / (10**poolInfo.assetDecimals);
	const totalLocked = Number(data?.[3]?.result) / (10**poolInfo.assetDecimals);
	const progress = (totalLocked / totalLiquidity) * 100;

	return (
		<Card className="w-full max-w-sm shadow-md hover:shadow-xl transition-shadow duration-100">
      <CardHeader>
        <CardTitle className="text-2xl">{poolInfo.name}</CardTitle>
      </CardHeader>
      <CardContent>
				<div className="mb-5 space-y-4">
					<h1 className="text-xl font-bold mb-2">APR</h1>
					{isLoading && (
						<Skeleton className="h-[20px] w-[150px] rounded-full" />
					)}
					{error && (
						<div className="text-red-500">Looks like there is a mistake...</div>
					)}
					{isSuccess && (
						<div>{aavePoolApr} % {poolInfo.assetSymbol} + {govTokenApr?.toString()} % $BEE</div>
					)}
				</div>
				<div className=" mb-5 space-y-4">
					<h1 className="text-xl font-bold mb-2">Coverage Liquidity</h1>
					{isLoading && (
						<Skeleton className="h-[20px] w-[200px] rounded-full" />
					)}
					{error && (
						<div className="text-red-500">Looks like there is a mistake...</div>
					)}
					{isSuccess && (
						<div>{totalLocked?.toString()} / {totalLiquidity?.toString()} {poolInfo.assetSymbol}</div>
					)}
					<Progress value={progress} className="bg-gray-200 [&>div]:bg-yellow-300" />
				</div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="flex-1 bg-black">
          <Link href={`/insurer?poolId=${poolId}`}>Provide Liquidity</Link>
        </Button>
        <Button className="flex-1 bg-black">
          <Link href={`/insuree?poolId=${poolId}`}>Get Coverage</Link>
        </Button>
      </CardFooter>
    </Card>
	);
}

export default InsuranceCard;