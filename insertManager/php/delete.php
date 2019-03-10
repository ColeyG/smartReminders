<?php
    $id=$_GET['id'];

    require_once('connect.php');

    $delS="UPDATE tbl_todo SET completion=1 WHERE todo_id = {$id}";
    $delQ=mysqli_query($link,$delS);

    if($delQ){
        echo 'success';
    }else{
        echo 'failure';
    }

    mysqli_close($link);
?>