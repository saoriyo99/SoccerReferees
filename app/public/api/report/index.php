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

 $vars = [
  isset($_POST['refereeid']),
  isset($_POST['StartDate']),
 isset($_POST['EndDate'])];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$gameReport = $stmt->fetchAll();


if (isset($_GET['format']) && $_GET['format']=='csv') {
  header('Content-Type: text/csv');
  echo "RefereeID,Location,Date_time\r\n";

      foreach($gameReport as $o) {
          echo "\"".$o['refereeid'] . "\","
          .$o['location'] . "\","
          .$o['date_time'] .  "\r\n";
      }

} else {
  // Step 3: Convert to JSON
  $json = json_encode($gameReport, JSON_PRETTY_PRINT);

  // Step 4: Output
  header('Content-Type: application/json');
  echo $json;
}