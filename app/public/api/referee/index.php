<?php
// require 'common.php';
require 'class/DbConnection.php';

// echo ":::";
// // print_R($_ENV);
// echo getenv('MYSQL_DATABASE');


// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// echo $db;
// exit;

// Step 2: Create & run the query
$sql = 'SELECT * FROM referees';
$vars = [];

 if (isset($_GET['game'])) {
   // This is an example of a parameterized query
   $sql = 'SELECT * FROM offer WHERE gameid = ?';
   $vars = [ $_GET['game'] ];
 }

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$referees = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($referees, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;