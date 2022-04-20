import React from "react";
import {Input, Modal} from "antd";

import IntlMessages from "util/IntlMessages";

class AddContact extends React.Component {
  constructor(props) {
    super(props);

    const {id,  firstName,lastName, email, mobile,usertype } = props.contact;
    this.state = {
      id,
      lastName,
      firstName,
      email,
      mobile,
      usertype

    }
  }

  render() {
    const { onSaveContact, onContactClose, open, contact} = this.props;
    const {id, firstName, email, mobile,lastName,usertype} = this.state;
    // let {thumb} = this.state;
    // if (!thumb) {
    //   thumb = '/assets/images/placeholder.jpg';
    // }
    return (
      <Modal
        title={contact.firstName === '' ?
          <IntlMessages id="contact.addContact"/> :
          <IntlMessages id="contact.saveContact"/>}
        toggle={onContactClose} visible={open}
        closable={false}
        onOk={() => {
          if (firstName === '')
            return;
          onContactClose();
          onSaveContact(id,
            {
              'id': id,
              'firstName': firstName,
              'lastName':lastName,
              'email': email,
              'mobile': mobile,
              'usertype':usertype,
              // 'thumb': thumb,

            });
          this.setState({
            'id': id + 1,
            'firstName': '',
            'email': '',
            'mobile': '',
            'usertype':''
            // 'thumb': '',

          })

        }}
        onCancel={onContactClose}>

        <div className="gx-modal-box-row">
          {/* <div className="gx-modal-box-avatar">
            <Avatar size="large" src={thumb}/>
          </div> */}

          <div className="gx-modal-box-form-item">
            <div className="gx-form-group">
              <Input
                required
                placeholder="First Name"
                onChange={(event) => this.setState({firstName: event.target.value})}
                defaultValue={firstName}
                margin="none"/>
            </div>
            <div className="gx-form-group">
              <Input
                required
                placeholder="Last Name"
                onChange={(event) => this.setState({lastName: event.target.value})}
                defaultValue={lastName}
                margin="none"/>
            </div>
            <div className="gx-form-group">
              <Input
                placeholder="Email"
                onChange={(event) => this.setState({email: event.target.value})}
                value={email}
                margin="normal"/>
            </div>
            <div className="gx-form-group">
              <Input
                placeholder="Mobile"
                onChange={(event) => this.setState({mobile: event.target.value})}
                value={mobile}
                margin="normal"
              />
            </div>
            <div className="gx-form-group">
              <Input
                placeholder="usertype"
                onChange={(event) => this.setState({usertype: event.target.value})}
                value={usertype}
                margin="normal"
              />
            </div>

          </div>
        </div>
      </Modal>
    );
  }
}

export default AddContact;
