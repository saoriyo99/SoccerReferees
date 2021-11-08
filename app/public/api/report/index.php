<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
if(isset($_GET['refereeid']) && isset($_GET['StartDate']) && isset($_GET['EndDate'])) {
  $sql = 'SELECT location, date_time
  FROM games
  INNER JOIN assignments ON games.gameid = assignments.gameid
  INNER JOIN referees ON assignments.refereeid = referees.refereeid
  WHERE referees.refereeid = ? AND games.date_time BETWEEN ? AND ?
  ORDER BY games.location';

 $vars = [
    $_GET['refereeid'],
    $_GET['StartDate'],
    $_GET['EndDate']
  ];
 }

//$vars = [];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$games = $stmt->fetchAll();
// echo $gameReport;

if (isset($_GET['format']) && $_GET['format']=='csv') {
  header('Content-Type: text/csv');
  echo "Location,Date_Time\r\n";
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