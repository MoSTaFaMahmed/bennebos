import React from "react";
import { useEffect, useState } from "react";
import {Col, Row} from "antd";

import Simple from "./Simple";
import Selection from "./Selection";
import Size from "./Size";
import Title from "./Title";
import ColRowSpan from "./ColRowSpan";
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
        <Simple/>
      </Col>
      {/* <Col span={24}>
        <Selection/>
      </Col>
      <Col span={24}>
        <Size/>
      </Col>
      <Col span={24}>
        <Title/>
      </Col>
      <Col span={24}>
        <ColRowSpan/>
      </Col> */}
    </Row>
  );
};

export default BasicTable;
