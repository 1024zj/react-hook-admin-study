import React, { useRef } from "react";
import "./Home.css";
import { Layout } from "antd";
import Header from "../../components/Header/Header";
import Sider from "../../components/Sider/Sider";
import Content from "../../components/Content/Content";
import Footer from "../../components/Footer/Footer";

export default function Home(props) {
  const siderRef = useRef();

  const siderAction = (collapsed) => {
    siderRef.current.siderAction(collapsed)
  }


  return (
    <Layout className="container">
      <Sider ref={siderRef}>Sider</Sider>
      <Layout className="layout2">
        <Header
          headerProps={props}
          callback={siderAction} />
        <Content {...props}>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );

}
