"use client";

import { useSearchParams } from "next/navigation";

import CoverSubscriptionCard from "@/components/shared/CoverSubscriptionCard";

const page = () => {
	const searchParams = useSearchParams();
	const poolId = searchParams.get("poolId");

	return (
		<>
			<CoverSubscriptionCard poolId={Number(poolId)} />
		</>
	);
}

export default page;