"use client";
import { BottomTabMenu } from "@/components/BottomTabMenu";
import { useCarrinho } from "@/context/CartContext";

export const BottomTabMenuWrapper = () => {
  const { totalItens } = useCarrinho();
   console.log("Total itens no carrinho:", totalItens);
  return <BottomTabMenu cartCount={totalItens} />;
};
