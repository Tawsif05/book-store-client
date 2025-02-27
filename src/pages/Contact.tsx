import { Button, Form, Input, Row, Col } from "antd";

const Contact = () => {
  const [form] = Form.useForm();

  return (
    <Row
      justify="center"
      align="middle"
      style={{ height: "100vh", padding: "0 20px" }}
    >
      <Col xs={24} sm={18} md={12} lg={10} xl={8}>
        
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold">We would love to hear from you.</h2>
          <p className="text-xl text-[#555] mt-5">Feel free to give any information and opinion!</p>
        </div>

        <Form form={form} layout="vertical">
          <Form.Item
            label="Enter your name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Enter your email address"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: "Please input your message!" }]}
          >
            <Input.TextArea size="large" rows={4} />
          </Form.Item>

          <Form.Item>
            <Button  htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Contact;
