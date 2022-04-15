import React from "react";
import {Col, Row} from "antd";
import Fleetadmin from "./Fleetadmin";


const DataTable = () => {
  return (
    <Row>

      <Col span={24}>
        <Fleetadmin/>
      </Col>

    </Row>
  );
};

export default DataTable;
