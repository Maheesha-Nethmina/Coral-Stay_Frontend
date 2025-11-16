# CoralStay: Beach Hotel & Reef Tour Boat Booking Platform 🐠🌊

CoralStay is a full-stack MERN web application for a premier beach resort, offering hotel bookings and immersive reef tour services. This team project integrates real-time boat seat booking, a 3D virtual reef tour, and dynamic weather alerts to provide a seamless user experience.

<img width="1886" height="881" alt="Coralstay" src="https://github.com/user-attachments/assets/f8f98c5a-49c4-4308-8fdd-00777441db96" />

---

## 🎨 Design & Project Links

* **Figma Design:** [**View the complete UI/UX design on Figma**](https://www.figma.com/proto/AeMoXvvEQHoqYgQEOlX7qO/CoralStay?node-id=2-2&t=vYWoRNgs1jO6QAKh-1)
* **Backend Repository:** [**View the Node.js/Express API on GitHub**](https://github.com/Maheesha-Nethmina/Coral-Stay_Backend)
---
## ✨ Key Features

This platform is divided into a feature-rich user-facing application and a comprehensive admin panel.

### 👤 User & Booking Features
* **Hotel Booking:** A complete system for users to browse and book available hotel rooms.
* **Real-time Reef Tour Booking:**
    * View a **live dashboard** of upcoming reef tours and boat seat availability.
    * Select and book specific seats on a tour boat.
    * Availability is updated in real-time for all users.
* **Personalized User Dashboard:** A protected area for users to:
    * View upcoming hotel and tour bookings.
    * Check order history.
* **Dynamic Weather Alerts:** Users receive automatic weather alerts for their booked tours, enhancing safety and planning.

### 🐠 Immersive & Educational Experience
* **AI Chatbot Assistant:** An intelligent chatbot to answer user questions about the resort, tours, and marine life.
* **3D Virtual Reef Tour:** An interactive 3D experience allowing users to explore the coral reef and marine life from their browser.
* **Educational Portal:** Provides valuable information about local coral reefs, fish species, and conservation efforts.

### 🔒 Admin Functionality
* **Full Admin Dashboard:** A secure, role-protected panel for complete site management.
* **User Management:** Ability to view, manage, and assign roles to all users.
* **Booking Management:** Full CRUD (Create, Read, Update, Delete) control over all hotel and tour bookings.
* **Content Management:** Admins can update hotel room details, tour information, and educational content.

---

## 🛠️ Tech Stack

This project leverages the MERN stack along with modern technologies for real-time and interactive features.

| Category | Technology |
| :--- | :--- |
| **Frontend** | React, Vite, React Router, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JSON Web Tokens (JWT) |
| **Weather** | External Weather API (e.g., OpenWeatherMap) |


## 🚀 Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

* Node.js (v16 or newer)
* `npm` or `yarn`
* MongoDB Atlas account (or local MongoDB installation)

### 1. Backend Setup (Node.js & Express)

1.  Clone the backend repository:
    ```sh
    git clone (https://github.com/Maheesha-Nethmina/Coral-Stay_Backend)
    cd Coral-Stay_Backend
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```
3.  Create a `.env` file in the root and add your environment variables:
    ```.env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    WEATHER_API_KEY=your_weather_api_key
    ```
4.  Run the backend server:
    ```sh
    npm run dev
    ```
    The API will be running on `http://localhost:3000` (or your configured port).

### 2. Frontend Setup (React - This Repo)

1.  If you haven't cloned this repository yet, do so. Then, navigate into the directory.
    ```sh
    git clone (https://github.com/Maheesha-Nethmina/Coral-Stay_Frontend)
    cd Coral-Stay_Frontend
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```
3.  Create a `.env.local` file in the root of this project and add the API URL:
    ```.env
    VITE_API_URL=http://localhost:5000
    ```
4.  Run the React app:
    ```sh
    npm run dev
    ```
    The application will be running on `http://localhost:5173` (or the next available port).

---

## 🤝 Our Team

This project was a collaborative effort by:

* **Maheesha Nethmina** - *Full Stack Developer* - [GitHub Profile](https://github.com/Maheesha-Nethmina)
* **Tharusha lakchani** - *Full Stack Developer* - [GitHub Profile](https://github.com/tharusha-liyanage)
* **Chethana Marasinghe** - *Full Stack Developer* - [GitHub Profile](https://github.com/ChethanaMarasinghe)
* **Asiri Weerasingha** - *Full Stack Developer* - [GitHub Profile](https://github.com/Asiri2000)

