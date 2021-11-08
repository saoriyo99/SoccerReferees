<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
if(isset($_GET['status'])) {
  $sql = 'SELECT games.location, games.date_time
  FROM games
  INNER JOIN assignments ON games.gameid = assignments.gameid
  -- WHERE EXISTS(SELECT NULL FROM assignments 
  --             WHERE status = ?) AND games.date_time > NOW()
  WHERE games.date_time > NOW()
  GROUP BY games.location';
  $vars = [$_GET['status']];
}
// $sql = 'SELECT games.location, games.date_time
// FROM games
// INNER JOIN assignments ON games.gameid = assignments.gameid
// -- WHERE EXISTS(SELECT NULL FROM assignments 
// --             WHERE status = ?) AND games.date_time > NOW()
// WHERE games.date_time > NOW()
// GROUP BY games.location';

// $vars = [
//     isset($_GET['status'])
// ];

echo $vars[0];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$gameReport = $stmt->fetchAll();


if (isset($_GET['format']) && $_GET['format']=='csv') {
  header('Content-Type: text/csv');
  echo "Location,Date_time\r\n";

      foreach($gameReport as $o) {
          echo "\"".$o['location'] . "\","
          .$o['date_time'] .  "\r\n";
      }

} else {
  // Step 3: Convert to JSON
  $json = json_encode($gameReport, JSON_PRETTY_PRINT);

  // Step 4: Output
  header('Content-Type: application/json');
  echo $json;
}