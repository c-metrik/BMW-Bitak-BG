import { authRequest } from "./Requester";

const STORAGE_KEY = "auth";

export const sessionService = {
    isExpired(session) {
        if (!session?.expires_at) {
            return true;
        }

        const now = Math.floor(Date.now() / 1000);

        return session.expires_at <= now + 60;
    },

    getSession() {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (!stored) return null;

        try {
            return JSON.parse(stored);
        } catch {
            localStorage.removeItem(STORAGE_KEY);
            return null;
        }
    },

    saveSession(session) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(session)
        );
    },

    clearSession() {
        localStorage.removeItem(STORAGE_KEY);
    },

    async refreshSession() {
        const session = this.getSession();

        if (!session?.refresh_token) {
            return null;
        }

        const newSession = await authRequest(
            "/token?grant_type=refresh_token",
            "POST",
            {
                refresh_token: session.refresh_token,
            }
        );

        this.saveSession(newSession);

        return newSession;
    },
};