"use client";

import { Container } from "./Container";
import { Input } from "./Input";
import { TabMenu } from "./TabMenu";


export const Menu = () => {
  return (
    <Container>
      <div className="flex flex-col items-center mb-5">
        <h1 className="text-center text-2xl font-semibold mb-5 text-[#795548] drop-shadow-sm">
          Bem vindo(a) ao cardápio online
        </h1>

        <span className="text-lg text-brown-600 mb-5 text-center">
          Explore o cardápio recheado de doces e sabores especiais 🍰🍫
        </span>
        <Input />
      </div>

      <div>
        <TabMenu />
      </div>

    
    </Container>
  );
};
