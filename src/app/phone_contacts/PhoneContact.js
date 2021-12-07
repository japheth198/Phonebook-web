import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem, Button } from 'reactstrap';



const PhoneContact = (props) => {


    return (
        <ListGroupItem>
            <div className='contact-name-surname'>
                <h4>{props.name} {props.surname}</h4>
                <i className="fa fa-phone" aria-hidden="true"></i><h6 className='contact-number'>{props.phoneNumber}</h6><h6 className='contact-email'>{props.Email}</h6>
            </div>
            <Button color="danger" className='remove-contact' onClick={props.removeContact}><i className="fa fa-trash" aria-hidden="true"></i></Button>{' '}
        </ListGroupItem>
    );
};

PhoneContact.propTypes = {
    name: PropTypes.string.none,
    surname: PropTypes.string.none,
    phoneNumber: PropTypes.string.none,
    Email: PropTypes.string.none,
    removeContact: PropTypes.func.isRequired
};

export default PhoneContact;