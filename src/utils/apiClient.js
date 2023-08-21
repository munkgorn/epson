const axios = require("axios");

const apiClient = () => {
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASEURL,
        // headers: { "x-origin-mg": "munkgorn" },
        
    });
    return instance;
}

module.exports = {
    apiClient
}