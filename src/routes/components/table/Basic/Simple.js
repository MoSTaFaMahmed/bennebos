import React from "react";
import { useEffect, useState } from "react";
import {Card, Divider, Table} from "antd";
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
    title: 'Usertype',
    dataIndex: 'usertype',
    key: 'usertype',
  }

  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (text, record) => (
  //     <span>
  //     <span className="gx-link">Action 一 {record.firstName}</span>
  //     <Divider type="vertical"/>
  //     <span className="gx-link">Delete</span>
  //     <Divider type="vertical"/>
  //     <span className="gx-link ant-dropdown-link">
  //       More actions <Icon type="down"/>
  //     </span>
  //   </span>
  //   ),
  // }
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
  const [users,setUsers] =  useState([])

    useEffect(()=>{
      database.ref("users").once("value", users => {
        let allUsers = [];
        users.forEach(user => {

          allUsers.push({...user.val(),id:user.key});
        });
        setUsers(()=>[...allUsers].filter(el=>el.usertype=="rider"))
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
