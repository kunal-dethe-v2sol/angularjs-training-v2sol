<?php

require_once 'header.php';

$result = array(
    'status' => 200,
    'message' => 'OK'
);

try {
    if($_SERVER['REQUEST_METHOD'] === 'GET') {
        $events = json_decode(file_get_contents('data.json'));
        $result['events'] = $events;
    } elseif($_SERVER['REQUEST_METHOD'] === 'POST') {
        $fields = array(
            'name',
            'date',
            'time',
            'duration',
            'image',
            'host',
            'address',
            'details',
            'cost',
            'currency',
            'upVoteCount',
            'downVoteCount',
        );

        foreach($fields as $field) {
            $fields[$field] = isset($_POST[$field]) ? trim($_POST[$field]) : '';
        }
            
        print_r($fields);
        exit();
    } else {
        $result['status'] = 403;
        $result['message'] = 'Unauthorised';
    }
} catch (Exception $ex) {
    $result['status'] = 500;
    $result['message'] = 'Some error occured';
}

http_response_code($result['status']);
echo json_encode($result);
exit();