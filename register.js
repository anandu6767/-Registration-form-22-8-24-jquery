$(document).ready(function() {
    // Datepicker
    $("#dob").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "-100:+0",
        dateFormat: "mm/dd/yy"
    });

    // Floating label behavior
    $("input, textarea").on("focusout", function() {
        if ($(this).val() != "") {
            $(this).siblings(".floating-label").addClass("float");
        } else {
            $(this).siblings(".floating-label").removeClass("float");
        }
    });

    // Dynamic city loading based on state
    const stateCityMap = {
        "DL": ["New Delhi"],
        "MH": ["Mumbai", "Pune", "Nagpur"],
        "KA": ["Bangalore", "Mysore", "Mangalore"],
        "TN": ["Chennai", "Coimbatore", "Madurai"],
        "WB": ["Kolkata", "Howrah", "Durgapur"],
        "UP": ["Lucknow", "Kanpur", "Agra"],
        "GJ": ["Ahmedabad", "Surat", "Vadodara"]
    };

    $("#state").change(function() {
        const selectedState = $(this).val();
        let cityOptions = "<option value=''>Select City</option>";

        if (selectedState && stateCityMap[selectedState]) {
            stateCityMap[selectedState].forEach(function(city) {
                cityOptions += `<option value="${city}">${city}</option>`;
            });
        }

        $("#city").html(cityOptions);
    });

    // Form validation
    $("#registration-form").on("submit", function(event) {
        event.preventDefault();
        var isValid = true;

        // First Name validation
        if ($("#first-name").val().trim() === "") {
            $("#first-name-error").text("First Name is required").show();
            $("#first-name").addClass("input-error");
            isValid = false;
        } else {
            $("#first-name-error").hide();
            $("#first-name").removeClass("input-error");
        }

        // Last Name validation
        if ($("#last-name").val().trim() === "") {
            $("#last-name-error").text("Last Name is required").show();
            $("#last-name").addClass("input-error");
            isValid = false;
        } else {
            $("#last-name-error").hide();
            $("#last-name").removeClass("input-error");
        }

        // Date of Birth validation
        if ($("#dob").val().trim() === "") {
            $("#dob-error").text("Date of Birth is required").show();
            isValid = false;
        } else {
            $("#dob-error").hide();
        }

        // Gender validation
        if ($("input[name='gender']:checked").length === 0) {
            $("#gender-error").text("Gender is required").show();
            isValid = false;
        } else {
            $("#gender-error").hide();
        }

        // Phone Number validation
        let phoneNumber = $("#phone").val().trim();
        let phonePattern = /^[6-9]\d{9}$/;

        if (phoneNumber === "") {
            $("#phone-error").text("Phone Number is required").show();
            isValid = false;
        } else if (!phonePattern.test(phoneNumber)) {
            $("#phone-error").text("Phone Number must be 10 digits and start with 6, 7, 8, or 9").show();
            isValid = false;
        } else {
            $("#phone-error").hide();
        }

        // Email validation
        const email = $("#email").val().trim();
        if (!validateEmail(email)) {
            $("#email-error").text("Please enter a valid email address.").show();
            $("#email").addClass("input-error");
            isValid = false;
        } else {
            $("#email-error").hide();
            $("#email").removeClass("input-error");
        }

        // Address validation
        if ($("#address").val().trim() === "") {
            $("#address-error").text("Address is required").show();
            isValid = false;
        } else {
            $("#address-error").hide();
        }

        // State validation
        if ($("#state").val() === "") {
            $("#state-error").text("State is required").show();
            isValid = false;
        } else {
            $("#state-error").hide();
        }

        // City validation
        if ($("#city").val() === "") {
            $("#city-error").text("City is required").show();
            isValid = false;
        } else {
            $("#city-error").hide();
        }

        // Username validation
        if ($("#username").val().trim() === "") {
            $("#username-error").text("Username is required").show();
            isValid = false;
        } else {
            $("#username-error").hide();
        }

        // Password validation
        const password = $("#password").val().trim();
        if (password.length < 6) {
            $("#password-error").text("Password must be at least 6 characters long.").show();
            $("#password").addClass("input-error");
            isValid = false;
        } else {
            $("#password-error").hide();
            $("#password").removeClass("input-error");
        }

        // Confirm Password validation
        const confirmPassword = $("#confirm-password").val().trim();
        if (confirmPassword === "") {
            $("#confirm-password-error").text("Confirm Password is required").show();
            isValid = false;
        } else if (confirmPassword !== password) {
            $("#confirm-password-error").text("Passwords do not match").show();
            isValid = false;
        } else {
            $("#confirm-password-error").hide();
        }

        if (isValid) {
            alert("Form submitted successfully!");
        }
    });

    // Real-time validation for email
    $("#email").on("blur", function() {
        const email = $(this).val().trim();
        if (!validateEmail(email)) {
            $("#email-error").text("Please enter a valid email address.").show();
            $(this).addClass("input-error");
        } else {
            $("#email-error").hide();
            $(this).removeClass("input-error");
        }
    });

    // Real-time validation for password
    $("#password").on("blur", function() {
        const password = $(this).val().trim();
        if (password.length < 6) {
            $("#password-error").text("Password must be at least 6 characters long.").show();
            $(this).addClass("input-error");
        } else {
            $("#password-error").hide();
            $(this).removeClass("input-error");
        }
    });

    // Real-time validation for first name
    $("#first-name").on("blur", function() {
        const firstname = $(this).val().trim();
        if (firstname === "") {
            $("#first-name-error").text("First Name is required").show();
            $(this).addClass("input-error");
        } else {
            $("#first-name-error").hide();
            $(this).removeClass("input-error");
        }
    });

    // Real-time validation for last name
    $("#last-name").on("blur", function() {
        const lastname = $(this).val().trim();
        if (lastname === "") {
            $("#last-name-error").text("Last Name is required").show();
            $(this).addClass("input-error");
        } else {
            $("#last-name-error").hide();
            $(this).removeClass("input-error");
        }
    });

    // Real-time validation for username
    $("#username").on("blur", function() {
        const username = $(this).val().trim();
        if (username === "") {
            $("#username-error").text("Username is required").show();
            $(this).addClass("input-error");
        } else {
            $("#username-error").hide();
            $(this).removeClass("input-error");
        }
    });

    // Real-time validation for confirm password
    $("#confirm-password").on("blur", function() {
        const confirmPassword = $(this).val().trim();
        const password = $("#password").val().trim();
        if (confirmPassword === "") {
            $("#confirm-password-error").text("Confirm Password is required").show();
        } else if (confirmPassword !== password) {
            $("#confirm-password-error").text("Passwords do not match").show();
        } else {
            $("#confirm-password-error").hide();
        }
    });

    // Email validation function
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Back button functionality
    $("#back-button").on("click", function() {
        window.history.back();
    });

    // Real-time validation for phone number
    $("#phone").on("input", function() {
        const phonePattern = /^[6-9]\d{9}$/;
        const phoneValue = $(this).val().trim();

        if (phoneValue.length === 0) {
            $("#phone-error").text("Phone Number is required").show();
            $(this).addClass("input-error");
        } else if (!phonePattern.test(phoneValue)) {
            $("#phone-error").text("Phone Number must be 10 digits and start with 6, 7, 8, or 9").show();
            $(this).addClass("input-error");
        } else {
            $("#phone-error").hide();
            $(this).removeClass("input-error");
        }
    });
});
