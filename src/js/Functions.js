import { apiUrl } from "./Variables.js";

export const dispatchCustomEvent = (event) => {
    //takes a string(event) to dispatch an event.
    window.dispatchEvent(new Event(event));
}

export const catchEvent = (event, action) => {
    //takes in string(event) to catch event and function(action) to execute an action.
    window.addEventListener(event, action);
    sessionStorage.setItem('search', '');
}

export const apiGet = async(endpoint) => {
    //takes in a string(endpoint) to do a GET fetch.
    const data = await fetch(apiUrl + endpoint).then( async response => {
        const data = await response.json();
        return data;
    });
    return data;
}

export const apiFetch = async(endpoint,method, token, body) => {
     //takes in a string(endpoint), string(method), string(token) and object(body) to perform fetch request
     const data = await fetch(apiUrl + endpoint, {
        'method' :method,
        'headers': {
            'Content-Type' : 'application/json',
            'Bearer-Token' : token
        },
        'body': body
     }).then( async response => {
         const data = await response.json();
         return data;
     });
     return data;
}

export default { dispatchCustomEvent, catchEvent, apiGet, apiFetch };
