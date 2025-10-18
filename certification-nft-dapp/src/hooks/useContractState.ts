import { useTonAddress } from "@tonconnect/ui-react";
import { useCallback, useEffect, useState } from "react";
import { contractService } from "@/lib/contract/contractService";
import { addressesEqual } from "@/lib/utils/address";
import { ADMIN_WALLET_ADDRESS } from "@/lib/constants";
import type { ContractState } from "@/types";

export const useContractState = () => {
  const userAddress = useTonAddress();
  const [state, setState] = useState<ContractState | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchState = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const contractState = await contractService.getState();
      setState(contractState);

      if (userAddress) {
        const owner = addressesEqual(userAddress, contractState.owner);
        setIsOwner(owner);

        const admin = await contractService.isAdmin(userAddress);
        // Check if user is the hardcoded admin wallet
        const isHardcodedAdmin = addressesEqual(
          userAddress,
          ADMIN_WALLET_ADDRESS,
        );
        setIsAdmin(admin || owner || isHardcodedAdmin);
      } else {
        setIsOwner(false);
        setIsAdmin(false);
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to fetch contract state";
      setError(errorMsg);
      console.error("Contract state error:", err);
    } finally {
      setLoading(false);
    }
  }, [userAddress]);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  return {
    state,
    isOwner,
    isAdmin,
    loading,
    error,
    refetch: fetchState,
  };
};
