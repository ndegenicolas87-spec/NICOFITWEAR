<?php

$host = "localhost";
$user = "root";
$pass = "";
$db   = "nicofit_store";

/* Start session safely */
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/* Database connection */
$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}