import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Progress } from "@/components/ui/progress";

import { poolIdToPoolName } from "@/constants";
import Link from "next/link";

const InsuranceCard = ({ poolId }: { poolId: number }) => {

	const insuranceName = poolIdToPoolName.get(poolId);

	return (
		<Card className="w-full max-w-sm shadow-md hover:shadow-xl transition-shadow duration-100">
      <CardHeader>
        <CardTitle className="text-2xl">{insuranceName}</CardTitle>
      </CardHeader>
      <CardContent>
				<div className="mb-5 space-y-4">
					<h1 className="text-xl font-bold mb-2">APR</h1>
					<p>3.6 % + 5 % $BEE</p>
				</div>
				<div className=" mb-5 space-y-4">
					<h1 className="text-xl font-bold mb-2">Coverage Liquidity</h1>
					<p>50 000 / 120 000 USDC</p>
					<Progress value={42} className="bg-gray-200 [&>div]:bg-yellow-300" />
				</div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="flex-1 bg-black">
          <Link href={`/insurer?poolId=${poolId}`}>Provide Liquidity</Link>
        </Button>
        <Button className="flex-1 bg-black">
          <Link href={`/insuree?poolId=${poolId}`}>Get Coverage</Link>
        </Button>
      </CardFooter>
    </Card>
	);
}

export default InsuranceCard;