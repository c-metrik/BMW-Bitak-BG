# BMW-Битак (BMW-Bitak-BG)

**BMW-Битак** is a Bulgarian-language single-page marketplace for BMW vehicles. Visitors can browse advertisements and view vehicle details; registered users can publish and manage their own listings and participate in discussions through comments.

This project was developed for the **React Exam Retake Project (November 2026)**. It uses a React frontend and a hosted Supabase backend; listing data is retrieved through HTTP requests and persists in the database.

## Project links

- **Live application: **
- **Public GitHub repository:** https://github.com/c-metrik/BMW-Bitak-BG
- **Backend:** Supabase (hosted PostgreSQL database, authentication, REST API, and Storage; no separate custom backend deployment)

## Technologies

- **React 19** — component-based UI, hooks, and Context API
- **React Router 8** — client-side routing, URL parameters, and route guards
- **Vite 8** — development server and production build
- **JavaScript (JSX)** and external **CSS** files
- **Supabase** — hosted PostgreSQL database, Auth, PostgREST API, and Storage
- **Fetch API** — direct REST communication with Supabase (no Supabase JavaScript SDK)
- **ESLint** — code-quality checks

## Installation and local development

### Prerequisites

- Node.js and npm compatible with the Vite version in `package.json`
- Access to a configured Supabase project with the necessary tables, authentication, Storage bucket, and Row Level Security (RLS) policies

### Steps

1. Clone the repository and open the project folder:

   ```bash
   git clone https://github.com/c-metrik/BMW-Bitak-BG
   cd bmw-bitak-bg
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. The repository includes the Vite environment configuration required to connect to the project's Supabase backend. The Supabase URL and publishable API key are public client-side configuration values. No additional environment setup is required to run the project locally.


4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local address shown by Vite (usually `http://localhost:5173`).

### Other commands

```bash
npm run build     # Generate production files in dist/
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

**Deployment:** Build and deploy the React frontend to a static hosting provider. Configure the same `VITE_SUPABASE_URL` and `VITE_API_KEY` environment variables in the hosting service and rebuild. The host must route direct visits to client-side URLs (such as `/cars/123`) to `index.html`. Supabase is already hosted separately as the backend-as-a-service. Configure the deployed frontend origin in the relevant Supabase Auth settings where applicable.

**Backend setup note:** The repository contains example seed-data SQL under `SQL/`, but those files are **not** a complete schema/migration setup. A new Supabase project also needs the application's tables, permissions/RLS, and the public `car-photos` Storage bucket. The running project uses the existing configured Supabase instance.

## Main functionality

- Public home page showing the **six newest** listings.
- Public catalog showing car listings ordered by creation date (newest first).
- Public car details page with specifications, price, contact telephone, location, description, photo, and comments.
- Registration, login, logout, session persistence, and access-token refresh.
- Authenticated users can create listings, view their own listings in Profile, and edit/delete **their own** listings.
- One optional image per listing, uploaded to Supabase Storage. Replacing a stored image attempts to delete the previous one; deleting a listing also attempts to remove its stored image.
- Authenticated users can add comments. Comment authors can edit or delete their own comments.
- Loading, empty, missing-record, and error feedback in the main data views.

## Architecture and source organization

```text
src/
├── API/
│   ├── Endpoints.js        # Collection endpoint names
│   ├── Requester.js        # Fetch wrapper, REST CRUD helpers, Storage operations
│   ├── AuthService.js      # Supabase authentication requests
│   └── SessionService.js   # Session persistence and token refresh
├── contexts/
│   └── AuthContext.jsx     # Shared user, role, auth actions, initialization state
├── guards/
│   ├── RouteGuard.jsx      # Authenticated-only routes
│   └── GuestGuard.jsx      # Guest-only routes
├── components/
│   ├── App.jsx             # Routes and application shell
│   ├── Home.jsx            # Latest listings
│   ├── Catalog.jsx         # All listings
│   ├── CarDetails.jsx      # Single listing and owner actions
│   ├── CarCreate.jsx       # Shared create/edit form
│   ├── CarEdit.jsx         # Load and authorize listing before editing
│   ├── Profile.jsx         # Current user's listings
│   ├── CarComments.jsx     # Comments collection and actions
│   ├── Comment.jsx         # Individual comment editing UI
│   ├── Login.jsx / Register.jsx
│   └── ...                 # Header, Footer, car cards, CSS
└── assets/                 # BMW logo
public/                     # Placeholder vehicle image
SQL/                        # Example car/comment seed data
ProjectDescription&Requirements/ # Exam specification and guide template
```

The UI is built from reusable React components. `Requester.js` centralizes `fetch` requests, authorization headers, error parsing, reusable CRUD methods, and Storage operations. `AuthContext.jsx` provides authentication state and actions to components via `useAuth()`. Supabase Auth manages identities, PostgreSQL stores records, and Supabase Storage holds uploaded car photos.

---

# Functional Guide

The following guide follows the 11 sections of the supplied `FunctionalGuide.txt` template.

## 1. Project Overview

**Application Name:** BMW-Bitak-BG (BMW-Битак)

**Application Category / Topic:** Vehicle marketplace / classified advertisements with user comments.

**Main Purpose:** BMW-Битак provides a dedicated place for BMW owners and buyers to publish and browse car advertisements. Visitors can inspect vehicle specifications, prices, photographs, and contact details without registering. Registered users can create and manage their own advertisements and discuss individual listings in the comments section.

## 2. User Access & Permissions

### Guest (Not Authenticated)

**Available pages/routes:** `/` (Home), `/catalog` (Catalog), `/cars/:carId` (Car Details), `/login`, and `/register`.

**Public data shown:** Recent and all car listings, vehicle details, available photographs, prices, descriptions, contact information, and existing comments.

**Restrictions:** Guests cannot access the Create, Edit, or Profile routes and cannot post comments. Attempting to visit a protected route redirects to `/login`.

### Authenticated User

**Main sections/pages:** Home, Catalog, Car Details, `/cars/create`, `/profile`, and the Edit page for listings they own. Login/Register are inaccessible to logged-in users through the guest route guard.

**Details pages:** Users can inspect any public listing, including comments. The listing owner sees Edit and Delete controls.

**Create/Edit/Delete actions:** A logged-in user can publish a new advertisement, edit or delete their own advertisement, add comments, and edit/delete comments they authored. Ownership is checked in the React interface; the corresponding backend RLS policies should independently enforce authorization.

## 3. Authentication & Session Handling

### Authentication Flow

1. **Application load:** `AuthProvider` reads any saved session from `localStorage` and enters an initialization phase.
2. **Authentication check:** If a session exists and is expired or near expiry, the session service requests a new access token using the refresh token. The application then fetches the current user and profile role. Route guards wait for initialization before deciding whether to redirect.
3. **Login:** The login form sends email/password to Supabase Auth. On success, the session is stored and the Context user/role state is updated; the user is navigated to Home.
4. **Registration:** The registration form submits email/password to Supabase Auth, checks that a session was returned, saves it, and updates shared authentication state. This implementation expects registration to return an active session, so Supabase email-confirmation settings must be compatible with that flow.
5. **Logout:** A logout request is sent to Supabase Auth; local session and user/role state are cleared and the user returns to Home.

### Session Persistence

The Supabase session is stored in browser `localStorage` under the key `auth`. `AuthContext` holds the current user, role, authentication status, and initialization state for the running React application. After a page refresh, `AuthProvider` restores the saved session and verifies the user. `Requester.js` also checks session expiration before ordinary database/Storage requests and can request a refresh when necessary.

## 4. Routing Structure

### Route Guards Logic

`RouteGuard` protects routes requiring authentication. It redirects unauthenticated visitors to `/login`. `GuestGuard` protects `/login` and `/register`, redirecting already-authenticated users to `/`. Both wait for authentication initialization to finish before making a decision.

### Main Routes

| Route | Component | Access | Purpose |
| --- | --- | --- | --- |
| `/` | `Home` | Public | Six latest advertisements |
| `/catalog` | `Catalog` | Public | All car advertisements |
| `/cars/:carId` | `CarDetails` | Public | Individual advertisement and comments |
| `/cars/create` | `CarCreate` | Authenticated | Publish advertisement |
| `/cars/:carId/edit` | `CarEdit` → `CarCreate` | Authenticated; owner checked | Edit advertisement |
| `/profile` | `Profile` | Authenticated | User profile and own advertisements |
| `/login` | `Login` | Guests | Sign in |
| `/register` | `Register` | Guests | Create account |

The application defines **eight routes**, including **two parameterized routes**.

### Nested & Parameterized Routes

`App.jsx` uses nested, pathless guard routes with React Router's `Outlet` for private and guest-only sections. `/cars/:carId` and `/cars/:carId/edit` use the `carId` URL parameter. `useParams()` reads this identifier to fetch the correct record.

## 5. List → Details Flow

### Catalog / List Page

`Home` requests the six most recent records. `Catalog` requests all car records ordered by creation date descending. Listing cards present a summary and link to the full details page. `Profile` requests advertisements filtered by the authenticated owner's ID.

**List interaction:** Users browse and open listing cards. The current implementation sorts by newest first through the API; it does **not** implement a dedicated search/filter interface.

### Details Page

Navigation is performed through React Router links (and `useNavigate()` after create/edit/delete actions). The details page reads `carId` using `useParams()`, requests the corresponding car from Supabase, and displays its information and comments. A missing record produces a not-found message rather than an application crash.

## 6. Data Source & Backend

**Backend Type:** Real, hosted **Supabase Backend-as-a-Service (BaaS)**.

- **Database:** Supabase PostgreSQL, accessed through its PostgREST endpoints (`/rest/v1`).
- **Authentication:** Supabase Auth (`/auth/v1`) using email/password and JWT-based sessions.
- **Storage:** Public `car-photos` bucket for uploaded JPEG, PNG, or WebP images; the bucket was configured with a 5 MB upload limit.
- **Frontend communication:** Native `fetch` calls from `Requester.js` with the public API key and an access token when available.
- **Persistent collections used by the application:** `cars`, `comments`, and `profiles` (for role lookup); user identities are managed by Supabase Auth.

The backend is hosted by Supabase, so no local JSON Server or separately deployed Express server is required. Records persist across browser visits.

## 7. Data Operations (CRUD)

### Create (POST)

Authenticated users open `/cars/create`, complete the form, and submit it. `CarCreate.jsx` reads the form values, optionally uploads one photo to Storage, and sends a `POST` request to create a record in `cars` with `owner_id` set to the current user's ID. The app navigates to the newly created listing.

### Read (GET)

`Home`, `Catalog`, `CarDetails`, `CarEdit`, and `Profile` fetch car data from Supabase. The comments section fetches comments belonging to the current car. Results are stored in component state and rendered dynamically rather than hardcoded into JSX.

### Update (PATCH)

The listing owner opens `/cars/:carId/edit`. `CarEdit.jsx` loads the car and verifies ownership before rendering the shared `CarCreate` form with existing values. Submitting sends a `PATCH` request to update the record and navigates to the details page. If a new image is selected, it is uploaded first, the listing URL is updated, and deletion of the previous stored image is attempted.

### Delete (DELETE)

The owner selects Delete on the details page and confirms the browser prompt. The application sends a `DELETE` request for the car, then attempts to delete its associated image from Supabase Storage. On success, it navigates to `/catalog`. If Storage cleanup fails after database deletion, a separate warning is displayed. External image URLs are not deleted from Storage.

**Comments:** Authenticated users create comments with `POST`; comment authors update their comments with `PATCH` and delete them with `DELETE`. The comments UI updates local state after successful operations.

## 8. Forms & Validation

### Forms Used

- **Login:** Email and password, implemented with controlled React inputs.
- **Registration:** Email, password, and password confirmation, implemented with controlled React inputs.
- **Create/Edit Car:** Shared form for trim, year, color, fuel type, transmission, power, price, phone, location, description, and an optional photo. This form uses `defaultValue` and `FormData` rather than fully controlled inputs.
- **Add/Edit Comment:** Controlled textareas for entering and editing comment content.

### Validation Rules

1. **Email:** Login and registration use an HTML `type="email"` input and `required` validation.
2. **Registration password:** Password and confirmation are required, have a minimum length of six characters, and must match before submission.
3. **Vehicle year:** Required integer between **1950** and the current year, enforced by HTML input attributes and a JavaScript check before submission.
4. **Price:** Required numeric value with a minimum of **1**; power, when entered, has a minimum of **1**.
5. **Phone:** Required, minimum **7** and maximum **20** characters.
6. **Fuel type and transmission:** Required selections.
7. **Location and description:** Required fields.
8. **Comments:** Empty or whitespace-only comments cannot be submitted; empty edited comments cannot be saved.
9. **Photo input:** Accepts JPEG, PNG, or WebP; the configured Storage bucket limits uploaded files to 5 MB. One file is handled per advertisement.

Validation combines browser-native constraints with React event handlers and application checks. Request errors are caught and shown through error messages or alerts, depending on the action.

## 9. React-Specific Techniques

### Hooks & Component Lifecycle

- **`useState`:** Manages lists, individual records, authentication information, form fields, edit mode, loading indicators, and error messages.
- **`useEffect`:** Loads car listings, car details, comments, and profile records when their components mount; relevant effects rerun when a dependency such as `carId` or `user.id` changes.
- **`useParams`:** Reads `carId` for details/edit routes.
- **`useNavigate`:** Redirects after successful login, registration, create, edit, and delete operations.
- **`useContext`:** Powers the `useAuth()` custom hook for access to shared authentication state.

**Lifecycle example:** When a user opens `/cars/:carId`, `CarDetails` mounts and its effect fetches the listing. Navigating to a different `carId` causes the effect to run again and request the new record. Navigating away unmounts the details component. The app also uses loading and error states while requests are in progress.

### Context API

`AuthContext.jsx` provides `user`, `role`, `isAuthenticated`, `isInitializing`, `login`, `register`, and `logout`. `Header`, `RouteGuard`, `GuestGuard`, `CarCreate`, `CarDetails`, `CarEdit`, `CarComments`, `Profile`, and authentication forms consume this shared state through `useAuth()`.

### Component Styling

The application uses external CSS files, including `Forms.css`, `CarDetails.css`, `Catalog.css`, `Home.css`, `Profile.css`, `Header.css`, and component-specific card/comment styles. Shared presentation is split into reusable components such as `CarCard`, `CarCardGrid`, `Header`, and `Footer`.

## 10. Typical User Flow

1. A visitor opens Home, sees the six latest BMW listings, and navigates to the Catalog.
2. The visitor selects a car card and reads the details, photo, price, location, contact phone, and comments.
3. To publish a listing or write a comment, the visitor registers or logs in.
4. The authenticated user opens Create, fills out the required fields, optionally uploads a photo, and publishes the advertisement.
5. The user opens Profile to view their advertisements and can edit or delete their own listings. On a details page, they can also post comments and manage comments they authored.

## 11. Error & Edge Case Handling

### Authentication Errors

Login failures are shown in the form; registration checks for empty values, mismatched passwords, and API errors. Protected routes redirect guests to Login, while guest-only routes redirect authenticated users to Home. During startup, route guards wait for session restoration. Session refresh is attempted when a stored access token is expired or near expiry.

### Network or Data Errors

The central request helper checks HTTP response status, parses available error information, and throws an error for failed requests. Home, Catalog, Car Details, Profile, Create/Edit, and comment operations provide error feedback. Buttons on some forms are disabled during submission to reduce duplicate requests.

### Empty or Missing Data States

Home and Catalog show a message if no advertisements are available. Profile shows a message when the current user has no listings. Car Details and Car Edit handle missing records. Car cards/details can use the local placeholder image when a listing has no photo. The comments section shows an empty-state message when there are no comments.

### Storage and Partial-Failure Cases

Only public URLs from the application's `car-photos` bucket are converted into Storage paths for deletion. Replacing a photo updates the database before attempting to remove the old stored file. Deleting a listing removes the database row before attempting image cleanup, so a cleanup failure can leave an orphaned image; this is reported separately. Uploads followed by a failed database write can also leave an orphaned image, which may require manual cleanup.

---

## Notes for reviewers

- The application is written in **Bulgarian**; the guide is in English for easier evaluation.
- The project uses **real remote data** and Supabase Auth, not local hardcoded records.
- The primary CRUD collection is **`cars`**; **`comments`** provides additional authenticated interaction.
- The interface performs ownership checks for editing/deleting. **Supabase RLS must also be configured** to enforce ownership at the backend; frontend checks alone are not a security boundary.
- The `SQL/` directory contains sample seed-data scripts, not the full backend schema.
