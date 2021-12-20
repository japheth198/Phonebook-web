import Contact from '../entities/Contact';



class ContactsRequest {
    allContactsData = () => {
     return fetch("https://localhost:44308/api/Users") 
            .then((response) => response.json())
            .then((contactsList) => {
                //console.log("Contact data", contactsList);
                return contactsList.map((contact, i) => {
                    return new Contact(contact);
                })
                
        });
    };

    sendNewContact = (newContact) => {
        return fetch("https://localhost:44308/api/Users", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //'Authorization': token            
                },
                body: JSON.stringify({
                    //id: newContact.id,
                    firstName: newContact.firstName,
                    lastName: newContact.lastName,

                })
                }).then(res=>res.json())
                .then(res => console.log(res));
    };

    deleteContact = (contactId, token) => {
        return fetch(`https://localhost:44308/api/Users/${contactId}`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token  
            },  
                })
                .then(res => console.log(res));
    };

    sendContactsDataValue = (newContactValue) => {
        return fetch("https://localhost:44308/api/Contacts", { 
            method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //'Authorization': token            
                },
                body: JSON.stringify({
                    //id: newContact.id,
                    value: newContactValue.value,
                })
                }).then(res=>res.json())
                .then(res => console.log(res));
    }

    sendContactsType = () => {
        return fetch("https://localhost:44308/api/ContactTypes", { 
            method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //'Authorization': token            
                },
                }).then(res=>res.json())
                .then(res => console.log(res));
    }
};

export const dataService = new ContactsRequest({});