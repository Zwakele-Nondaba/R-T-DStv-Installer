<?php
// Get form data safely
$name = htmlspecialchars(trim($_POST['name']));
$phone = htmlspecialchars(trim($_POST['phone']));
$email = htmlspecialchars(trim($_POST['email']));
$location = htmlspecialchars(trim($_POST['location']));
$service = htmlspecialchars(trim($_POST['service']));
$message = htmlspecialchars(trim($_POST['message']));

// Your email address (where the form submissions go)
$to = "bookings@yourbusiness.co.za"; 
$subject = "New Quote Request from $name";

// Email body
$body = "
You have received a new quote request:

Name: $name
Phone: $phone
Email: $email
Location: $location
Service: $service

Message:
$message
";

// Headers
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email
if(mail($to, $subject, $body, $headers)){
    echo "success";
} else {
    echo "error";
}
?>
