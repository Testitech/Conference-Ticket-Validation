const uploadBox = document.getElementsByClassName("upload-box");
uploadBox.addEventListener("dragover", (e) => {
  e.preventDefault();
});

uploadBox.addEventListener("drop", (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  const file = files[0];
  const reader = new FileReader();

  reader.onload = (Event) => {
    const imageDataURL = Event.target.result;
    uploadBox.innerHTML = `<img src="${imageDataURL}" width="100%" height="100%">`;
  };

  reader.readAsDataURL(file);
});

/* =================================================================== */
// Select the form
// Select the form
const form = document.querySelector("form");

// Validation function (your method)
function validate() {
  // Clear all error messages
  document.getElementById("name-error").innerText = "";
  document.getElementById("email-error").innerText = "";
  document.getElementById("username-error").innerText = "";
  document.getElementById("img-err").innerText = "";

  // Get all input values
  const fullName = document.getElementById("full-name").value.trim();
  const emailAddress = document.getElementById("email").value.trim();
  const userName = document.getElementById("github-username").value.trim();

  let isValid = true;

  // Validate fullname
  if (fullName === "") {
    document.getElementById("name-error").innerText = "Fullname is required";
    isValid = false;
  }

  // Validate email
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(emailAddress)) {
    document.getElementById("email-error").innerText =
      "Please enter a valid email address";
    isValid = false;
  }

  // Validate github username
  if (userName === "") {
    document.getElementById("username-error").innerText =
      "Github Username is required";
    isValid = false;
  }

  return isValid; // Prevents form submission if invalid
}

// Add event listener for form submission
form.addEventListener("submit", function (event) {
  // Run validation first
  const isValid = validate();

  // If validation fails, prevent submission
  if (!isValid) {
    event.preventDefault(); // Stop form submission
    return;
  }

  // Get user input values after validation
  const fullName = document.getElementById("full-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const githubUsername = document
    .getElementById("github-username")
    .value.trim();

  // Encode query parameters to handle special characters and spaces
  const queryParams = new URLSearchParams({
    fullName: encodeURIComponent(fullName),
    email: encodeURIComponent(email),
    githubUsername: encodeURIComponent(githubUsername),
  });

  // Redirect with the parameters
  window.location.href = `welcome-page.html?${queryParams.toString()}`;

  // Prevent default submission to allow custom behavior
  event.preventDefault();
});
