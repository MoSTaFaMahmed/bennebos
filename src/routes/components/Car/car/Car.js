import React from "react";
import { useEffect, useState } from "react";
import {Card, Divider, Table,Button,  Popover,Image} from "antd";
import { database } from "../../../../firebase/firebase";
import SweetAlert from "react-bootstrap-sweetalert";
import IntlMessages from "util/IntlMessages";



const Car = () => {

  const columns = [
    {
      title: 'Vehicle',
      key: 'action',
      width: 100,

      render: (text, record) => (
        <>
 <Popover
          content={
         <>
          <div><b >Base_fare</b> <Divider type="vertical"/>{record.base_fare}</div>
          <div><b >CreatedAt</b> <Divider type="vertical"/>{record.createdAt}</div>
          <div><b >Rate_per_hour</b> <Divider type="vertical"/>{record.rate_per_hour}</div>

                 </>
        }


          title={<p>More Details About <Divider type="vertical"/> <b>{record.name}</b> </p>}

          trigger="click"

        >
          <Button type="primary">Vehicle Info</Button>
        </Popover>
        <Image
      width={200}
      src={record.image}
    />
       </>
      ),
    },
    {
      title:'name',
      dataIndex:'name',
      key:'name',

      width: 200,

    },
    {
      title: 'Convenience_fee_type',
      dataIndex: 'convenience_fee_type',
      key: 'convenience_fee_type',
    },



  ];




  const [users,setUsers] =  useState([])

    useEffect(()=>{
      database.ref("cartypes").once("value", users => {
        let allUsers = [];
        users.forEach(user => {

          allUsers.push({...user.val(),id:user.key});
        });
        setUsers(()=>[...allUsers])
      })
    },[users])


  return (
    <Card title="Cars">
      <Table className="gx-table-responsive " columns={columns} dataSource={users} scroll={{ x: 1300 }}/>
    </Card>
  );
};

export default Car;
