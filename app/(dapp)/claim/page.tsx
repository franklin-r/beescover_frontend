import { Suspense } from "react";

import Claim from "@/components/shared/Claim";

const page = () => {

	return (
		<>
			<Suspense>
				<div className="flex gap-15 justify-center">
					<Claim />
				</div>
			</Suspense>
		</>
	);
}

export default page;