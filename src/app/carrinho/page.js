"use client";

import React, { useContext, useState } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import CheckoutModal from "./CheckoutModal";
import { CarrinhoContexto } from "@/context/CartContext";

const Carrinhopage = () => {
  const { itensCarrinho, removerProduto, alterarQuantidade } = useContext(CarrinhoContexto);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const total = itensCarrinho.reduce(
    (sum, item) => sum + item.preco * item.quantidade,
    0
  );

  const quantidadeTotal = itensCarrinho.reduce(
  (sum, item) => sum + item.quantidade,
  0
);


  return (
    <div className="max-w-md mx-auto p-4 min-h-screen flex flex-col bg-[#fff7f0] rounded-lg">
      <h1 className=" text-2xl font-semibold mb-5 text-[#795548] drop-shadow-sm">Seu Carrinho({quantidadeTotal})</h1>

      {itensCarrinho.length === 0 ? (
        <p className="text-gray-500">Seu carrinho está vazio.</p>
      ) : (
        <>
         
          <div className="flex-1 overflow-y-auto max-h-80">
            <ul className="divide-y divide-gray-200">
              {itensCarrinho.map((item) => (
                <li key={item.id} className="flex items-center py-4">
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    className="w-20 h-20 rounded-lg object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg">{item.nome}</h2>
                    <p className="text-pink-700 font-bold">
                      {item.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => alterarQuantidade(item.id, -1)}
                        className="p-1 rounded cursor-pointer bg-pink-100 hover:bg-pink-200"
                        aria-label={`Diminuir quantidade de ${item.nome}`}
                      >
                        <Minus size={16} color="#db2777" />
                      </button>
                      <span className="w-6 text-center font-semibold">
                        {item.quantidade}
                      </span>
                      <button
                        onClick={() => alterarQuantidade(item.id, 1)}
                        className="p-1 rounded cursor-pointer bg-pink-100 hover:bg-pink-200"
                        aria-label={`Aumentar quantidade de ${item.nome}`}
                      >
                        <Plus size={16} color="#db2777" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <button
                      onClick={() => removerProduto(item.id)}
                      className="text-red-500 cursor-pointer hover:text-red-700 mb-2"
                      aria-label={`Remover ${item.nome} do carrinho`}
                    >
                      <Trash2 size={20} />
                    </button>
                    <p className="font-semibold">
                      {(item.preco * item.quantidade).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        
          <div className="pt-4 mt-6">
            <div className="flex justify-between items-center font-bold text-xl text-pink-700 mb-4">
              <span>Total:</span>
              <span>
                {total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
            <button
              className="w-full bg-pink-600 cursor-pointer hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition"
              onClick={() => setIsModalOpen(true)}
            >
              Finalizar Compra
            </button>
          </div>

          <CheckoutModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            cartItems={itensCarrinho}
            total={total}
          />
        </>
      )}
    </div>
  );
};

export default Carrinhopage;
