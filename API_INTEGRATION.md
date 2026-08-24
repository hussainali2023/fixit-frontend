# API Integration Guide

This document outlines the detailed API endpoints available in the Fixit platform, based on the Postman collection.

## Base URL
Ensure the frontend environment variables point to the backend server's base URL (e.g., `http://localhost:5000/api` or as defined by `{{baseUrl}}`).

---

## Authentication (`/api/auth`)

### 1. Register
- **Endpoint:** `POST {{baseUrl}}/api/auth/register`
- **Description:** Registers a new user (Customer, Technician, etc.)
- **Payload (Customer Example):**
  ```json
  {
    "name": "Customer_6",
    "email": "customer6@fix.com",
    "password": "123456",
    "role": "CUSTOMER"
  }
  ```

### 2. Login
- **Endpoint:** `POST {{baseUrl}}/api/auth/login`
- **Description:** Authenticates a user and returns a token.
- **Payload (Customer Example):**
  ```json
  {
    "email": "customer6@fix.com",
    "password": "123456"
  }
  ```

---

## Users (`/api/users`)

### 1. Current User
- **Endpoint:** `GET {{baseUrl}}/api/users/me`
- **Description:** Retrieves the profile of the currently logged-in user.

---

## Services (`/api/services`)

### 1. Get All Services
- **Endpoint:** `GET {{baseUrl}}/api/services?location=gulshan`
- **Description:** Retrieves a list of all services, optionally filtered by queries like location.

### 2. Single Service Details
- **Endpoint:** `GET {{baseUrl}}/api/services/{{serviceId}}`
- **Description:** Retrieves details of a specific service.

### 3. Create Service (Technician)
- **Endpoint:** `POST {{baseUrl}}/api/services`
- **Description:** Creates a new service offering.
- **Payload:**
  ```json
  {
    "name": "Room Poriskar",
    "category": "Cleaning",
    "description": "Puro Room poriskar,kono dhulo bali thakbena ekdom kacher moto soccho kore debo.",
    "price": 8000
  }
  ```

### 4. Update Service (Technician)
- **Endpoint:** `PATCH {{baseUrl}}/api/services/{{serviceId}}`
- **Description:** Updates an existing service.
- **Payload:**
  ```json
  {
    "name": "Water Pipe Repair",
    "category": "Plumbing",
    "description": "Fast emergency response for broken pipes and water leaks.",
    "price": 2500
  }
  ```

### 5. Delete Service (Technician)
- **Endpoint:** `DELETE {{baseUrl}}/api/services/{{serviceId}}`
- **Description:** Deletes a specific service.

---

## Technicians (`/api/technicians`)

### 1. Get All Technicians
- **Endpoint:** `GET {{baseUrl}}/api/technicians`
- **Description:** Retrieves a list of all technicians.

### 2. Technician Profile & Reviews
- **Endpoint:** `GET {{baseUrl}}/api/technicians/{{technicianId}}`
- **Description:** Retrieves public profile and reviews for a technician.

### 3. Update Profile (Technician)
- **Endpoint:** `PUT {{baseUrl}}/api/technicians/profile`
- **Description:** Updates the authenticated technician's profile details.
- **Payload:**
  ```json
  {
    "skills": "Plumbing, Pipe Fitting, Water Pump Installation",
    "experience": 6,
    "location": "kolkata"
  }
  ```

### 4. Update Availability (Technician)
- **Endpoint:** `PUT {{baseUrl}}/api/technicians/availability`
- **Description:** Updates the technician's working hours/availability.
- **Payload:**
  ```json
  {
    "availability": "Mon-Sat 9AM-3PM"
  }
  ```

---

## Bookings (`/api/bookings`)

### 1. Create Booking (Customer)
- **Endpoint:** `POST {{baseUrl}}/api/bookings`
- **Description:** Books a service.
- **Payload:**
  ```json
  {
    "serviceId": "{{serviceId}}",
    "scheduledDate": "2026-08-25"
  }
  ```

### 2. My Bookings (Customer)
- **Endpoint:** `GET {{baseUrl}}/api/bookings/my`
- **Description:** Retrieves bookings made by the current customer.

### 3. All Bookings (Admin)
- **Endpoint:** `GET {{baseUrl}}/api/bookings`
- **Description:** Retrieves all bookings (Admin only).

### 4. Get Booking Details
- **Endpoint:** `GET {{baseUrl}}/api/bookings/{{bookingId}}`
- **Description:** Retrieves details of a specific booking.

### 5. Update Booking Status
- **Endpoint:** `PATCH {{baseUrl}}/api/bookings/status/{{bookingId}}`
- **Description:** Updates the status of a booking (e.g., ACCEPTED, COMPLETED).
- **Payload:**
  ```json
  {
    "status": "ACCEPTED"
  }
  ```

---

## Payments (`/api/payments`)

### 1. Create Checkout (Customer)
- **Endpoint:** `POST {{baseUrl}}/api/payments/checkout/{{bookingId}}`
- **Description:** Initiates the checkout process for a booking.

### 2. Confirm / Complete Payment
- **Endpoint:** `POST {{baseUrl}}/api/payments/confirm`
- **Description:** Confirms a payment transaction.
- **Payload:**
  ```json
  {
    "bookingId": "{{bookingId}}",
    "transactionId": "{{transactionId}}"
  }
  ```

### 3. Payment History (Customer)
- **Endpoint:** `GET {{baseUrl}}/api/payments/my`
- **Description:** Retrieves payment history for the current customer.

### 4. Get Payment Details
- **Endpoint:** `GET {{baseUrl}}/api/payments/{{paymentId}}`
- **Description:** Retrieves details for a specific payment.

---

## Reviews (`/api/reviews`)

### 1. Create Review (Customer)
- **Endpoint:** `POST {{baseUrl}}/api/reviews`
- **Description:** Submits a review for a completed booking.
- **Payload:**
  ```json
  {
    "bookingId": "{{bookingId}}",
    "rating": 5,
    "comment": "Outstanding service! Resolved our pipe leakage quickly and professionally."
  }
  ```

### 2. Get All Reviews
- **Endpoint:** `GET {{baseUrl}}/api/reviews`
- **Description:** Retrieves all reviews.

---

## Admin (`/api/admin`)

### 1. Get All Users
- **Endpoint:** `GET {{baseUrl}}/api/admin/users`
- **Description:** Retrieves all registered users.

### 2. Update Ban-Unban User
- **Endpoint:** `PATCH {{baseUrl}}/api/admin/users/{{userId}}`
- **Description:** Bans or unbans a user account.
- **Payload:**
  ```json
  {
    "isBanned": true
  }
  ```

### 3. Get All Bookings
- **Endpoint:** `GET {{baseUrl}}/api/admin/bookings`
- **Description:** Retrieves all system bookings.
