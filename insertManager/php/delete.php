<?php
    $id=$_GET['id'];

    require_once('connect.php');

    $delS="DELETE FROM tbl_todo WHERE todo_id = {$id}";
    $delQ=mysqli_query($link,$delS);

    if($delQ){
        echo 'success';
    }else{
        echo 'failure';
    }

    mysqli_close($link);
?>