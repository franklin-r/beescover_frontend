import CoverSubscriptionCard from "@/components/shared/CoverSubscriptionCard";
import InsureeDetails from "@/components/shared/InsureeDetails";

const page = () => {

	return (
		<>
			<div className="flex gap-15 justify-center">
				<InsureeDetails />
				<CoverSubscriptionCard />
			</div>
		</>
	);
}

export default page;