"use client";

import { useSearchParams } from "next/navigation";

import LiquidityProvidingCard from "@/components/shared/LiquidityProvidingCard";

const page = () => {
	const searchParams = useSearchParams();
	const poolId = searchParams.get("poolId");

	return (
		<>
			<LiquidityProvidingCard poolId={Number(poolId)} />
		</>
	);
}

export default page;