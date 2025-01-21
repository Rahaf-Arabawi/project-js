var Email = document.getElementById("Email");
var Pass = document.getElementById("Password");
var btnsign = document.getElementById("btns");
var errorspan = document.getElementById("merror");
var errorpass = document.getElementById("Error");

        btnsign.addEventListener("click", (event) => {
            var valid = true;
            event.preventDefault();

            errorspan.style.display = "none";
            errorspan.textContent = "";

            errorpass.style.display = "none";
            errorpass.textContent = "";

            var users = JSON.parse(localStorage.getItem("users")) || [];
            var user = users.find(u => u.email === Email.value.trim());

            if (Email.value.trim() === "") {
                Email.classList.add("border", "border-danger", "border-2");
                errorspan.style.display = "block";
                errorspan.textContent = "Please enter your email.";
                valid = false;
            }

            if (Pass.value.trim() === "") {
                Pass.classList.add("border", "border-danger", "border-2");
                errorpass.style.display = "block";
                errorpass.textContent = "Please enter your password.";
                valid = false;
            } else if (valid && (!user || user.password !== Pass.value)) {
                errorspan.style.display = "block";
                errorspan.textContent = "Invalid email or password.";
                valid = false;
            }

            if (valid) {
                // Save the logged-in user's email to localStorage
                localStorage.setItem("loggedInUser", user.email);
                alert("Login successful!");
                window.location.href = "dashboard.html";
            }
        });

        Email.addEventListener("input", () => {
            Email.classList.remove("border-danger");
            Email.classList.add("border-success");
        });

        Pass.addEventListener("input", () => {
            Pass.classList.remove("border-danger");
            Pass.classList.add("border-success");
        });