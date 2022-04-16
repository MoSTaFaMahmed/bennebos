import React from "react";
import { useEffect, useState } from "react";
import { database } from "../../../../firebase/firebase";
import {Card, Divider, Table,Button,  Popover} from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import IntlMessages from "util/IntlMessages";

const Admin = () => {
  const[panState,setPanState]=useState(false);
  const[userInfo,setUserInfo]=useState({});
 const deleteFile =async () => {
  const user=database.ref(`users/${userInfo.id}`);
   await user.update({...userInfo,approved:false})
  setPanState(false)
                          };
  const onCancelDelete = () => {
    setPanState(false)
    };

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
        <Button  type="danger" onClick={() => {
                  setPanState(true)
                  setUserInfo(record)
                }}><IntlMessages id="DeActive"/></Button>



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
  ]
  const [users,setUsers] =  useState([])

  useEffect(()=>{
    database.ref("users").once("value", users => {
      let allUsers = [];
      users.forEach(user => {

        allUsers.push({...user.val(),id:user.key});
      });
      setUsers(()=>[...allUsers].filter(el=>el.usertype=="admin"&&el.approved==true))
    })
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
