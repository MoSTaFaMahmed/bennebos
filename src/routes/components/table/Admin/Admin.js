import React, {useEffect, useState } from 'react';
import {Card, Divider,Modal, Table,Button,  Popover, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import { database } from "../../../../firebase/firebase";
import SweetAlert from "react-bootstrap-sweetalert";
import IntlMessages from "util/IntlMessages";


const Admin = () => {
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


    const columns = [{
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',

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
      // editable: true,
    },
    {
      title: 'Usertype',
      dataIndex: 'usertype',
      key: 'usertype',
      // editable: true,
    },

    {
      title: 'Action',
      key: 'action',


      render: (text, record) => (
        <>
        <Button  type="primary" onClick={()=>showModal('edit',record)}><IntlMessages id="Edit"/></Button>
        <Button  type="primary" onClick={()=>showModal('view',record)}><IntlMessages id="View"/></Button>
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

      </>
      ),
    }
  ];


  const [isModalVisible, setIsModalVisible] = useState(false);
  const[mood,setMood]=useState('view');
  const[record,setRecord]=useState({})
  const showModal = (mood,record) => {
    setIsModalVisible(true);
    console.log(mood);
    console.log(record);
    setMood(mood);
    if(mood==='view' || mood==='edit'){
      setRecord(record)
    }else{
      setRecord({
        //id:users[users.length-1].id+1,
        lastName:'',
        firstName:'',
        email:"",
        mobile:"",
        usertype:'',
        approved:false
      })
    }

  };

  const handleOk = async() => {
    const newData = [...users];
        const index = newData.findIndex((item) => record.id === item.id);
    if(mood=='add'){
  console.log(record);
    const user= database.ref('/users')
     await user.push(record);
    }else if(mood=='edit'){
      const user=database.ref(`users/${record.id}`)
            await user.update({...users[index],...record})
    }
    setIsModalVisible(false);

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (

    <Card title="Admin">
        <Button  type="primary" onClick={()=>showModal('add',record)}><IntlMessages id="Add"/></Button>


      <Table className="gx-table-responsive " columns={columns} dataSource={users} />


      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <div className="gx-modal-box-form-item">
            <div className="gx-form-group">
              <Input
                required
                disabled={mood=='view'}
                placeholder="First Name"
               onChange={(event) => setRecord({...record,firstName:event.target.value})}
                value={record.firstName}
                margin="none"/>

            </div>
            <div className="gx-form-group">
              <Input
                required
                disabled={mood=='view'}
                placeholder="Last Name"
                onChange={(event) => setRecord({...record,lastName:event.target.value})}
                value={record.lastName}
                margin="none"/>
            </div>
            <div className="gx-form-group">
              <Input
              required
                placeholder="Email"
                disabled={mood=='view'}
                onChange={(event) => setRecord({...record,email:event.target.value})}
                 value={record.email}
                margin="normal"/>
            </div>
            <div className="gx-form-group">
              <Input
              disabled={mood=='view'}
                placeholder="Mobile"
                onChange={(event) => setRecord({...record,mobile:event.target.value})}
                 value={record.mobile}
                margin="normal"
              />
            </div>
            <div className="gx-form-group">
              <Input
              required
              disabled={mood=='view'}
                placeholder="usertype"
                onChange={(event) => setRecord({...record,usertype:event.target.value})}
                 value={record.usertype}
                margin="normal"
              />
            </div>

          </div>
      </Modal>

    </Card>
  );
};

export default Admin;
