var FirstN = document.getElementById("First Name");
var LastN = document.getElementById("Last Name");
var Email = document.getElementById("Email");
var Pass = document.getElementById("Password");
var Confirm = document.getElementById("confirm Password");
var btnsign = document.getElementById("btns");
var errorspan = document.getElementById("merror");
var errorpass = document.getElementById("Error");
var errorconfirm = document.getElementById("cerror");

var arr = JSON.parse(localStorage.getItem("users")) || [];

btnsign.addEventListener("click", (event) => {
    var valid = true;
    event.preventDefault();

    // Reset error messages
    errorspan.style.display = "none";
    errorspan.textContent = "";

    errorpass.style.display = "none";
    errorpass.textContent = "";

    errorconfirm.style.display = "none";
    errorconfirm.textContent = "";

    // Validate First Name
    if (FirstN.value.trim() === "") {
        FirstN.classList.add("border", "border-danger", "border-2");
        valid = false;
    }

    // Validate Last Name
    if (LastN.value.trim() === "") {
        LastN.classList.add("border", "border-danger", "border-2");
        valid = false;
    }

    // Validate Email
    if (Email.value.trim() === "") {
        Email.classList.add("border", "border-danger", "border-2");
        valid = false;
    } else if (!Email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errorspan.style.display = "block";
        errorspan.textContent = "Please enter a valid email address!";
        valid = false;
    }

    // Validate Password
    if (Pass.value.trim() === "") {
        Pass.classList.add("border", "border-danger", "border-2");
        valid = false;
    } else if (!Pass.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/)) {
        errorpass.style.display = "block";
        errorpass.textContent = "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character!";
        valid = false;
    }

    // Validate Confirm Password
    if (Confirm.value.trim() === "") {
        Confirm.classList.add("border", "border-danger", "border-2");
        valid = false;
    } else if (Confirm.value !== Pass.value) {
        errorconfirm.style.display = "block";
        errorconfirm.textContent = "Passwords do not match!";
        valid = false;
    }

    // If all validations pass
    if (valid) {
        var user = {
            firstName: FirstN.value.trim(),
            lastName: LastN.value.trim(),
            email: Email.value.trim(),
            password: Pass.value
        };

        // Check if email already exists
        var emailExists = arr.some(u => u.email === user.email);
        if (emailExists) {
            errorspan.style.display = "block";
            errorspan.textContent = "This email is already registered!";
        } else {
            // Save user to localStorage
            arr.push(user);
            localStorage.setItem("users", JSON.stringify(arr));

            // Show success message
            alert("Registration successful!");

            // Clear form fields
            FirstN.value = "";
            LastN.value = "";
            Email.value = "";
            Pass.value = "";
            Confirm.value = "";
        }
    }
});

// Remove error styles on input
FirstN.addEventListener("input", () => {
    FirstN.classList.remove("border-danger");
    FirstN.classList.add("border-success");
});

LastN.addEventListener("input", () => {
    LastN.classList.remove("border-danger");
    LastN.classList.add("border-success");
});

Email.addEventListener("input", () => {
    Email.classList.remove("border-danger");
    Email.classList.add("border-success");
});

Pass.addEventListener("input", () => {
    Pass.classList.remove("border-danger");
    Pass.classList.add("border-success");
});

Confirm.addEventListener("input", () => {
    Confirm.classList.remove("border-danger");
    Confirm.classList.add("border-success");
});
