"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

const pedidosMock = [
  {
    id: "1",
    status: "Entregue",
    statusColor: "bg-green-100 text-green-700",
    data: "18/10/2025",
    hora: "18:56",
    tempoEntrega: "45min",
    total: 66.0,
    itens: [
      { nome: "Brigadeiro Gourmet", qtd: 6 },
      { nome: "Bolo de Cenoura", qtd: 1 },
    ],
  },
  {
    id: "2",
    status: "Em Andamento",
    statusColor: "bg-[#F9B8D4] text-[#361102]",
    data: "17/10/2025",
    hora: "15:30",
    tempoEntrega: "—",
    total: 25.0,
    itens: [{ nome: "Biscoito Amanteigado", qtd: 3 }],
  },
];

export default function Pedidos() {
  const [search, setSearch] = useState("");
  const [dataFiltro, setDataFiltro] = useState("");

  const formatarData = (iso) => {
    if (!iso) return "";
    const [ano, mes, dia] = iso.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const pedidosFiltrados = pedidosMock.filter((pedido) => {
    const contemItem = pedido.itens.some((item) =>
      item.nome.toLowerCase().includes(search.toLowerCase())
    );
    const dataMatch = dataFiltro ? pedido.data === formatarData(dataFiltro) : true;
    return contemItem && dataMatch;
  });

  const tituloDinamico = dataFiltro
    ? `Pedidos do dia ${formatarData(dataFiltro)}`
    : "Meus Pedidos";

  return (
    <div className="min-h-screen bg-[#F9B8D4]/20 pb-24">
      <div className="max-w-3xl mx-auto p-4">
        {/* Título */}
        <h1 className="text-2xl font-bold text-center text-[#361102] mb-6">
          {tituloDinamico}
        </h1>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          {/* Campo de busca estilizado */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar por item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl px-10 py-2 text-[#361102] placeholder-[#a66b55] border-2 border-[#F9B8D4] bg-white focus:ring-2 focus:ring-[#F9B8D4] outline-none transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F9B8D4]" />
          </div>

          {/* Campo de data estilizado */}
          <div className="relative w-full md:w-auto">
            <input
              type="date"
              className="appearance-none w-full border-2 border-[#F9B8D4] rounded-2xl px-4 py-2 text-[#361102] bg-white focus:ring-2 focus:ring-[#F9B8D4] outline-none transition-all"
              value={dataFiltro}
              onChange={(e) => setDataFiltro(e.target.value)}
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F9B8D4] pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="4" width="18" height="18" rx="5" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
        </div>

        {/* Lista de pedidos */}
        <div className="space-y-5">
          {pedidosFiltrados.length === 0 ? (
            <p className="text-gray-500 text-center text-base">
              Nenhum pedido encontrado.
            </p>
          ) : (
            pedidosFiltrados.map((pedido) => (
              <div
                key={pedido.id}
                className="bg-white rounded-2xl p-5 shadow-md border border-[#F9B8D4]/40 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${pedido.statusColor}`}
                  >
                    {pedido.status}
                  </span>
                  <div className="flex flex-col items-end text-sm text-gray-400">
                    <span>{pedido.data}</span>
                    <span className="text-xs">Hora: {pedido.hora}</span>
                  </div>
                </div>

                <div className="flex justify-end items-center">
                  <span className="text-xs bg-[#F9B8D4]/30 text-[#361102] px-2 py-1 rounded-lg">
                    Tempo de entrega: {pedido.tempoEntrega}
                  </span>
                </div>

                <div className="border-b border-gray-100 py-2">
                  {pedido.itens.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-[#361102] text-base py-1"
                    >
                      <span>{item.nome}</span>
                      <span className="font-medium">x{item.qtd}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 flex justify-between items-center">
                  <span className="font-semibold text-[#361102] text-lg">Total</span>
                  <span className="font-bold text-[#361102] text-lg">
                    {pedido.total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>

                <button className="mt-3 w-full bg-[#361102] hover:bg-[#4d1a04] text-[#F9B8D4] py-3 rounded-lg font-semibold transition">
                  Ver detalhes
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
