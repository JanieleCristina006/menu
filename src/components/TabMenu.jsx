"use client";

import React, { useState, useContext } from "react";
import {
  Cake,
  Coffee,
  Candy,
  Sandwich,
  Cookie,
  IceCream,
  Chocolate,
  Tea,
  ShoppingCart,
} from "lucide-react";

import { CarrinhoContexto } from "../context/CartContext";

const PINK = "#F9B8D4";
const DARK_BROWN = "#813717";
const LIGHT_BROWN = "#A47149";
const CARD_BG = "#FFF1F5";

const tabs = [
  { label: "Doces", icon: Candy },
  { label: "Bolos", icon: Cake },
  { label: "Biscoitos", icon: Cookie },
  { label: "Chocolates", icon: Chocolate },
  { label: "Sorvetes", icon: IceCream },
  { label: "Bebidas", icon: Coffee },
  { label: "Chás", icon: Tea },
  { label: "Salgados", icon: Sandwich },
  { label: "Outros", icon: Candy },
];

const DescricaoProduto = ({ texto }) => {
  const [expandido, setExpandido] = useState(false);
  const limite = 70;

  const textoExibido = expandido
    ? texto
    : texto.slice(0, limite) + (texto.length > limite ? "..." : "");

  return (
    <div>
      <p className="text-[15px] mb-2" style={{ color: LIGHT_BROWN }}>
        {textoExibido}
      </p>
      {texto.length > limite && (
        <button
          onClick={() => setExpandido(!expandido)}
          className="text-pink-600 font-semibold text-sm hover:underline mb-2 transition"
        >
          {expandido ? "Ver menos" : "Ver mais"}
        </button>
      )}
    </div>
  );
};

const menuItems = [
  {
    id: 1,
    category: "Bolos",
    name: "Bolo de Chocolate",
    price: 25,
    description: "Bolo fofinho de chocolate com cobertura cremosa",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1YcR6sKgbgNXNv-TFI84zeSpIrTMTltrEPA&s",
  },
  {
    id: 2,
    category: "Bolos",
    name: "Bolo de Cenoura",
    price: 22,
    description: "Clássico bolo de cenoura com cobertura de chocolate",
    image:
      "https://receitatodahora.com.br/wp-content/uploads/2024/08/bolo-de-cenoura-3007.jpg",
  },
  {
    id: 3,
    category: "Doces",
    name: "Brigadeiro",
    price: 3,
    description:
      "Nosso brigadeiro é feito artesanalmente com chocolate nobre e leite condensado de alta qualidade, preparado em fogo lento até atingir o ponto perfeito de cremosidade. Cada unidade é enrolada à mão e coberta com granulados belgas, garantindo sabor intenso e textura irresistível.",
    image:
      "https://tudodelicious.com/wp-content/uploads/2025/03/Brigadeiro-Gourmet-de-Cafe-1024x1024.jpeg",
  },

  {
    id: 4,
    category: "Biscoitos",
    name: "Biscoito Doce",
    price: 7,
    description:
      "Biscoitos doces artesanais, crocantes por fora e levemente macios por dentro. Feitos com ingredientes selecionados e um toque de baunilha, lembram o sabor das receitas caseiras de infância. Perfeitos para acompanhar um café fresquinho ou presentear quem você ama.",
    image:
      "https://guiadacozinha.com.br/wp-content/uploads/2018/05/Biscoito-recheado-com-doce-de-leite.webp",
  },
  
  {
  id: 5,
  category: "Chocolates",
  name: "Árvore Encantada",
  price: 3,
  description: "Delicioso chocolate artesanal em formato de árvore, com recheio cremoso de brigadeiro ou doce de leite. Cada unidade é feita com chocolate de alta qualidade, garantindo sabor intenso e textura irresistível. Ideal para presentear ou se deliciar a qualquer momento do dia.",
  image: "https://34568.cdn.simplo7.net/static/34568/sku/formas-formas-e-moldes-para-chocolate-forma-chocolate-pirulito-pinheirinho-pinheiro-arvore-natal-especial-nro-86-com-2-cavidades--p-1644072589516.png",
}

];

export const TabMenu = () => {
  const [active, setActive] = useState(0);
  const [quantities, setQuantities] = useState({});
  const { adicionarProduto } = useContext(CarrinhoContexto);

  const categoriaAtiva = tabs[active].label;
  const itensFiltrados = menuItems.filter(
    (item) => item.category === categoriaAtiva
  );

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  return (
    <div className="w-full pt-4 pb-24 mb-5">
      <nav className="w-full py-3">
        <ul className="flex gap-3 overflow-x-auto px-2 no-scrollbar">
          {tabs.map((tab, idx) => {
            const Icone = tab.icon;
            return (
              <li key={tab.label} className="">
                <button
                  className={`flex items-center gap-2 px-5 py-2 rounded-full transition font-medium text-base border-2 cursor-pointer shadow`}
                  style={{
                    background: active === idx ? PINK : "#fff",
                    color: active === idx ? "#fff" : DARK_BROWN,
                    borderColor: PINK,
                    fontWeight: active === idx ? 700 : 500,
                    boxShadow:
                      active === idx
                        ? `0 4px 16px 0 ${PINK}22`
                        : `0 1px 4px 0 ${PINK}11`,
                  }}
                  onClick={() => setActive(idx)}
                >
                  {Icone && <Icone size={18} />}
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {itensFiltrados.length > 0 ? (
          itensFiltrados.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl shadow-xl border-2 flex flex-col h-full bg-pink-50 transition hover:-translate-y-1"
              style={{
                borderColor: PINK,
                background: CARD_BG,
                boxShadow: `0 6px 20px 0 ${PINK}33`,
              }}
            >
              <div
                className="w-full h-44 rounded-t-2xl overflow-hidden border-b-2"
                style={{ borderColor: PINK }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <h3
                  className="font-bold text-lg mb-1"
                  style={{ color: DARK_BROWN }}
                >
                  {item.name}
                </h3>

                <DescricaoProduto texto={item.description} />

                <p
                  className="text-base font-semibold mb-4"
                  style={{ color: DARK_BROWN }}
                >
                  {item.price.toLocaleString("pt-BR", {
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
                  <span className="font-bold text-lg text-pink-700 px-2 w-8 text-center select-none">
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
                        nome: item.name,
                        preco: item.price,
                        quantidade: quantities[item.id] || 1,
                        imagem: item.image,
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
          ))
        ) : (
          <p className="text-gray-400 mx-auto">Nenhum item disponível</p>
        )}
      </div>

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
