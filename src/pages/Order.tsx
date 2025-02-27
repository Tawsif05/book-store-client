import { Table, Spin, Badge, Card } from "antd";
import { useGetOrdersQuery } from "../redux/features/order/orderApi";

export interface Transaction {
  id: string;
  transactionStatus: string | null;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
}

export interface Product {
  product: string;
  quantity: number;
  _id: string;
}

export interface Order {
  transaction: Transaction;
  _id: string;
  user: string;
  products: Product[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function OrderDetails() {
  const { isLoading, data } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const orderData: Order[] = data?.data;


  const columns = [
    {
      title: "Order ID",
      dataIndex: ["transaction", "id"],
      key: "_id",
    },
    {
      title: "User ID",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge
          status={status === "Pending" ? "warning" : "success"}
          text={status}
        />
      ),
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <Card title="Order Details" className="m-4 p-4">
      {isLoading ? (
        <Spin size="large" className="flex justify-center" />
      ) : (
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={orderData}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }} 
          />
        </div>
      )}
    </Card>
  );
}
