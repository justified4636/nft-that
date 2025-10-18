export const CONTRACT_ADDRESS =
  "EQCrW7jM-oELrLMwDRzAoZuaMcqbtoWASmtpsPOrfUm0lETv";
export const MAX_SUPPLY = 10000n;
export const TESTNET_ENDPOINT = "https://testnet.toncenter.com/api/v2/jsonRPC";

// Hardcoded admin wallet address
export const ADMIN_WALLET_ADDRESS =
  "0QA52Z74azAeTyf29Uav85RUMKyFs7460wMS2lYy1KGA2haP";

export const TX_CONFIG = {
  validUntil: 600, // 10 minutes
  mintValue: "0.05",
  addAdminValue: "0.05",
} as const;

export const OPCODES = {
  MINT: 2415581732,
  ADD_ADMIN: 3599441591,
} as const;
