"use client";

import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { coverageProofAbi, coverageProofAddress } from "@/constants/coverageProof";
import InsureePositionCard from "./InsureePositionCard";
import { Skeleton } from "../ui/skeleton";

const InsureeDashboard = () => {
  const { address, isConnected } = useAccount();

  // Étape 1 : balanceOf
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

  // Étape 2 : tokenOfOwnerByIndex (multi-call)
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
		functionName: "getCoverageInfos",
		args: [tokenId],
    query: {
      enabled: tokenIdSuccess
    },
  });

	console.log(`coverageInfos: ${coverageInfos}`);

  return (
    <div className="space-y-6 w-full">
      <h1 className="text-3xl font-bold text-center">Insuree Dashboard</h1>

      {(balanceLoading || tokenIdLoading || infosLoading) && (
        <Skeleton className="h-[250px] w-[590px]" />
      )}

      {(balanceError || tokenIdError || infosError) && (
        <div className="text-red-500">Something went wrong loading your positions.</div>
      )}

      {infosSuccess && (
				<InsureePositionCard
					tokenId={tokenId?.toString()}
					coverageInfo={coverageInfos as [bigint, bigint, bigint, bigint]}
				/>
			)}
    </div>
  );
};

export default InsureeDashboard;