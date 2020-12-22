import React from "react";
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";
import "./Content.css";
import routes2 from "./route2";

const { Content } = Layout;


export default function MyContent(props) {
  return (
    <Content className="ContentBox">
      <Switch>
        {routes2.map((item, index) => {
          return (<Route key={index} exact path={item.path} component={() => { return <item.component {...props} /> }} />);
        })}
      </Switch>
    </Content>
  );

}
