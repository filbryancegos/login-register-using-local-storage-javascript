class Signup {
    constructor(fullname,username,emailaddress,password,confirmpassword) {
        this.fullname = fullname;
        this.username = username;
        this.emailaddress = emailaddress;
        this.password = password;
        this.confirmpassword = password;
    }
}

class Signin {
    constructor(email,pass) {
        this.email = email;
        this.pass = pass;
    }
}

class UI {
    static displayInfos() {
        const infos = Store.getInfo();
        console.log(infos);
        infos.forEach((info) => {
            UI.addInfotoList(info)
        })
    }
    static addInfotoList(info) {
        const tr = document.querySelector('#register-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${info.fullname}</td>
            <td>${info.username}</td>
            <td>${info.emailaddress}</td>
        `;
        tr.appendChild(row);
    }

    static clearField() {
        fullname.value = '';
        username.value = '';
        emailaddress.value = '';
        password.value = '';
        confirmpassword.value = '';
        email.value = '';
        pass.value = '';

    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const signupform = document.querySelector('#signup-form');
        container.insertBefore(div, signupform);

        //vanish in 3 seconds;
        setTimeout(() => document.querySelector('.alert').remove(),
        8000 )
    }
}

class Store {
    static getInfo() {
        let infos;
        if(localStorage.getItem('infos') === null) {
          infos = [];
        } else {
          infos = JSON.parse(localStorage.getItem('infos'));
        }
        return infos;
      }

    static addInfo(info) {
        const infos = Store.getInfo();
        infos.push(info);
        localStorage.setItem('infos', JSON.stringify(infos));
    }
}
const signupform = document.querySelector('#signup-form');

const [signin,signinform,signup] = [document.querySelector('#signin'),document.querySelector('#signin-form'),document.querySelector('#signup')];

signin.addEventListener('click',(e) => {
    if (signupform.classList.length === 0) {
        signupform.classList = 'd-none';
        signinform.classList.remove('d-none')
    }
})

signup.addEventListener('click', (e) => {
    if (signinform.classList.length === 0) {
        signinform.classList = 'd-none';
        signupform.classList.remove('d-none')
    }
    
})

const dom = [
    document.querySelector('#fullname'),
    document.querySelector('#username'),
    document.querySelector('#emailaddress'),
    document.querySelector('#password'),
    document.querySelector('#confirmpassword'),
]

const [fullname,username,emailaddress,password,confirmpassword] = [...dom];


document.addEventListener('DOMContentLoaded',UI.displayInfos);

signupform.addEventListener('submit',(e) => {
    e.preventDefault();
    
    const values = [fullname.value,username.value,emailaddress.value,password.value,confirmpassword.value];

    const info = new Signup(...values);

    if (fullname.value === '' || username.value === "" || emailaddress.value === "" || password.value === "" || confirmpassword.value === "") {
            UI.showAlert('please input fields','danger')
    } else if(password.value != confirmpassword.value) {
        UI.showAlert('password should be the same','danger')
    } else {
        
        UI.addInfotoList(info);

        Store.addInfo(info);
        UI.clearField();
    }
})

const domsignin = [
    document.querySelector('#email'),
    document.querySelector('#pass')
]

const [email,pass] = [...domsignin]

signinform.addEventListener('click', (e) => {
    e.preventDefault();
    
    const values = [email.value,pass.value];
    const infos = new Signin(...values);
    
    if (email.value === "" || pass.value === "") {
        // UI.showAlert('please input fields','danger')
    } else {
        Store.getInfo();
        const storageinfos = Store.getInfo();
        let message = '';
        storageinfos.filter((info, index) => {
            if (info.emailaddress === email.value && info.password === pass.value) {
                // message = UI.showAlert('your now login','success');
                console.log(index);
                console.log(info)
                UI.clearField();
            } else {
                alert("please input correctly")
            }
        })
        
        return setTimeout(() => {
             message
        },3000);
    }
    //console.log(infos);
})
