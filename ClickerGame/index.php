<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard Clicker Game</title>
</head>
<?php
$servername = "localhost";
$username = "user";
$password = "Wout2003";
$dbname = "clickerDB";


$players =  [];

$conn = mysqli_connect(
    $servername,
    $username,
    $password,
    $dbname
);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT username, highscore FROM users";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $players[$row['username']] = $row['highscore'];
    }
} else echo "0 results";

mysqli_close($conn);
?>

<body>
    <?php
    foreach ($players as $username => $highscore) {
        echo $username . $highscore;
    }
    ?>
</body>

</html>