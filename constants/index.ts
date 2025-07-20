import { eursAbi, eursAddress } from "./eurs";
import { usdcAbi, usdcAddress } from "./usdc";
import { usdcInsurancePoolAbi, usdcInsurancePoolAddress, usdcInsurancePoolAdmin } from "./usdcInsurancePool";
import { usdtAbi, usdtAddress } from "./usdt";
import { wbtcAbi, wbtcAddress } from "./wbtc";
import { wbtcInsurancePoolAbi, wbtcInsurancePoolAddress, wbtcInsurancePoolAdmin } from "./wbtcInsurancePool";

export type PoolInfo = {
	name: string;
	address: `0x${string}`;
	admin: string;
	abi: any[];
	assetAddress: `0x${string}`;
	assetSymbol: string;
	assetDecimals: number;
	assetAbi: any[];
	policy: string;
}

const usdcPool: PoolInfo = {
	name: "USDC Depeg",
	address: usdcInsurancePoolAddress,
	admin: usdcInsurancePoolAdmin,
	abi: usdcInsurancePoolAbi,
	assetAddress: usdcAddress,
	assetSymbol: "USDC",
	assetDecimals: 6,
	assetAbi: usdcAbi,
	policy: "https://bafkreigjksvanqwj227hceogbwxhkc4olyt225nrq7r3yogsa2bnppwyxi.ipfs.dweb.link/"
}
const wbtcPool: PoolInfo = {
	name: "WBTC Depeg",
	address: wbtcInsurancePoolAddress,
	admin: wbtcInsurancePoolAdmin,
	abi: wbtcInsurancePoolAbi,
	assetAddress: wbtcAddress,
	assetSymbol: "WBTC",
	assetDecimals: 8,
	assetAbi: wbtcAbi,
	policy: "https://bafkreigmu3s56w6lwxum4ps5muxobifemulmbtitb3f3z7f23te3jmlx3m.ipfs.dweb.link/"
}
const eursPool: PoolInfo = {
	name: "EURS Depeg",
	address: usdcInsurancePoolAddress,
	admin: usdcInsurancePoolAdmin,
	abi: usdcInsurancePoolAbi,
	assetAddress: eursAddress,
	assetSymbol: "EURS",
	assetDecimals: 2,
	assetAbi: eursAbi,
	policy: "https://bafkreidjt643cfeduq3lkfb66lhqpymo4dbfhi3l3kgqwxzlsu3r3xyjhi.ipfs.dweb.link/"
}
const usdtPool: PoolInfo = {
	name: "USDT Depeg",
	address: usdcInsurancePoolAddress,
	admin: usdcInsurancePoolAdmin,
	abi: usdcInsurancePoolAbi,
	assetAddress: usdtAddress,
	assetSymbol: "USDT",
	assetDecimals: 6,
	assetAbi: usdtAbi,
	policy: "https://bafkreigevjrhjw5aiorpijqrge6pwlmcgbdupdkfrq5qqflcsh7beijmny.ipfs.dweb.link/"
}

export let poolIdToPoolInfo = new Map<number, PoolInfo>();
poolIdToPoolInfo.set(0, usdcPool);
poolIdToPoolInfo.set(1, wbtcPool);
poolIdToPoolInfo.set(2, eursPool);
poolIdToPoolInfo.set(3, usdtPool);