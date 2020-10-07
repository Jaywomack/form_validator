const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid with regex
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// check required fields
// Uses a forEach to iterate through an array of inputs and check to see if they are empty anf if they are empty return an error. Otherwise show success
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    console.log(input);
    if (input.value.trim() == '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check the length of an input and ensure that it meets a min and max length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value != input2.value) {
    showError(input2, 'Passwords do not match!');
  }
}

// Get field name to capitalize the first letter and return it to the check required function
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
// Listening to the submit button on the form and running the function checkRequired on all of the inputs on submit
form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkLength(password2, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});

// Refactored code
// if (username.value === '') {
//     showError(username, 'Username is required');
//   } else {
//     showSuccess(username);
//   }

//   if (email.value === '') {
//     showError(email, 'Email is required');
//   } else if (!isValidEmail(email.value)) {
//     showError(email, 'Email is not valid');
//   } else {
//     showSuccess(email);
//   }

//   if (password.value === '') {
//     showError(password, 'Password is required');
//   } else {
//     showSuccess(password);
//   }

//   if (password2.value === '') {
//     showError(password2, 'Password 2 is required');
//   } else {
//     showSuccess(password2);
//   }
