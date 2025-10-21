"use client";

import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const CarrinhoContexto = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [itensCarrinho, setItensCarrinho] = useState([]);

  const adicionarProduto = (produto) => {
    // Verifica se já existe no carrinho
    const existe = itensCarrinho.find((item) => item.id === produto.id);

    // Atualiza o estado
    setItensCarrinho((prev) => {
      if (existe) {
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + produto.quantidade }
            : item
        );
      }
      return [...prev, produto];
    });

    // Dispara o toast fora do setState
    if (existe) {
      toast.success("Quantidade atualizada no carrinho!");
    } else {
      toast.success("Produto adicionado ao carrinho!");
    }
  };

  const removerProduto = (id) => {
    setItensCarrinho((prev) => prev.filter((item) => item.id !== id));
    toast("Produto removido do carrinho.");
  };

  const alterarQuantidade = (id, delta) => {
    setItensCarrinho((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: Math.max(1, item.quantidade + delta) }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  const limparCarrinho = () => {
    setItensCarrinho([]);
    toast("Carrinho limpo!");
  };

  console.log("Renderizou CarrinhoProvider");

  return (
    <CarrinhoContexto.Provider
      value={{
        itensCarrinho,
        adicionarProduto,
        removerProduto,
        alterarQuantidade,
        limparCarrinho,
      }}
    >
      {children}
    </CarrinhoContexto.Provider>
  );
};
