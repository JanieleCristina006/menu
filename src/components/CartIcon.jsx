"use client";
import React from "react";
import { ShoppingCart } from "lucide-react";

export const CartIcon = ({ count = 0, isActive = false, size = 26 }) => {
  return (
    <div className="relative">
      <ShoppingCart
        size={size}
        className={isActive ? "text-pink-600" : "text-brown-400"}
      />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold z-50 animate-pulse">
          {count}
        </span>
      )}
    </div>
  );
};
