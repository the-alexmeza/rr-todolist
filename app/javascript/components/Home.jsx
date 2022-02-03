import { Layout } from "antd";
import React from "react";
import Todos from "./Todos";
import Header from "./Header";

const { Content, Footer } = Layout;

export default () => (
  <Layout className="layout">
    <Header />
    <Content style={{ padding: "32px 50px 0 50px" }}>
      <div className="div site-layout-countent">
        <h1>To-Do List</h1>
        <Todos />
      </div>
    </Content>
    <Footer style={{ textAlign: "center" }}>A simple todo list.</Footer>
  </Layout>
);
