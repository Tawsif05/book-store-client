/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Button, Spin, Tag } from "antd";
import {
  useDeleteBookMutation,
  useGetAllProductQuery,
} from "../../redux/features/products/productApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UpdateDelete = () => {
  // Fetch all products
  const { data: products, isLoading, refetch } = useGetAllProductQuery({});
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const navigate = useNavigate();

  const handleDelete = async (bookId: string) => {
    const toastId = "toast";
    try {
      toast.loading("Deleting book...", { id: toastId });
      await deleteBook(bookId).unwrap();
      toast.success("Book deleted successfully!", { id: toastId });
      refetch();
    } catch (error) {
      toast.error("Failed to delete book");
    }
  };

  // Table Columns
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Price (৳)",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `৳ ${price.toFixed(2)}`,
    },
    {
      title: "In Stock",
      dataIndex: "inStock",
      key: "inStock",
      render: (inStock: boolean) => (
        <Tag color={inStock ? "green" : "red"}>{inStock ? "Yes" : "No"}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: any) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            onClick={() => navigate(`/admin/update/${record._id}`)}
          >
            Update
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record._id)}
            loading={isDeleting}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:mx-16">
      <h2 className="text-xl font-bold mb-4 text-center">Manage Products</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Spin size="large" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={products?.data?.result || []}
            rowKey={(record) => record._id}
            pagination={{ pageSize: 10 }}
            className="min-w-[600px] sm:min-w-full"
          />
        </div>
      )}
    </div>
  );
};

export default UpdateDelete;
