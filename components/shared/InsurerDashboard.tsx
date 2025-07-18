import InsurerPositionCard from "./InsurerPositionCard";

const InsurerDashboard = () => {
	// Display variable amount of positions
	return (
		<>
			<div className="space-y-6 w-full">
				<h1 className="text-3xl font-bold text-center">Insurer Dashboard</h1>
				<InsurerPositionCard />
				<InsurerPositionCard />
			</div>
		</>
	);
}

export default InsurerDashboard;