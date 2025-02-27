import { useSearchParams } from "react-router-dom";
import { Card, Row, Col, Badge, Spin } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useVerifyOrderQuery } from "../redux/features/order/orderApi";

export default function VerifyOrder() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id") || "";

  const { isLoading, data } = useVerifyOrderQuery(orderId, {
    refetchOnMountOrArgChange: true,
  });

  const orderData = data?.data?.[0];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order Verification</h1>
      {isLoading ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {/* Order Details */}
          <Col xs={24} md={12}>
            <Card title="Order Details">
              <p>
                <strong>Order ID:</strong> {orderData?.order_id || "N/A"}
              </p>
              <p>
                <strong>Amount:</strong> {orderData?.currency}{" "}
                {orderData?.amount?.toFixed(2) || "0.00"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <Badge
                  status={
                    orderData?.bank_status === "Success" ? "success" : "error"
                  }
                  text={orderData?.bank_status}
                />
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {orderData?.date_time
                  ? new Date(orderData.date_time).toLocaleString()
                  : "N/A"}
              </p>
            </Card>
          </Col>

          {/* Payment Information */}
          <Col xs={24} md={12}>
            <Card title="Payment Information">
              <p>
                <strong>Method:</strong> {orderData?.method || "N/A"}
              </p>
              <p>
                <strong>Transaction ID:</strong>{" "}
                {orderData?.bank_trx_id || "N/A"}
              </p>
              <p>
                <strong>Invoice No:</strong> {orderData?.invoice_no || "N/A"}
              </p>
              <p>
                <strong>SP Code:</strong> {orderData?.sp_code || "N/A"}
              </p>
              <p>
                <strong>SP Message:</strong> {orderData?.sp_message || "N/A"}
              </p>
            </Card>
          </Col>

          {/* Customer Information */}
          <Col xs={24} md={12}>
            <Card title="Customer Information">
              <p>
                <strong>Name:</strong> {orderData?.name || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {orderData?.email || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {orderData?.phone_no || "N/A"}
              </p>
              <p>
                <strong>Address:</strong> {orderData?.address || "N/A"}
              </p>
              <p>
                <strong>City:</strong> {orderData?.city || "N/A"}
              </p>
            </Card>
          </Col>

          {/* Verification Status */}
          <Col xs={24} md={12}>
            <Card title="Verification Status">
              <div className="flex items-center gap-2">
                {orderData?.is_verify === 1 ? (
                  <>
                    <CheckCircleOutlined style={{ color: "green" }} />
                    <span>Verified</span>
                  </>
                ) : (
                  <>
                    <ExclamationCircleOutlined style={{ color: "red" }} />
                    <span>Not Verified</span>
                  </>
                )}
              </div>
            </Card>
            
          </Col>
        </Row>
      )}
    </div>
  );
}
