import { FieldValues } from "react-hook-form";
import { Button, Form, Select, Upload, Input, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useGetProductByIdQuery, useUpdateBookMutation } from "../../redux/features/products/productApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const { Option } = Select;

const categoryOptions = ["Fiction", "Non-Fiction", "Science", "History", "Biography", "Children", "Nature"];
const inStockOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];



const UpdateBook = () => {
  const { productId } = useParams();
  const { data: bookData, isLoading } = useGetProductByIdQuery(productId);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (bookData?.data) {
      form.setFieldsValue({
        title: bookData.data.title,
        author: bookData.data.author,
        category: bookData.data.category,
        description: bookData.data.description,
        price: bookData.data.price,
        quantity: bookData.data.quantity,
        inStock: bookData.data.inStock,
      });
    }
  }, [bookData, form]);

  const onSubmit = async (values: FieldValues) => {
    const toastId = "toast"
    
    const formData = new FormData();
    formData.append("data", JSON.stringify(values));

    if (values.file) {
      formData.append("file", values.file);
    }

    try {
      toast.loading("Updating Book...", {id: toastId});
      await updateBook({ id: productId, data: formData }).unwrap();
      toast.success("Book updated successfully!", {id: toastId});
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update book",);
    }
  };

  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="mx-20 mt-4">
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <h2 className="text-xl font-bold text-center">Update Book</h2>

        <Form.Item label="Book Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Author" name="author">
          <Input />
        </Form.Item>

        {/* Category */}
        <Form.Item label="Category" name="category">
          <Select placeholder="Select a category">
            {categoryOptions.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Description */}
        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Enter book description" rows={4} />
        </Form.Item>

        <Form.Item label="Price" name="price">
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Quantity" name="quantity">
          <Input type="number" />
        </Form.Item>

        {/* In Stock */}
        <Form.Item label="In Stock" name="inStock">
          <Select placeholder="Select availability">
            {inStockOptions.map((option) => (
              <Option key={option.value.toString()} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* File Upload */}
        <Form.Item label="Upload File" name="file">
          <Upload
            beforeUpload={(file) => {
              form.setFieldsValue({ file });
              return false;
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Button className="mb-4" htmlType="submit" loading={isUpdating}>
          Update Book
        </Button>
      </Form>
    </div>
  );
};

export default UpdateBook;
