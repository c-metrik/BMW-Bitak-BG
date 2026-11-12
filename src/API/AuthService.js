import request, { authRequest } from "./Requester";


export const authService = {
    login: (email, password) =>
        authRequest("/token?grant_type=password", "POST", {
            email,
            password,
        }),

    register: (email, password) =>
        authRequest("/signup", "POST", {
            email,
            password,
        }),

    logout: () =>
        authRequest("/logout", "POST"),

    getUser: () =>
        authRequest("/user"),

    getRole: async (userId) => {
        const profiles = await request(
            `/profiles?id=eq.${encodeURIComponent(userId)}&select=role`
        );

        return profiles[0]?.role ?? null;
    },
};
