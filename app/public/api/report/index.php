<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// $condition = "1";
// if( (isset($_GET['fromdate']) && $_GET['fromdate'] != '' ) && 
// (isset($_GET['todate']) && $_GET['todate'] != '' ) ){
//    
// }

// Step 2: Create & run the query
$sql = 'SELECT assignments.refereeid, assignments.gameid, games.location, games.date_time, r.refname
FROM assignments
INNER JOIN referees r
ON assignments.refereeid = r.refereeid
INNER JOIN games
ON assignments.gameid = games.gameid
WHERE r.refereeid = ? AND games.date_time BETWEEN ? AND ? ';

 $vars = [
  isset($_POST['refereeid']),
  isset($_POST['StartDate']),
  isset($_POST['EndDate'])];

//$vars = [];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$gameReport = $stmt->fetchAll();
// echo $gameReport;

if (isset($_GET['format']) && $_GET['format']=='csv') {
  header('Content-Type: text/csv');
  echo "RefereeID,Location,Date_Time\r\n";
  $fp=fopen("BetweenDates.csv","w");
  foreach($gameReport as $o) {
    fputcsv($fp,$o);
    echo "\"".$o['refereeid'] . "\","
    .$o['location'] . "\","
    .$o['date_time'] .  "\r\n";
  }
  fclose($fp);

} else {
  // Step 3: Convert to JSON
  $json = json_encode($gameReport, JSON_PRETTY_PRINT);

  // Step 4: Output
  header('Content-Type: application/json');
  echo $json;
}