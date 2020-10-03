var nameValidated = false;
var emailValidated = false;
var subjectValidated = false;

function validateName(){
    const name = document.querySelector(".name");
    if(name.value == null || name.value == ""){
        display(name, "fail", "Uh oh! Name is empty!");
    }
    else{
        nameValidated = true;
        display(name, "success", "success");
        showSubmit();

    }
}

function validateEmail(){
    const email = document.querySelector(".email");
    if(email.value == null || email.value == "" || emailInvalid(email.value)){
        display(email, "fail", "Uh oh! Try Again!")
    }
    else{
        emailValidated = true;
        display(email, "success", "success");
        showSubmit();
    }
}

function validateSubject(){
    const subject = document.querySelector(".subject");
    if(subject.value == null || subject.value == ""){
        display(subject, "fail", "Subject is empty!");
    }
    else{
        subjectValidated = true;
        display(subject, "success", "success");
        showSubmit();
    }
}

function display(element, type, message){
    const block = element.parentElement;
    block.className = "block " + type;
    const small = block.querySelector("small");
    small.innerText = message;
    if(type == "success"){
        small.style.opacity = 0;
    }
    else{
        small.style.opacity = 1;
    }

}

function emailInvalid(emailAddress){
    if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailAddress)){
        return false;
    }
    return true;
}

function showSubmit(){
    if(nameValidated && emailValidated && subjectValidated){
        const button = document.querySelector(".submit");
        button.disabled = false;
        button.style.opacity = 1;
    }
}

function getResponse(){
    element = document.querySelector(".sent");
    element.innerText = "Thanks! I'll check my inbox now";
}