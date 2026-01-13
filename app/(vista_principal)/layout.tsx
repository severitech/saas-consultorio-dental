import LayoutCliente from "@/components/Layout/LayoutCliente";

export default function VistaClienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutCliente>{children}</LayoutCliente>;
}
