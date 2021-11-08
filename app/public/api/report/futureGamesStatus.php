<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
if(isset($_GET['status'])) {
  $sql = 'SELECT location, date_time
  FROM games
  WHERE EXISTS(SELECT * FROM assignments 
               WHERE assignments.refstatus = ?) AND games.date_time > NOW()
  ORDER BY location';
  $vars = [$_GET['status']];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$games = $stmt->fetchAll();


if (isset($_GET['format']) && $_GET['format']=='csv') {
  header('Content-Type: text/csv');
  echo "Location, Date_time\r\n";

      foreach($games as $o) {
          echo "\"".$o['location'] . "\","
          .$o['date_time'] .  "\r\n";
      }

} else {
  // Step 3: Convert to JSON
  $json = json_encode($games, JSON_PRETTY_PRINT);

  // Step 4: Output
  header('Content-Type: application/json');
  echo $json;
}