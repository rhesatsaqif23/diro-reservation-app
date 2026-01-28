# 🧘 ZenPilates – Simple Pilates Reservation App

**ZenPilates** is a full-stack web application that simulates an end-to-end Pilates studio reservation system. This project was developed as part of the **DIRO Technical Test**, with a focus on realistic business flow, clean architecture, and a good user experience.

The application allows users to browse Pilates classes, select available dates and timeslots, choose an available court, complete a payment, and manage their reservation history.

---

## 📌 Project Description

ZenPilates represents a real-world reservation system commonly needed by service-based UMKM (SME) businesses. The core goal of this project is to demonstrate how a reservation flow can be implemented in a structured, scalable, and production-ready way, rather than as a simple CRUD demo.

### What does this application do?
* ✅ Allows users to select a Pilates class.
* ✅ Shows available dates and timeslots dynamically.
* ✅ Displays available courts based on date and timeslot.
* ✅ Prevents double booking.
* ✅ Requires successful payment before confirming a reservation.
* ✅ Stores and displays reservation history with status.

### Why these technologies?

* **Next.js (App Router):** Chosen for its modern routing system, server/client separation, and suitability for scalable web applications.
* **Golang (net/http):** Used to build a lightweight, high-performance backend with explicit control over request lifecycle and middleware.
* **Clean Architecture:** Ensures separation of concerns between domain logic, use cases, and infrastructure, making the system easier to test and extend.
* **Supabase (PostgreSQL):** Provides a reliable relational database with UUID support and strong data integrity.
* **Midtrans Snap:** Integrated to simulate a real payment-first booking confirmation flow.

---

## Challenges and Future Improvements

Some challenges addressed in this project include:
1.  **State Transitions:** Designing a booking flow that prevents invalid state transitions.
2.  **Validation:** Ensuring availability validation across date, timeslot, and court.
3.  **Payment Sync:** Synchronizing payment status with reservation confirmation.

**Planned improvements include:**
* [ ] Multi-studio and branch support.
* [ ] Admin dashboard for schedule management.
* [ ] Reschedule and cancellation features.
* [ ] Email or WhatsApp notifications.
* [ ] Capacity-based or seat-based availability.

---

## ⚙️ Installation and Running the Project

This project consists of two main parts: **frontend** and **backend**.

### Prerequisites
* Node.js (v18 or later)
* Go (v1.21 or later)
* PostgreSQL (or Supabase project)
* Midtrans Sandbox account

### 1. Backend Setup (Golang)

Navigate to the backend directory:
```bash
cd backend
```

Configure environment variables. Create a `.env` file:
```env
DATABASE_URL=your_postgres_url
JWT_SECRET=your_jwt_secret
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
```

Run database migration (if applicable):
```bash
go run internal/infrastructure/database/migrate.go
```

Start the backend server:
```bash
go run cmd/server/main.go
```
*Backend will run on: `http://localhost:8080`*

### 2. Frontend Setup (Next.js)

Navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Configure environment variables. Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_midtrans_client_key
```

Run the development server:
```bash
npm run dev
```
*Frontend will be available at: `http://localhost:3000`*

---

## 🚀 How to Use the Application

1.  Open the application and browse available Pilates classes.
2.  Select a class to start a booking.
3.  Choose an available date.
4.  Select a timeslot based on the chosen date.
5.  Select an available court.
6.  Review booking details on the summary page.
7.  Complete payment via **Midtrans Snap**.
8.  After successful payment, the booking status becomes **confirmed**.
9.  View all completed and pending bookings on the **History page**.

### Authentication Notes
* 🔒 Booking, payment, and history pages are protected.
* 👤 Users must be authenticated to create and view reservations.
* 🔑 JWT-based authentication is used on the backend.

---

## 🧩 Project Structure Overview

### Frontend
* Feature-based and domain-oriented folder structure.
* Reusable UI components.
* Centralized design tokens.
* Progressive booking state management.

### Backend
* **Clean Architecture** (Domain, Usecase, Repository, Delivery).
* RESTful API design.
* JWT authentication middleware.
* Explicit availability and booking validation logic.

---

## ✅ Summary

**ZenPilates** is not just a functional booking demo, but a representation of how a real reservation system should be designed. It focuses on correctness of business logic, clean separation of concerns, and a user-friendly booking experience.

This project demonstrates readiness for real-world development and future scalability, aligned with **DIRO’s** domain as a reservation platform for UMKM.
