"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export default function CheckoutModal({ isOpen, onClose, cartItems = [], total = 0 }) {
 
  const [nome, setNome] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");

 
  const [ruaInput, setRuaInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null);

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

 
  const [entrega, setEntrega] = useState("entrega");
  const [pagamento, setPagamento] = useState("dinheiro");

  const [trocoCents, setTrocoCents] = useState(null);
  const trocoInputRef = useRef(null);

  const [observacao, setObservacao] = useState("");

  const [cupom, setCupom] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [isCupomValido, setIsCupomValido] = useState(true);

  const [errors, setErrors] = useState({});

  const API_KEY = "cd74557c52e94230a23495e017f880f2";

  
  const subtotal = useMemo(() => Number(total || 0), [total]);
  const taxaEntrega = entrega === "entrega" ? 5 : 0;
  const totalFinal = useMemo(() => {
    const raw = subtotal + taxaEntrega - (Number(desconto) || 0);
    return Number(Math.max(raw, 0).toFixed(2));
  }, [subtotal, taxaEntrega, desconto]);

  const formatCurrency = (v) =>
    Number(v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  useEffect(() => {
    const code = (cupom || "").trim().toUpperCase();
    if (code === "DESCONTO5") {
      setDesconto(5);
      setIsCupomValido(true);
    } else if (code === "") {
      setDesconto(0);
      setIsCupomValido(true);
    } else {
      setDesconto(0);
      setIsCupomValido(false);
    }
  }, [cupom]);

  useEffect(() => {
    if (ruaInput.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    let mounted = true;
    const timer = setTimeout(async () => {
      try {
        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          ruaInput
        )}&lang=pt&limit=5&apiKey=${API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) {
          if (mounted) setSuggestions([]);
          return;
        }
        const data = await res.json();
        if (mounted) setSuggestions(data.features || []);
      } catch {
        if (mounted) setSuggestions([]);
      }
    }, 200);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [ruaInput]);

  useEffect(() => {
    const handler = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const next = {};

    if (!nome.trim()) next.nome = "Informe seu nome.";
    else if (nome.trim().length < 3) next.nome = "Nome muito curto.";

    if (entrega === "entrega") {
      if (!rua.trim()) next.rua = "Informe a rua.";
      if (!numero.trim()) next.numero = "Informe o número.";
      if (!bairro.trim()) next.bairro = "Informe o bairro.";

      if (numero && !/^\d+[a-zA-Z\-\/]?$/i.test(numero.trim())) {
        next.numero = "Número inválido (ex: 123 ou 12A).";
      }
    }

    if (pagamento === "dinheiro") {
      if (trocoCents !== null) {
        const trocoNum = trocoCents / 100;
        if (Number.isNaN(trocoNum) || trocoNum < 0) {
          next.troco = "Valor de troco inválido.";
        } else {
          if (trocoNum > 0 && trocoNum < totalFinal) {
            next.troco = `Troco informado (${formatCurrency(
              trocoNum
            )}) é menor que o total (${formatCurrency(totalFinal)}).`;
          }
        }
      }
    }

    setErrors(next);
  }, [nome, rua, numero, bairro, entrega, pagamento, trocoCents, totalFinal]);

  const isFinalizarDisabled = useMemo(() => {
    if (Object.keys(errors).length > 0) return true;
    if (!nome.trim()) return true;
    if (entrega === "entrega" && (!rua.trim() || !numero.trim() || !bairro.trim())) return true;
    return false;
  }, [errors, nome, entrega, rua, numero, bairro]);

  const parseMoneyInput = (strOrCents) => {
    if (strOrCents === null || strOrCents === undefined) return 0;
    if (typeof strOrCents === "number") return Number((strOrCents / 100).toFixed(2));
    const cleaned = String(strOrCents).replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
    const v = parseFloat(cleaned);
    return Number.isNaN(v) ? 0 : v;
  };

  const montarMensagemElegante = () => {
    const listaItensBonitos = cartItems
      .map(
        (item) =>
          `• ${item.nome} × ${item.quantidade} — ${Number(item.preco).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`
      )
      .join("\n");

    const linkMaps = lat && lon ? `https://www.google.com/maps?q=${lat},${lon}` : null;

    const enderecoFormatado =
      entrega === "entrega"
        ? `📍 Endereço: ${rua.trim()}, ${numero.trim()} — ${bairro.trim()}${linkMaps ? `\n🔗 Maps: ${linkMaps}` : ""}`
        : "🏠 Retirada no balcão da loja";

    const trocoNum = parseMoneyInput(trocoCents);
    const trocoTexto = pagamento === "dinheiro" && trocoCents !== null ? ` (Troco para ${formatCurrency(trocoNum || 0)})` : "";

    const mensagem = [
      "✨ *Novo Pedido Recebido!* ✨",
      "",
      `👤 *Cliente:* ${nome.trim()}`,
      `📦 *Tipo:* ${entrega === "entrega" ? "Entrega" : "Retirada"}`,
      `${enderecoFormatado}`,
      "",
      `💳 *Pagamento:* ${pagamento === "dinheiro" ? "Dinheiro" : pagamento === "cartao" ? "Cartão" : "Pix"}${trocoTexto}`,
      "",
      "━━━━━━━━━━━━━━━━━━━━",
      "🍰 *Itens do pedido*",
      listaItensBonitos || "• (sem itens)",
      "━━━━━━━━━━━━━━━━━━━━",
      "💰 *Resumo*",
      `• Subtotal: ${formatCurrency(subtotal)}`,
      `• Entrega: ${formatCurrency(taxaEntrega)}`,
      `• Desconto: ${formatCurrency(desconto)}`,
      "━━━━━━━━━━",
      `💖 *Total:* ${formatCurrency(totalFinal)}`,
      "━━━━━━━━━━━━━━━━━━━━",
      "",
      "📝 *Observação:*",
      `${observacao.trim() || "Nenhuma"}`,
    ].join("\n");

    return mensagem;
  };

  const enviarWhatsApp = () => {
    if (isFinalizarDisabled) {
      const primeiroErro = Object.entries(errors)[0];
      if (primeiroErro) {
        const [campo, msg] = primeiroErro;
        alert(`Erro no campo "${campo}": ${msg}`);
        return;
      }
      alert("Preencha os campos obrigatórios antes de finalizar.");
      return;
    }

    const numeroLoja = "749905-4403";
    const mensagem = montarMensagemElegante();

    const endpoint = `https://api.whatsapp.com/send?phone=${numeroLoja}&text=${encodeURIComponent(mensagem)}`;

    window.open(endpoint, "_blank");
  };

  useEffect(() => {
    if (!isOpen) {
      setNome("");
      setRua("");
      setRuaInput("");
      setNumero("");
      setBairro("");
      setEntrega("entrega");
      setPagamento("dinheiro");
      setTrocoCents(null);
      setObservacao("");
      setCupom("");
      setDesconto(0);
      setIsCupomValido(true);
      setSuggestions([]);
      setErrors({});
      setLat(null);
      setLon(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formatCentsToBRL = (cents) => {
    if (cents === null || cents === undefined) return "";
    const num = cents / 100;
    return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const handleTrocoChange = (e) => {
    const input = e.target.value;
    const digits = input.replace(/\D/g, "");
    if (digits === "") {
      setTrocoCents(null);
      return;
    }
    // armazenar exatamente os centavos digitados (ex: "5000" -> 5000 cents -> R$50,00)
    const asCents = parseInt(digits, 10);
    setTrocoCents(asCents);
  };

  const handleTrocoFocus = (e) => {
    const el = e.target;
    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = el.value.length;
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 overflow-auto z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white w-full max-w-xl rounded-xl p-6 relative shadow-lg overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 8rem)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-pink-700 mb-4 text-center">Finalizar Pedido</h2>

        <div className="mb-3">
          <label className="block font-semibold mb-1">Nome</label>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome completo"
            className={`w-full border rounded px-3 py-2 focus:ring-2 ${errors.nome ? "border-red-400 focus:ring-red-200" : "focus:ring-pink-300"}`}
          />
          {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
        </div>

        {entrega === "entrega" && (
          <>
            <div className="mb-3 relative" ref={suggestionsRef}>
              <label className="block font-semibold mb-1">Rua</label>
              <input
                value={ruaInput}
                onChange={(e) => {
                  setRuaInput(e.target.value);
                  setRua("");
                  setLat(null);
                  setLon(null);
                }}
                placeholder="Digite a rua"
                className={`w-full border rounded px-3 py-2 focus:ring-2 ${errors.rua ? "border-red-400 focus:ring-red-200" : "focus:ring-pink-300"}`}
              />
              {errors.rua && <p className="text-red-500 text-sm mt-1">{errors.rua}</p>}

              {suggestions.length > 0 && (
                <ul className="absolute w-full bg-white border rounded mt-1 max-h-44 overflow-auto shadow-lg z-50">
                  {suggestions.map((item, idx) => (
                    <li
                      key={idx}
                      className="px-3 py-2 hover:bg-pink-50 cursor-pointer"
                      onClick={() => {
                        setRua(item.properties.street || item.properties.formatted || "");
                        setRuaInput(item.properties.formatted || "");
                        setNumero(item.properties.housenumber || "");
                        setBairro(item.properties.suburb || "");
                        // salvar coordenadas para gerar link do Maps
                        setLat(item.properties.lat || null);
                        setLon(item.properties.lon || null);
                        setSuggestions([]);
                      }}
                    >
                      {item.properties.formatted}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Número</label>
                <input
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  placeholder="Número"
                  className={`w-full border rounded px-3 py-2 focus:ring-2 ${errors.numero ? "border-red-400 focus:ring-red-200" : "focus:ring-pink-300"}`}
                />
                {errors.numero && <p className="text-red-500 text-sm mt-1">{errors.numero}</p>}
              </div>

              <div>
                <label className="block font-semibold mb-1">Bairro</label>
                <input
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  placeholder="Bairro"
                  className={`w-full border rounded px-3 py-2 focus:ring-2 ${errors.bairro ? "border-red-400 focus:ring-red-200" : "focus:ring-pink-300"}`}
                />
                {errors.bairro && <p className="text-red-500 text-sm mt-1">{errors.bairro}</p>}
              </div>
            </div>
          </>
        )}

        <div className="mb-3">
          <span className="block font-semibold mb-1">Entrega ou Retirada</span>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input type="radio" checked={entrega === "entrega"} onChange={() => setEntrega("entrega")} className="accent-pink-500" />
              Entrega
            </label>

            <label className="flex items-center gap-2">
              <input type="radio" checked={entrega === "retirada"} onChange={() => setEntrega("retirada")} className="accent-pink-500" />
              Retirada no local
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label className="block font-semibold mb-1">Forma de pagamento</label>
          <select value={pagamento} onChange={(e) => setPagamento(e.target.value)} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-pink-300">
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao">Cartão</option>
            <option value="pix">Pix</option>
          </select>
        </div>

        {pagamento === "dinheiro" && (
          <div className="mb-3">
            <label className="block font-semibold mb-1">Troco</label>
            <input
              ref={trocoInputRef}
              value={formatCentsToBRL(trocoCents)}
              onChange={handleTrocoChange}
              onFocus={handleTrocoFocus}
              placeholder={`Ex: ${formatCurrency(totalFinal)}`}
              className={`w-full border rounded px-3 py-2 focus:ring-2 ${errors.troco ? "border-red-400 focus:ring-red-200" : "focus:ring-pink-300"}`}
            />
            {errors.troco && <p className="text-red-500 text-sm mt-1">{errors.troco}</p>}
          </div>
        )}

        <div className="mb-3">
          <label className="block font-semibold mb-1">Observação</label>
          <textarea value={observacao} onChange={(e) => setObservacao(e.target.value)} placeholder="Alguma observação para o pedido?" className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-pink-300" />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Cupom</label>
          <input value={cupom} onChange={(e) => setCupom(e.target.value.toUpperCase())} placeholder="DESCONTO5" className={`w-full border rounded px-3 py-2 focus:ring-2 ${isCupomValido ? "focus:ring-pink-300" : "border-red-400 focus:ring-red-200"}`} />
          {!isCupomValido && <p className="text-red-500 text-sm mt-1">Cupom inválido.</p>}
        </div>

        <div className="border-t pt-4 space-y-2 mb-4">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Taxa de entrega</span>
            <span>{formatCurrency(taxaEntrega)}</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Desconto</span>
            <span>- {formatCurrency(desconto)}</span>
          </div>

          <div className="flex justify-between font-bold text-lg text-pink-700">
            <span>Total</span>
            <span>{formatCurrency(totalFinal)}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={onClose} className="px-6 py-2 border border-pink-400 text-pink-600 rounded-full hover:bg-pink-50 transition">Continuar comprando</button>

          <button disabled={isFinalizarDisabled} onClick={enviarWhatsApp} className={`px-6 py-2 rounded-full text-white font-semibold transition ${isFinalizarDisabled ? "bg-pink-300 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"}`}>
            Finalizar via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
