import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

import Link from "next/link";

const InsurerPositionCard = () => {
	return (
		<Card className="w-full shadow-md hover:shadow-xl transition-shadow duration-100">
      <CardHeader>
        <CardTitle className="text-2xl">USDC Depeg</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
				<div className="flex justify-between">
					<p className="text-lg">LP Tokens</p>
					<p>12 345 LP Tokens</p>
				</div>
				<div className="flex justify-between">
					<p className="text-lg">APR</p>
					<p>3.45 % + 5 % $BEE</p>
				</div>
      </CardContent>
      <CardFooter className="justify-center">
				<Button className="bg-black">
					<Link href="">View Pool</Link>
				</Button>
      </CardFooter>
    </Card>
	);
}

export default InsurerPositionCard;