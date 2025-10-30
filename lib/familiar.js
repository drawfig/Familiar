import {sha256} from "js-sha256";

export function prepare(data, api_version, token, message_type, user_id) {
    let payload = {
        user_id: user_id,
        message_type: message_type,
        data: data,
        auth:auth_gen(data, token)
    };
}

function auth_gen(data, token) {
    let str_data = JSON.stringify(data);
    return sha256(token + str_data);
}

export function create_connection(url) {
    return new WebSocket(url);
}