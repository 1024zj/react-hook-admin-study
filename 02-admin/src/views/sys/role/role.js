import React, { useState, useCallback, useEffect, useRef } from "react";
import "./role.css";
import { Breadcrumb, Button, Table, Modal, Input, Tree, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
export default function RoleHook(props) {

  const [roles, setRoles] = useState([]);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleAddModal, setVisibleAddModal] = useState(false);
  const [role, setRole] = useState({});


  const inputEditRoleRef = useRef();
  const inputAddRoleRef = useRef();


  const getRoleData = useCallback(

    async () => {
      //联网获得服务器数据
      const res = await props.http.getRolesList();
      //把当前的数据保存在当前状态
      setRoles(res.ob);
      console.log(res.ob)
      let newRole = { ...res.ob[0] }
      newRole.menus = [];
      setRole(newRole);
    }, [props.http]
  );

  const deleteRole = useCallback(
    async (id) => {
      //联网获得服务器数据
      const res = await props.http.deleteRole({ id: id });
      console.log(res)
      //把当前的数据保存在当前状态
      setRoles(res.ob);
    }, [props.http]
  );
  useEffect(() => {
    getRoleData();
    return () => {
      props.http.apiCancel();
    }
  }, [getRoleData, props.http])


  const addRole = () => {
    setVisibleAddModal(true)
  }

  const onAddRoleModalOk = async () => {

    let rolename = inputAddRoleRef.current.state.value;
    let menus = role.menus;
    if (typeof (rolename) === 'undefined' || rolename.length < 1) {
      message.warn("请输入角色名字！");
      return;
    }
    if (typeof (menus) === 'undefined') {
      message.warn("请选择权限！");
      return;
    }

    let res = await props.http.addRole({ rolename: rolename, menus: menus });
    setRoles(res.ob);
    inputAddRoleRef.current.state.value = "";
    let obj = { ...role };
    //修改被点击的节点
    obj.menus = [];
    setRole(obj)

  }

  const onAddRoleModalCancel = () => {
    setVisibleAddModal(false)
  }



  const onAddRoleTreeCheck = (value) => {
    //解构复制对象
    let obj = { ...role };
    //修改被点击的节点
    obj.menus = value;
    //修改整个数据
    setRole(obj);
  }




  const confirmDelete = (record) => {
    console.log(record)
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: "你正在删除【" + record.rolename + "】,请谨慎....",
      onOk() {
        deleteRole(record.id)
      },
      onCancel() {
      },
    });
  }

  const columns = [
    { title: '名称', dataIndex: 'rolename', key: 'rolename' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (text, record) => <div className="raw-box">{text === 1 ? "启动" : "禁用"}</div> },
    { title: '操作', dataIndex: 'operation', key: 'operation', render: (text, record) => <div className="raw-box" ><Button onClick={() => { showEditModal(record) }}>编辑</Button> <Button onClick={(text) => { confirmDelete(record) }}>删除</Button> </div> },

  ];

  const showEditModal = (role) => {

    if (typeof (inputEditRoleRef.current) !== 'undefined') {
      inputEditRoleRef.current.state.value = role.rolename;
    }
    setRole(role);
    setVisibleEditModal(true);

  }
  const onEditRoleModalOk = async () => {
    //获得角色ID
    let id = role.id;
    //获得角色名字
    let name = inputEditRoleRef.current.state.value;
    //获得权限
    let menus = role.menus;
    //联网修改后台数据
    const res = await props.http.updateRole({ id: id, rolename: name, menus: menus });
    //更新数据，进行页面渲染
    setRoles(res.ob);
    //关闭当前的modal
    setVisibleEditModal(false)
  }

  const onEditRoleModalCancel = () => {
    setVisibleEditModal(false)
  }

  const onEditTreeCheck = (value) => {
    //解构复制对象
    let obj = { ...role };
    //修改被点击的节点
    obj.menus = value;
    //修改整个数据
    setRole(obj);
  }


  return (
    <div className="role">

      <Breadcrumb>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>系统设置</Breadcrumb.Item>
        <Breadcrumb.Item>角色管理</Breadcrumb.Item>
      </Breadcrumb>

      <Button className="button-add" size="small" onClick={addRole}>添加角色</Button>


      <Modal
        maskClosable={false}
        title="添加角色2"
        visible={visibleAddModal}
        onOk={onAddRoleModalOk}
        onCancel={onAddRoleModalCancel}
        width={450}
        height={700}
      >
        <div className="modal-box">

          <div className="modal-raw"><div className="title">角色名称：</div><Input ref={inputAddRoleRef} className="input" /></div>
          <div className="modal-raw">
            <div className="title">添加权限：</div>
            {
              role.treeData ? (
                <Tree
                  checkable
                  checkedKeys={role.menus}
                  onCheck={onAddRoleTreeCheck}
                  treeData={role.treeData != null ? role.treeData : []}
                />
              ) : (
                  'loading tree'
                )
            }


          </div>

        </div>

      </Modal>


      <Modal
        maskClosable={false}
        title="编辑菜单"
        visible={visibleEditModal}
        onOk={onEditRoleModalOk}
        onCancel={onEditRoleModalCancel}
        width={450}
      >
        <div className="modal-box">
          <div className="modal-raw"><div className="title">角色名称：</div><Input defaultValue={role !== null ? role.rolename : ""} ref={inputEditRoleRef} className="input" /></div>
          <div className="modal-raw">
            {
              role.treeData ? (
                <Tree
                  checkable
                  checkedKeys={role.menus}
                  onCheck={onEditTreeCheck}
                  treeData={role.treeData != null ? role.treeData : []}
                />
              ) : (
                  'loading tree'
                )
            }
          </div>
        </div>

      </Modal>

      <Table
        className="table"
        columns={columns}
        dataSource={roles}
      />
    </div>
  );

}
