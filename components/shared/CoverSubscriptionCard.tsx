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
import { Slider } from "../ui/slider";

import { useState } from "react";

import { poolIdToPoolName } from "@/constants";

const CoverSubscriptionCard = ({ poolId }: { poolId: number }) => {
	const insuranceName = poolIdToPoolName.get(poolId);
	const [approved, setApproved] = useState<boolean>(false);
	const [amount, setAmount] = useState<string>("");
	const [duration, setDuration] = useState<number>(1);


	return (
		<Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
					<p className="text-lg">Listing</p>
					<p>{insuranceName}</p>
				</div>
				<div className="space-y-4">
					<div className="flex justify-between">
						<p className="text-lg">Cover Amount</p>
						<p>Max: 100 000 USDC</p>
					</div>
					<Input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
				</div>
				<div className="space-y-4">
					<div className="flex justify-between">
						<p className="text-lg">Cover Duration</p>
						<p>{duration} days</p>
					</div>
					<Slider
						defaultValue={[1]}
						min={1}
						max={365}
						step={1}
						onValueChange={(val) => setDuration(val[0])}
					/>
				</div>
				<div className="flex justify-between">
					<p className="text-lg">Premium</p>
					<p>20 USDC</p>
				</div>
      </CardContent>
      <CardFooter className="justify-center">
				{!approved ? (
					<Button className="bg-black">Approve</Button>
				) : (
					<Button className="bg-black">Get Covered</Button>
				)}
      </CardFooter>
    </Card>
	)
}

export default CoverSubscriptionCard