/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table } from "antd";

import { useCreateOrderMutation } from "../redux/features/order/orderApi";
import { useSelector } from "react-redux";
import BInput from "../components/form/BInput";
import BForm from "../components/form/BForm";
import { toast } from "sonner";
import { useEffect } from "react";

const CheckoutForm = () => {
  const [createOrder, { isLoading, isSuccess, data, isError, error }] =
    useCreateOrderMutation();
  const cart = useSelector((state: any) => state.cart);
  console.log(cart);
  const cartArr = cart.items;
  const totalPrice = cartArr.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const onSubmit = async (formData: any) => {
    const orderData = {
      ...formData,
      products: cartArr.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      totalPrice,
    };

    await createOrder(orderData);
  };

  const toastID = "cart";
  useEffect(() => {
    if (isLoading) toast.loading("Processing..", { id: toastID });

    if (isSuccess) {
      toast.success(data?.message, { id: toastID });

      if (data?.data) {
        setTimeout(() => {
          window.location.href = data?.data;
        }, 1000);
      }
    }

    if (isError) {
      toast.error(JSON.stringify(error), { id: toastID });
    }
  }, [data?.data, data?.message, error, isError, isLoading, isSuccess]);

  const columns = [
    { title: "Product", dataIndex: "name", key: "name" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price} Taka`,
    },
  ];

  return (
    <div className="mx-20 my-10">
      <h1 className="text-center text-2xl font-bold">Information form</h1>
      <BForm onSubmit={onSubmit}>
        {/* 🧑 User Details */}
        <BInput type="text" name="name" label="Full Name" />
        <BInput type="email" name="email" label="Email" />
        <BInput type="tel" name="phone" label="Phone Number" />
        <BInput type="text" name="address" label="Address" />
        <BInput type="text" name="city" label="City" />

        {/* 🛍 Product List Table */}
        <h3 className="mb-6">🛒 Order Summary</h3>
        <Table
          columns={columns}
          dataSource={cartArr.map((item: any) => ({
            key: item.productId,
            name: item.title,
            quantity: item.quantity,
            price: item.price * item.quantity,
          }))}
          pagination={false}
          bordered
        />
        <h3 className="font-bold" style={{ marginTop: "10px" }}> Total: {totalPrice} Taka</h3>

        <Button type="primary" htmlType="submit" className="mt-4 w-full">
          Order Now
        </Button>
      </BForm>
    </div>
  );
};

export default CheckoutForm;
