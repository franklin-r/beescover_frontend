import { usdcInsurancePoolAbi, usdcInsurancePoolAddress, usdcInsurancePoolAdmin } from "./usdcInsurancePool";

export type PoolInfo = {
	name: string;
	address: `0x${string}`;
	admin: string;
	abi: any[];
	assetAddress: string;
	assetSymbol: string;
	policy: string;
}

const usdcPool: PoolInfo = {
	name: "USDC Depeg",
	address: usdcInsurancePoolAddress,
	admin: usdcInsurancePoolAdmin,
	abi: usdcInsurancePoolAbi,
	assetAddress: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
	assetSymbol: "USDC",
	policy: "https://bafkreigjksvanqwj227hceogbwxhkc4olyt225nrq7r3yogsa2bnppwyxi.ipfs.dweb.link/"
}
const wbtcPool: PoolInfo = {
	name: "WBTC Depeg",
	address: usdcInsurancePoolAddress,
	admin: usdcInsurancePoolAdmin,
	abi: usdcInsurancePoolAbi,
	assetAddress: "0x29f2D40B0605204364af54EC677bD022dA425d03",
	assetSymbol: "WBTC",
	policy: "https://bafkreigmu3s56w6lwxum4ps5muxobifemulmbtitb3f3z7f23te3jmlx3m.ipfs.dweb.link/"
}
const eursPool: PoolInfo = {
	name: "EURS Depeg",
	address: usdcInsurancePoolAddress,
	admin: usdcInsurancePoolAdmin,
	abi: usdcInsurancePoolAbi,
	assetAddress: "0x6d906e526a4e2Ca02097BA9d0caA3c382F52278E",
	assetSymbol: "EURS",
	policy: "https://bafkreidjt643cfeduq3lkfb66lhqpymo4dbfhi3l3kgqwxzlsu3r3xyjhi.ipfs.dweb.link/"
}
const usdtPool: PoolInfo = {
	name: "USDT Depeg",
	address: usdcInsurancePoolAddress,
	admin: usdcInsurancePoolAdmin,
	abi: usdcInsurancePoolAbi,
	assetAddress: "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0",
	assetSymbol: "USDT",
	policy: "https://bafkreigevjrhjw5aiorpijqrge6pwlmcgbdupdkfrq5qqflcsh7beijmny.ipfs.dweb.link/"
}

export let poolIdToPoolInfo = new Map<number, PoolInfo>();
poolIdToPoolInfo.set(0, usdcPool);
poolIdToPoolInfo.set(1, wbtcPool);
poolIdToPoolInfo.set(2, eursPool);
poolIdToPoolInfo.set(3, usdtPool);