import React from "react";
import { useEffect, useState } from "react";
import { Card, Popconfirm, Typography, Table, Button, Image, Modal, Input, Form, Space } from "antd";
import { database } from "../../../../firebase/firebase";
import SweetAlert from "react-bootstrap-sweetalert";
import IntlMessages from "util/IntlMessages";



const Car = () => {

  const [isAddModalVisible, setAddIsModalVisible] = useState(false);
  const [recordAdd, setRecordAdd] = useState({})
  const [amount, setAmmount] = useState('')
  const [minsDelayed, setminsDelayed] = useState('')
  const showAddModal = () => {
    setAddIsModalVisible(true);
  };

  const handleAddOk = async () => {
    const user = database.ref(`cartypes/${finish.id}`).child('cancelSlab')
    await user.push(recordAdd)
    getAllCanel()
    setAddIsModalVisible(false);
    setAmmount('')
    setminsDelayed('')
 };

  const handleAddCancel = () => {
    setAddIsModalVisible(false);
  };

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
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      amount: '',
      minsDelayed: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancele = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    console.log(key);
    try {
      const row = await form.validateFields();
      const user = database.ref(`/cartypes/${finish.id}/cancelSlab/${key}`)
      await user.update(row)
      setEditingKey('');
      getAllCanel()

    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const canselColumns = [
    {
      title: 'amount',
      dataIndex: 'amount',
      width: '25%',
      editable: true,
    },
    {
      title: 'minsDelayed',
      dataIndex: 'minsDelayed',
      width: '15%',
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
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancele}>
              Cancel
            </Popconfirm>
          </span>
        ) : (
          <>
            <Button type="primary" disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Button >

            <Button type="danger" onClick={() => {
              removeCan(record.key)
            }}><IntlMessages id="Delete" /></Button>
          </>
        );
      },
    },
  ];

  const mergedColumns = canselColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });



  const removeCan = async (key) => {
    const user = database.ref(`/cartypes/${finish.id}/cancelSlab/${key}`)
    await user.remove()
    getAllCanel()
  }











  //**For set Cansel Record*/
  const [finish, setFinish] = useState({});
  ///**Cansellation Modal */
  const [isModal, setisModal] = useState(false);

  const Modall = (record) => {
      setFinish(record)
      setisModal(true);


  };
  const snapshotToArray = (snapshot) => {
    var returnArr = [];

    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;

      returnArr.push(item);
    });

    return returnArr;
  };
  const getAllCanel = () => {
    database.ref(`cartypes/${finish.id}/cancelSlab`).once('value')
      .then(snapshot => {
        console.log(snapshot.val());
        console.log(finish);

        setData(() => [...snapshotToArray(snapshot)])

      });
  }
  useEffect(() => {
    database.ref(`cartypes/${finish.id}/cancelSlab`).once('value')
      .then(snapshot => {
        console.log(snapshot.val());
        console.log(finish);

        setData(() => [...snapshotToArray(snapshot)])

      });

  }, [finish])

  const handle = () => {
    setisModal(false);


  };

  const handleCan = () => {
    setisModal(false);
  };






/////////////////***Start*////////

const [isTypeModalVisible, setTypeIsModalVisible] = useState(false);
const [recordType, setRecordType] = useState({})
const [amountType, setAmmountTepe] = useState('')
const [Description, setDescription] = useState('')
const showTypeModal = () => {
  setTypeIsModalVisible(true);
};

const handleTypeOk = async () => {
  const user = database.ref(`cartypes/${finishTypes.id}`).child('parcelTypes')
  await user.push(recordType)
  getAllTypes()

  setTypeIsModalVisible(false);
  setAmmountTepe('')
  setDescription('')


};

const handleTypeCancel = () => {
  setTypeIsModalVisible(false);
};

const EditableTypeCell = ({
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
const [formType] = Form.useForm();
const [dataType, setDataType] = useState([]);
const [editingKeyType, setEditingKeyType] = useState('');

const isEditingType= (record) => record.key === editingKeyType;

const editTypes = (record) => {
  formType.setFieldsValue({
    amount: '',
    description: '',
    ...record,
  });
  setEditingKeyType(record.key);
};

const canceleTypes = () => {
  setEditingKeyType('');
};

const saveTypes = async (key) => {
  console.log(key);
  try {
    const row = await formType.validateFields();
    const user = database.ref(`/cartypes/${finishTypes.id}/parcelTypes/${key}`)
    await user.update(row)
    setEditingKeyType('');
    getAllTypes()

  } catch (errInfo) {
    console.log('Validate Failed:', errInfo);
  }
};
const canselTypesColumns = [
  {
    title: 'amount',
    dataIndex: 'amount',
    width: '25%',
    editable: true,
  },
  {
    title: 'description',
    dataIndex: 'description',
    width: '15%',
    editable: true,
  },

  {
    title: 'operation',
    dataIndex: 'operation',
    render: (_, record) => {
      const editable = isEditingType(record);
      return editable ? (
        <span>
          <Typography.Link
            onClick={() => saveTypes(record.key)}
            style={{
              marginRight: 8,
            }}
          >
            Save
          </Typography.Link>
          <Popconfirm title="Sure to cancel?" onConfirm={canceleTypes}>
            Cancel
          </Popconfirm>
        </span>
      ) : (
        <>
          <Button type="primary" disabled={editingKeyType!== ''} onClick={() => editTypes(record)}>
            Edit
          </Button >

          <Button type="danger" onClick={() => {
            removeTypesCan(record.key)
          }}><IntlMessages id="Delete" /></Button>
        </>
      );
    },
  },
];

const mergedTypesColumns = canselTypesColumns.map((col) => {
  if (!col.editable) {
    return col;
  }
  return {
    ...col,
    onCell: (record) => ({
      record,
      inputType: 'text',
      dataIndex: col.dataIndex,
      title: col.title,
      editing: isEditingType(record),
    }),
  };
});



const removeTypesCan = async (key) => {
  const user = database.ref(`/cartypes/${finishTypes.id}/parcelTypes/${key}`)
  await user.remove()
  getAllTypes()
}











//**For set Cansel Record*/
const [finishTypes, setFinishTypes] = useState({});
///**Cansellation Modal */
const [isTypesModal, setisTypesModal] = useState(false);

const parcelTypesModall = (record) => {
  setFinishTypes(record)
  setisTypesModal(true);

};
const snapshotTypeToArray = (snapshot) => {
  var returnArr = [];

  snapshot.forEach(function (childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  return returnArr;
};
const getAllTypes = () => {
  database.ref(`cartypes/${finishTypes.id}/parcelTypes`).once('value')
    .then(snapshot => {
      console.log(snapshot.val());


      setDataType(() => [...snapshotTypeToArray(snapshot)])

    });
}
useEffect(() => {
  database.ref(`cartypes/${finishTypes.id}/parcelTypes`).once('value')
    .then(snapshot => {
      console.log(snapshot.val());


      setDataType(() => [...snapshotTypeToArray(snapshot)])

    });

}, [finishTypes])

const handleTypes = () => {
  setisTypesModal(false);


};

const handleTypesCan = () => {
  setisTypesModal(false);
};


///////////////***END**************************************************************** */






/////////////////***Start*////////

const [isOptionModalVisible, setOptionIsModalVisible] = useState(false);
const [recordOption, setRecordOption] = useState({})
const [amountOption, setAmmountOPtion] = useState('')
const [DescriptionOption, setDescriptionOption] = useState('')
const showOptionModal = () => {
  setOptionIsModalVisible(true);
};

const handleOptionOk = async () => {
  const user = database.ref(`cartypes/${finishOption.id}`).child('option')
  await user.push(recordOption)
  getAllOptions()

  setOptionIsModalVisible(false);
  setAmmountOPtion('')
  setDescriptionOption('')


};

const handleOptionCancel = () => {
  setTypeIsModalVisible(false);
};

const EditableOptionCell = ({
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
const [formOption] = Form.useForm();
const [dataOption, setDataOption] = useState([]);
const [editingKeyOption, setEditingKeyOption] = useState('');

const isEditingOption= (record) => record.key === editingKeyOption;

const editOption = (record) => {
  formOption.setFieldsValue({
    amount: '',
    description: '',
    ...record,
  });
  setEditingKeyOption(record.key);
};

const canceleOption = () => {
  setEditingKeyOption('');
};

const saveOption = async (key) => {
  console.log(key);
  try {
    const row = await formOption.validateFields();
    const user = database.ref(`/cartypes/${finishOption.id}/option/${key}`)
    await user.update(row)
    setEditingKeyOption('');
    getAllOptions()

  } catch (errInfo) {
    console.log('Validate Failed:', errInfo);
  }
};
const canselOptionsColumns = [
  {
    title: 'amount',
    dataIndex: 'amount',
    width: '25%',
    editable: true,
  },
  {
    title: 'description',
    dataIndex: 'description',
    width: '15%',
    editable: true,
  },

  {
    title: 'operation',
    dataIndex: 'operation',
    render: (_, record) => {
      const editable = isEditingOption(record);
      return editable ? (
        <span>
          <Typography.Link
            onClick={() => saveOption(record.key)}
            style={{
              marginRight: 8,
            }}
          >
            Save
          </Typography.Link>
          <Popconfirm title="Sure to cancel?" onConfirm={canceleOption}>
            Cancel
          </Popconfirm>
        </span>
      ) : (
        <>
          <Button type="primary" disabled={editingKeyOption!== ''} onClick={() => editOption(record)}>
            Edit
          </Button >

          <Button type="danger" onClick={() => {
            removeOptionCan(record.key)
          }}><IntlMessages id="Delete" /></Button>
        </>
      );
    },
  },
];

const mergedOptionsColumns = canselOptionsColumns.map((col) => {
  if (!col.editable) {
    return col;
  }
  return {
    ...col,
    onCell: (record) => ({
      record,
      inputType: 'text',
      dataIndex: col.dataIndex,
      title: col.title,
      editing: isEditingOption(record),
    }),
  };
});



const removeOptionCan = async (key) => {
  const user = database.ref(`/cartypes/${finishOption.id}/option/${key}`)
  await user.remove()
  getAllOptions()
}











//**For set Cansel Record*/
const [finishOption, setFinishOption] = useState({});
///**Cansellation Modal */
const [isOptionModal, setisOptionModal] = useState(false);

const parcelOptionModall = (record) => {
  setFinishOption(record)
  setisOptionModal(true);

};
const snapshotOptionToArray = (snapshot) => {
  var returnArr = [];

  snapshot.forEach(function (childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  return returnArr;
};
const getAllOptions = () => {
  database.ref(`cartypes/${finishOption.id}/option`).once('value')
    .then(snapshot => {
      console.log(snapshot.val());


      setDataOption(() => [...snapshotOptionToArray(snapshot)])

    });
}
useEffect(() => {
  database.ref(`cartypes/${finishOption.id}/option`).once('value')
    .then(snapshot => {
      console.log(snapshot.val());


      setDataOption(() => [...snapshotOptionToArray(snapshot)])

    });

}, [finishOption])

const handleOption = () => {
  setisOptionModal(false);


};

const handleOptionsCan = () => {
  setisOptionModal(false);
};


///////////////***ENDOPtion* */



















  const [Delete, setDelete] = useState(false);
  const [CarInfo, setCarInfo] = useState({});
  const Remove = async () => {
    const car = database.ref('/cartypes')
    await car.child(CarInfo.id).remove()
    setDelete(false)
    getAllCars()
  }
  const onCancelDelete = () => {
    setDelete(false)
  };
  const columns = [
    {
      title: 'Vehicle',
      key: 'action',
      width: 100,

      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => showModal('view', record)}><IntlMessages id="View" /></Button>
          <Image
            width={200}
            src={record.image}
          />
        </>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,

    },
    {
      title: 'Convenience_fee_type',
      dataIndex: 'convenience_fee_type',
      key: 'convenience_fee_type',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>

          <Button type="primary" onClick={() => Modall(record)}>
            Cansellation
          </Button>
          <Button type="primary" onClick={() => parcelTypesModall(record)}>
          parcelTypes
          </Button>
          <Button type="primary" onClick={() => parcelOptionModall(record)}>
          Options
          </Button>
          <Button type="primary" onClick={() => showModal('edit', record)}><IntlMessages id="Edit" /></Button>
          <Button type="danger" onClick={() => {
            setDelete(true)
            setCarInfo(record)
          }}><IntlMessages id="Delete" /></Button>
          <SweetAlert show={Delete}
            Delete
            showCancel
            confirmBtnText={<IntlMessages id="Confirm" />}
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="default"
            title={<h1>Delete {CarInfo.name}!</h1>}
            onConfirm={Remove}
            onCancel={onCancelDelete}
          >
            <IntlMessages id="Are You Sure ?" />
          </SweetAlert>
        </>

      )
    },


  ];




  const [users, setUsers] = useState([])
  const getAllCars = () => {
    database.ref("cartypes").once("value", users => {
      let allUsers = [];
      users.forEach(user => {

        allUsers.push({ ...user.val(), id: user.key });
      });
      setUsers(() => [...allUsers])
    })
  }
  useEffect(() => {
    getAllCars()
  }, [])



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
        createdAt:Date(),
        name: '',
        convenience_fee_type: '',
        convenience_fees:'',
        base_fare: "",
        min_fare:'',
        rate_per_hour: '',

      })
    }

  };



  const handleOk = async () => {
    const newData = [...users];
    const index = newData.findIndex((item) => record.id === item.id);
    if (mood === 'add') {
      console.log(record);
      const user = database.ref('/cartypes')
      await user.push(record);
    } else if (mood === 'edit') {
      const user = database.ref(`cartypes/${record.id}`)
      await user.update({ ...users[index], ...record })
    }
    setIsModalVisible(false);
    getAllCars()
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Card title="Cars">
      <Button type="primary" onClick={() => showModal('add', record)}><IntlMessages id="Add New Car" /></Button>
      <Table className="gx-table-responsive " columns={columns} dataSource={users} />
      <Modal title="Car Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className="gx-modal-box-form-item">
          <div className="gx-form-group">
            Image Src:<Input
              required
              disabled={mood === 'view'}
              placeholder="Image"
              onChange={(event) => setRecord({ ...record, image: event.target.value })}
              value={record.image}
              margin="normal"
            />
          </div>
          <div className="gx-form-group">
            Name:<Input
              required
              disabled={mood == 'view'}
              placeholder="Name"
              onChange={(event) => setRecord({ ...record, name: event.target.value })}
              value={record.name}
              margin="none" />

          </div>
          <div className="gx-form-group">
            Convenience_Fee_Type:<Input
              required
              disabled={mood === 'view'}
              placeholder="Convenience_Fee_Type"
              onChange={(event) => setRecord({ ...record, convenience_fee_type: event.target.value })}
              value={record.convenience_fee_type}
              margin="none" />
          </div>

          <div className="gx-form-group">
            Convenience_Fees:<Input
              required
              disabled={mood === 'view'}
              placeholder="Convenience_Fees"
              onChange={(event) => setRecord({ ...record, convenience_fees: event.target.value })}
              value={record.convenience_fees}
              margin="none" />
          </div>
          <div className="gx-form-group">
            Base_Fare<Input
              required
              placeholder="Base_Fare"
              disabled={mood === 'view'}
              onChange={(event) => setRecord({ ...record, base_fare: event.target.value })}
              value={record.base_fare}
              margin="normal" />
          </div>
          <div className="gx-form-group">
            Min_Fare<Input
              required
              placeholder="Min_Fare"
              disabled={mood === 'view'}
              onChange={(event) => setRecord({ ...record, min_fare: event.target.value })}
              value={record.min_fare}
              margin="normal" />
          </div>
          <div className="gx-form-group">
            CreatedAt:<Input
              disabled={mood === 'view'}
              placeholder="CreatedAt"
              onChange={(event) => setRecord({ ...record, createdAt: event.target.value })}
              value={record.createdAt}
              margin="normal"
            />
          </div>
          <div className="gx-form-group">
            Rate_per_hour:<Input
              required
              disabled={mood === 'view'}
              placeholder="Rate_per_hour"
              onChange={(event) => setRecord({ ...record, rate_per_hour: event.target.value })}
              value={record.rate_per_hour}
              margin="normal"
            />
          </div>

        </div>
      </Modal>
      <Modal title="CancelSlab" visible={isModal} onOk={handle} onCancel={handleCan}>
        {data.length != 0 ?
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancele,
              }}
            />

          </Form> : ''
        }
        <Button type="primary" onClick={showAddModal}>
          Add CancelSlab
        </Button>
        <Modal title="Add CancelSlab" visible={isAddModalVisible} onOk={handleAddOk} onCancel={handleAddCancel}>
          <div className="gx-form-group">
            Amount:<Input
              required
              value={amount}
              placeholder="amount"
              onChange={(event) => setRecordAdd({ ...recordAdd, amount: event.target.value })}
              onInput={e => setAmmount(e.target.value)}
              margin="none" />

          </div>
          <div className="gx-form-group">
            minsDelayed:<Input
              required
              value={minsDelayed}
              onInput={e => setminsDelayed(e.target.value)}
              onChange={(event) => setRecordAdd({ ...recordAdd, minsDelayed: event.target.value })}
              placeholder="minsDelayed"
              margin="none" />

          </div>
        </Modal>


      </Modal>

      <Modal title="Types" visible={isTypesModal} onOk={handleTypes} onCancel={handleTypesCan}>
        {dataType.length != 0 ?
          <Form form={formType} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableTypeCell,
                },
              }}
              bordered
              dataSource={dataType}
              columns={mergedTypesColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: canceleTypes,
              }}
            />

          </Form> : ''
        }
        <Button type="primary" onClick={showTypeModal}>
          Add Types
        </Button>
        <Modal title="Add Types" visible={isTypeModalVisible} onOk={handleTypeOk} onCancel={handleTypeCancel}>
          <div className="gx-form-group">
            Amount:<Input
              required
              value={amountType}
              placeholder="amount"
              onChange={(event) => setRecordType({ ...recordType, amount: event.target.value })}
              onInput={e => setAmmountTepe(e.target.value)}
              margin="none" />

          </div>
          <div className="gx-form-group">
            Description:<Input
              required
              value={Description}
              onInput={e => setDescription(e.target.value)}
              onChange={(event) => setRecordType({ ...recordType, description: event.target.value })}
              placeholder="Description"
              margin="none" />

          </div>
        </Modal>


      </Modal>


      <Modal title="Options" visible={isOptionModal} onOk={handleOption} onCancel={handleOptionsCan}>
        {dataOption.length != 0 ?
          <Form form={formOption} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableOptionCell,
                },
              }}
              bordered
              dataSource={dataOption}
              columns={mergedOptionsColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: canceleOption,
              }}
            />

          </Form> : ''
        }
        <Button type="primary" onClick={showOptionModal}>
          Add Option
        </Button>
        <Modal title="Add Types" visible={isOptionModalVisible} onOk={handleOptionOk} onCancel={handleOptionCancel}>
          <div className="gx-form-group">
            Amount:<Input
              required
              value={amountOption}
              placeholder="amount"
              onChange={(event) => setRecordOption({ ...recordOption, amount: event.target.value })}
              onInput={e => setAmmountOPtion(e.target.value)}
              margin="none" />

          </div>
          <div className="gx-form-group">
            Description:<Input
              required
              value={DescriptionOption}
              onInput={e => setDescriptionOption(e.target.value)}
              onChange={(event) => setRecordOption({ ...recordOption, description: event.target.value })}
              placeholder="Description"
              margin="none" />

          </div>
        </Modal>


      </Modal>
    </Card>
  );
};

export default Car;
