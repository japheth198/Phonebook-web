import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter , Form, FormGroup, Input } from 'reactstrap';
import Search from './search_contacts/Search';
import PhoneContactsList from './phone_contacts/PhoneContactsList';
import { dataService } from '../service/dataService';
import { authenticationService } from '../service/authenticationService';




class App extends Component {
  state= {
    searchContact: "",
    modal: false,
    modalLogin: false,
    modalRegister: false,
    errorMessage: "",
    addContactName: "",
    addContactSurname: "",
    addLoginEmail: "japhethjuur19@gmail.com",
    addLoginPassword: "Saimon-32",
    addRegisterEmail: "",
    addRegisterPassword: "",
    token: "",
    contacts: [],
    account: ""
  };

  // Fetch contacts data
  componentDidMount() {
    dataService.allContactsData()
    .then((allData) => {
        this.setState({
          contacts: allData
        })
    });
  };
  

  // Toggle react modal for button create new contact
  toggle1 = () => {
    this.setState({
      modal: !this.state.modal,
      errorMessage: ""
    });
  }

  toggle2 = () => {
    this.setState({
      modalLogin: !this.state.modalLogin,
      errorMessage: ""
    });
  }

  toggle3 = () => {
    this.setState({
      modalRegister: !this.state.modalRegister,
      errorMessage: ""
    });
  }

  
  // Add new contact to the list

    // Add contact name
    addNewContactName = e => {
      this.setState({ 
        addContactName: e.target.value,
        errorMessage: "" });
    };

    // Add contact surname
    addNewContactSurname = e => {
      this.setState({ 
        addContactSurname: e.target.value,
        errorMessage: "" });
    };


    // Add register email
    addNewRegisterEmail = n => {
      this.setState({ 
        addRegisterEmail: n.target.value,
        errorMessage: "" });
    };

    // Add register password
    addNewRegisterPassword = n => {
      this.setState({ 
        addRegisterPassword: n.target.value,
        errorMessage: "" });
    };

    // Add login email
    addNewLoginEmail = e => {
      this.setState({ 
        addLoginEmail: e.target.value,
        errorMessage: "" });
    };

    // Add login password
    addNewLoginPassword = e => {
      this.setState({ 
        addLoginPassword: e.target.value,
        errorMessage: "" });
    };


  // Handler function for adding new contact on click
  submitNewContact = e => {
    e.preventDefault();
    if(this.state.addContactName === "" || this.state.addContactSurname === "") {
      this.setState({
        errorMessage: 'All inputs must be filled!'
      })
    } 
    else {      
      this.state.contacts.push({
        firstName: this.state.addContactName,
        lastName: this.state.addContactSurname,
        id: Math.round(Math.random() * 4000 + 1234)
      });
      this.setState(this.state);

      this.submitAddedContact(this.state.contacts[this.state.contacts.length - 1]);
      this.setState({
        modal: false
      })
    }

  };

  SubmitNewAccount = e => {
    //e.preventDefault();
    if(this.state.addRegisterEmail === "" || this.state.addRegisterPassword === "") {
      this.setState({
        errorMessage: 'All inputs must be filled!'
      })
    } 
    else {      
      this.submitAddedNewAccount({email: this.state.addRegisterEmail, password: this.state.addRegisterPassword});
      this.setState({
        modalLogin: false
      })
    }

  };

  SubmitOldAccount = e => {
    //e.preventDefault();
    if(this.state.addLoginEmail === "" || this.state.addLoginPassword === "") {
      this.setState({
        errorMessage: 'All inputs must be filled!'
      })
    } 
    else {      
      this.submitAddedLogAccount({email: this.state.addLoginEmail, password: this.state.addLoginPassword});
      this.setState({
        modalLogin: false
      })
    }

  };

  // Send added contact to server
  submitAddedContact = (c) => {
   let result = dataService.sendNewContact(c, this.state.token);
  console.log(result);
  };

  // Send added auth to server
  submitAddedNewAccount = (c) => {
    let result = authenticationService.sendAuthRegister(c);
   console.log(result);
   };


  // Send added auth to server
  submitAddedLogAccount = (c) => {
    let result = authenticationService.sendAuthLogin(c);
    this.setState({
      token: 'Bearer ' + result
    });
   console.log(result);
   };

  // Remove contact from the list
  removeContact = (contactId, contactIndex) => {
    dataService.deleteContact(contactId);
    this.setState({
      contacts: [
        ...this.state.contacts.slice(0, contactIndex),
        ...this.state.contacts.slice(contactIndex + 1)
      ]
    });
    console.log(contactId);
  };

  // Search contacts by surname
  updateSearch = e => {
    this.setState({searchContact: e.target.value})
  };
  render() {
    return (
      
      <Container className='main-container'>
        <Row >
          <Col md={{ size: 8, offset: 2 }}>
          </Col>
        </Row>

        <Container className='all-contacts'>
          <Row>
            <Col md={{ size: 8, offset: 2 }} className='phone-contact-field'>
                <h3 className='phone-contacts'>Contacts</h3>
                <div>
                  <Button color="primary" onClick={this.toggle1}>+ Add Contact</Button>
                  <Modal isOpen={this.state.modal} toggle={this.toggle1} className={this.props.className}>
                    <ModalHeader toggle={this.toggle1}>New contact</ModalHeader>
                    <ModalBody>
                    <Form method='post'>
                        <FormGroup>
                          <Input type="text" className='contact-data' value={this.addContactName} onChange={this.addNewContactName} placeholder="First name" autoComplete="none" />
                          <Input type="text" className='contact-data' value={this.addContactSurname} onChange={this.addNewContactSurname} placeholder="Last name" autoComplete="none" />
                        </FormGroup>
                    </Form>
                      <div>{this.state.errorMessage}</div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.submitNewContact}>Create</Button>{' '}
                      <Button color="secondary" onClick={this.toggle1}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </div>
                <div>
                  <Button color="primary" onClick={this.toggle2}>Login</Button>
                  <Modal isOpen={this.state.modalLogin} toggle={this.toggle2} className={this.props.className}>
                    <ModalHeader toggle={this.toggle2}>Existing account</ModalHeader>
                    <ModalBody>
                    <Form method='post'>
                        <FormGroup>
                          <Input type="text" className='auth-data' value={this.state.addLoginEmail} onChange={this.addNewLoginEmail} placeholder="Email address"/>
                          <Input type="text" className='auth-data' value={this.state.addLoginPassword} onChange={this.addNewLoginPassword} placeholder="Password"/>
                        </FormGroup>
                    </Form>
                      <div>{this.state.errorMessage}</div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.SubmitOldAccount}>Login</Button>{' '}
                      <Button color="primary" onClick={this.toggle2}>Back</Button>
                    </ModalFooter>
                  </Modal>
                </div>
                <Search 
                    updateSearch={this.updateSearch} 
                    searchValue={this.state.searchContact} />
                <PhoneContactsList 
                    allContacts={this.state.contacts}
                    removeContact={this.removeContact}
                    search = {this.state.searchContact}/>
            </Col>
          </Row>
        </Container>

        <Row>
          <Col md={{ size: 8, offset: 2 }}></Col>
        </Row>
      </Container>
    );
  }
}
export default App;

/*<Modal isOpen={this.state.modalLogin} toggle={this.toggle3} className={this.props.className}>
                    <ModalHeader toggle={this.toggle3}>New account</ModalHeader>
                    <ModalBody>
                    <Form method='post'>
                        <FormGroup>
                          <Input type="text" className='auth-data' value={this.addRegisterEmail} onChange={this.addNewRegisterEmail} placeholder="Email address"/>
                          <Input type="text" className='auth-data' value={this.addRegisterPassword} onChange={this.addNewRegisterPassword} placeholder="Password"/>
                        </FormGroup>
                    </Form>
                      <div>{this.state.errorMessage}</div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.SubmitNewAccount}>Register</Button>{' '}
                      <Button color="primary" onClick={this.toggle2}>Logout</Button>
                    </ModalFooter>
                  </Modal>ˇ*/