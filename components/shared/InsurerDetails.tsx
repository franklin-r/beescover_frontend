"use client";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import { useSearchParams } from "next/navigation";

import { poolIdToPoolInfo, PoolInfo } from "@/constants";

const InsurerDetails = () => {
	const searchParams = useSearchParams();
	const poolId = searchParams.get("poolId");
	const poolInfo = poolIdToPoolInfo.get(Number(poolId)) as PoolInfo;

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Details</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4 mb-10">
				<p>
					By providing liquidity to this pool, you acknowledge that your funds 
					may be partially or fully used to compensate insured users in the 
					event of a validated claim.
				</p>
				<p>
					Participating in a decentralized insurance pool involves risk, 
					including but not limited to claim frequency, protocol governance 
					decisions, and arbitration outcomes. Make sure you fully understand 
					the implications before committing your funds.</p>
			</CardContent>
			<CardFooter className="justify-center">
				<Link href={poolInfo.policy} className="hover:underline">Refer to the full cover policy</Link>
			</CardFooter>
		</Card>
	);
}

export default InsurerDetails;