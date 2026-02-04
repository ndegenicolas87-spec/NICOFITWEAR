<?php
// DB connection
$conn = new mysqli("localhost", "root", "", "nicofit_store");
if ($conn->connect_error) {
    die("DB Error");
}

// Read MPesa callback
$data = file_get_contents("php://input");
file_put_contents("stk_callback_log.json", $data, FILE_APPEND);

$response = json_decode($data, true);

$callback = $response['Body']['stkCallback'];

$merchantRequestID = $callback['MerchantRequestID'];
$checkoutRequestID = $callback['CheckoutRequestID'];
$resultCode = $callback['ResultCode'];
$resultDesc = $callback['ResultDesc'];

$mpesaReceipt = null;
$amount = null;
$phone = null;

// If payment SUCCESS
if ($resultCode == 0) {
    foreach ($callback['CallbackMetadata']['Item'] as $item) {
        if ($item['Name'] == 'MpesaReceiptNumber') {
            $mpesaReceipt = $item['Value'];
        }
        if ($item['Name'] == 'Amount') {
            $amount = $item['Value'];
        }
        if ($item['Name'] == 'PhoneNumber') {
            $phone = $item['Value'];
        }
    }

    $status = "SUCCESS";
} else {
    $status = "FAILED";
}

// Save to database
$stmt = $conn->prepare("
    INSERT INTO orders 
    (order_id, phone, amount, checkout_request_id, merchant_request_id, mpesa_receipt, result_code, result_desc, status)
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?)
");

$orderId = uniqid("ORD_");

$stmt->bind_param(
    "ssdssssss",
    $orderId,
    $phone,
    $amount,
    $checkoutRequestID,
    $merchantRequestID,
    $mpesaReceipt,
    $resultCode,
    $resultDesc,
    $status
);

$stmt->execute();
$stmt->close();
$conn->close();