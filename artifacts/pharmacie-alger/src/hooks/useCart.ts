import { useState, useCallback, useEffect } from "react";
import { cartGet, cartAdd, cartRemove, type LocalCart } from "@/lib/localCart";
import { getSessionId } from "@/lib/cart";

const CART_EVENT = "gpa:cart:update";

function emit() {
  window.dispatchEvent(new Event(CART_EVENT));
}

export function useCart(): LocalCart {
  const sessionId = getSessionId();
  const [cart, setCart] = useState<LocalCart>(() => cartGet(sessionId));

  useEffect(() => {
    const refresh = () => setCart(cartGet(sessionId));
    window.addEventListener(CART_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(CART_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [sessionId]);

  return cart;
}

export function useAddToCart() {
  const sessionId = getSessionId();
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback(
    (
      payload: {
        productId: number;
        quantity: number;
        productName: string;
        productImageUrl: string | null;
        pole: string;
        price: number;
      }
    ) => {
      setIsPending(true);
      cartAdd(sessionId, payload.productId, payload.quantity, {
        productName: payload.productName,
        productImageUrl: payload.productImageUrl,
        pole: payload.pole,
        price: payload.price,
      });
      emit();
      setIsPending(false);
    },
    [sessionId]
  );

  return { mutate, isPending };
}

export function useRemoveFromCart() {
  const mutate = useCallback((itemId: number) => {
    cartRemove(itemId);
    emit();
  }, []);

  return { mutate };
}
