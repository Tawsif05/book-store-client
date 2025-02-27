import { Table, Spin, Card } from "antd";
import { useGetMeQuery } from "../redux/features/auth/authApi";
import { useGetOrdersByUserQuery } from "../redux/features/order/orderApi";
import { useGetAllProductQuery } from "../redux/features/products/productApi";

const OrdersPage = () => {
  // Fetch logged-in user data
  const { data: user, isLoading: userLoading } = useGetMeQuery(undefined);

  // Fetch orders for this user
  const { data: orders, isLoading: ordersLoading } = useGetOrdersByUserQuery(user?.data?._id, {
    skip: !user?.data?._id, // Skip query if user ID is not available
  });

  // Fetch all products (to match product names)
  const { data: productsData, isLoading: productsLoading } = useGetAllProductQuery(undefined);

  // Show loading spinner if data is fetching
  if (userLoading || ordersLoading || productsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  // Convert products array to object for quick lookup
  const productMap: Record<string, string> = {};
  productsData?.data?.result?.forEach(product => {
    productMap[product._id] = product.name;
  });

  // Format orders for table
  const formattedOrders = orders?.data?.map(order => ({
    key: order._id,
    orderId: order._id,
    products: order.products.map(p => productMap[p.productId] || "Unknown Product").join(", "), // ✅ Product Name Instead of ID
    totalPrice: `${order.totalPrice} Taka`,
    status: order.status,
    transactionStatus: order.transaction?.bank_status || "N/A",
    transactionMethod: order.transaction?.method || "N/A",
    createdAt: new Date(order.createdAt).toLocaleString(),
  })) || [];

  // Table columns setup
  const columns = [
    { title: "Order ID", dataIndex: "orderId", key: "orderId" },
    { title: "Products", dataIndex: "products", key: "products" },
    { title: "Total Price", dataIndex: "totalPrice", key: "totalPrice" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Transaction Status", dataIndex: "transactionStatus", key: "transactionStatus" },
    { title: "Transaction Method", dataIndex: "transactionMethod", key: "transactionMethod" },
    { title: "Order Date", dataIndex: "createdAt", key: "createdAt" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card title="My Orders" className="w-full max-w-6xl">
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={formattedOrders}
            pagination={{ pageSize: 5 }}
            bordered
            scroll={{ x: "max-content" }}
          />
        </div>
      </Card>
    </div>
  );
};

export default OrdersPage;
