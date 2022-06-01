import React from "react";
import { useEffect, useState } from "react";
import {Card, Table,Button,Modal,Input} from "antd";
import { database } from "../../../../firebase/firebase";
import SweetAlert from "react-bootstrap-sweetalert";
import IntlMessages from "util/IntlMessages";




const Cansel = () => {
  const [FilterDocs, setFilterDocs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const[Delete,setDelete]=useState(false);
  const[reasonInfo,setReasonInfo]=useState({});
 const Remove=async()=>{
 const cansel=database.ref('/cancel_reason')
   await cansel.child(reasonInfo.id).remove()
   setDelete(false)
   getAlldata()
 }
 const onCancelDelete = () => {
  setDelete(false)
  };
  const columns = [
    {
      title:'Label',
      dataIndex:'label',
      key:'label',
      width: '50%',

    },

    {
      title: 'Action',
      key: 'action',
      width: '50%',
      render: (text, record) => (
        <>
 <Button  type="primary" onClick={()=>showModal('view',record)}><IntlMessages id="View"/></Button>
 <Button  type="primary" onClick={()=>showModal('edit',record)}><IntlMessages id="Edit"/></Button>
 <Button  type="danger" onClick={()=>{
 setDelete(true)
 setReasonInfo(record)
 }}><IntlMessages id="Delete"/></Button>
  <SweetAlert show={Delete}
                    Delete
                    showCancel
                    confirmBtnText={<IntlMessages id="Confirm"/>}
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title={<h1>Delete {reasonInfo.label}!</h1>}
                    onConfirm={Remove}
                    onCancel={onCancelDelete}
        >
          <IntlMessages id="Are You Sure ?"/>
        </SweetAlert>
       </>
      ),
    },


  ];




  const [cansel,setCansel] =  useState([])
  const getAlldata=()=>{
    database.ref("cancel_reason").once("value", cansel => {
      let allCansel = [];
      cansel.forEach(cansel => {

        allCansel.push({...cansel.val(),id:cansel.key});
      });
      setCansel(()=>[...allCansel])
    })
    // console.log(cansel);

  }

    useEffect(()=>{
      getAlldata();
    },[])
    useEffect(() => {
      setFilterDocs(cansel)
    }, [cansel]);


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
          id:+cansel[cansel.length-1].id+1,
          label:'',
          value:+cansel[cansel.length-1].id+1,


        })
      }

    };


    const handleOk = async() => {
      const newData = [...cansel];
          const index = newData.findIndex((item) => record.id === item.id);
      if(mood==='add'){
    console.log(record);
      const cansel= database.ref('/cancel_reason')
       await cansel.push(record);
      }else if(mood==='edit'){
        const cansel=database.ref(`cancel_reason/${record.id}`)
              await cansel.update({...cansel[index],...record})
      }
      setIsModalVisible(false);
      getAlldata()
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };
  return (
    <Card title="Cansel Reasons">
 <Input
 placeholder="Search" style={{marginBottom:'10px'}}  value={keyword}

                onChange={(e) => {

                  setKeyword(e.target.value);
                  console.log(e.target.value);
                  let data=cansel;
                  if (e.target.value) {
                    data =
                      cansel &&
                      cansel.length > 1 &&
                      cansel.filter(
                        (el) =>
                          el["label"].includes(e.target.value)

                      );

                  }


                  setFilterDocs(data);
                }}
                  />

      <Button  type="primary" onClick={()=>showModal('add',record)}><IntlMessages id="Add New Reason"/></Button>
      <Table className="gx-table-responsive " columns={columns} dataSource={FilterDocs} />
      <Modal title="Cansel Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <div className="gx-modal-box-form-item">
            <div className="gx-form-group">
            Label: <Input
                required
                disabled={mood==='view'}
                placeholder="label"
               onChange={(event) => setRecord({...record,label:event.target.value})}
                value={record.label}
                margin="none"/>

            </div>

          </div>
      </Modal>

    </Card>
  );
};

export default Cansel;
