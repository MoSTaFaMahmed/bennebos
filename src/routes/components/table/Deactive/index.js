import React from "react";
import { useEffect, useState } from "react";
import {Col, Row} from "antd";
import Deactive from "./Deactive";
import { database } from "../../../../firebase/firebase";




const BasicTable = () => {
  const [users,setUsers] =  useState([])

    useEffect(()=>{
      database.ref("users").once("value", users => {
        let allUsers = [];
        users.forEach(user => {
          allUsers.push({...user.val(),id:user.key});
        });
        setUsers(()=>[...allUsers])
      })
    },[])

    useEffect(()=>{
      console.log(users)
    },[users])
  return (
    <Row>

      <Col span={24}>
        <Deactive/>
      </Col>

    </Row>
  );
};

export default BasicTable;
