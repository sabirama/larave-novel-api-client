import { paths } from "./Variables.js";

export const dispatchCustomEvent = (event) => {
    //takes a string(event) to dispatch an event.
    window.dispatchEvent(new Event(event));
}

export const catchEvent = (event, action) => {
    //takes in string(event) to catch event and function(action) to execute an action.
    window.addEventListener(event, action);
}

export const apiGet = async(endpoint, token) => {
    //takes in a string(endpoint) to do a GET fetch.
    const data = await fetch(paths.apiUrl + endpoint, {
        'headers' : {
            Authorization : `Bearer ${token}`
        }
    }).then( async response => {
        const data = await response.json();
        return data;
    });
    return data;
}

export const apiFetch = async(endpoint, method, content, token, body) => {
     //takes in a string(endpoint), string(method),string(content) for either application/json or form-data, 
     //string(token) and object(body) to perform fetch request
    
    let formBody;
     (content == 'application/json') ? formBody = JSON.stringify(body) : formBody = body;

     const data = await fetch(paths.apiUrl + endpoint, {
        'method' :method,
        'headers': {
            'Content-Type' : content,
            'Authorization' : `Bearer ${token}`
        },
        'body':  formBody
     }).then( async response => {
        let data;
        (content == 'application/json') ? data = await response.json() : data = response;
         return data;
     });
     return data;
}

export default { dispatchCustomEvent, catchEvent, apiGet, apiFetch };
