import React from "react";
import { Search } from "lucide-react";
import { BottomTabMenu } from "./BottomTabMenu";

export const Input = (props) => {
  return (
    <div className="relative w-full my-3">
      <input
        type="text"
        placeholder="Buscar no cardápio..."
        className="
          w-full
          px-4 pr-11 py-2.5
          text-[16px]
          border-2 border-[#795548]
          rounded-full
          bg-[#fffaf6]
          text-[#5D4037]
          outline-none
          transition
          focus:border-[#A47149]
          placeholder:text-[#A47149]/70
        "
        {...props}
      />
      <Search
        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#A47149]"
        size={22}
      />

      <BottomTabMenu />
    </div>
  );
};
