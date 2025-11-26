"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";

export const CarrinhoContexto = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [itensCarrinho, setItensCarrinho] = useState([]);

  // Carregar do localStorage ao iniciar
  useEffect(() => {
    const salvo = localStorage.getItem("carrinho");
    if (salvo) {
      try {
        setItensCarrinho(JSON.parse(salvo));
      } catch {
        console.error("Erro ao carregar carrinho do localStorage");
      }
    }
  }, []);

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itensCarrinho));
  }, [itensCarrinho]);


  const adicionarProduto = (produto) => {
    setItensCarrinho((prev) => {
      const existe = prev.find((item) => item.id === produto.id);

      if (existe) {
        toast.success("Quantidade atualizada no carrinho!");
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + produto.quantidade }
            : item
        );
      }

      toast.success("Produto adicionado ao carrinho!");
      return [...prev, produto];
    });
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

  const totalItens = itensCarrinho.reduce(
    (acc, item) => acc + item.quantidade,
    0
  );

  return (
    <CarrinhoContexto.Provider
      value={{
        itensCarrinho,
        adicionarProduto,
        removerProduto,
        alterarQuantidade,
        limparCarrinho,
        totalItens,
      }}
    >
      {children}
    </CarrinhoContexto.Provider>
  );
};

export const useCarrinho = () => {
  const context = useContext(CarrinhoContexto);
  if (!context) {
    throw new Error("useCarrinho deve ser usado dentro de um CarrinhoProvider");
  }
  return context;
};
