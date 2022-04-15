<?php

if (isset($_POST["submit"])){
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    $formattedMessage = "From: $email \nName: $name\nMessage: $message";
    $sender = "From: $name";

    mail("career@jakeyoon.dev", $subject, $formattedMessage, $sender);
    
    echo "<script type='text/javascript'> document.location = 'contact2'; </script>";

}
?>