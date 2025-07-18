import InsurerDashboard from "@/components/shared/InsurerDashboard";
import InsureeDashboard from "@/components/shared/InsureeDashboard";

const page = () => {
	return (
		<>
			<div className="flex min-h-screen">
				<div className="w-1/2 flex justify-center items-start pt-10">
					<div className="w-full max-w-2xl px-4">
						<InsurerDashboard />
					</div>
				</div>
				<div className="w-1/2 flex justify-center items-start pt-10">
					<div className="w-full max-w-2xl px-4">
						<InsureeDashboard />
					</div>
				</div>
			</div>
		</>
	);
}

export default page;