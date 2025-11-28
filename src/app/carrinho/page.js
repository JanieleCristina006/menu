"use client";

import React, { useContext, useState } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import CheckoutModal from "./CheckoutModal";
import { CarrinhoContexto } from "@/context/CartContext";
import LoadingSpinner from "@/components/Loading";

const Carrinhopage = () => {
  const { itensCarrinho, removerProduto, alterarQuantidade } = useContext(CarrinhoContexto);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // estado de loading

  const total = itensCarrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
  const quantidadeTotal = itensCarrinho.reduce((sum, item) => sum + item.quantidade, 0);

  // função wrapper para alterar quantidade com loading
  const handleAlterarQuantidade = async (id, valor) => {
    setLoading(true);
    await alterarQuantidade(id, valor);
    setLoading(false);
  };

  // função wrapper para remover produto com loading
  const handleRemoverProduto = async (id) => {
    setLoading(true);
    await removerProduto(id);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-3 min-h-screen flex flex-col bg-[#fff7f0] rounded-lg sm:p-4 relative">
      
      {loading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-50">
          <LoadingSpinner />
        </div>
      )}

      <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-[#795548] drop-shadow-sm">
        Seu Carrinho ({quantidadeTotal})
      </h1>

      {itensCarrinho.length === 0 ? (
        <p className="text-gray-500">Seu carrinho está vazio.</p>
      ) : (
        <>
          <div
            className="
              flex-1 overflow-y-auto max-h-[60vh] sm:max-h-80
              scrollbar-none
              [&::-webkit-scrollbar]:hidden
            "
          >
            <ul className="divide-y divide-gray-200">
              {itensCarrinho.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center py-3 gap-2 sm:gap-4"
                >
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-base sm:text-lg truncate">{item.nome}</h2>

                    <p className="text-pink-700 font-bold text-sm sm:text-base">
                      {item.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </p>

                    <div className="flex items-center gap-1 sm:gap-2 mt-2">
                      <button
                        onClick={() => handleAlterarQuantidade(item.id, -1)}
                        className="p-1 rounded bg-pink-100 hover:bg-pink-200"
                      >
                        <Minus size={14} className="sm:w-4 sm:h-4" color="#db2777" />
                      </button>

                      <span className="w-6 text-center font-semibold text-sm sm:text-base">
                        {item.quantidade}
                      </span>

                      <button
                        onClick={() => handleAlterarQuantidade(item.id, 1)}
                        className="p-1 rounded bg-pink-100 hover:bg-pink-200"
                      >
                        <Plus size={14} className="sm:w-4 sm:h-4" color="#db2777" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <button
                      onClick={() => handleRemoverProduto(item.id)}
                      className="text-red-500 hover:text-red-700 mb-1 sm:mb-2"
                    >
                      <Trash2 size={18} className="sm:w-5 sm:h-5" />
                    </button>

                    <p className="font-semibold text-sm sm:text-base">
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

          <div className="pt-4 mt-6 sm:mt-[150px]">
            <div className="flex justify-between items-center font-bold text-lg sm:text-xl text-pink-700 mb-4">
              <span>Total:</span>
              <span>
                {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
            </div>

            <button
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition"
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
