import api from "./api";

export const login = (email, password) => {
    return api.post('api/auth/login', {email, password});
}

export const signup = (email, password) => {
    return api.post('api/auth/signup', {email, password});
}

export const loginWithGoogle = (token) => {
    return api.post('api/auth/google', {token});
}