import React from "react";
import { useEffect, useState } from "react";
import {Card, Divider, Table,Button,  Popover,Image} from "antd";
import { database } from "../../../../firebase/firebase";
import SweetAlert from "react-bootstrap-sweetalert";
import IntlMessages from "util/IntlMessages";
import { RightCircleFilled } from "@ant-design/icons";



const Booking = () => {

  const columns = [
    {
      title:'Customer_name',
      dataIndex:'customer_name',
      key:'customer_name',

      width: 200,

    },
    {
      title: 'Car Image',
      key: 'action',
      width: 250,

      render: (text, record) => (
        <>
         <Image
      width={150}
      src={record.carImage}
    />
        </>
      )
    },
    {
      title:'CarType',
      dataIndex:'carType',
      key:'carType',

      width: 200,

    },
    {
      title: 'Customer_email',
      dataIndex: 'customer_email',
      key: 'customer_email',
    },
    {
      title: 'Customer_contact',
      dataIndex: 'customer_contact',
      key: 'customer_contact',
    },
    {
      title: 'Mor Info',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (text, record) => (
        <>
 <Popover
          content={
         <>
          <div><b >BookingDate</b> <Divider type="vertical"/>{record.bookingDate}</div>
          <div><b >CancelledBy</b> <Divider type="vertical"/>{record.cancelledBy}</div>


                 </>
        }


          title={<p>More Details  </p>}

          trigger="click"

        >
          <Button type="primary">Booking Info</Button>
        </Popover>
        {/* <Image
      width={200}
      src={record.image}
    /> */}
       </>
      ),
    },


  ];




  const [users,setUsers] =  useState([])

    useEffect(()=>{
      database.ref("bookings").once("value", users => {
        let allUsers = [];
        users.forEach(user => {

          allUsers.push({...user.val(),id:user.key});
        });
        setUsers(()=>[...allUsers])
      })
    },[users])


  return (
    <Card title="Booking">
      <Table className="gx-table-responsive " columns={columns} dataSource={users} scroll={{ x: 1300 }}/>
    </Card>
  );
};

export default Booking;
