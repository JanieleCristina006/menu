"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react"; 
import { CartIcon } from "./CartIcon"; 
import { useCarrinho } from "@/context/CartContext";

const bottomTabs = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Carrinho", icon: null, path: "/carrinho" },
];

export const BottomTabMenu = () => {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const { totalItens } = useCarrinho();

  const handleTabClick = (idx, path) => {
    setActiveTab(idx);
    router.push(path);
  };

  return (
    <nav
      className="
        fixed bottom-0 left-0 w-full
        bg-pink-100 border-t border-pink-300 shadow-lg z-50
        h-16 flex items-center
      "
    >
      <ul className="flex justify-around items-center w-full">
        {bottomTabs.map((tab, idx) => {
          const isActive = activeTab === idx;

          return (
            <li key={tab.label} className="relative">
              <button
                onClick={() => handleTabClick(idx, tab.path)}
                className={`
                    flex flex-col cursor-pointer items-center justify-center
                    px-5 py-1 rounded-full transition-all duration-200
                    ${isActive ? "bg-pink-200 text-pink-600 shadow-md" : "text-brown-500 hover:bg-pink-50"}
                  `}
              >
                {tab.label === "Carrinho" ? (
                  <CartIcon count={totalItens} isActive={isActive} />
                ) : (
                  <tab.icon
                    size={24}
                    className={isActive ? "text-pink-600" : "text-brown-400"}
                  />
                )}
                <span className="text-[10px] font-semibold mt-0.5">{tab.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
