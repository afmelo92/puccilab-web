type OrdersLayoutProps = {
  children: React.ReactNode;
};

export default function OrdersLayout({ children }: OrdersLayoutProps) {
  return <section className="w-full h-full">{children}</section>;
}
