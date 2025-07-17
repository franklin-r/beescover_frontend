import InsuranceCard from "@/components/shared/InsuranceCard";

const page = () => {
	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<InsuranceCard poolId={0} />
				<InsuranceCard poolId={1} />
				<InsuranceCard poolId={2} />
				<InsuranceCard poolId={3} />
			</div>
		</>
	);
}

export default page;