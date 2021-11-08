<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT a.refereeid, a.gameid, g.location, g.date_time, r.refname
FROM assignments a, games g, referees r
LEFT OUTER JOIN referees
ON assignments.refereeid = referees.refereeid
LEFT OUTER JOIN games
ON assignments.gameid = games.gameid
WHERE date_time BETWEEN StartDate AND EndDate
GROUP BY refereeid';
// $vars = [];

$stmt = $db->prepare($sql);
$stmt->execute([
    $_POST['refereeid'],
    $_POST['StartDate'],
    $_POST['EndDate']
  ]);

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
  $json = json_encode($offers, JSON_PRETTY_PRINT);

  // Step 4: Output
  header('Content-Type: application/json');
  echo $json;
} 