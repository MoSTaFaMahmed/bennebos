import React from "react";
import { useEffect, useState } from "react";
import {Card, Table} from "antd";
import { database } from "../../../../firebase/firebase";
const columns = [{
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
}];
// rowSelection object indicates the need for row selection

// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//   },
//   getCheckboxProps: record => ({
//     disabled: record.name === 'Disabled User', // Column configuration not to be checked
//     name: record.name,
//   }),
// };

const CustomSelection = () => {
  const [users,setUsers] =  useState([])

    useEffect(()=>{
      database.ref("users").once("value", users => {
        let allUsers = [];
        users.forEach(user => {

          allUsers.push({...user.val(),id:user.key});
        });
        setUsers(()=>[...allUsers].filter(el=>el.usertype=="driver"))
      })
    },[])


  return (
    <Card title="Driver">
      <Table className="gx-table-responsive" columns={columns} dataSource={users}/>
      {/* <Table className="gx-table-responsive" rowSelection={rowSelection} columns={columns} dataSource={data}/> */}
    </Card>
  );
};

export default CustomSelection;
