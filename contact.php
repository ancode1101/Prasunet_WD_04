<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST["submit"])) {
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $subject = htmlspecialchars($_POST['subject']);
        $message = htmlspecialchars($_POST['message']);
        $to = 'ankit03112001@gmail.com'; 
        $from = 'From: ' . $email; 

        $body = "From: $name\nE-Mail: $email\nSubject: $subject\nMessage:\n$message";

        // Log email sending attempt
        error_log("Attempting to send email to $to with subject $subject.");

        if (mail($to, $subject, $body, $from)) {
            // Log success
            error_log("Email sent successfully to $to.");
            echo "success"; // Respond with success message
        } else {
            // Log failure
            error_log("Failed to send email to $to.");
            echo "Error sending email. Please try again later.";
        }
    } else {
        // Log invalid request
        error_log("Form not submitted properly.");
        echo "Invalid request.";
    }
} else {
    // Log invalid request method
    error_log("Invalid request method.");
    echo "Invalid request.";
}
?>
