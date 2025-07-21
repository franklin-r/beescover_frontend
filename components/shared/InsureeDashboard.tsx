"use client";

import { useAccount, useReadContract } from "wagmi";
import { coverageProofAbi, coverageProofAddress } from "@/constants/coverageProof";
import InsureePositionCard from "./InsureePositionCard";
import { Skeleton } from "../ui/skeleton";

const InsureeDashboard = () => {
  const { address, isConnected } = useAccount();

  const {
    data: nftBalanceRaw,
    isLoading: balanceLoading,
    isSuccess: balanceSuccess,
    error: balanceError,
  } = useReadContract({
    address: coverageProofAddress,
    abi: coverageProofAbi,
    functionName: "balanceOf",
    args: [address!],
    query: {
      enabled: isConnected && !!address,
    },
  });

  const nftBalance = Number(nftBalanceRaw || 0);

  const {
    data: tokenId,
    isLoading: tokenIdLoading,
    isSuccess: tokenIdSuccess,
    error: tokenIdError,
  } = useReadContract({
    address: coverageProofAddress,
		abi: coverageProofAbi,
		functionName: "tokenOfOwnerByIndex",
		args: [address!, 0n],
    query: {
      enabled: balanceSuccess && nftBalance > 0,
    },
  });

  const {
    data: coverageInfos,
    isLoading: infosLoading,
    isSuccess: infosSuccess,
    error: infosError,
  } = useReadContract({
		address: coverageProofAddress,
		abi: coverageProofAbi,
		functionName: "coverageInfos",
		args: [tokenId],
    query: {
      enabled: tokenIdSuccess
    },
  });

	const arrayInfo = coverageInfos as any[];

  return (
    <div className="space-y-6 w-full">
      <h1 className="text-3xl font-bold text-center">Insuree Dashboard</h1>

      {(balanceLoading || tokenIdLoading || infosLoading) && (
        <Skeleton className="h-[250px] w-[590px]" />
      )}

      {(balanceError || tokenIdError || infosError) && (
        <div className="text-red-500">Something went wrong loading your positions.</div>
      )}

      {infosSuccess && !!coverageInfos && (
				<InsureePositionCard
					tokenId={tokenId?.toString()}
					coverageInfo={arrayInfo}
				/>
			)}
    </div>
  );
};

export default InsureeDashboard;