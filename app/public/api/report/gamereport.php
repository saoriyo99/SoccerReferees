<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT assignments.refereeid, assignments.gameid, games.location, games.date_time, r.refname
FROM assignments
LEFT OUTER JOIN referees r
ON assignments.refereeid = r.refereeid
LEFT OUTER JOIN games
ON assignments.gameid = games.gameid
WHERE games.date_time BETWEEN ? AND ?
GROUP BY r.refereeid';

 $vars = [$_POST['StartDate'],
 $_POST['EndDate']];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$games = $stmt->fetchAll();


if (isset($_GET['format']) && $_GET['format']=='csv') {
  header('Content-Type: text/csv');
  echo "Name,Username,MaxSalary,OfferCount\r\n";

  foreach($offers as $o) {
    echo "\"".$o['name'] . "\","
        .$o['username'] . ","
        .$o['maxSalary'] . ","
        .$o['offerCount'] . "\r\n";
  }

} else {
  // Step 3: Convert to JSON
  $json = json_encode($games, JSON_PRETTY_PRINT);

  // Step 4: Output
  header('Content-Type: application/json');
  echo $json;
} 