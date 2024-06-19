import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>;

export const useDeleteCategory = (id?: string) => {
  const queryCLient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.categories[":id"]["$delete"]({ 
        param: { id }
       });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Category deleted");
      queryCLient.invalidateQueries({ queryKey: ["category", { id }] });
      queryCLient.invalidateQueries({ queryKey: ["categories"] });
      // TODO
    },
    onError: () => {
      toast.error("Failed to delete category");
    },
  });

  return mutation;
}