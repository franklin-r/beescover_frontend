import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { Button } from "../ui/button";

const InsureePositionCard = () => {
	return (
		<Card className="w-full shadow-md hover:shadow-xl transition-shadow duration-100">
			<CardHeader>
				<CardTitle className="text-2xl">USDC Depeg</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex justify-between">
					<p className="text-lg">Cover Amount</p>
					<p>12 345 USDC</p>
				</div>
				<div className="flex justify-between">
					<p className="text-lg">Cover Duration</p>
					<p>60 days</p>
				</div>
			</CardContent>
			<CardFooter className="flex gap-2">
				<Button className="flex-1 bg-black">
          <Link href="">View Pool</Link>
        </Button>
        <Button className="flex-1 bg-black">
          <Link href="">Submit Claim</Link>
        </Button>
			</CardFooter>
		</Card>
	);
}

export default InsureePositionCard;