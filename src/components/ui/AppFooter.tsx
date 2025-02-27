import { Layout, Typography, Row, Col, Space } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Link, Text, Title } = Typography;

const AppFooter = () => {
  return (
    <Footer style={{ backgroundColor: "#1E293B", color: "#FFFFFF", padding: "40px 20px" }}>
      <Row justify="center" gutter={[32, 32]}>
        {/* Services */}
        <Col xs={24} sm={12} md={6}>
          <Title level={5} style={{ color: "#FFFFFF" }}>Services</Title>
          <Space direction="vertical">
            <Link href="#" style={{ color: "#CBD5E1" }}>Branding</Link>
            <Link href="#" style={{ color: "#CBD5E1" }}>Design</Link>
            <Link href="#" style={{ color: "#CBD5E1" }}>Marketing</Link>
            <Link href="#" style={{ color: "#CBD5E1" }}>Advertisement</Link>
          </Space>
        </Col>

        {/* Company */}
        <Col xs={24} sm={12} md={6}>
          <Title level={5} style={{ color: "#FFFFFF" }}>Company</Title>
          <Space direction="vertical">
            <Link href="#" style={{ color: "#CBD5E1" }}>About us</Link>
            <Link href="#" style={{ color: "#CBD5E1" }}>Contact</Link>
            <Link href="#" style={{ color: "#CBD5E1" }}>Jobs</Link>
            <Link href="#" style={{ color: "#CBD5E1" }}>Press kit</Link>
          </Space>
        </Col>

        {/* Legal */}
        <Col xs={24} sm={12} md={6}>
          <Title level={5} style={{ color: "#FFFFFF" }}>Legal</Title>
          <Space direction="vertical">
            <Link href="#" style={{ color: "#CBD5E1" }}>Terms of use</Link>
            <Link href="#" style={{ color: "#CBD5E1" }}>Privacy policy</Link>
            <Link href="#" style={{ color: "#CBD5E1" }}>Cookie policy</Link>
          </Space>
        </Col>
      </Row>

      {/* Bottom Section */}
      <Row justify="space-between" align="middle" style={{ marginTop: "40px", borderTop: "1px solid #334155", paddingTop: "20px" }}>
        {/* Company Info */}
        <Col xs={24} sm={12}>
          <Text style={{ color: "#CBD5E1" }}>
            ACME Industries Ltd. <br /> Providing reliable tech since 1992
          </Text>
        </Col>

        {/* Social Icons */}
        <Col xs={24} sm={12} style={{ textAlign: "right" }}>
          <Space size="large">
            <Link href="#" style={{ color: "#FFFFFF", fontSize: "20px" }}>
              <FacebookOutlined />
            </Link>
            <Link href="#" style={{ color: "#FFFFFF", fontSize: "20px" }}>
              <TwitterOutlined />
            </Link>
            <Link href="#" style={{ color: "#FFFFFF", fontSize: "20px" }}>
              <YoutubeOutlined />
            </Link>
          </Space>
        </Col>
      </Row>
    </Footer>
  );
};

export default AppFooter;
