import { Suspense } from "react";

import CoverSubscriptionCard from "@/components/shared/CoverSubscriptionCard";
import InsureeDetails from "@/components/shared/InsureeDetails";

const page = () => {

	return (
		<>
			<Suspense>
				<div className="flex gap-15 justify-center">
					<InsureeDetails />
					<CoverSubscriptionCard />
				</div>
			</Suspense>
		</>
	);
}

export default page;