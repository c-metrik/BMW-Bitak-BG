import { ENDPOINTS } from "./Endpoints";

const baseUrl = import.meta.env.VITE_SUPABASE_URL;

const restUrl = `${baseUrl}/rest/v1`;
const authUrl = `${baseUrl}/auth/v1`;
const storageUrl = `${baseUrl}/storage/v1/object/car-photos`;

export function getCarPhotoUrl(filePath) {
    return `${baseUrl}/storage/v1/object/public/car-photos/${filePath}`;
}


// Get authentication headers
function getAccessToken() {
    const auth = localStorage.getItem("auth");

    if (!auth) return null;

    try {
        return JSON.parse(auth)?.access_token || null;
    } catch {
        return null;
    }
};

// Base request
async function baseRequest(
    url,
    path = "/",
    method = "GET",
    data = null,
    opts = {}
) {
    const accessToken = getAccessToken();

    const options = {
        ...opts,
        method,
        headers: {
            ...opts.headers,
            apikey: import.meta.env.VITE_API_KEY,
            Prefer: "return=representation",
            ...(accessToken
                ? { Authorization: `Bearer ${accessToken}` }
                : {}),
        },
    };

    if (data !== null) {
        const isFile = data instanceof File;

        if (!isFile) {
            options.headers["Content-Type"] =
                options.headers["Content-Type"] || "application/json";

            options.body = JSON.stringify(data);
        } else {
            options.body = data;
        }
    }

    const response = await fetch(`${url}${path}`, options);

    if (!response.ok) {
    const errorText = await response.text();

    let message = `HTTP ${response.status}`;

    try {
        const errorData = JSON.parse(errorText);

        message = errorData.msg || errorData.message || message;
    } catch {
        message = errorText || message;
    }

    throw new Error(message);
    }

    if (response.status === 204) {
        return null;
    }

    const responseText = await response.text();

    return responseText ? JSON.parse(responseText) : null;
};

// Generic REST request
export default function request(path = "/", method = "GET", data = null, opts = {}) {
    return baseRequest(restUrl, path, method, data, opts);
}

// Authentication request
export const authRequest = (path = "/", method = "GET", data = null, opts = {}) => {
    return baseRequest(authUrl, path, method, data, opts);
};

// Storage request
export const storageRequest = (fileName, file) => {
    return baseRequest(storageUrl, `/${fileName}`, "POST", file, {
        headers: {
            "Content-Type": file.type || "application/octet-stream"
        }
    });
};

// CRUD OPERATIONS
export const crud = {

    // GET ALL
    getAll: (endpoint) =>
        request(`${endpoint}?select=*`),

    // GET BY ID
    getById: (endpoint, id) =>
        request(`${endpoint}?id=eq.${encodeURIComponent(id)}&select=*`),

    // CREATE
    create: (endpoint, data) => request(endpoint, "POST", data),

    // UPDATE
    update: (endpoint, id, data) =>
        request(`${endpoint}?id=eq.${encodeURIComponent(id)}`, "PATCH", data),

    // DELETE
    remove: (endpoint, id) =>
        request(`${endpoint}?id=eq.${encodeURIComponent(id)}`, "DELETE"),

};

// Create reusable API for any collection
export function createCollectionApi(endpoint) {
    return {
        getAll: () => crud.getAll(endpoint),

        getById: (id) => crud.getById(endpoint, id),

        create: (data) => crud.create(endpoint, data),

        update: (id, data) => crud.update(endpoint, id, data),

        remove: (id) => crud.remove(endpoint, id),
    };
}

// APIs for all collections
export const api = {
    
    cars: {
        ...createCollectionApi(ENDPOINTS.CARS),

        getLatest: () =>
            request(`${ENDPOINTS.CARS}?select=*&order=created_at.desc`),
        getLatestSix: () =>
            request(`${ENDPOINTS.CARS}?select=*&order=created_at.desc&limit=6`),
        getByOwner: (userId) =>
            request(`${ENDPOINTS.CARS}?owner_id=eq.${encodeURIComponent(userId)}&select=*&order=created_at.desc`),
    },

    comments: {
    ...createCollectionApi(ENDPOINTS.COMMENTS),

    getByCarId: (carId) =>
        request(
            `${ENDPOINTS.COMMENTS}?car_id=eq.${encodeURIComponent(carId)}&select=*&order=created_at.asc`
        ),
    },
};