import React from "react";
import {
  PlaySquareOutlined,
  CustomerServiceOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Link from "next/link";

const { Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  return (
    <Layout
      style={{ minHeight: "100vh", marginTop: "-1vh", marginLeft: "-2vh" }}
    >
      <Sider>
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        >
          <h1 className="titletext">Spotify Api</h1>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <HomeOutlined />
            <span>Home</span>
            <Link href="/"></Link>
          </Menu.Item>

          <Menu.Item key="2">
            <PlaySquareOutlined />
            <span>Categories</span>
            <Link href="/category"></Link>
          </Menu.Item>
          <Menu.Item key="3">
            <CustomerServiceOutlined></CustomerServiceOutlined>
            <span>Playlists</span>
            <Link href="/playlists"></Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <h1 className="fronttext">
              Welcome to my first Node.js/React.js application
            </h1>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Filip 2022</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
