import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

const HomeHeader = () => {
	return (
		<nav className="p-5 flex justify-between items-center">
			<div className="text-black">
				<Image
					className="logo"
					src="/BeesCoverLogoWhite.svg"
					alt="BeesCover Logo"
					width={180}
					height={38}
					priority
				/>
			</div>
			<div className="flex justify-between items-center w-1/6">
				<Button className="bg-black text-white text-lg px-6 py-3">
					<Link href="">Docs</Link>
				</Button>
				<Button className="bg-black text-white text-lg px-6 py-3">
					<Link href="">DAO</Link>
				</Button>
			</div>
			<div>
				<Button className="bg-black text-white text-lg px-6 py-3">
					<Link href="/insurances">Open App</Link>
				</Button>
			</div>
		</nav>
	);
}

export default HomeHeader;