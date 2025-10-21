"use client";

import React, { useState, useEffect } from "react";

export default function CheckoutModal({ isOpen, onClose, cartItems }) {
  const [nome, setNome] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [entrega, setEntrega] = useState("entrega");
  const [pagamento, setPagamento] = useState("dinheiro");
  const [troco, setTroco] = useState("");
  const [observacao, setObservacao] = useState("");
  const [cupom, setCupom] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [isCupomValido, setIsCupomValido] = useState(true);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxaEntrega = entrega === "entrega" ? 10 : 0;
  const total = subtotal + taxaEntrega - desconto;

  useEffect(() => {
    if (cupom.toUpperCase() === "DESCONTO5") {
      setDesconto(5);
      setIsCupomValido(true);
    } else if (cupom.trim() === "") {
      setDesconto(0);
      setIsCupomValido(true);
    } else {
      setDesconto(0);
      setIsCupomValido(false);
    }
  }, [cupom]);

  if (!isOpen) return null;

  // Desabilitar finalizar se campos obrigatórios estiverem vazios
  const isFinalizarDisabled =
    nome.trim() === "" ||
    (entrega === "entrega" && (rua.trim() === "" || numero.trim() === "" || bairro.trim() === ""));

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 overflow-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-xl w-full max-w-xl p-6 max-h-[90vh] shadow-lg relative overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-pink-700 mb-4 text-center">Finalizar Pedido</h2>

        {/* Nome */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Nome:</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 focus:outline-pink-400 focus:ring-2 focus:ring-pink-300"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome completo"
          />
        </div>

        {/* Endereço separado */}
        {entrega === "entrega" && (
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold mb-1">Rua:</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 focus:outline-pink-400 focus:ring-2 focus:ring-pink-300"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
                placeholder="Rua"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Número:</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 focus:outline-pink-400 focus:ring-2 focus:ring-pink-300"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                placeholder="Número"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Bairro:</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 focus:outline-pink-400 focus:ring-2 focus:ring-pink-300"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                placeholder="Bairro"
              />
            </div>
          </div>
        )}

        {/* Entrega ou Retirada */}
        <div className="mb-4">
          <span className="block font-semibold mb-1">Retirada / Entrega:</span>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="entrega"
                checked={entrega === "entrega"}
                onChange={(e) => setEntrega(e.target.value)}
                className="form-radio text-pink-500"
                name="entregaRetirada"
              />
              Entrega
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="retirada"
                checked={entrega === "retirada"}
                onChange={(e) => setEntrega(e.target.value)}
                className="form-radio text-pink-500"
                name="entregaRetirada"
              />
              Retirada no local
            </label>
          </div>
        </div>

      
        <div className="mb-4">
          <label className="block font-semibold mb-1">Forma de Pagamento:</label>
          <select
            className="w-full border rounded px-3 py-2 focus:outline-pink-400 focus:ring-2 focus:ring-pink-300"
            value={pagamento}
            onChange={(e) => setPagamento(e.target.value)}
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao">Cartão</option>
            <option value="pix">Pix</option>
          </select>
        </div>

        {pagamento === "dinheiro" && (
          <div className="mb-4">
            <label className="block font-semibold mb-1">Troco para quanto?</label>
            <input
              type="number"
              min="0"
              className="w-full border rounded px-3 py-2 focus:outline-pink-400 focus:ring-2 focus:ring-pink-300"
              value={troco}
              onChange={(e) => setTroco(e.target.value)}
              placeholder="Informe valor para troco"
            />
          </div>
        )}

      
        <div className="mb-4">
          <label className="block font-semibold mb-1">Observação:</label>
          <textarea
            className="w-full border rounded px-3 py-2 focus:outline-pink-400 focus:ring-2 focus:ring-pink-300"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            rows={2}
            placeholder="Alguma observação para seu pedido?"
          />
        </div>

    
        <div className="mb-4">
          <label className="block font-semibold mb-1">Cupom de Desconto:</label>
          <input
            type="text"
            className={`w-full border rounded px-3 py-2 focus:outline-pink-400 focus:ring-2 ${
              isCupomValido
                ? "focus:ring-pink-300"
                : "focus:ring-red-400 border-red-400"
            }`}
            value={cupom}
            onChange={(e) => setCupom(e.target.value.toUpperCase())}
            placeholder="Digite o código do cupom"
          />
          {!isCupomValido && <p className="text-red-500 text-sm mt-1">Cupom inválido.</p>}
        </div>

        <div className="border-t pt-4 mt-4 space-y-2">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal:</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Taxa de entrega:</span>
            <span>R$ {taxaEntrega.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Desconto:</span>
            <span>- R$ {desconto.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-pink-700">
            <span>Total:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>

        {/* Botões */}
<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
  <button
    onClick={onClose}
    className="w-full sm:w-auto px-6 py-2 rounded-full border border-pink-400 text-pink-600 font-semibold bg-white hover:bg-pink-50 transition"
  >
    Continuar Comprando
  </button>
  <button
    onClick={() => alert('Pedido finalizado!')}
    disabled={isFinalizarDisabled}
    className={`w-full sm:w-auto px-6 py-2 rounded-full font-semibold transition text-white ${
      isFinalizarDisabled
        ? 'bg-pink-300 cursor-not-allowed'
        : 'bg-pink-500 hover:bg-pink-600'
    }`}
  >
    Finalizar Pedido
  </button>
</div>

      </div>
    </div>
  );
}
