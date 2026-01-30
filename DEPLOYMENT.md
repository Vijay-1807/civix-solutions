# Deployment Guide

Follow these instructions to deploy your application to Render (Backend) and Vercel (Frontend).

## 1. Backend Deployment (Render)

1.  **Sign Up/Login**: Go to [render.com](https://render.com) and log in.
2.  **New Web Service**: Click on the "New +" button and select "Web Service".
3.  **Connect Repository**: Connect your GitHub repository.
4.  **Configure Service**:
    *   **Name**: Choose a name for your backend service (e.g., `my-app-backend`).
    *   **Root Directory**: `server` (This is important!).
    *   **Environment**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node index.js`
5.  **Environment Variables**:
    *   Scroll down to the "Environment Variables" section and add the following keys and values from your local `.env` file:
        *   `MONGODB_URI`: Your MongoDB connection string.
        *   `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.
        *   `CLOUDINARY_API_KEY`: Your Cloudinary API key.
        *   `CLOUDINARY_API_SECRET`: Your Cloudinary API secret.
        *   (Optional) `PORT`: `5000` (Render will automatically assign a port, but this is good practice).
6.  **Deploy**: Click "Create Web Service".
7.  **Copy Backend URL**: Once deployed, copy the URL provided by Render (e.g., `https://my-app-backend.onrender.com`). You will need this for the frontend.

## 2. Frontend Deployment (Vercel)

1.  **Sign Up/Login**: Go to [vercel.com](https://vercel.com) and log in.
2.  **Add New Project**: Click "Add New..." -> "Project".
3.  **Import Git Repository**: Select your GitHub repository and click "Import".
4.  **Configure Project**:
    *   **Framework Preset**: Vercel should automatically detect `Vite`. If not, select it.
    *   **Root Directory**: Click "Edit" and select `client`.
    *   **Build Command**: `npm run build` (should be default).
    *   **Output Directory**: `dist` (should be default).
5.  **Environment Variables**:
    *   Expand the "Environment Variables" section.
    *   Add the following variable:
        *   `VITE_API_URL`: Paste the **Backend URL** you copied from Render (e.g., `https://my-app-backend.onrender.com/api`).
        *   **Important**: Make sure to append `/api` to the end of the URL if your backend routes are prefixed with `/api`. based on your code, it should be `https://<YOUR_RENDER_URL>/api`.
6.  **Deploy**: Click "Deploy".

## 3. Final Verification

1.  Open your deployed Vercel URL.
2.  Check the "Projects" section to ensure data is loading from the backend.
3.  Try logging into the Admin panel (if authentication is set up) or checking the Admin routes.

## Troubleshooting

*   **CORS Issues**: If you see CORS errors in the browser console, you might need to update your backend `cors` configuration to allow the Vercel domain.
    *   In `server/index.js`, update `app.use(cors())` to `app.use(cors({ origin: 'https://your-vercel-app.vercel.app' }))` or keep it open for now.
*   **Build Failures**: Check the logs on Render or Vercel for specific error messages.
