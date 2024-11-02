let logIn = JSON.parse(localStorage.getItem("loggedIn"));
let users = JSON.parse(localStorage.getItem("users"));

let wlcmMessgageField = document.getElementById('wlcm');

let userInfo;
if (!Object.values(logIn)[1]) window.open("index.html",'_self');

users.forEach(element => {
   if(Object.values(logIn)[0] === Object.values(element)[1]) userInfo= Object.values(element);
});

wlcmMessgageField.innerHTML="Welcome mr "+userInfo[0]+"."

function logout(){
    loggedIn = {
        'userEmail':"",
        'loggedIn':false
    }
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    window.open("index.html",'_self');
}