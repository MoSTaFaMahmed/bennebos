import React from "react";
import _ from "lodash";

import ContactCell from "./ContactCell/index";

const ContactList = ({contactList, addFavourite, onSaveContact, onDeleteContact}) => {
  return (
    <div className="gx-contact-main-content">
      <div className="gx-module-contact-content">
            <p className="gx-mb-1">
              <span className="gx-text-truncate gx-contact-name"> firstName </span>
              <span className="gx-toolbar-separator">&nbsp;</span>
              <span className="gx-text-truncate gx-contact-name"> lastName </span>
              <span className="gx-text-truncate gx-contact-name"> usertype </span>
            </p>

            <div className="gx-text-muted">
            <span className="gx-email gx-d-inline-block gx-mr-2">
                email,
            </span>
              <span className="gx-phone gx-d-inline-block">mobile</span>
            </div>
          </div>
      {_.map(contactList, (contact, key) =>
        <ContactCell key={key} id={key} contact={contact} onDeleteContact={onDeleteContact}
                     onSaveContact={onSaveContact}
                     addFavourite={addFavourite} />
      )}

    </div>
  )
};

export default ContactList;
