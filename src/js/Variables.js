//all endpoints pathname is saved in the .env file and declared in this js file for better maintainability
export const paths = {
    authCheck: import.meta.env.VITE_API_URL_AUTH_CHECKER,
    apiUrl: import.meta.env.VITE_API_URL,
    assetUrl: import.meta.env.VITE_ASSET_URL,
    registerEndpoint: import.meta.env.VITE_API_URL_REGISTER,
    loginEndpoint: import.meta.env.VITE_API_URL_LOGIN,
    logoutEndpoint: import.meta.env.VITE_API_URL_LOGOUT,
    userEndpoint: import.meta.env.VITE_API_URL_USERS,
    bookEndpoint: import.meta.env.VITE_API_URL_BOOKS,
    rateEndpoint: import.meta.env.VITE_API_URL_RATES,
}

//parameters keys
export const apiParams = {
    searchBookTitle: (value) => { return import.meta.env.VITE_API_URL_BOOKS_SEARCH + '=' + value },
    pageSize: (value) => { return import.meta.env.VITE_API_URL_BOOKS_SIZE + '=' + value },
    pageOn: (value) => { return import.meta.env.VITE_API_URL_BOOKS_ON + '=' + value },
}

export default {
    paths,
    apiParams
};