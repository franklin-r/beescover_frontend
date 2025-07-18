import InsureePositionCard from "@/components/shared/InsureePositionCard";
import InsurerDashboard from "@/components/shared/InsurerDashboard";

const page = () => {
	return (
		<>
			<div className="flex justify-between">
				<InsurerDashboard />
				<InsureePositionCard />
			</div>
		</>
	);
}

export default page;