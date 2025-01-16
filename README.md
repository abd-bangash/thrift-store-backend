# Thrift Store Backend API Documentation

## Table of Contents

## API Documentation

### Register User

- **Endpoint:** `/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "string",
      "username": "string",
      "email": "string"
    }
  }
  ```

### Login

- **Endpoint:** `/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "string"
  }
  ```

### Logout (Logged in users only)

- **Endpoint:** `/logout`
- **Method:** `POST`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Logout successful"
  }
  ```

### Forgot Password

- **Endpoint:** `/forgot-password`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "OTP sent to email"
  }
  ```

### Verify OTP

- **Endpoint:** `/verify-otp`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "string",
    "otp": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "OTP verified"
  }
  ```

### Reset Password

- **Endpoint:** `/reset-password`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "string",
    "otp": "string",
    "newPassword": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Password reset successful"
  }
  ```

### Get Profile (Logged in users only)

- **Endpoint:** `/profile`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response:**
  ```json
  {
    "user": {
      "id": "string",
      "username": "string",
      "email": "string",
      "profile": {
        "firstName": "string",
        "lastName": "string",
        "address": "string",
        "phone": "string"
      }
    }
  }
  ```

### Update Profile (Logged in users only)

- **Endpoint:** `/profile`
- **Method:** `PUT`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Body:**
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "address": "string",
    "phone": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Profile updated successfully",
    "profile": {
      "firstName": "string",
      "lastName": "string",
      "address": "string",
      "phone": "string"
    }
  }
  ```

### Add Product (Logged in users only)

- **Endpoint:** `/products`
- **Method:** `POST`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Body:**
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "number",
    "category": "string",
    "image": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Product added successfully",
    "product": {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": "number",
      "category": "string",
      "image": "string"
    }
  }
  ```

### Get All Products

- **Endpoint:** `/products`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "products": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "price": "number",
        "category": "string",
        "image": "string"
      }
    ]
  }
  ```

### Get Product by ID

- **Endpoint:** `/products/:id`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "product": {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": "number",
      "category": "string",
      "image": "string"
    }
  }
  ```

### Get Product by Category

- **Endpoint:** `/products/category/:category`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "products": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "price": "number",
        "category": "string",
        "image": "string"
      }
    ]
  }
  ```

### Get All Categories

- **Endpoint:** `/categories`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "categories": [
      {
        "id": "string",
        "name": "string"
      }
    ]
  }
  ```

### Update Product (Logged in users only)

- **Endpoint:** `/products/:id`
- **Method:** `PUT`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Body:**
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "number",
    "category": "string",
    "image": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Product updated successfully",
    "product": {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": "number",
      "category": "string",
      "image": "string"
    }
  }
  ```

### Delete Product (Logged in users only)

- **Endpoint:** `/products/:id`
- **Method:** `DELETE`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response:**

  ```json
  {
    "message": "Product deleted successfully"
  }
  ```

- Books
- Accessories
- Electronics
- Stationery
- Lab Equipment
- Software Licenses

## Admin Routes

### Get All Users

```
GET /api/admin/users
Protected Admin Route

Response: {
  "users": Array of user objects
}
```

## Error Responses

All routes may return:

```
{
  "message": "error description",
  "errors": [array of validation errors] // optional
}
```

Status codes:

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 500: Server Error
