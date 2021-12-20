class Contact {
    constructor(contact) {
        this.firstName = contact.firstName;
        this.lastName = contact.lastName;
        //this.number = contact.Number;
        //this.email = contact.email;
        this.id = contact.id;

        //contact PropTypes
        this.value = contact.value;
    }
}

export default Contact;