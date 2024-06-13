import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$delete"]>;

export const useDeleteAccount = (id?: string) => {
  const queryCLient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.accounts[":id"]["$delete"]({ 
        param: { id }
       });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Account deleted");
      queryCLient.invalidateQueries({ queryKey: ["accounts", { id }] });
      queryCLient.invalidateQueries({ queryKey: ["accounts"] });
      // TODO
    },
    onError: () => {
      toast.error("Failed to delete account");
    },
  });

  return mutation;
}