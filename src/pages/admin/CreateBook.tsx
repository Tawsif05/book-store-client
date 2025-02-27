import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Form, Select, Upload, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCreateBookMutation } from "../../redux/features/products/productApi";
import BForm from "../../components/form/BForm";
import BInput from "../../components/form/BInput";
import { toast } from "sonner";

const { Option } = Select;

// Category Options
const categoryOptions = [
  "Fiction", "Non-Fiction", "Science", "History", "Biography", "Children", "Nature"
];

// In Stock Options
const inStockOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false }
];

// ✅ Cloudinary-তে ফাইল আপলোড করার ফাংশন
const uploadToCloudinary = async (file: File): Promise<string | null> => {
  try {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary config is missing");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to upload");
    }

    return data.secure_url; // ✅ Cloudinary থেকে পাওয়া ইমেজের URL
  } catch (error) {
    console.error("Upload Error:", error);
    return null;
  }
};

const CreateBook = () => {
  const [addBook] = useCreateBookMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Uploading Image...");
    
    let imgUrl = "";
    if (data.file) {
      imgUrl = await uploadToCloudinary(data.file) as string;
      
    }

    console.log("This is imgUrl", imgUrl);

    if (!imgUrl) {
      toast.error("Image upload failed!", { id: toastId });
      return;
    }

    toast.success("Image uploaded successfully!", { id: toastId });

    const formData = {
      title: data.title,
      author: data.author,
      category: data.category,
      description: data.description,
      price: Number(data.price),
      quantity: Number(data.quantity),
      inStock: data.inStock,
      imgUrl: imgUrl || "",
    };
    console.log("This is final form data", formData);
    toast.loading("Creating Book...", { id: toastId });
    await addBook(formData);
    toast.success("Book created successfully!", { id: toastId });
  };

  return (
    <div className="mx-20 mt-4">
      <BForm onSubmit={onSubmit}>
        <h2 className="text-xl font-bold text-center">Book Details</h2>

        <BInput type="text" name="title" label="Book Title" />
        <BInput type="text" name="author" label="Author" />

        {/* Category Field */}
        <Controller
          name="category"
          render={({ field }) => (
            <Form.Item label="Category">
              <Select {...field} placeholder="Select a category">
                {categoryOptions.map((category) => (
                  <Option key={category} value={category}>{category}</Option>
                ))}
              </Select>
            </Form.Item>
          )}
        />

        {/* Description Field */}
        <Controller
          name="description"
          render={({ field }) => (
            <Form.Item label="Description">
              <Input.TextArea {...field} placeholder="Enter book description" rows={4} />
            </Form.Item>
          )}
        />

        <BInput type="number" name="price" label="Price" />
        <BInput type="number" name="quantity" label="Quantity" />

        {/* In Stock Field */}
        <Controller
          name="inStock"
          render={({ field }) => (
            <Form.Item label="In Stock">
              <Select {...field} placeholder="Select availability">
                {inStockOptions.map((option) => (
                  <Option key={option.value.toString()} value={option.value}>{option.label}</Option>
                ))}
              </Select>
            </Form.Item>
          )}
        />

        {/* File Upload Field */}
        <Controller
          name="file"
          render={({ field }) => (
            <Form.Item label="Upload File">
              <Upload
                beforeUpload={(file) => {
                  field.onChange(file);
                  return false; // Prevent default upload
                }}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          )}
        />

        <Button className="mb-4" htmlType="submit">Create Book</Button>
      </BForm>
    </div>
  );
};

export default CreateBook;
