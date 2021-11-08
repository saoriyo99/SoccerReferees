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
$sql = 'SELECT * FROM games';
$vars = [];

// if (isset($_GET['guid'])) {
//   // This is an example of a parameterized query
//   $sql = 'SELECT * FROM Patient WHERE patientGuid = ?';
//   $vars = [ $_GET['guid'] ];
// }

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$games = $stmt->fetchAll();

if (isset($_GET['format']) && $_GET['format']=='csv') {
    header('Content-Type: text/csv');
  
    foreach($games as $g) {
      echo "\"".$g['location'] . "\","
            .$g['date_time'] . "\r\n";
    }
  
} else {
    // Step 3: Convert to JSON
    $json = json_encode($games, JSON_PRETTY_PRINT);

    // Step 4: Output
    header('Content-Type: application/json');
    echo $json;
} 
