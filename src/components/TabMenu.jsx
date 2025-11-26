"use client";

import React, { useState, useContext, useEffect } from "react";
import { Candy, Coffee, Sandwich, Shapes, ShoppingCart } from "lucide-react";

import { CarrinhoContexto } from "../context/CartContext";

const PINK = "#F9B8D4";
const DARK_BROWN = "#813717";
const LIGHT_BROWN = "#A47149";
const CARD_BG = "#FFF1F5";

const IconesCategorias = {
  doces: Candy,
  salgados: Sandwich,
  bebidas: Coffee,
  outros: Shapes,
};

function DescricaoProduto({ texto }) {
  const [expandido, setExpandido] = useState(false);
  const limite = 70;

  const textoExibido =
    expandido || texto.length <= limite
      ? texto
      : texto.slice(0, limite) + "...";

  return (
    <div>
      <p className="text-[15px] mb-2" style={{ color: LIGHT_BROWN }}>
        {textoExibido}
      </p>

      {texto.length > limite && (
        <button
          onClick={() => setExpandido(!expandido)}
          className="text-pink-600 cursor-pointer font-semibold text-sm hover:underline transition"
        >
          {expandido ? "Ver menos" : "Ver mais"}
        </button>
      )}
    </div>
  );
}

export const TabMenu = ({ produtos, busca }) => {
  const [active, setActive] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [categorias, setCategorias] = useState([]);

  const { adicionarProduto } = useContext(CarrinhoContexto);

  useEffect(() => {
    if (produtos.length > 0) {
      const cats = [...new Set(produtos.map((i) => i.categoria))];
      setCategorias(cats);
    }
  }, [produtos]);

  const categoriaAtiva = categorias[active] || null;
  const textoBusca = busca?.toLowerCase() || "";

  const itensFiltrados = produtos
    .filter((item) =>
      categoriaAtiva ? item.categoria === categoriaAtiva : true
    )
    .filter((item) => item.nome.toLowerCase().includes(textoBusca));

  function handleQuantityChange(id, delta) {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  }

  return (
    <div className="w-full pt-4 pb-24 mb-5">
      <nav className="w-full py-3">
        <ul className="flex gap-3 overflow-x-auto px-2 no-scrollbar">
          {categorias.map((tab, idx) => {
            const chave = tab.toLowerCase();
            const Icone = IconesCategorias[chave] || Candy;

            return (
              <li key={tab}>
                <button
                  onClick={() => setActive(idx)}
                  className="flex items-center gap-2 px-5 py-2 rounded-full transition font-medium text-base border-2 shadow cursor-pointer"
                  style={{
                    background: active === idx ? PINK : "#fff",
                    color: active === idx ? "#fff" : DARK_BROWN,
                    borderColor: PINK,
                    fontWeight: active === idx ? 700 : 500,
                    boxShadow:
                      active === idx
                        ? `0 4px 16px ${PINK}22`
                        : `0 2px 6px ${PINK}11`,
                  }}
                >
                  <Icone size={18} />
                  {tab}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      
      {itensFiltrados.length === 0 ? (
        <p className="text-center text-gray-600 text-lg py-10">
          Nenhum item encontrado 
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {itensFiltrados.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl shadow-xl border-2 flex flex-col h-full transition hover:-translate-y-1"
              style={{
                borderColor: PINK,
                background: CARD_BG,
                boxShadow: `0 6px 20px ${PINK}33`,
              }}
            >
              <div
                className="w-full h-44 rounded-t-2xl overflow-hidden border-b-2"
                style={{ borderColor: PINK }}
              >
                <img
                  src={item.img_url}
                  alt={item.nome}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <h3
                  className="font-bold text-lg mb-1"
                  style={{ color: DARK_BROWN }}
                >
                  {item.nome}
                </h3>

                <DescricaoProduto texto={item.descricao} />

                <p
                  className="text-base font-semibold mb-4"
                  style={{ color: DARK_BROWN }}
                >
                  {Number(item.preco).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>

                <div className="flex items-center gap-3 mt-auto">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="w-8 h-8 rounded-full border border-pink-300 bg-white font-bold text-pink-600 text-xl flex items-center justify-center hover:bg-pink-100 transition"
                  >
                    −
                  </button>

                  <span className="font-bold text-lg text-pink-700 w-8 text-center select-none">
                    {quantities[item.id] || 1}
                  </span>

                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="w-8 h-8 rounded-full border border-pink-300 bg-white font-bold text-pink-600 text-xl flex items-center justify-center hover:bg-pink-100 transition"
                  >
                    +
                  </button>

                  <button
                    onClick={() =>
                      adicionarProduto({
                        id: item.id,
                        nome: item.nome,
                        preco: item.preco,
                        quantidade: quantities[item.id] || 1,
                        imagem: item.img_url,
                      })
                    }
                    className="flex items-center gap-2 bg-pink-400 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-pink-500 transition ml-auto"
                  >
                    <ShoppingCart size={18} />
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
