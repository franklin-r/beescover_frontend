import { Button } from "../ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import Image from "next/image";
import Link from "next/link";

const DappHeader = () => {
	return (
		<nav className="p-2 flex justify-between items-center bg-yellow-300">
			<div className="text-black">
				<Link href="/insurances">
					<Image
						className="logo"
						src="/BeesCoverLogo.svg"
						alt="BeesCover Logo"
						width={180}
						height={38}
						priority
					/>
				</Link>
			</div>
			<div className="flex justify-between items-center w-1/3 gap-6">
				<Button className="flex-1 bg-black text-yellow-300 text-lg px-3 py-3">
					<Link href="/dashboard">Dashboard</Link>
				</Button>
				<Button className="flex-1 bg-black text-yellow-300 text-lg px-3 py-3">
					<Link href="">Docs</Link>
				</Button>
				<Button className="flex-1 bg-black text-yellow-300 text-lg px-3 py-3">
					<Link href="https://www.tally.xyz/gov/beescover-dao">DAO</Link>
				</Button>
			</div>
			<ConnectButton />
		</nav>
	);
}

export default DappHeader;