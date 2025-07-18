"use client";

import { useSearchParams } from "next/navigation";

import LiquidityProvidingCard from "@/components/shared/LiquidityProvidingCard";
import InsurerDetails from "@/components/shared/InsurerDetails";

const page = () => {
	const searchParams = useSearchParams();
	const poolId = searchParams.get("poolId");

	return (
		<>
			<div className="flex gap-15 justify-center">
				<InsurerDetails />
				<LiquidityProvidingCard poolId={Number(poolId)} />
			</div>
		</>
	);
}

export default page;