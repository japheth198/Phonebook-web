import React from 'react';
import { ListGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import PhoneContact from './PhoneContact';



const PhoneContactsList = (props) => {


    const filterPhoneContacts = props.allContacts.filter(
        (contact) => {
            let ContactData = contact.lastName.toLowerCase() + ' ' + contact.firstName.toLowerCase();
            return ContactData.indexOf(props.search.toLowerCase()) !== -1;
        }
    );

    let results = filterPhoneContacts.map((contact, i) => {
        return <PhoneContact 
                name={contact.firstName} 
                surname={contact.lastName} 
                key={contact.id}
                removeContact={() => props.removeContact(contact.id, i)} />
    });

    return (
        <ListGroup>
            {results}
      </ListGroup>
    );
};

// Validation of forwarded props to component PhoneContactList

PhoneContactsList.propTypes = {
    allContacts: PropTypes.array.isRequired,
    removeContact: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired
};

export default PhoneContactsList;