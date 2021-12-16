class AuthenticationRequest {
    sendAuthRegister = (registerAccount) => {
        console.log(registerAccount);
        return fetch("https://localhost:44308/api/AuthManagement/Register", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',                    
                },
                body: JSON.stringify(registerAccount)({
                    email: registerAccount.email,
                    password: registerAccount.password,
                })
                }).then(response => response.json())
                .then(body => {
                console.log(body);
                });
    };

    sendAuthLogin = (loginAccount) => {
        console.log(loginAccount);
        return fetch("https://localhost:44308/api/AuthManagement/Login", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',                    
                },
                body: JSON.stringify(loginAccount)})
                .then(response => response.json())
                .then(body => {
                console.log(body);
                });
    };
    /*sendAuthLogout = () => {
        return fetch("https://localhost:44308/api/AuthManagement/Login", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    
                },
                }).then(res=>res.json())
                .then(res => console.log(res));
    };*/

};

export const authenticationService = new AuthenticationRequest();