<?php

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $fname = $_POST["fname"];
    $lname = $_POST["lname"];
    $email = $_POST["Email"];
    $gname = $_POST["gname"];

    // Prepare data to be written to JSON format
    $data = [
        "fname" => $fname,
        "lname" => $lname,
        "email" => $email,
        "gname" => $gname
    ];

    // Read existing data from db.json
    $jsonData = file_get_contents('db.json');
    $existingData = json_decode($jsonData, true);

    // Add new data to existing data
    $existingData[] = $data;

    // Encode data to JSON format
    $jsonData = json_encode($existingData, JSON_PRETTY_PRINT);

    // Write data to db.json
    file_put_contents('db.json', $jsonData);

    // Redirect back to the form page
    header("Location: index.html");
    exit();
}

?>
