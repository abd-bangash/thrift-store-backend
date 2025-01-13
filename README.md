# Thrift Store Backend

This is the backend for the Thrift Store application. Below are the routes available along with examples of the data to be sent and received.

## User Routes

### Register User

**Endpoint:** `POST /api/user/register`

**Request Body:**

```json
{
  "userName": "exampleUser",
  "email": "example@example.com",
  "password": "examplePassword",
  "role": "user"
}
```

**Response:**

```json
{
  "user": {
    "_id": "userId",
    "userName": "exampleUser",
    "email": "example@example.com",
    "role": "user"
  },
  "token": "jwtToken"
}
```

### Login User

**Endpoint:** `POST /api/user/login`

**Request Body:**

```json
{
  "email": "example@example.com",
  "password": "examplePassword"
}
```

**Response:**

```json
{
  "user": {
    "_id": "userId",
    "userName": "exampleUser",
    "email": "example@example.com",
    "role": "user"
  },
  "token": "jwtToken"
}
```

### Get User Profile

**Endpoint:** `GET /api/user/profile`

**Headers:**

```
Authorization: Bearer jwtToken
```

**Response:**

```json
{
  "_id": "userId",
  "userName": "exampleUser",
  "email": "example@example.com",
  "role": "user"
}
```

### Forgot Password

**Endpoint:** `POST /api/user/forgot-password`

**Request Body:**

```json
{
  "email": "example@example.com"
}
```

**Response:**

```json
{
  "message": "OTP sent successfully"
}
```

### Verify OTP

**Endpoint:** `POST /api/user/verify-otp`

**Request Body:**

```json
{
  "email": "example@example.com",
  "otp": "123456"
}
```

**Response:**

```json
{
  "message": "OTP verified"
}
```

### Reset Password

**Endpoint:** `POST /api/user/reset-password`

**Request Body:**

```json
{
  "email": "example@example.com",
  "otp": "123456",
  "newPassword": "newExamplePassword"
}
```

**Response:**

```json
{
  "message": "Password changed successfully"
}
```

## Admin Routes

### Get All Users

**Endpoint:** `GET /api/admin/users`

**Headers:**

```
Authorization: Bearer jwtToken
```

**Response:**

```json
{
  "users": [
    {
      "_id": "userId1",
      "userName": "exampleUser1",
      "email": "example1@example.com",
      "role": "user"
    },
    {
      "_id": "userId2",
      "userName": "exampleUser2",
      "email": "example2@example.com",
      "role": "admin"
    }
  ]
}
```

## Environment Variables

Make sure to set the following environment variables in your `.env` file:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

## Running the Application

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

The server will start on the port specified in the `.env` file (default is 5000).
