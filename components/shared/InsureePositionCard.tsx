import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { Button } from "../ui/button";
import { poolIdToPoolInfo, PoolInfo } from "@/constants";
import { coverageProofAddress } from "@/constants/coverageProof";

const InsureePositionCard = ({ tokenId, coverageInfo }: { tokenId: string | unknown, coverageInfo: any[] }) => {
	const poolInfo = poolIdToPoolInfo.get(Number(coverageInfo?.[3])) as PoolInfo;
	const coverAmount = Number(coverageInfo?.[0]) / (10**poolInfo.assetDecimals);
	const coverDuration = Number(coverageInfo?.[2] - coverageInfo?.[1]) / (60 * 60 * 24);
	let coverStatus;

	switch (coverageInfo?.[4]) {
		case 0: {
			coverStatus = coverageInfo?.[2] > Math.floor(Date.now() / 1000) ? "Active" : "Expired" ;
			break
		}
		case 1: {
			coverStatus = "Claimed";
			break;
		}
		case 2: {
			coverStatus = "Paid-Out";
			break;
		}
		default: {
			coverStatus = "Expired";
			break;
		}
	}

	return (
		<Card className="w-full shadow-md hover:shadow-xl transition-shadow duration-100">
			<CardHeader>
				<CardTitle className="text-2xl">{poolInfo.name}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex justify-between">
					<p className="text-lg">Coverage Proof</p>
					<Link href={`https://sepolia.etherscan.io/token/${coverageProofAddress}?a=${tokenId}`} className="hover:underline">{`ID #${tokenId}`}</Link>
				</div>
				<div className="flex justify-between">
					<p className="text-lg">Cover Status</p>
					<p>{coverStatus}</p>
				</div>
				<div className="flex justify-between">
					<p className="text-lg">Cover Amount</p>
					<p>{coverAmount} {poolInfo.assetSymbol}</p>
				</div>
				<div className="flex justify-between">
					<p className="text-lg">Cover Duration</p>
					<p>{coverDuration} {coverDuration > 1 ? "days" : "day"}</p>
				</div>
			</CardContent>
			<CardFooter className="flex gap-2">
				<Button className="flex-1 bg-black">
          <Link href={`/insuree?poolId=${coverageInfo?.[3]}`}>View Pool</Link>
        </Button>
        <Button className="flex-1 bg-black">
					<Link href={`/claim?poolId=${coverageInfo?.[3]}&tokenId=${tokenId}`}>Make a Claim</Link>
        </Button>
			</CardFooter>
		</Card>
	);
}

export default InsureePositionCard;