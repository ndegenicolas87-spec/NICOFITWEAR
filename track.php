<?php
$connection = new mysqli("localhost", "root", "", "nicofit_store");

$status = "";
if (isset($_POST['order_id'])) {
    $order_id = $_POST['order_id'];
    $query = $connection->query("SELECT * FROM orders WHERE order_id='$order_id'");
    if ($query->num_rows > 0) {
        $row = $query->fetch_assoc();
        $status = "Order Status: <strong>" . $row['status'] . "</strong>";
    } else {
        $status = "Order not found!";
    }
}
?>