"use client";

import { useSearchParams } from "next/navigation";

import CoverSubscriptionCard from "@/components/shared/CoverSubscriptionCard";
import InsureeDetails from "@/components/shared/InsureeDetails";

const page = () => {
	const searchParams = useSearchParams();
	const poolId = searchParams.get("poolId");

	return (
		<>
			<div className="flex gap-15 justify-center">
				<InsureeDetails poolId={Number(poolId)} />
				<CoverSubscriptionCard poolId={Number(poolId)} />
			</div>
		</>
	);
}

export default page;