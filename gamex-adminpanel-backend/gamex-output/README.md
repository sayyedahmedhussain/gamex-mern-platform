# GameX Admin Panel — Setup Guide

A full MERN admin panel for the GameX website, with JWT authentication,
protected CRUD routes for every section, image uploads, and public
read-only endpoints that the live website consumes.

## Architecture Overview

```
gamex-admin/
├── backend/                  ← Node.js / Express / MongoDB
│   ├── config/
│   │   └── db.js             ← MongoDB Atlas connection
│   ├── models/
│   │   ├── User.js           ← Admin login credentials (hashed password)
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── GameSection.js
│   │   ├── ServicesSection.js
│   │   ├── GrowthSection.js
│   │   ├── AchievementSection.js
│   │   ├── DirectorMessage.js
│   │   ├── PartnersSection.js
│   │   └── Footer.js
│   ├── controllers/
│   │   ├── authController.js     ← login / me
│   │   └── sectionController.js  ← Generic CRUD factory (GET/POST/PUT/DELETE)
│   ├── middleware/
│   │   └── authMiddleware.js     ← JWT verification (protect)
│   ├── utils/
│   │   └── generateToken.js
│   ├── routes/
│   │   ├── authRoutes.js     ← /api/auth/login, /api/auth/me
│   │   ├── sectionRoutes.js  ← /api/sections/<name>  (PUBLIC, read-only)
│   │   ├── adminRoutes.js    ← /api/admin/<name>     (PROTECTED, full CRUD)
│   │   └── navbarRoutes.js   ← legacy /api/navbar (public)
│   ├── seed/
│   │   └── createAdmin.js    ← creates the first admin user
│   ├── uploads/               ← uploaded images served at /uploads/<file>
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/                 ← React (Vite) Admin Panel — runs on :5174
    └── src/
        ├── App.jsx           ← Sidebar + React Router routes + dashboard
        ├── main.jsx          ← BrowserRouter + AuthProvider
        ├── context/
        │   └── AuthContext.jsx   ← login/logout/session state
        ├── components/
        │   ├── ProtectedRoute.jsx
        │   ├── ImageUpload.jsx
        │   └── SaveBar.jsx
        ├── pages/
        │   ├── Login.jsx
        │   ├── NavbarEditor.jsx
        │   ├── HeroEditor.jsx
        │   ├── GameSectionEditor.jsx
        │   ├── ServicesSectionEditor.jsx
        │   ├── GrowthSectionEditor.jsx
        │   ├── AchievementSectionEditor.jsx
        │   ├── DirectorMessageEditor.jsx
        │   ├── PartnersSectionEditor.jsx
        │   └── FooterEditor.jsx
        └── services/
            ├── axiosClient.js   ← attaches JWT, handles 401 auto-logout
            ├── authApi.js       ← login / me
            └── adminApi.js      ← all CRUD + upload calls
```

---

## Step 1 — Set up the Backend

### 1a. Copy files

Copy the entire `backend/` folder into your project (or merge into your
existing backend, keeping any other routes/models you already have).

### 1b. Configure environment variables

```bash
cd backend
cp .env.example .env
```


### 1c. Install dependencies

```bash
npm install
```

### 1d. Create the first admin user

```bash
npm run seed:admin
```

This creates one admin account in MongoDB Atlas using the
`ADMIN_USERNAME` / `ADMIN_EMAIL` / `ADMIN_PASSWORD` values from `.env`.
Run it once; re-running is safe (it skips creation if the user exists).

### 1e. Start the backend

```bash
npm run dev
# → Server running on port 5000
```

---

## Step 2 — Set up the Admin Panel (frontend)

```bash
cd frontend
npm install
npm run dev
# → Admin panel at http://localhost:5174
```

Visiting `/login` shows the login form. Enter the email/username and
password created in Step 1d. On success you're redirected to the
dashboard; all other routes are protected and redirect back to `/login`
if there's no valid token.

---

## Step 3 — Update your existing public website

Replace `frontend/src/services/navbarApi.js` (or equivalent) with the
content in `frontend-updates/api.js`, which points at the **public,
read-only** endpoints under `/api/sections/<name>`.

Example for `GameSection.jsx`:

```jsx
import { useEffect, useState } from "react";
import { getGameSection } from "../services/api";

export default function GameSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getGameSection().then(setData).catch(console.error);
  }, []);

  if (!data) return null;

  const { heading, description, tags, gameImages } = data;
  // render using heading, description, tags, gameImages
}
```

Apply the same pattern to every other component (Navbar, Hero, Services,
Growth, Achievements, Director Message, Partners, Footer).

---

## Authentication Flow

1. Visiting any `/admin/*` route (or any route in the admin app) renders
   `<ProtectedRoute>`. If no valid JWT is stored, the user is redirected
   to `/login`.
2. `Login.jsx` posts `{ emailOrUsername, password }` to
   `POST /api/auth/login`.
3. The backend looks up the user, compares the bcrypt-hashed password,
   and — if valid — returns `{ token, user }`. The token is signed with
   `JWT_SECRET` and expires after `JWT_EXPIRES_IN` (default 7 days).
4. The frontend stores the token in `localStorage` and attaches it as
   `Authorization: Bearer <token>` on every request via `axiosClient`.
5. All `/api/admin/*` routes and `POST /api/upload` run through the
   `protect` middleware, which verifies the JWT and loads `req.user`.
   Invalid/expired tokens return `401`, and the frontend auto-clears the
   token and redirects to `/login`.
6. `GET /api/auth/me` is used on app load to verify a stored token is
   still valid (keeps the user logged in across refreshes).

---

## API Reference

### Auth (public)

| Method | URL              | Action                          |
|--------|------------------|----------------------------------|
| POST   | `/api/auth/login`| Login → `{ token, user }`        |
| GET    | `/api/auth/me`   | Verify token, return current user (protected) |

### Public content (used by the live website)

| Method | URL                            | Action                  |
|--------|--------------------------------|-------------------------|
| GET    | `/api/sections/<section>`      | Fetch section data      |

### Admin content (JWT required — `Authorization: Bearer <token>`)

| Method | URL                        | Action                      |
|--------|----------------------------|-----------------------------|
| GET    | `/api/admin/<section>`     | Fetch section data          |
| POST   | `/api/admin/<section>`     | Create (if none exists)     |
| PUT    | `/api/admin/<section>`     | Update (upsert) section      |
| DELETE | `/api/admin/<section>`     | Delete / reset section       |
| POST   | `/api/upload`              | Upload image file (protected)|

### Sections available
`navbar`, `hero`, `gamesection`, `services`, `growth`, `achievement`, `director`, `partners`, `footer`

### Image Upload

```
POST /api/upload
Headers: Authorization: Bearer <token>
Content-Type: multipart/form-data
Body: { image: <file> }

Response: { url: "/uploads/filename.jpg" }
```

Uploaded images are saved to `backend/uploads/` and served at
`http://localhost:5000/uploads/<file>`.

---

## Data Flow

```
Admin Panel (localhost:5174, JWT required)
  → changes text / uploads image
  → PUT /api/admin/<section>  (updates MongoDB Atlas)

Live Website (localhost:5173, public)
  → component loads
  → GET /api/sections/<section>  (reads MongoDB Atlas)
  → renders fresh data
```

Changes in admin → saved to MongoDB Atlas → website fetches on load =
live update, no redeploy needed.

---

## Seeding Section Data

The first time you open an editor in the admin panel, `GET` will return
`404` (empty). Fill in the fields and click **Save Changes** — it
upserts the document via `PUT /api/admin/<section>`.

---

## Best Practices / Common Mistakes to Avoid

- Never commit `.env` — only `.env.example`. Use a strong, random `JWT_SECRET`.
- Always hash passwords (handled automatically by `User` model's `pre("save")` hook) — never store plaintext.
- Keep public site reads on `/api/sections/*` (no auth) and all writes on `/api/admin/*` (JWT required) — don't expose write routes publicly.
- Validate `req.body` shapes against the Mongoose schema; `runValidators: true` is already enabled on upserts.
- In production, serve `backend/uploads` via a CDN or object storage (S3) instead of local disk, and put the API behind HTTPS.
- Change the seeded admin password immediately after first login in production.
- Set CORS to your specific frontend origins in production instead of `cors()` with no options.
