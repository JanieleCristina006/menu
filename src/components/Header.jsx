"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "../../public/logo4.png";

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
    <header className="
      w-full
      sticky top-0 z-[100]
      flex flex-col items-center
      pt-4 pb-3
      rounded-b-[24px]
      shadow-[0_4px_18px_rgba(0,0,0,0.12)]
      bg-gradient-to-r from-[#FCE4EC] to-[#FFDDE4]
    ">
      {/* LOGO */}
      <div className="flex items-center justify-center">
        <Image
          src={Logo}
          alt="Logo"
          width={120}
          height={120}
          className="
            object-contain
            w-20 h-20
            sm:w-24 sm:h-24
            md:w-28 md:h-28
            lg:w-32 lg:h-32
          "
        />
      </div>

      {/* STATUS TAB COMPACTA */}
      <div className="mt-2">
        <div className={`
          px-3 py-0.5 rounded-full font-semibold text-xs
          sm:text-sm
          border
          ${status === "Aberto agora" ? "bg-green-100 text-green-700 border-green-700" : "bg-red-100 text-red-700 border-red-700"}
        `}>
          {status}
        </div>
      </div>

      <span className="text-[0.65rem] sm:text-[0.7rem] text-[#8A5A6D] mt-1">
        ⏰ Funcionamento: 09h às 19h
      </span>
    </header>
  );
};
