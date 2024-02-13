<?php
    $conn = new mysqli('localhost','root2','root2','movie_review');
    // $conn = new mysqli('localhost','root2','root2','new_movie_review');
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // echo "Connected successfully";
?>