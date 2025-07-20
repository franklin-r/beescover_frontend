"use client";

import Withdrawal from "@/components/shared/Withdrawal";
import { useSearchParams } from "next/navigation";


const page = () => {
	const searchParams = useSearchParams();
	const poolId = searchParams.get("poolId");

	return (
		<>
			<div className="flex gap-15 justify-center">
				<Withdrawal poolId={Number(poolId)} />
			</div>
		</>
	);
}

export default page;