import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#361102] text-[#F9B8D4] py-10 pb-32">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
      
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">Doceria Delícia</h2>
          <p className="text-sm mt-1">O melhor sabor em cada pedaço!</p>
        </div>

        <div className="flex gap-4">
          <a href="#" aria-label="Instagram" className="hover:text-white transition">
            <Instagram size={24} />
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-white transition">
            <Facebook size={24} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-white transition">
            <Twitter size={24} />
          </a>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-[#F9B8D4]/80">
        &copy; {new Date().getFullYear()} Doceria Delícia. Todos os direitos reservados.
      </div>
    </footer>
  );
};

