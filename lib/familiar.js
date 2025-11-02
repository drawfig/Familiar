import {sha256} from "js-sha256";

export function prepare(data, api_version, token, message_type, user_id) {
    let payload = {
        user_id: user_id,
        message_type: message_type,
        data: data,
        auth:auth_gen(data, token)
    };

    return JSON.stringify(payload);
}

function auth_gen(data, token) {
    let str_data = JSON.stringify(data);
    return sha256(token + str_data);
}

export function create_connection(url) {
    return new WebSocket(url);
}

export function prepare_and_send(data, api_version, token, message_type, user_id, socket) {
    let payload = prepare(data, api_version, token, message_type, user_id);
    socket.send(payload);
}

export function experimental_message_parser(message, socket, error_callback, success_callback) {
    socket.onmessage = (message) => {
        message_parser(message, error_callback, success_callback);
    }
}

export function message_parser(message, error_callback, success_callback) {
    let response = JSON.parse(message.data);
    if(!response.api_success || !response.api_status) {
        error_callback(response.data);
    }
    else {
        success_callback(response.data);
    }
}