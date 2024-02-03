//all endpoints pathname is saved in the .env file and declared in this js file for better maintainability
export const apiUrl = import.meta.env.VITE_API_URL;
export const baseUrl = import.meta.env.VITE_BASE_URL;
export const registerEndpoint = import.meta.env.VITE_API_URL_REGISTER;
export const loginEndpoint = import.meta.env.VITE_API_URL_LOGIN;
export const logoutEndpoint = import.meta.env.VITE_API_URL_LOGOUT;

export const userEndpoint = import.meta.env.VITE_API_URL_USERS;

export const bookEndpoint = import.meta.env.VITE_API_URL_BOOKS;
export const rateEndpoint = import.meta.env.VITE_API_URL_RATES;

//parameters keys
export const searchBookTitle = (value) => {return import.meta.env.VITE_API_URL_BOOKS_SEARCH + '=' + value};
export const pageSize = (value) => { return import.meta.env.VITE_API_URL_BOOKS_SIZE + '=' + value};
export const pageOn = (value) => { return import.meta.env.VITE_API_URL_BOOKS_ON + '=' + value};


export default { 
    apiUrl,
    baseUrl,
    userEndpoint, 
    loginEndpoint, 
    logoutEndpoint, 
    bookEndpoint, 
    searchBookTitle, 
    pageSize, 
    pageOn, 
    rateEndpoint 
};