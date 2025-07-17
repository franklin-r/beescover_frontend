"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { useState } from "react";

import { poolIdToPoolName } from "@/constants";

const LiquidityProvidingCard = ({ poolId }: { poolId: number }) => {
	const insuranceName = poolIdToPoolName.get(poolId);
	const [approved, setApproved] = useState<boolean>(false);
	const [amount, setAmount] = useState<string>("");

	return (
		<Card className="w-full max-w-sm flex flex-col">
      <CardHeader className="mb-5">
        <CardTitle className="text-2xl">Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 flex-grow">
        <div className="flex justify-between">
					<p className="text-lg">Listing</p>
					<p>{insuranceName}</p>
				</div>
				<div className="flex justify-between">
					<p className="text-lg">APR</p>
					<p>3.6 % + 5 % $BEE</p>
				</div>
				<div className="space-y-4">
					<p className="text-lg">Liquidity Provision</p>
					<Input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
				</div>
      </CardContent>
      <CardFooter className="justify-center">
				{!approved ? (
					<Button className="bg-black">Approve</Button>
				) : (
					<Button className="bg-black">Provide Liquidity</Button>
				)}
      </CardFooter>
    </Card>
	);
}

export default LiquidityProvidingCard;