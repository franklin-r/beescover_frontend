import LiquidityProvidingCard from "@/components/shared/LiquidityProvidingCard";
import InsurerDetails from "@/components/shared/InsurerDetails";

const page = () => {

	return (
		<>
			<div className="flex gap-15 justify-center">
				<InsurerDetails />
				<LiquidityProvidingCard />
			</div>
		</>
	);
}

export default page;