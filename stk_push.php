<?php
// STEP 1: SAFARICOM DETAILS (SANDBOX)
$consumerKey = "4h22AqiI6UwwS1jMnnREA4poIIAa7GP1LAInuvsHIN84ICv7";
$consumerSecret = "02JLuGOGI5l9tCGmN9KqpXfApTMxl0KkxaGWVY3TwStsbb1Wv8y7tK0eARKW0IXI";

// STEP 2: ACCESS TOKEN
$credentials = base64_encode($consumerKey . ":" . $consumerSecret);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials");
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Basic " . $credentials]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

$accessToken = json_decode($response)->access_token;

// STEP 3: STK PUSH DETAILS
$BusinessShortCode = "174379"; // Sandbox shortcode
$Passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
$Timestamp = date("YmdHis");
$Password = base64_encode($BusinessShortCode . $Passkey . $Timestamp);

$Amount = 1; // test amount
$PhoneNumber = "254708374149";
$PartyA = $PhoneNumber;
$PartyB = $BusinessShortCode;
$AccountReference = "NICO_FIT";
$TransactionDesc = "Order Payment";

$CallBackURL = "https://intimidatory-inapplicably-abril.ngrok-free.dev/nicofit_store/stk_callback.php";

// STEP 4: SEND STK PUSH
$stkData = [
    "BusinessShortCode" => $BusinessShortCode,
    "Password" => $Password,
    "Timestamp" => $Timestamp,
    "TransactionType" => "CustomerPayBillOnline",
    "Amount" => $Amount,
    "PartyA" => $PartyA,
    "PartyB" => $PartyB,
    "PhoneNumber" => $PhoneNumber,
    "CallBackURL" => $CallBackURL,
    "AccountReference" => $AccountReference,
    "TransactionDesc" => $TransactionDesc
];

$ch = curl_init("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer " . $accessToken,
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($stkData));

$result = curl_exec($ch);
curl_close($ch);

echo $result;