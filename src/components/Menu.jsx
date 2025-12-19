"use client";

import { useState, useEffect } from "react";
import { Container } from "./Container";
import { Input } from "./Input";
import { TabMenu } from "./TabMenu";
import LoadingSpinner from "./Loading";
import { produtosMock } from "@/mocks/produtosMock";

export const Menu = () => {
  const [busca, setBusca] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        setLoading(true);

        const resp = await fetch(
          "https://ecommerce-api-4k6g.onrender.com/produtos/",
          { cache: "no-store" }
        );

        if (!resp.ok) {
          throw new Error("API não respondeu");
        }

        const data = await resp.json();

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("API vazia");
        }

        setProdutos(data);
      } catch (err) {
        console.warn("Usando produtos mock:", err.message);
        setProdutos(produtosMock);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  useEffect(() => {
    const texto = busca.toLowerCase();

    const resultado = produtos.filter(
      (item) =>
        item.nome.toLowerCase().includes(texto) ||
        item.categoria.toLowerCase().includes(texto)
    );

    setFiltrados(resultado);
  }, [busca, produtos]);

  return (
    <Container>
      <div className="flex flex-col mt-8 items-center mb-5">
        <h1 className="text-center text-2xl font-semibold mb-5 text-[#795548] drop-shadow-sm">
          Bem vindo(a) ao cardápio online
        </h1>

        <span className="text-lg text-brown-600 mb-5 text-center">
          Explore o cardápio recheado de doces e sabores especiais 🍰🍫
        </span>

        <Input onChange={(e) => setBusca(e.target.value)} />
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : (
        <TabMenu produtos={filtrados} busca={busca} />
      )}
    </Container>
  );
};
