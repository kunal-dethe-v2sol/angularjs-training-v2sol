<?php

require_once 'header.php';

$result = array(
    'status' => 500,
    'message' => 'Internal server Error'
);

try {
    if($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $requestData = getRequestData();
        if(!empty($requestData->id)) {
            if(in_array($requestData->action, array('upVoteCount', 'downVoteCount'))) {
                $action = $requestData->action;
                
                switch($action) {
                    case 'upVoteCount':
                    case 'downVoteCount':
                        if($id = $requestData->id) {
                            $events = json_decode(file_get_contents('data.json'), true);
                            $voteCount = 0;
                            if(!empty($events)) {
                                $key = array_search($id, array_column($events, 'id'));
                                $voteCount = ++$events[$key][$action];
                            }
                            
                            file_put_contents('data.json', json_encode($events));
                            $result['status'] = 200;
                            $result['message'] = 'OK';
                            $result['event'][$action] = $voteCount;
                        } else {
                            $result['status'] = 400;
                            $result['message'] = 'Bad Request';
                        }
                        break;
                    
                    default:
                        
                }
            } else {
                $result['status'] = 400;
                $result['message'] = 'Bad Request';
            }
        } else {
            $result['status'] = 400;
            $result['message'] = 'Bad Request';
        }
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