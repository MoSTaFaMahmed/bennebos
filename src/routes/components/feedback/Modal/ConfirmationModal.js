import React from "react";
import {Button, Card, Modal} from "antd";

const confirm = Modal.confirm;

const ConfirmationModal = () => {
    function showConfirm() {
      confirm({
        title: 'Do you Want to delete these items?',
        content: 'Some descriptions',
        onOk() {
        },
        onCancel() {
        },
      });
    }

    function showDeleteConfirm() {
      confirm({
        title: 'Are you sure delete this task?',
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
        },
        onCancel() {
        },
      });
    }

    return (
      <Card title="Confirmation Modal" className="gx-card">
        <Button onClick={showConfirm}>
          Confirm
        </Button>
        <Button onClick={showDeleteConfirm} type="dashed">
          Delete
        </Button>
      </Card>
    );
  }
;

export default ConfirmationModal;
