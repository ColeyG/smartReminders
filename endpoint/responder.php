<?php
require_once('connect.php');

$getS="SELECT * FROM tbl_todo";
$getQ=mysqli_query($link,$getS);

$respArray=[];

while($row = $getQ->fetch_array(MYSQLI_ASSOC)) {
    $respArray[] = $row;
}

mysqli_close($link);

echo json_encode($respArray);