<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['phone']) || !isset($data['amount'])) {
    echo json_encode([
        "success" => false,
        "message" => "Missing data"
    ]);
    exit;
}

$phone = $data['phone'];
$amount = $data['amount'];

$order_id = "NICO-" . time();

$stmt = $conn->prepare(
  "INSERT INTO orders (order_id, phone, amount) VALUES (?, ?, ?)"
);

$stmt->bind_param("ssi", $order_id, $phone, $amount);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "order_id" => $order_id
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to place order"
    ]);
}

$stmt->close();
$conn->close();