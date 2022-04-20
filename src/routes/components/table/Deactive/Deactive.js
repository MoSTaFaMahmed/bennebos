import React, {useEffect, useState } from 'react';
import {Card, Divider, Table,Button,  Popover, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import { database } from "../../../../firebase/firebase";
import { AudioMutedOutlined } from '@ant-design/icons';
import SweetAlert from "react-bootstrap-sweetalert";
import IntlMessages from "util/IntlMessages";


const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Deactive = () => {
  const [users,setUsers] =  useState([])
  useEffect(()=>{
    database.ref("users").once("value", users => {
      let allUsers = [];
      users.forEach(user => {

        allUsers.push({...user.val(),id:user.key});
      });
      setUsers(()=>[...allUsers].filter(el=>el.approved==false))
    })
  },[users])
  const[panState,setPanState]=useState(false);
  const[userInfo,setUserInfo]=useState({});
 const deleteFile =async () => {
  const user=database.ref(`users/${userInfo.id}`);
   await user.update({...userInfo,approved:true})
  setPanState(false)
                          };
  const onCancelDelete = () => {
    setPanState(false)
    };
  const [form] = Form.useForm();

  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      firstName: '',
      lastName: '',
      email: '',
      usertype:'',
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...users];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setUsers(newData);
        const user=database.ref(`users/${id}`)
        await user.update({...users[index],...row})
        setEditingKey('');
      } else {
        newData.push(row);
        setUsers(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
      editable: true,
      render: text => <span className="gx-link">{text}</span>,
    },
    {
      title: 'LastName',
      dataIndex: 'lastName',
      key: 'lastName',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      editable: true,
    },
    {
      title: 'Usertype',
      dataIndex: 'usertype',
      key: 'usertype',
      editable: true,
    },

    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {

        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            <Button type='primary'
                ><IntlMessages  id="Edit"/></Button>
          </Typography.Link>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',

      render: (text, record) => (
        <>

        <Popover
          content={
         <>
          <div><b >FirstName</b> <Divider type="vertical"/>{record.firstName}</div>
          <div><b>LastName</b><Divider type="vertical"/> {record.lastName}</div>
          <div><b>Phone</b> <Divider type="vertical"/>{record.mobile}</div>
          <div><b>Email</b> <Divider type="vertical"/>{record.email}</div>
          <div><b>carType</b> <Divider type="vertical"/>{record.carType}</div>
          <div><b>vehicleMake</b><Divider type="vertical"/> {record.vehicleMake}</div>
           <div><b>vehicleModel</b><Divider type="vertical"/> {record.vehicleModel}</div>
          <div><b>vehicleNumber</b><Divider type="vertical"/> {record.vehicleNumber}</div>
                 </>
        }


          title={<p>More Details About <Divider type="vertical"/> <b>{record.firstName}</b> </p>}

          trigger="click"

        >
          <Button type="primary">More Info</Button>
        </Popover>
        <Divider type="vertical"/>
        <Button  type="primary" onClick={() => {
                  setPanState(true)
                  setUserInfo(record)
                }}><IntlMessages id="Active"/></Button>



        <SweetAlert show={panState}
                    panState
                    showCancel
                    confirmBtnText={<IntlMessages id="Confirm"/>}
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title={<h1>DeActive {userInfo.firstName}!</h1>}
                    onConfirm={deleteFile}
                    onCancel={onCancelDelete}
        >
          <IntlMessages id="Are You Sure ?"/>
        </SweetAlert>
        {/* <span>
        <span className="gx-link">View 一 {record.firstName}</span>
        <Divider type="vertical"/>
              <span className="gx-link">Delete</span>
        <Divider type="vertical"/>
        <span className="gx-link ant-dropdown-link">
          More actions <Icon type="down"/>
        </span>
      </span> */}
      </>
      ),
    }
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex ===  'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Card title="De-Active Users ">
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={users}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
    </Card>
  );
};

export default Deactive;
