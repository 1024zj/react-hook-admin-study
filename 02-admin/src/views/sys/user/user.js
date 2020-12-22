import React, { useState, useCallback, useEffect } from "react";
import "./user.css";
import { Breadcrumb, Button, Table, Modal, Input, Select, Tag, Form } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { Option } = Select;
const { confirm } = Modal;

export default function UserHook(props) {

  const [userList, setUserList] = useState([]);
  const [visibleAddUser, setVisibleAddUser] = useState(false);
  const [role, setRole] = useState(null);


  const [form] = Form.useForm();


  const getUserList = useCallback(

    async () => {
      //联网获得服务器数据
      const res = await props.http.getUserList();
      //把当前的数据保存在当前状态
      setUserList(res.ob);
      console.log(res.ob)
    }, [props.http]
  );

  const deleteUser = useCallback(
    async (id) => {
      //联网获得服务器数据
      const res = await props.http.deleteUser({ id: id });
      //更新用户列表
      setUserList(res.ob);


    }, [props.http]
  );
  useEffect(() => {
    getUserList();
    return () => {
      props.http.apiCancel();
    }
  }, [getUserList, props.http])


  const addUser = async () => {
    if (role == null) {
      let res = await props.http.getRolesList();
      setRole(res.ob)
    }
    setVisibleAddUser(true)
  }

  const onAddUserModalOk = async () => {

    //获得表单数据
    let values = await form.validateFields();
    console.log(values)
    let res = await props.http.addUser(values);

    setUserList(res.ob);


    form.resetFields();



    // let username = inputAddUserRef.current.state.value;
    // let menus = role.id;
    // if (typeof (username) === 'undefined' || username.length < 1) {
    //   message.warn("请输入角色名字！");
    //   return;
    // }
    // if (typeof (menus) === 'undefined') {
    //   message.warn("请选择权限！");
    //   return;
    // }

    // let res = await props.http.addRole({ username: username, menus: menus });

    // inputAddUserRef.current.state.value = "";
    // let obj = { ...role };
    // //修改被点击的节点
    // obj.menus = [];
    // setRole(obj)

  }

  const onAddUserModalCancel = () => {
    setVisibleAddUser(false)
  }

  const confirmDelete = (record) => {
    console.log(record)
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: "你正在删除【" + record.username + "】,请谨慎....",
      onOk() {
        deleteUser(record.id)
      },
      onCancel() {
      },
    });
  }

  const columns = [
    { title: '用户名', dataIndex: 'name', key: 'name' },
    { title: '角色', dataIndex: 'roleName', key: 'roleName', render: (text) => <div><Tag color="volcano">{text}</Tag></div> },
    { title: '状态', dataIndex: 'status', key: 'status', render: (text, record) => <div className="raw-box">{text === 1 ? "启动" : "禁用"}</div> },
    { title: '操作', dataIndex: 'operation', key: 'operation', render: (text, record) => <div className="raw-box" ><Button onClick={(text) => { confirmDelete(record) }}>删除</Button> </div> },

  ];






  return (
    <div className="role">

      <Breadcrumb>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>系统设置</Breadcrumb.Item>
        <Breadcrumb.Item>管理员管理</Breadcrumb.Item>
      </Breadcrumb>

      <Button className="button-add" onClick={addUser}>添加用户</Button>


      <Modal
        maskClosable={false}
        title="添加用户"
        visible={visibleAddUser}
        onOk={onAddUserModalOk}
        onCancel={onAddUserModalCancel}
        width={450}
        height={700}
      >
        <div className="modal-box">

          <Form
            form={form}
          >

            <Form.Item
              name="roleid"
              rules={[{ required: true, message: '请选择你的角色!' }]}
              label="请选择角色："
            >

              <Select
                showSearch
                style={{ width: 260 }}

              >
                {role != null ? role.map(item => (
                  <Option key={item.id} value={item.id}>{item.rolename}</Option>
                )) : "加载中"}
              </Select>

            </Form.Item>
            <Form.Item
              name="name"
              className="Item"
              label="用户名"
              rules={[{
                required: true,
                whitespace: true,
                message: "用户名必须输入,不能有空格"
              },
              {
                min: 4,
                message: "用户名不能小于4位"
              },
              {
                max: 11,
                message: "用户名不能大于12位"
              },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: "用户名必须是英文数字下划线",
              },
              ]}>
              <Input
                className="input"
                placeholder="请输入用户名称"
              />
            </Form.Item>

            <Form.Item
              name="passwd"
              className="Item"
              label="用户密码："
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "密码必须输入,不能有空格",
                },
                { min: 6, message: "密码不能小于6位" },
                { max: 12, message: "密码不能大于12位" },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: "密码必须是英文数字下划线",
                },
              ]}
            >

              <Input
                className="input"
                placeholder="请输入用户密码"
              />
            </Form.Item>
          </Form>

        </div>

      </Modal>

      <Table
        className="table"
        columns={columns}
        dataSource={userList}
      />
    </div>
  );

}
