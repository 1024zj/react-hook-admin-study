import React, { useEffect, useState, useCallback, useRef } from "react";
import { Breadcrumb, Button, Table, Modal, Input, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import "./menu.css"
const { confirm } = Modal;
const { Option } = Select;


function MenuHook(props) {

  const [menus, setMenus] = useState([]);
  const [menuAddModal, setMenuAddModal] = useState(false);
  const [menuEditModal, setMenuEditModal] = useState(false);
  const [editMenu, setEditMenu] = useState({});
  const [menu, setMenu] = useState({});

  const inputAddMenuRef = useRef();
  const inputEditMenuRef = useRef();



  const fetchData = useCallback(
    async () => {
      //联网获得服务器数据
      const res = await props.http.list();
      //把当前的数据保存在当前状态
      console.log(res.ob)
      setMenus(res.ob);
      setMenu({ pid: res.ob[0].id })
    }, [props.http]
  );

  useEffect(() => {
    fetchData();
    return () => {
      //props.http.apiCancel();
    }
  }, [fetchData]);



  const addMenu = () => {
    setMenuAddModal(true);
  }


  const confirmDelete = (dom) => {

    confirm({
      icon: <ExclamationCircleOutlined />,
      content: "你正在删除【" + dom.title + "】,请谨慎....",
      onOk() {
        deleteRaw(dom)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const deleteRaw = async (dom) => {
    //获得删除数据的id
    let id = dom.id
    //联网删除数据
    const res = await props.http.deleteMenu({ id: id });
    //重新设置数据
    setMenus(res.ob);
    setMenu(res.ob);
  }



  const columns = [
    { title: '名称', dataIndex: 'title', key: 'name' },
    { title: '类型', key: 'platform', render: (text, record) => <div className="raw-box" >{record.type !== 1 ? "目录" : "菜单"}</div> },
    { title: '', key: 'operation', render: (text, record) => <div className="raw-box" ><Button onClick={() => { showEditMenuModal(text, record) }}>编辑</Button>{record.type !== 1 ? <Button onClick={() => { confirmDelete(text) }}>删除</Button> : ""}</div> },
  ];

  const showEditMenuModal = (dom) => {

    setEditMenu(dom)
    setMenuEditModal(true);

  }
  const onMenuEditModalCancel = () => { setMenuEditModal(false); }

  const onMenuEditSelectChange = (value) => {
    setMenu({ pid: value })
  }

  const onMenuEditModalOk = async () => {
    setMenuEditModal(false);
    let id = editMenu.id;
    let value = inputEditMenuRef.current.state.value;

    if (typeof (value) === "undefined")
      return;

    let res = null
    if (editMenu.type === 1) {
      res = await props.http.updateMenu({ id: id, title: value, type: 1 });
    } else {
      res = await props.http.updateMenu({ id: id, pid: menu.pid, title: value, type: 2 });
    }

    if (res.code === 1) {
      const res = await props.http.list();
      setMenu(res.ob);
    }

  }
  const onMenuAddModalCancel = () => { setMenuAddModal(false); }

  const onMenuAddSelectChange = (value) => {
    setMenu({ pid: value })
  }
  const onMenuAddModalOk = async () => {
    const res = await props.http.addMenu({ pid: menu.pid, title: inputAddMenuRef.current.state.value, type: 2 });
    if (res.code === 1) {
      setMenus(res.ob);
    }
    setMenuAddModal(false);
  }



  return (
    <div className="menu-container">
      <Breadcrumb>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>系统设置</Breadcrumb.Item>
        <Breadcrumb.Item>菜单管理</Breadcrumb.Item>
      </Breadcrumb>

      <Button className="button-add" size="small" onClick={addMenu}>添加菜单</Button>

      <Modal
        title="添加菜单"
        visible={menuAddModal}
        onOk={onMenuAddModalOk}
        onCancel={onMenuAddModalCancel}
        width={450}
      >
        <div className="modal-box">
          <div className="modal-raw">
            <div className="title">菜单类别：</div>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder={menus[0] != null ? menus[0].title : "请选择"}
              onChange={onMenuAddSelectChange}
            >
              {menus.map(item => (
                <Option key={item.id} value={item.id}>{item.title}</Option>
              ))}
            </Select>
          </div>
          <div className="modal-raw"><div className="title">菜单名称：</div><Input ref={inputAddMenuRef} className="input" /></div>
        </div>
      </Modal>

      <Modal
        title="编辑菜单"
        visible={menuEditModal}
        onOk={onMenuEditModalOk}
        onCancel={onMenuEditModalCancel}
        width={450}
      >
        <div className="modal-box">

          {editMenu.type === 1 ? "" : <div className="modal-raw">
            <div className="title">菜单类别：</div>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder={menus[0] != null ? menus[0].title : "请选择"}
              onChange={onMenuEditSelectChange}
            >
              {menus.map(item => (
                <Option key={item.id} value={item.id}>{item.title}</Option>
              ))}
            </Select>
          </div>}


          <div className="modal-raw"><div className="title">菜单名称：</div><Input defaultValue={editMenu.title} ref={inputEditMenuRef} className="input" /></div>
        </div>
      </Modal>
      <Table
        className="table"
        columns={columns}
        dataSource={menus}
      />
    </div>
  );
}

export default MenuHook;
