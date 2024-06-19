import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.categories[":id"]["$patch"]>["json"];

export const useEditCategory = (id?: string) => {
  const queryCLient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories[":id"]["$patch"]({ 
        json,
        param: { id }
       });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Category updated");
      queryCLient.invalidateQueries({ queryKey: ["category", { id }] });
      queryCLient.invalidateQueries({ queryKey: ["categories"] });
      // TODO
    },
    onError: () => {
      toast.error("Failed to edit category");
    },
  });

  return mutation;
};
