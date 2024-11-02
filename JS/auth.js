

let nameField = document.getElementById('name');
let emailField = document.getElementById('email');
let pwdField = document.getElementById('pw');
let errorField =document.getElementById('errorPwd');

function checkPwd(pw){
    console.log('checking')
    const hasUppercase = /[A-Z]/.test(pw);
    const hasNumber = /[0-9]/.test(pw);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pw);
    
    let msg = '<span style="color:red;font-size:18px">';
    
    
    if(pw.length<6) {
        errorField.innerHTML="";
        errorField.innerHTML= msg+"At least 6 characters long!</span>";
        console.log
        return false;
    }
    else if (!hasUppercase) {
        errorField.innerHTML= msg+"At 1 upperLetter</span>";
        return false;
    }
    else if (!hasNumber) {
        errorField.innerHTML= msg+"At 1 number</span>";
        return false;
    }
    else if (!hasSpecialChar) {
        errorField.innerHTML= msg+"At 1 specialCharcter</span>";
        return false;
    }
    else return true;
}



function validate(){
    console.log('checking validate');
    if(checkPwd(pwdField.value)){
      if(!localStorage.getItem('users')) {
        users=[];
        users.push({
            'name':nameField.value,
            'email':emailField.value,
            'password':pwdField.value
          });
        localStorage.setItem("users", JSON.stringify(users));
        errorField.innerHTML="";
      errorField.innerHTML='<span style="color:green;font-size:18px"> User Registered !</span>';
      }
      else {
        let usersRetrivied = JSON.parse(localStorage.getItem("users"));
        usersRetrivied.push({
            'name':nameField.value,
            'email':emailField.value,
            'password':pwdField.value
          });
          localStorage.setItem("users", JSON.stringify(usersRetrivied));
          errorField.innerHTML="";
      errorField.innerHTML='<span style="color:green;font-size:18px"> User Registered !</span>';
      }
    }
}

function checkCridentials(email,pwd){
    const usersRetrivied = JSON.parse(localStorage.getItem("users"));
    let state = false;
    for(i=0;i<usersRetrivied.length;i++){
        let o = Object.values(usersRetrivied[i]);
        if(email === o[1]&&pwd ===o[2]){
            console.log('matches');
            state=true;
            break;
        }
    }
    return state ;
}

function login(){
    if(checkCridentials(emailField.value,pwdField.value)) {
        loggedIn = {
            'userEmail':emailField.value,
            'loggedIn':true
        }
        localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
        window.open("home.html",'_self');
    }
    else alert('Wrong Cridentials !');
}