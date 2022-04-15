import React from "react";
import { useEffect, useState } from "react";
import {Card, Table} from "antd";
import { database } from "../../../../firebase/firebase";
 const columns =[{
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
}]
const Admin = () => {
  const [users,setUsers] =  useState([])

  useEffect(()=>{
    database.ref("users").once("value", users => {
      let allUsers = [];
      users.forEach(user => {

        allUsers.push({...user.val(),id:user.key});
      });
      setUsers(()=>[...allUsers].filter(el=>el.usertype=="admin"))
    })
  },[])

  useEffect(()=>{
    console.log(users)
  },[users])
  return (
    <>

    <Card title="Admin">
      {/* <h4>Middle size table</h4> */}
      <Table className="gx-table-responsive" columns={columns} dataSource={users} size="middle"/>
      {/* <h4>Small size table</h4>
      <Table className="gx-table-responsive" columns={columns} dataSource={data} size="small"/> */}
    </Card>
    </>
  );
};

export default Admin;
