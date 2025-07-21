import { Suspense } from "react";

import Withdrawal from "@/components/shared/Withdrawal";

const page = () => {

	return (
		<>
			<Suspense>
				<div className="flex gap-15 justify-center">
					<Withdrawal />
				</div>
			</Suspense>
		</>
	);
}

export default page;