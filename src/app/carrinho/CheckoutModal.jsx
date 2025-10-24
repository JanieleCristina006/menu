"use client";

import React, { useState, useEffect, useRef } from "react";

export default function CheckoutModal({ isOpen, onClose, cartItems, total }) {
  const [nome, setNome] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("Carmo do Rio Claro");
  const [numero, setNumero] = useState("");
  const [entrega, setEntrega] = useState("entrega");
  const [pagamento, setPagamento] = useState("dinheiro");
  const [troco, setTroco] = useState("");
  const [observacao, setObservacao] = useState("");
  const [cupom, setCupom] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [isCupomValido, setIsCupomValido] = useState(true);
  const [ruaInput, setRuaInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const suggestionsRef = useRef(null);
  const API_KEY = "cd74557c52e94230a23495e017f880f2";

  const subtotal = total || 0;
  const taxaEntrega = entrega === "entrega" ? 5 : 0;
  const totalFinal = subtotal + taxaEntrega - desconto;

  // Validação do cupom
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

  // Autocomplete de endereço
  useEffect(() => {
    if (ruaInput.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    const fetchSuggestions = async () => {
      try {
        const fullInput = `${ruaInput} Carmo do Rio Claro`;
        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(fullInput)}&lang=pt&limit=5&apiKey=${API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) {
          const errMsg = await res.text();
          console.error("Geoapify ERRO:", res.status, errMsg);
          setSuggestions([]);
          return;
        }
        const data = await res.json();
        setSuggestions(data.features || []);
      } catch (error) {
        console.error("Erro ao buscar sugestões:", error);
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [ruaInput]);

  // Fechar sugestões ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  const isFinalizarDisabled =
    nome.trim() === "" ||
    (entrega === "entrega" && (rua.trim() === "" || numero.trim() === "" || bairro.trim() === ""));

  const enviarWhatsApp = () => {
    const numeroLoja = "5535998696287";
    const listaItens = cartItems
      .map((item) => `• ${item.nome} (x${item.quantidade}) - ${item.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`)
      .join("\n");

    // Criar link do Google Maps com o endereço completo
    const enderecoCompleto = `${rua}, ${numero} - ${bairro}, ${cidade}`;
    const enderecoMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoCompleto)}`;

    const mensagem = `
*Novo Pedido!*
Nome: ${nome}
Tipo: ${entrega === "entrega" ? "Entrega" : "Retirada"}
Endereço: ${entrega === "entrega" ? `${enderecoCompleto}\n📍 ${enderecoMaps}` : "Retirada no local"}
Pagamento: ${pagamento}${pagamento === "dinheiro" ? ` (Troco: R$ ${troco})` : ""}

*Itens:*
${listaItens}

Subtotal: ${subtotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
Taxa de entrega: R$ 5,00
Desconto: ${desconto.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
Total: ${totalFinal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}

Observação: ${observacao || "-"}
    `;
    const url = `https://wa.me/${numeroLoja}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 overflow-auto z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-xl w-full max-w-xl p-6 shadow-lg relative overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 12rem)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-pink-700 mb-4 text-center">
          Finalizar Pedido
        </h2>

        {/* Nome */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome completo"
            className="w-full border rounded px-3 py-2 focus:outline-pink-400 focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* Endereço com autocomplete */}
        {entrega === "entrega" && (
          <div className="mb-4 relative" ref={suggestionsRef}>
            <label className="block font-semibold mb-1">Endereço:</label>
            <input
              type="text"
              value={ruaInput}
              onChange={(e) => {
                setRuaInput(e.target.value);
                setRua("");
              }}
              placeholder="Digite a rua"
              className="w-full border rounded px-3 py-2 focus:outline-pink-400 focus:ring-2 focus:ring-pink-300"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-50 w-full bg-white border rounded mt-1 max-h-40 overflow-auto shadow-lg">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 hover:bg-pink-100 cursor-pointer"
                    onClick={() => {
                      setRua(item.properties.street || item.properties.formatted || "");
                      setRuaInput(item.properties.formatted || "");
                      setNumero(item.properties.housenumber || "");
                      setBairro(item.properties.suburb || "");
                      setCidade(item.properties.city || "Carmo do Rio Claro");
                      setSuggestions([]);
                    }}
                  >
                    {item.properties.formatted}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Número e Bairro */}
        {entrega === "entrega" && (
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold mb-1">Número:</label>
              <input
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                placeholder="Número"
                className="w-full border rounded px-3 py-2 focus:outline-pink-400 focus:ring-2 focus:ring-pink-300"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Bairro:</label>
              <input
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                placeholder="Bairro"
                className="w-full border rounded px-3 py-2 focus:outline-pink-400 focus:ring-2 focus:ring-pink-300"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Cidade:</label>
              <input
                type="text"
                value={cidade}
                readOnly
                className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
        )}

        {/* Retirada/Entrega */}
        <div className="mb-4">
          <span className="block font-semibold mb-1">Retirada / Entrega:</span>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="entregaRetirada"
                value="entrega"
                checked={entrega === "entrega"}
                onChange={(e) => setEntrega(e.target.value)}
                className="form-radio text-pink-500"
              />
              Entrega
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="entregaRetirada"
                value="retirada"
                checked={entrega === "retirada"}
                onChange={(e) => setEntrega(e.target.value)}
                className="form-radio text-pink-500"
              />
              Retirada no local
            </label>
          </div>
        </div>

        {/* Pagamento */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Forma de Pagamento:</label>
          <select
            value={pagamento}
            onChange={(e) => setPagamento(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-pink-400 focus:ring-2 focus:ring-pink-300"
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
              value={troco}
              onChange={(e) => setTroco(e.target.value)}
              placeholder="Informe valor para troco"
              className="w-full border rounded px-3 py-2 focus:outline-pink-400 focus:ring-2 focus:ring-pink-300"
            />
          </div>
        )}

        {/* Observação */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Observação:</label>
          <textarea
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            placeholder="Alguma observação para seu pedido?"
            rows={2}
            className="w-full border rounded px-3 py-2 focus:outline-pink-400 focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* Cupom */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Cupom de Desconto:</label>
          <input
            type="text"
            value={cupom}
            onChange={(e) => setCupom(e.target.value.toUpperCase())}
            placeholder="Digite o código do cupom"
            className={`w-full border rounded px-3 py-2 focus:outline-pink-400 focus:ring-2 ${
              isCupomValido
                ? "focus:ring-pink-300"
                : "focus:ring-red-400 border-red-400"
            }`}
          />
          {!isCupomValido && (
            <p className="text-red-500 text-sm mt-1">Cupom inválido.</p>
          )}
        </div>

        {/* Resumo */}
        <div className="border-t pt-4 mt-4 space-y-2">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal:</span>
            <span>{subtotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Taxa de entrega:</span>
            <span>R$ 5,00</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Desconto:</span>
            <span>- {desconto.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-pink-700">
            <span>Total:</span>
            <span>{totalFinal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
          </div>
        </div>

        {/* Botões */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center pb-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-full border border-pink-400 text-pink-600 font-semibold bg-white hover:bg-pink-50 transition"
          >
            Continuar Comprando
          </button>
          <button
            onClick={enviarWhatsApp}
            disabled={isFinalizarDisabled}
            className={`w-full sm:w-auto px-6 py-2 rounded-full font-semibold text-white transition ${
              isFinalizarDisabled
                ? "bg-pink-300 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600"
            }`}
          >
            Finalizar Pedido via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
