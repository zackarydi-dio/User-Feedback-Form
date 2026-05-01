// ===== DOM Element Selection =====
const feedbackForm = document.getElementById("feedback-form");
const inputFields = document.querySelectorAll(".input-field");
const characterCountDisplay = document.getElementById("char-count");
const commentsTextarea = document.getElementById("comments");
const validationMessage = document.getElementById("validation-message");
const feedbackDisplayContainer = document.getElementById("feedback-display");

// ===== Validation: Check if all required elements exist =====
if (!feedbackForm || !characterCountDisplay || !commentsTextarea || !validationMessage || !feedbackDisplayContainer) {
    console.error("Required DOM elements not found. Check your HTML structure.");
}

// ===== Feature: Real-time Character Counter =====
if (commentsTextarea && characterCountDisplay) {
    commentsTextarea.addEventListener("input", function() {
        characterCountDisplay.textContent = "Characters: " + commentsTextarea.value.length;
    });
}

// ===== Feature: Tooltip Display on Hover =====
if (feedbackForm) {
    feedbackForm.addEventListener("mouseover", function(event) {
        if (event.target.classList.contains("input-field")) {
            const tooltip = event.target.nextElementSibling;
            if (tooltip && tooltip.classList.contains("tooltip")) {
                tooltip.classList.add("show");
            }
        }
    });

    feedbackForm.addEventListener("mouseout", function(event) {
        if (event.target.classList.contains("input-field")) {
            const tooltip = event.target.nextElementSibling;
            if (tooltip && tooltip.classList.contains("tooltip")) {
                tooltip.classList.remove("show");
            }
        }
    });
}

// ===== Feature: Form Submission and Feedback Display =====
if (feedbackForm) {
    feedbackForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get form values and trim whitespace
        const userName = document.getElementById("name").value.trim();
        const userEmail = document.getElementById("email").value.trim();
        const userComment = commentsTextarea.value.trim();

        // Validate that all fields are filled
        if (userName === "" || userEmail === "" || userComment === "") {
            validationMessage.textContent = "Please fill in all fields.";
            return;
        }

        // Clear previous validation messages
        validationMessage.textContent = "";

        // Create a new feedback entry element
        const feedbackEntry = document.createElement("div");
        feedbackEntry.classList.add("feedback-entry");

        feedbackEntry.innerHTML = `
            <strong>Name:</strong> ${userName}<br>
            <strong>Email:</strong> ${userEmail}<br>
            <strong>Comment:</strong> ${userComment}
        `;

        // Append the new entry to the feedback display
        feedbackDisplayContainer.appendChild(feedbackEntry);

        // Reset form and character counter
        feedbackForm.reset();
        characterCountDisplay.textContent = "Characters: 0";
    });

    // ===== Feature: Event Propagation Control =====
    // Prevent click events from bubbling up to the document body
    feedbackForm.addEventListener("click", function(event) {
        event.stopPropagation();
    });
}
