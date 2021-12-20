import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem, Button } from 'reactstrap';



const PhoneContact = (props) => {


    return (
        <ListGroupItem>
            <div className='contact-name-surname'>
                <h4>{props.name} {props.surname}</h4>
                <p>{props.value}</p>
            </div>
            <Button color="danger" className='remove-contact' onClick={props.removeContact}><i className="fa fa-trash" aria-hidden="true"></i></Button>{' '}
        </ListGroupItem>
    );
};

PhoneContact.propTypes = {
    name: PropTypes.string,
    surname: PropTypes.string,
    
    value: PropTypes.string,
    removeContact: PropTypes.func.isRequired
};

export default PhoneContact;