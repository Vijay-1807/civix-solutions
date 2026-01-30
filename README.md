
# Civix Solutions - Full Stack Application

A production-ready full-stack web application developed as a comprehensive assignment solution. This application features a dynamic landing page for a civil engineering firm and a robust admin dashboard for content management.

## 🚀 Deployment Links

- **Frontend Application**: [https://civix-solutions.vercel.app/](https://civix-solutions.vercel.app/)
- **Backend API**: [https://civix-solutions-backend.onrender.com/](https://civix-solutions-backend.onrender.com/)
- **Admin Panel**: [https://civix-solutions.vercel.app/admin](https://civix-solutions.vercel.app/admin)

---

## 📋 Objectives Completed

This application successfully implements all required features for the **Full Stack Development Task**, including the Landing Page, Admin Panel, and **Bonus Features**.

### 1. Landing Page
A responsive, aesthetically pleasing landing page containing the following sections:

-   **"Our Projects" Section**:
    -   Dynamically fetches projects from the backend.
    -   Displays **Project Image**, **Name**, **Description**, and a "View Details" button.
-   **"Happy Clients" Section**:
    -   Dynamically fetches client testimonials from the backend.
    -   Displays **Client Image**, **Description**, **Name**, and **Designation**.
-   **Contact Form**:
    -   Allows users to submit inquiries with **Full Name**, **Email Address**, **Mobile Number**, and **City**.
    -   Data is securely sent to the backend and stored in the database.
    -   Includes form validation (e.g., valid phone numbers).
-   **Newsletter Subscription**:
    -   Users can subscribe by entering their email address.
    -   Emails are validated and stored in the backend.

### 2. Admin Panel
A protected dashboard for administrators to manage the website's content:

-   **Project Management**:
    -   Add new projects with **Name**, **Description**, and **Image**.
-   **Client Management**:
    -   Add new client testimonials with **Name**, **Description**, **Designation**, and **Image**.
-   **Contact Inquiries**:
    -   View a table of all contact form submissions (Name, Email, Mobile, City).
-   **Subscribers**:
    -   View a list of all newsletter subscribed email addresses.

### ✨ Bonus Features Implemented

-   **🖼️ Image Cropping**:
    -   Integrated a frontend image cropping tool (`react-easy-crop`).
    -   **Projects**: Images are enforced to a **450x350** aspect ratio before upload.
    -   **Clients**: Images are enforced to a **1:1 (Square)** aspect ratio before upload.
    -   Ensures visual consistency across the platform.

---

## 🛠 Tech Stack

-   **Frontend**: React.js, TypeScript, Tailwind CSS, Shadcn UI, Axios, React Hook Form.
-   **Backend**: Node.js, Express.js.
-   **Database**: MongoDB (Mongoose).
-   **Image Handling**: Multer (Local/Cloud storage support).

---

## ⚙️ Setup Instructions

Follow these steps to run the application locally.

### Prerequisites
-   Node.js installed.
-   MongoDB installed locally or a MongoDB Atlas connection string.

### 1. Backend Setup

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` directory:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```

### 2. Frontend Setup

1.  Navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend:
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:5173` in your browser.

---

## 👤 Author

**Vijay (Bontha Vijay)**
-   **Location**: ArundelPet, Guntur
-   **Phone**: +91 7286973788
-   **Email**: bonthavijay1807@gmail.com
