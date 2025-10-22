"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, Package, User } from "lucide-react"; 
import { CartIcon } from "./CartIcon"; 
import { useCarrinho } from "@/context/CartContext";

const bottomTabs = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Pedidos", icon: Package, path: "/pedidos" },
  { label: "Carrinho", icon: null, path: "/carrinho" }, 
  { label: "Perfil", icon: User, path: "/perfil" },
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
    <nav className="fixed bottom-0 left-0 w-full bg-pink-100 shadow-lg border-t border-pink-300 z-50">
      <ul className="flex justify-around items-center py-3">
        {bottomTabs.map((tab, idx) => {
          const isActive = activeTab === idx;

          return (
            <li key={tab.label} className="relative">
              <button
                onClick={() => handleTabClick(idx, tab.path)}
                className={`flex flex-col items-center justify-center px-5 py-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-pink-200 text-pink-600 shadow-md"
                    : "text-brown-500 hover:bg-pink-50"
                } overflow-visible`}
              >
                {tab.label === "Carrinho" ? (
                  <CartIcon count={totalItens} isActive={isActive} />
                ) : (
                  <tab.icon
                    size={26}
                    className={isActive ? "text-pink-600" : "text-brown-400"}
                  />
                )}
                <span className="mt-1 text-xs font-semibold">{tab.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
