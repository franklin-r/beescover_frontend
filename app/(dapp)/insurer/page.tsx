import { Suspense } from "react";

import LiquidityProvidingCard from "@/components/shared/LiquidityProvidingCard";
import InsurerDetails from "@/components/shared/InsurerDetails";

const page = () => {

	return (
		<>
			<Suspense>
				<div className="flex gap-15 justify-center">
					<InsurerDetails />
					<LiquidityProvidingCard />
				</div>
			</Suspense>
		</>
	);
}

export default page;