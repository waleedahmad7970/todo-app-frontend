import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Todo App",
  description: "Todo App for Hiring",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="sub_page">
        <Toaster position="top-right" reverseOrder={false} />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
