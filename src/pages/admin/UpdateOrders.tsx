/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Select, Button, Card } from "antd";
import { useUpdateOrderMutation, useGetOrderByIdQuery } from "../../redux/features/order/orderApi";
import { toast } from "sonner";

const { Option } = Select;

const UpdateOrders = () => {
  const {id} = useParams<{ id: string }>(); 
  
  const navigate = useNavigate();
  
  
  const { data: orderData } = useGetOrderByIdQuery(id);
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();

  const [status, setStatus] = useState(orderData?.data?.status || "Pending");

  const handleUpdate = async () => {
    const toastId = "toast"
    try {
      toast.loading("Order Updating..", {id: toastId});
      await updateOrder({ id, status }).unwrap();
      toast.success("Order status updated successfully", {id: toastId});
      navigate("/admin/orders");
    } catch (error) {
      toast.error("Failed to update order status!", {id: toastId})
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card title="Update Order Status" className="w-96 shadow-lg">
        <Form layout="vertical">
          <Form.Item label="Order ID">
            <span className="font-semibold">{id}</span>
          </Form.Item>

          <Form.Item label="Status">
            <Select value={status} onChange={setStatus}>
              <Option value="Pending">Pending</Option>
              <Option value="Paid">Paid</Option>
              <Option value="Shipped">Shipped</Option>
              <Option value="Completed">Completed</Option>
              <Option value="Cancelled">Cancelled</Option>
            </Select>
          </Form.Item>

          <Button type="primary" onClick={handleUpdate} loading={isUpdating} block>
            Update Status
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateOrders;
