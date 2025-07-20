"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

import Link from "next/link";

import { poolIdToPoolInfo, PoolInfo } from "@/constants";

import { useAccount, useReadContracts } from "wagmi";
import { Skeleton } from "../ui/skeleton";

const InsurerPositionCard = ({ poolId }: { poolId: number }) => {
	const poolInfo = poolIdToPoolInfo.get(poolId) as PoolInfo;
	const {address} = useAccount();

	const {
		data,
		isLoading,
		isSuccess,
		error
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
				address: poolInfo.lpTokenAddress,
				abi: poolInfo.lpTokenAbi,
				functionName: "balanceOf",
				args: [address!]
			}
		],
		query: {
			enabled: !!address
		}
	});
	const govTokenApr = Number(data?.[0]?.result) / 100;
	const aavePoolApr = ((Number(data?.[1]?.result) / 1e27) * 100).toFixed(2);
	const lpBalance = Number(data?.[2]?.result) / (10**poolInfo.lpTokenDecimals);

	return (
		<Card className="w-full shadow-md hover:shadow-xl transition-shadow duration-100">
      <CardHeader>
        <CardTitle className="text-2xl">{poolInfo.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
				<div className="flex justify-between">
					<p className="text-lg">LP Tokens</p>
					{isLoading && (
						<Skeleton className="h-[20px] w-[150px] rounded-full" />
					)}
					{error && (
						<div className="text-red-500">Looks like there is a mistake...</div>
					)}
					{isSuccess && (
						<p>{lpBalance} {poolInfo.lpTokenSymbol}</p>
					)}

				</div>
				<div className="flex justify-between">
					<p className="text-lg">APR</p>
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
      </CardContent>
      <CardFooter className="flex gap-2">
				<Button className="flex-1 bg-black">
					<Link href={`/insurer?poolId=${poolId}`}>View Pool</Link>
        </Button>
        <Button className="flex-1 bg-black">
          <Link href="">Withdraw</Link>
        </Button>
			</CardFooter>
    </Card>
	);
}

export default InsurerPositionCard;