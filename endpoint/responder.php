<?php
require_once('connect.php');

$instruction=$_GET["do"];

$r1=$_GET['1'];
$r2=$_GET['2'];
$r3=$_GET['3'];
$r4=$_GET['4'];

$getS="SELECT * FROM tbl_todo";
$getQ=mysqli_query($link,$getS);

$respArray=[];

while($row = $getQ->fetch_array(MYSQLI_ASSOC)) {
    $respArray[] = $row;
}

if($instruction==="review"){
    $insS="INSERT INTO tbl_review VALUES(NULL,NULL,{$r1},{$r2},{$r3},{$r4})";
    $insQ=mysqli_query($link,$insS);
    if($insQ){
        echo "Submitted!";
    }else{
        echo "Something went wrong!";
    }
}

if($instruction==="history"){
    $revS="SELECT * FROM tbl_review ORDER BY rev_id DESC";
    $revQ=mysqli_query($link,$revS);
    if($revQ){
        echo "bing";
    }else{
        echo "bong";
    }
}

mysqli_close($link);

if(!$instruction){
    echo json_encode($respArray);
}