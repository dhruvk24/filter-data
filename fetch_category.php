<?php

    include_once('config.php');
    
    $sql = $conn->query("SELECT * from categories WHERE status=1");
    if($sql){
        if($sql->num_rows > 0){
            $result = $sql->fetch_all(MYSQLI_ASSOC);
            echo json_encode($result);

            http_response_code(200);
        }else{
            http_response_code(204);
        }
            
    }else{
        http_response_code(502);
    }
?>