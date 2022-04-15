import React from "react";
import { useEffect, useState } from "react";
import {Card, Divider, Table,Button,  Popover} from "antd";
import Icon from '@ant-design/icons';
import { database } from "../../../../firebase/firebase";

const columns = [
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: text => <span className="gx-link">{text}</span>,
  },
  {
    title: 'LastName',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title:'phone',
    dataIndex:'mobile',
    key:'mobile'
  },{
    title: 'Usertype',
    dataIndex: 'usertype',
    key: 'usertype',
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
            <span className="gx-link">Delete</span>
      <Divider type="vertical"/>
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

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//   }
// ];


const Simple = () => {
  const [visible, setVisible] = useState(false);

  const hide = () => {
    setVisible(false)
  };
  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };



  const [users,setUsers] =  useState([])

    useEffect(()=>{
      database.ref("users").once("value", users => {
        let allUsers = [];
        users.forEach(user => {

          allUsers.push({...user.val(),id:user.key});
        });
        setUsers(()=>[...allUsers].filter(el=>el.usertype=="rider"&&el.approved==true))
      })
    },[])

    useEffect(()=>{
      console.log(users)
    },[users])
  return (
    <Card title="Rider">
      <Table className="gx-table-responsive" columns={columns} dataSource={users}/>
    </Card>
  );
};

export default Simple;
