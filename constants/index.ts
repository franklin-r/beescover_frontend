import { usdcInsurancePoolAbi, usdcInsurancePoolAddress, usdcInsurancePoolAdmin } from "./usdcInsurancePool";

export type PoolInfo = {
	name: string;
	address: `0x${string}`;
	admin: string;
	abi: any[];
	assetAddress: string;
	assetSymbol: string;
}

const usdcPool: PoolInfo = {
	name: "USDC Depeg",
	address: usdcInsurancePoolAddress,
	admin: usdcInsurancePoolAdmin,
	abi: usdcInsurancePoolAbi,
	assetAddress: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
	assetSymbol: "USDC"
}
const wbtcPool: PoolInfo = {
	name: "WBTC Depeg",
	address: usdcInsurancePoolAddress,
	admin: usdcInsurancePoolAdmin,
	abi: usdcInsurancePoolAbi,
	assetAddress: "0x29f2D40B0605204364af54EC677bD022dA425d03",
	assetSymbol: "WBTC"
}
const eursPool: PoolInfo = {
	name: "EURS Depeg",
	address: usdcInsurancePoolAddress,
	admin: usdcInsurancePoolAdmin,
	abi: usdcInsurancePoolAbi,
	assetAddress: "0x6d906e526a4e2Ca02097BA9d0caA3c382F52278E",
	assetSymbol: "EURS"
}
const usdtPool: PoolInfo = {
	name: "USDT Depeg",
	address: usdcInsurancePoolAddress,
	admin: usdcInsurancePoolAdmin,
	abi: usdcInsurancePoolAbi,
	assetAddress: "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0",
	assetSymbol: "USDT"
}

export let poolIdToPoolInfo = new Map<number, PoolInfo>();
poolIdToPoolInfo.set(0, usdcPool);
poolIdToPoolInfo.set(1, wbtcPool);
poolIdToPoolInfo.set(2, eursPool);
poolIdToPoolInfo.set(3, usdtPool);