import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCart, removeFromCart } from "../services/cartService";

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
