"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, ShoppingCart, Package, User } from "lucide-react";

const bottomTabs = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Pedidos", icon: Package, path: "/pedidos" },
  { label: "Carrinho", icon: ShoppingCart, path: "/carrinho" },
  { label: "Perfil", icon: User, path: "/perfil" },
];

export const BottomTabMenu = ({ cartCount = 0 }) => {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();

  const handleTabClick = (idx, path) => {
    setActiveTab(idx);
    router.push(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-pink-100 shadow-lg border-t border-pink-300 z-50">
      <ul className="flex justify-around items-center py-3">
        {bottomTabs.map((tab, idx) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === idx;

          return (
            <li key={tab.label} className="relative">
              <button
                onClick={() => handleTabClick(idx, tab.path)}
                className={`flex flex-col items-center justify-center px-5 py-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-pink-200 text-pink-600 shadow-md"
                    : "text-brown-500 hover:bg-pink-50"
                }`}
              >
                <IconComponent
                  size={26}
                  className={isActive ? "text-pink-600" : "text-brown-400"}
                />
                <span className="mt-1 text-xs font-semibold">{tab.label}</span>
              </button>

              {/* Badge para carrinho */}
              {tab.label === "Carrinho" && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
