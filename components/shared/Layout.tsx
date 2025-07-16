import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="relative min-h-screen overflow-hidden">
			<img
				src="/beescover_home_bg.png"
				alt="BeesCover Background"
				className="fixed top-0 left-0 w-screen h-screen object-cover z-0"
			/>
			<div className="relative z-20 flex flex-col min-h-screen">
				<HomeHeader />
				<main className="flex-grow p-5">
					{children}
				</main>
				<HomeFooter />
			</div>
		</div>
	);
}

export default Layout;