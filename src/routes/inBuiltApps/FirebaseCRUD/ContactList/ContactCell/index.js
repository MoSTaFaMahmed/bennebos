import React from "react";
import {Avatar, Dropdown, Menu} from "antd";

import AddContact from "../../AddContact/index";

const options = [
  'Edit',
  'Delete',
];

class ContactCell extends React.Component {

  onContactClose = () => {
    this.setState({addContactState: false});
  };
  onDeleteContact = () => {
    this.setState({addContactState: false});
    this.props.onDeleteContact(this.props.id);
  };
  onEditContact = () => {
    this.setState({addContactState: true});
  };
  menus = () => (<Menu onClick={(e) => {
    if (e.key === 'Edit') {
      this.onEditContact()
    } else {
      this.onDeleteContact(this.props.id)
    }
  }
  }>
    {options.map(option =>
      <Menu.Item key={option}>
        {option}
      </Menu.Item>,
    )}
  </Menu>);

  constructor() {
    super();
    this.state = {
      addContactState: false,
    }
  }

  render() {
    const {contact, id, onSaveContact} = this.props;
    const {addContactState} = this.state;
    const {firstName, lastName, email, mobile,usertype  } = contact;
    const columns = [
      {
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
        title:'phone',
        dataIndex:'mobile',
        key:'mobile',

      },{
        title: 'Usertype',
        dataIndex: 'usertype',
        key: 'usertype',

      },]

    return (

      <div className="gx-contact-item">


        <div className="gx-module-list-info gx-contact-list-info">
          <div className="gx-module-contact-content">
            <p className="gx-mb-1">
              <span className="gx-text-truncate gx-contact-name"> {firstName} </span>
              <span className="gx-toolbar-separator">&nbsp;</span>
              <span className="gx-text-truncate gx-contact-name"> {lastName} </span>
              <span className="gx-text-truncate gx-contact-name"> {usertype} </span>
            </p>

            <div className="gx-text-muted">
            <span className="gx-email gx-d-inline-block gx-mr-2">
                {email},
            </span>
              <span className="gx-phone gx-d-inline-block">{mobile}</span>
            </div>
          </div>
          <div className="gx-module-contact-right">

            <Dropdown overlay={this.menus()} placement="bottomRight" trigger={['click']}>
              <i className="gx-icon-btn icon icon-ellipse-v"/>
            </Dropdown>

            {addContactState &&
            <AddContact open={addContactState} contact={contact} onSaveContact={onSaveContact} contactId={id}
                        onContactClose={this.onContactClose} onDeleteContact={this.onDeleteContact}/>}
          </div>
        </div>
      </div>
    )
  }
}

export default ContactCell;
