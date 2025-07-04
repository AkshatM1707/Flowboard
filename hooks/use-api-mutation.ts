import { useState } from "react";
import { useMutation } from "convex/react";

export const useApiMutation = (mutationFunction: any) => {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFunction);
  
  const mutate = async (payload: any): Promise<any> => {
    setPending(true);
    
    try {
      const result = await apiMutation(payload);
      return result;
    } catch (err: any) {
      console.error("Mutation error:", err);
      
      // Re-throw with better error message for auth issues
      if (err.message?.includes("Unauthorized")) {
        throw new Error("Authentication required. Please try again.");
      }
      throw err;
    } finally {
      setPending(false);
    }
  };

  return { mutate, pending };
};
