import React from "react";
import { useEffect, useState } from "react";
import { Card, Table, Button, Image, Modal, Input } from "antd";
import { database } from "../../../../firebase/firebase";
import SweetAlert from "react-bootstrap-sweetalert";
import IntlMessages from "util/IntlMessages";




const Booking = () => {
  const [Delete, setDelete] = useState(false);
  const [bookInfo, setBookInfo] = useState({});
  const Remove = async () => {
    const car = database.ref('/bookings')
    await car.child(bookInfo.id).remove()
    setDelete(false)
  }
  const onCancelDelete = () => {
    setDelete(false)
  };
  const columns = [
    {
      title: 'Customer_name',
      dataIndex: 'customer_name',
      key: 'customer_name',
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
    // {
    //   title:'CarType',
    //   dataIndex:'carType',
    //   key:'carType',
    //   width: 200,

    // },
    // {
    //   title: 'Customer_email',
    //   dataIndex: 'customer_email',
    //   key: 'customer_email',
    // },
    {
      title: 'Customer_contact',
      dataIndex: 'customer_contact',
      key: 'customer_contact',
    },
    {
      title: 'Action',
      key: 'action',

      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => showModal('view', record)}><IntlMessages id="View" /></Button>
          <Button type="primary" onClick={() => showModal('edit', record)}><IntlMessages id="Edit" /></Button>
          <Button type="danger" onClick={() => {
            setDelete(true)
            setBookInfo(record)
          }}><IntlMessages id="Delete" /></Button>
          <SweetAlert show={Delete}
            Delete
            showCancel
            confirmBtnText={<IntlMessages id="Confirm" />}
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="default"
            title={<h1>Delete {bookInfo.customer_name}!</h1>}
            onConfirm={Remove}
            onCancel={onCancelDelete}
          >
            <IntlMessages id="Are You Sure ?" />
          </SweetAlert>
        </>
      ),
    },


  ];




  const [users, setUsers] = useState([])

  useEffect(() => {
    database.ref("bookings").once("value", users => {
      let allUsers = [];
      users.forEach(user => {

        allUsers.push({ ...user.val(), id: user.key });
      });
      setUsers(() => [...allUsers])
    })
  }, [users])

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mood, setMood] = useState('view');
  const [record, setRecord] = useState({})
  const showModal = (mood, record) => {
    setIsModalVisible(true);
    console.log(mood);
    console.log(record);
    setMood(mood);
    if (mood === 'view' || mood === 'edit') {
      setRecord(record)
    } else {
      setRecord({
        //id:users[users.length-1].id+1,
        customer_name: '',
        carImage: '',
        carType: "",
        customer_email: "",
        customer_contact: '',
        bookLater: '',
        trip_cost: '',
        reason:'',
        status:'',
        cancelledBy:'',


      })
    }

  };


  const handleOk = async () => {
    const newData = [...users];
    const index = newData.findIndex((item) => record.id === item.id);
    if (mood === 'add') {
      console.log(record);
      const user = database.ref('/bookings')
      await user.push(record);
    } else if (mood === 'edit') {
      const user = database.ref(`bookings/${record.id}`)
      await user.update({ ...users[index], ...record })
    }
    setIsModalVisible(false);

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Card title="Booking">
      <Button type="primary" onClick={() => showModal('add', record)}><IntlMessages id="Add New Book" /></Button>
      <Table className="gx-table-responsive " columns={columns} dataSource={users} />
      <Modal title="Booking Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className="gx-modal-box-form-item">
          <div className="gx-form-group">
            Customer_Name: <Input
              required
              disabled={mood === 'view'}
              placeholder="Customer_Name"
              onChange={(event) => setRecord({ ...record, customer_name: event.target.value })}
              value={record.customer_name}
              margin="none" />

          </div>
          <div className="gx-form-group">
            CarImage:<Input
              required
              disabled={mood === 'view'}
              placeholder="CarImage"
              onChange={(event) => setRecord({ ...record, carImage: event.target.value })}
              value={record.carImage}
              margin="none" />
          </div>
          <div className="gx-form-group">
            CarType:<Input
              required
              placeholder="CarType"
              disabled={mood === 'view'}
              onChange={(event) => setRecord({ ...record, carType: event.target.value })}
              value={record.carType}
              margin="normal" />
          </div>
          <div className="gx-form-group">
            Customer_Email:<Input
              disabled={mood === 'view'}
              placeholder="Customer_Email"
              onChange={(event) => setRecord({ ...record, customer_email: event.target.value })}
              value={record.customer_email}
              margin="normal"
            />
          </div>
          <div className="gx-form-group">
            Customer_Contact:<Input
              required
              disabled={mood === 'view'}
              placeholder="Customer_Contact"
              onChange={(event) => setRecord({ ...record, customer_contact: event.target.value })}
              value={record.customer_contact}
              margin="normal"
            />
          </div>
          <div className="gx-form-group">
            bookLater: <select onChange={(event) => setRecord({ ...record, bookLater: event.target.value })}
              value={record.bookLater} disabled={mood == 'view'} style={{ width: '100%', height: '30px' }} >
              <option value={true} selected >Yes</option>
              <option value={false} >No</option>
            </select>
          </div>
          <div className="gx-form-group">
            trip_cost:<Input
              required
              disabled={mood === 'view'}
              placeholder="trip_cost"
              onChange={(event) => setRecord({ ...record,trip_cost: event.target.value })}
              value={record.trip_cost}
              margin="normal"
            />
          </div>
          <div className="gx-form-group">
            reason:<Input
              required
              disabled={mood === 'view'}
              placeholder="reason"
              onChange={(event) => setRecord({ ...record,reason: event.target.value })}
              value={record.reason}
              margin="normal"
            />
          </div>

          <div className="gx-form-group">
            status:<Input
              required
              disabled={mood === 'view'}
              placeholder="status"
              onChange={(event) => setRecord({ ...record,status: event.target.value })}
              value={record.status}
              margin="normal"
            />
          </div>

          <div className="gx-form-group">
            cancelledBy:<Input
              required
              disabled={mood === 'view'}
              placeholder="cancelledBy"
              onChange={(event) => setRecord({ ...record,cancelledBy: event.target.value })}
              value={record.cancelledBy}
              margin="normal"
            />
          </div>
        </div>
      </Modal>

    </Card>
  );
};

export default Booking;
