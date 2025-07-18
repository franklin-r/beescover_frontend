import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const InsureeDetails = () => {
	return (
		<Card className="w-full max-w-sm flex flex-col">
      <CardHeader className="mb-5">
        <CardTitle className="text-2xl">Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
				<p>A USDC depeg coverage claim is valid if USDC suffers a 10% depeg for 7 consecutive days or more.</p>
        <p>To submit a claim a user must provide a proof that fulfils the conditions specific to thie cover.</p>
      </CardContent>
      <CardFooter className="justify-center">
				<Link href="">Refer to the full cover policy</Link>
      </CardFooter>
    </Card>
	);
}

export default InsureeDetails;