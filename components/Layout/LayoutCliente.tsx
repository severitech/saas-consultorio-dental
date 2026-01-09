
import Footer from "@/components/Footer";
import BarraNagevacion from "../navbar";

export default function LayoutCliente({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BarraNagevacion />
      {children}
      <Footer />
    </>
  );
}