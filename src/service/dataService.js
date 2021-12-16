import Contact from '../entities/Contact';



class ContactsRequest {
    allContactsData = () => {
     return fetch("https://localhost:44308/api/Users") 
            .then((response) => response.json())
            .then((contactsList) => {
                return contactsList.map((contact, i) => {
                    return new Contact(contact);
                })
                
        });
    };

    sendNewContact = (newContact, token) => {
        return fetch("https://localhost:44308/api/Users", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token             
                },
                body: JSON.stringify({
                    id: newContact.id,
                    first_name: newContact.firstName,
                    last_name: newContact.lastName,
                })
                }).then(res=>res.json())
                .then(res => console.log(res));
    };

    deleteContact = (id) => {
        return fetch(`https://localhost:44308/api/Users/${id}`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },  
                }).then(res=>res.json())
                .then(res => console.log(res));
    };
};

export const dataService = new ContactsRequest({});