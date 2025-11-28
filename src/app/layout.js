import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BottomTabMenu } from "@/components/BottomTabMenu";
import { CarrinhoProvider } from "@/context/CartContext";
import { ToastProvider } from "@/components/ToastProvider";
import { BottomTabMenuWrapper } from "@/components/BottomTabMenuWrapper";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cardápio Online",
  description: "Cardápio doceria da Aninha",
   icons: {
    icon: "/favicon.png", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#FFF8F0] antialiased`}
      >
        <CarrinhoProvider>
        <ToastProvider />
               {children}

               <BottomTabMenuWrapper />

        <BottomTabMenu  />
        </CarrinhoProvider>
       
      
      </body>
    </html>
  );
}
