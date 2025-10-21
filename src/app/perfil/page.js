"use client";

import React, { useState } from "react";

const COLORS = {
  chocolate: "#361102",
  pink: "#F9B8D4",
  background: "#FFF8F2",
  border: "#E5D5C5",
};

const TABS = [
  { key: "dados", label: "Meus Dados" },
  { key: "enderecos", label: "Endereços" },
  { key: "senha", label: "Trocar Senha" },
  { key: "cartoes", label: "Cartões" },
];

const PerfilPage = () => {
  const [activeTab, setActiveTab] = useState("dados");

  const Input = ({ label, type = "text", placeholder }) => (
    <div>
      <label className="block text-sm text-[#6B4423] mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-[#E5D5C5] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F9B8D4]/70"
      />
    </div>
  );

  const Button = ({ children, onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`bg-[#F9B8D4] hover:bg-[#f7a5c5] text-[#361102] font-semibold py-3 rounded-xl transition-colors ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#FFF8F2]">
      {/* Cabeçalho */}
      <div className="w-full bg-[#F9B8D4] py-6 flex justify-center">
        <h2 className="text-lg font-bold text-[#361102]">Nome do usúario</h2>
      </div>

      {/* Abas */}
      <div className="flex w-full max-w-md mt-6 mb-4 bg-[#FCE3EE] rounded-lg justify-between px-2 py-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 px-2 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === tab.key
                ? "bg-[#F9B8D4] text-[#361102]"
                : "text-[#A88764] hover:bg-[#F9B8D4]/30"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div className="bg-white rounded-xl shadow p-6 w-full max-w-md mb-24">
        {activeTab === "dados" && (
          <form className="flex flex-col gap-4">
            <Input label="Nome" placeholder="Seu nome" />
            <Input label="Telefone" placeholder="Seu telefone" />
            <Input label="Email" placeholder="seu@email.com" />
            <Button className="mt-2">Salvar dados</Button>
          </form>
        )}

        {activeTab === "enderecos" && (
          <div className="flex flex-col gap-4">
            <div>
              <Input label="Novo Endereço" placeholder="Rua, número, complemento..." />
              <Button className="mt-2">Adicionar Endereço</Button>
            </div>

            <div className="mt-4">
              <h4 className="text-[#361102] font-bold mb-2">Meus Endereços</h4>
              <ul>
                <li className="flex justify-between items-center py-2 border-b border-[#E5D5C5]">
                  <span>Avenida Brasil, 1000</span>
                  <button className="text-[#F9B8D4] font-semibold">Remover</button>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "senha" && (
          <form className="flex flex-col gap-4">
            <Input label="Senha atual" type="password" />
            <Input label="Nova senha" type="password" />
            <Button className="mt-2">Trocar senha</Button>
          </form>
        )}

        {activeTab === "cartoes" && (
          <div className="flex flex-col gap-4">
            <div>
              <Input label="Número do cartão" placeholder="**** **** **** ****" />
              <Input label="Nome impresso" placeholder="Nome como no cartão" />
              <div className="flex gap-2">
                <Input label="Validade" placeholder="MM/AA" />
                <Input label="CVV" placeholder="***" />
              </div>
              <Button className="mt-2">Adicionar Cartão</Button>
            </div>

            <div className="mt-4">
              <h4 className="text-[#361102] font-bold mb-2">Meus Cartões</h4>
              <ul>
                <li className="flex justify-between items-center py-2 border-b border-[#E5D5C5]">
                  <span>**** **** **** 1234</span>
                  <button className="text-[#F9B8D4] font-semibold">Remover</button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerfilPage;
