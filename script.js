
document.getElementById("login").addEventListener("click", function() {
  window.location.href = "login.html";
});

document.getElementById("sign").addEventListener("click", function() {
  window.location.href = "signUp.html";
});

// Login validations
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("floatingInput");
const passwordInput = document.getElementById("floatingPassword");

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    if (validateLoginInputs()) {
      loginUser(emailInput.value, passwordInput.value);
    }
  });
}

const validateLoginInputs = () => {
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  let isValid = true;

  const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
  }

  const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
  }

  const validEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  if (emailValue === '') {
    setError(emailInput, 'Email is required');
    isValid = false;
  } else if (!validEmail(emailValue)) {
    setError(emailInput, 'Provide a valid email address');
    isValid = false;
  } else {
    setSuccess(emailInput);
  }

  if (passwordValue === '') {
    setError(passwordInput, 'Password is required');
    isValid = false;
  } else if (passwordValue.length < 8) {
    setError(passwordInput, 'Password must be at least 8 characters');
    isValid = false;
  } else {
    setSuccess(passwordInput);
  }

  return isValid;
};

const loginUser = (email, password) => {
  const data = { email: email, password: password };

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Login successful');
      window.location.href = 'index.html';
    } else {
      alert(data.message);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
};

// Signup validations
const signupForm = document.getElementById("signup-form");
const usernameInput = document.getElementById("username");
const signupEmailInput = document.getElementById("email");
const signupPasswordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    if (validateSignupInputs()) {
      signupUser(usernameInput.value, signupEmailInput.value, signupPasswordInput.value);
    }
  });
}

const validateSignupInputs = () => {
  const emailValue = signupEmailInput.value.trim();
  const passwordValue = signupPasswordInput.value.trim();
  const confirmPasswordValue = confirmPasswordInput.value.trim();

  let isValid = true;

  const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
  }

  const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
  }

  const validEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  if (emailValue === '') {
    setError(signupEmailInput, 'Email is required');
    isValid = false;
  } else if (!validEmail(emailValue)) {
    setError(signupEmailInput, 'Provide a valid email address');
    isValid = false;
  } else {
    setSuccess(signupEmailInput);
  }

  if (passwordValue === '') {
    setError(signupPasswordInput, 'Password is required');
    isValid = false;
  } else if (passwordValue.length < 8) {
    setError(signupPasswordInput, 'Password must be at least 8 characters');
    isValid = false;
  } else {
    setSuccess(signupPasswordInput);
  }

  if (confirmPasswordValue === '') {
    setError(confirmPasswordInput, 'Confirm Password is required');
    isValid = false;
  } else if (confirmPasswordValue !== passwordValue) {
    setError(confirmPasswordInput, 'Passwords do not match');
    isValid = false;
  } else {
    setSuccess(confirmPasswordInput);
  }

  return isValid;
};

const signupUser = (username, email, password) => {
  const data = { username, email, password };

  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('User created successfully. You can sign in now.');
      window.location.href = 'login.html';
    } else {
      alert(data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An unexpected error occurred. Please try again later.');
  });
};

// Selecting elements
const passwordsInput = document.getElementById('password');
const confirmpasswordsInput = document.getElementById('confirmPassword');

const togglePassword = document.getElementById('togglePassword');

// Function to toggle password visibility
function togglePasswordVisibility() {
  const type = passwordsInput.getAttribute('type') === 'password' ? 'text' : 'password';
  const type2 = confirmpasswordsInput.getAttribute('type2') === 'confirmPassword' ? 'text' : 'confirmPassword';

  passwordsInput.setAttribute('type', type);
  confirmpasswordsInput.setAttribute('type2', type2);
  togglePassword.classList.toggle('bi-eye-fill');
  togglePassword.classList.toggle('bi-eye-slash-fill');
}

// Adding click event listener to the eye icon
togglePassword.addEventListener('click', togglePasswordVisibility);



// buy
function addToCart(bookName, price) {
  // Store book details in localStorage
  localStorage.setItem('bookName', bookName);
  localStorage.setItem('price', price);
  // Redirect to buy.html
  window.location.href = 'buy.html';
}

document.addEventListener('DOMContentLoaded', function() {
  // Retrieve stored values from localStorage
  var productName = localStorage.getItem('bookName');
  var productPrice = localStorage.getItem('price');

  // Update the HTML elements with retrieved values
  document.getElementById('productName').textContent = productName;
  document.getElementById('productPrice').textContent = '$' + parseFloat(productPrice).toFixed(2);
      document.getElementById('totalPrice').textContent = '$' + parseFloat(productPrice).toFixed(2);
});

// contact us



document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Display the success message
    document.getElementById('successMessage').classList.remove('d-none');

    // Redirect after a short delay (5 seconds)
    setTimeout(function() {
      window.location.href = 'index.html';
    }, 2000);
  });
});

