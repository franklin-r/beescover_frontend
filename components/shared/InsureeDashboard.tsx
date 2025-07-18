import InsureePositionCard from "./InsureePositionCard";

const InsureeDashboard = () => {
	// Display variable amount of positions
	return (
		<>
			<div className="w-full space-y-6">
				<h1 className="text-3xl font-bold text-center">Insuree Dashboard</h1>
				<InsureePositionCard />
				<InsureePositionCard />
				<InsureePositionCard />
			</div>
		</>
	);
}

export default InsureeDashboard;