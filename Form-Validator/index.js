//jshint esversion:6

const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const password1 = document.getElementById('password');
const password2 = document.getElementById('confirm');
const button = document.querySelector('.btn');

const nameFormat = /^[a-z ,.'-]+$/i;
const emailFormat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordFormat = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;


function checkValidity(input, format) { //check names and email address
    const name = input.value;
    const nameIsValid = format.test(name);
    
    alterIconAndMsg(input, nameIsValid);
}


function checkPasswordValidity () {
    var pw = password1.value;

    const isValid = passwordFormat.test(pw);
    console.log('Password is:' + isValid);
    
    alterIconAndMsg(password1, isValid, pw);

    confirmPassword(isValid);
}

function alterIconAndMsg(input, isValid, password) {
    const inputField = input.parentElement;
    const icon = inputField.querySelector('.icon');
    const errorMsg = inputField.querySelector('.msg');

    if(!isValid) {
        errorMsg.className = "msg error"; //Make error message visible.
        icon.setAttribute('src', './icons/report.png');
        if(arguments.length == 3) {
            hintsForPassword(password);//Show user some hints to improve password strength.
        } 
    } else {
        errorMsg.className = "msg";
        icon.setAttribute('src', './icons/tick.png');
    }

}

function confirmPassword(passwordIsValid) {
    console.log(password1.value);
    console.log(password2.value);
    
    const passwordMatched = password1.value === password2.value;
    const confirmMsg = password2.parentElement.querySelector('.msg');
    const passwordConfirmed = passwordMatched && passwordIsValid; //true if two passwords matched and password format is correct

   if (passwordConfirmed) {
    alterIconAndMsg(password2, passwordMatched);
   } else {
       alterIconAndMsg(password2, passwordConfirmed);
       if (!passwordIsValid) {
        confirmMsg.innerHTML = 'Your password format is not correct!';
       }

   }
    
}

function hintsForPassword (password) { //help user to structure their password
    const lengthCheck = /.{8}/g; //at least 8 characters
    const atLeastEight = lengthCheck.test(password);
    console.log('lengthCheck is'+ atLeastEight);
    
    const numCheck = /[0-9]+/g; //at least one number in password
    const hasNum = numCheck.test(password);
    console.log('numCheck is' + hasNum);
    

    const capCheck = /[A-Z]+/g; // at least one capital number in password
    const hasCap = capCheck.test(password);
    console.log('capCheck is ' + hasCap);
    
    var msg = '';
    if (!atLeastEight) {
        msg += 'Password must have at least 8 characters.<br>';
    }
    if (!hasNum) {
        msg += 'Password must contain at least one number.<br>';
    }
    if (!hasCap) {
        msg += 'Password must contain at least one capital letter';
    }

    const passwordMsg = password1.parentElement.querySelector('.msg');
    passwordMsg.innerHTML = msg;
    
}



button.addEventListener("click", (e) => {
    e.preventDefault();

    checkValidity(firstName, nameFormat);
    checkValidity(lastName, nameFormat );
    checkValidity(email, emailFormat);
    checkPasswordValidity();
});