<?php

include_once('config.php');

$order = isset($_GET['sort']) ? $_GET['sort'] : 'asc';


if (isset($_GET['categories']) && isset($_GET['ratings'])) {

    $categories = implode("|", $_GET['categories']);
    $rating = implode(",", $_GET['ratings']);

    $sql = "SELECT * FROM grouped_data WHERE categories REGEXP '$categories' AND rating IN ($rating) ORDER BY movie_name $order";
    $result = $conn->query($sql);
    if ($result) {
        if ($result->num_rows > 0) {
            echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        } else {
            http_response_code(204);
        }
    } else
        http_response_code(502);


    // $cat = array_reduce($_GET['categories'], function ($acc, $cur) {
    //     return "$acc\"$cur\",";
    // });
    // $categories = substr($cat, 0, strlen($cat) - 1);

    // $sql = "SELECT m.id,m.movie_name,m.rating, GROUP_CONCAT(DISTINCT c.category) AS categories, GROUP_CONCAT(DISTINCT ct.cast_name) AS cast_crew FROM movies AS m LEFT JOIN movie_category_mapping as mcg ON m.id=mcg.movie_id AND mcg.status=1 LEFT JOIN categories AS c ON mcg.category_id=c.id AND c.status=1 LEFT JOIN movie_cast_mapping AS mct ON m.id=mct.movie_id AND mct.status=1 LEFT JOIN cast_and_crew AS ct ON mct.cast_id=ct.id AND ct.status=1 WHERE m.status=1 AND c.category IN ($categories) AND m.rating IN ($rating) GROUP BY m.id ORDER BY m.movie_name $order";


} else if (isset($_GET['categories'])) {


    $categories = implode("|", $_GET['categories']);
    $sql = "SELECT * FROM grouped_data WHERE categories REGEXP '$categories' ORDER BY movie_name $order";

    $result = $conn->query($sql);
    if ($result) {
        if ($result->num_rows > 0) {
            echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        } else {
            http_response_code(204);
        }
    } else
        http_response_code(502);

    // $cat = array_reduce($_GET['categories'], function ($acc,$cur){
    //     return "$acc\"$cur\",";
    // });
    // $categories = substr($cat,0,strlen($cat)-1);

    // $sql = "SELECT m.id,m.movie_name,m.rating, GROUP_CONCAT(DISTINCT c.category) AS categories, GROUP_CONCAT(DISTINCT ct.cast_name) AS cast_crew FROM movies AS m LEFT JOIN movie_category_mapping as mcg ON m.id=mcg.movie_id AND mcg.status=1 LEFT JOIN categories AS c ON mcg.category_id=c.id AND c.status=1 LEFT JOIN movie_cast_mapping AS mct ON m.id=mct.movie_id AND mct.status=1 LEFT JOIN cast_and_crew AS ct ON mct.cast_id=ct.id AND ct.status=1 WHERE m.status=1 AND c.category IN ($categories) GROUP BY m.id ORDER BY m.movie_name $order";



} else if (isset($_GET['ratings'])) {

    $rating = implode(",", $_GET['ratings']);

    $sql = "SELECT * FROM grouped_data WHERE rating IN ($rating) ORDER BY movie_name $order";

    // $sql = "SELECT m.id,m.movie_name,m.rating, GROUP_CONCAT(DISTINCT c.category) AS categories, GROUP_CONCAT(DISTINCT ct.cast_name) AS cast_crew FROM movies AS m LEFT JOIN movie_category_mapping as mcg ON m.id=mcg.movie_id AND mcg.status=1 LEFT JOIN categories AS c ON mcg.category_id=c.id AND c.status=1 LEFT JOIN movie_cast_mapping AS mct ON m.id=mct.movie_id AND mct.status=1 LEFT JOIN cast_and_crew AS ct ON mct.cast_id=ct.id AND ct.status=1 WHERE m.status=1 AND m.rating IN ($rating) GROUP BY m.id ORDER BY m.movie_name $order";

    $result = $conn->query($sql);
    if ($result) {
        if ($result->num_rows > 0) {
            echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        } else {
            http_response_code(204);
        }
    } else
        http_response_code(502);
} else {
    $sql = "SELECT m.id,m.movie_name,m.rating, GROUP_CONCAT(DISTINCT c.category) AS categories, GROUP_CONCAT(DISTINCT ct.cast_name) AS cast_crew FROM movies AS m LEFT JOIN movie_category_mapping as mcg ON m.id=mcg.movie_id AND mcg.status=1 LEFT JOIN categories AS c ON mcg.category_id=c.id AND c.status=1 LEFT JOIN movie_cast_mapping AS mct ON m.id=mct.movie_id AND mct.status=1 LEFT JOIN cast_and_crew AS ct ON mct.cast_id=ct.id AND ct.status=1 WHERE m.status=1 GROUP BY m.id ORDER BY m.movie_name $order";

    $result = $conn->query($sql);
    if ($result) {
        if ($result->num_rows > 0) {
            echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        } else {
            http_response_code(204);
        }
    } else
        http_response_code(502);
}
