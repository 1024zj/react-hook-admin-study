import React, { useState, useImperativeHandle, forwardRef } from "react";
import "./Sider.css";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const { Sider } = Layout;
const { SubMenu } = Menu;
function MySider(props, ref) {

  const [collapsed, setCollapsed] = useState(false);

  useImperativeHandle(ref, () => ({
    siderAction: (collapsed) => {
      setCollapsed(collapsed);
    }
  }));


  return (
    <Sider collapsible collapsed={collapsed} className="SiderBox">

      <div className="title">
        后台管理
        </div>
      <Menu defaultSelectedKeys={["1"]} mode="inline">
        <SubMenu
          key="sub1"
          title={
            <span>
              <span>系统设置</span>
            </span>
          }
        >
          <Menu.Item key="/sys/menu">
            <Link to={"/sys/menu"}>
              <span>菜单管理</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="/add">
            <Link to={"/sys/role"}>
              <span>角色管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/user">
            <Link to={"/sys/user"}>
              <span>管理员管理</span>
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="sub2"
          title={
            <span>
              <span>商城管理</span>
            </span>
          }
        >
          <Menu.Item key="/home">
            <Link to={"/home"}>

              <span>商品分类</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="/add">
            <Link to={"/home/add"}>
              <span>商品规格</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="/add">
            <Link to={"/home/add"}>
              <span>商品管理</span>
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );

}

export default forwardRef(MySider);