"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "../../public/logo2.png";

export const Header = () => {
  const [status, setStatus] = useState("");
  
  useEffect(() => {
    const agora = new Date();
    const hora = agora.getHours();
    const minuto = agora.getMinutes();

    const abre = 9;
    const fecha = 19;

    const aberto =
      (hora > abre && hora < fecha) ||
      (hora === abre && minuto >= 0) ||
      (hora === fecha && minuto === 0);

    setStatus(aberto ? "Aberto agora" : "Fechado no momento");
  }, []);

  return (
    <header
      style={{
        width: "100%",
        background: "linear-gradient(90deg, #FCE4EC 60%, #FFDDE4 100%)",
        padding: "18px 0 14px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderBottomLeftRadius: "24px",
        borderBottomRightRadius: "24px",
        boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >

      {/* LOGO MAIOR E SEM CÍRCULO */}
      <Image
        src={Logo}
        alt="Logo"
        width={110}  // aumentei
        height={110} // aumentei
        style={{
          marginBottom: "4px",
          objectFit: "contain",
        }}
      />

      {/* STATUS */}
      <div
        style={{
          marginTop: "4px",
          fontSize: "0.9rem",
          color: status === "Aberto agora" ? "#2E7D32" : "#C62828",
          fontWeight: 600,
        }}
      >
        {status}
      </div>

      {/* HORÁRIO */}
      <span
        style={{
          fontSize: "0.75rem",
          color: "#8A5A6D",
          marginTop: "1px",
        }}
      >
        ⏰ Funcionamento: 09h às 19h
      </span>
    </header>
  );
};
