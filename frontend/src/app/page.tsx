import { OrderProvider } from "@/components/orders/OrderContext";
import OrdersHome from "@/components/orders/OrdersHome";

export default function Home() {
  return (
    <OrderProvider>
      <OrdersHome />
    </OrderProvider>
  );
}
