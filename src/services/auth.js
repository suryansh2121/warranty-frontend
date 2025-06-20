import api from "./api";

export const login = (email, password) => {
    return api.post('/auth/login', {email, password});
}

export const signup = (email, password) => {
    return api.post('/auth/signup', {email, password});
}

export const loginWithGoogle = (email, password) => {
    return api.post('/auth/google', {email, password});
}