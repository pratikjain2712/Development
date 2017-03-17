/* Author: Pratik*/
document.getElementById('registration').addEventListener('submit', function(evt){
    evt.preventDefault();
    formValidation();
});

var error,
  name = document.registration.fullName,
  mobile = document.registration.mobileNumber,
  age = document.registration.age,
  email = document.registration.email,
  course = document.registration.course,
  center = document.registration.center,
  tenth = document.registration.tenth,
  twelfth = document.registration.twelfth,
  graduation = document.registration.graduation;

  document.registration.fullName.addEventListener("blur",name_validation,true);
  document.registration.mobileNumber.addEventListener("blur",allnumeric,true);
  document.registration.email.addEventListener("blur",email_validate,true);

function formValidation() {
  if(name_validation()) {
      if(allnumeric()) {
        if(email_validate()){
        }
      }
    }
  return false;
  }


function name_validation(){
  error = document.getElementById('name-error');
  if(this.value){
    if(this.value.match(/(^[a-zA-z0-9_\.]{1,100}$)/g)){
      error.innerHTML= null;
      return true;
    }
    else{
      error.innerHTML="enter a proper name";
      this.focus();
      return false;
    }
  }
}

function allnumeric(){
  error = document.getElementById('mob-error');
  if(this.value){
    if(this.value.match(/(^[0-9+]{6,20}$)/g)){
      error.innerHTML= null;
      return true;
    }
    else{
      error.innerHTML="Please enter a valid mobile number must be between 6-20 in length";
      this.focus();
      return false;
    }
  }
}

function email_validate(){
  error = document.getElementById('email-error');
  if(email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
  {
    error.innerHTML= null;
    return true;
  }
  else
  {
    error.innerHTML= 'You have entered an invalid email address';
    this.focus();
    return false;
  }
}

