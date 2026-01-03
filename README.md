#  JWT Authentication Backend (Access & Refresh Token)

This project implements **User Authentication** using **JWT Access Token and Refresh Token** with **Node.js, Express.js, and MongoDB**.

---

##  Project Structure

```
backend/
 ├── config/
 │    ├── db.js
 │    └── jwt.js
 │
 ├── controllers/
 │    └── authController.js
 │
 ├── models/
 │    └── userModel.js
 │
 ├── routes/
 │    └── authRoute.js
 │
 ├── utils/
 │    └── token.js
 │
 ├── .env
 ├── .gitignore
 ├── package.json
 ├── package-lock.json
 └── server.js
```

---

##  Getting Started

### 1️ Clone the Repository

```bash
git clone https://github.com/sahkumarkrishna/Node.js-intern
```

### 2️ Go to Backend Folder

```bash
cd backend
```

### 3️ Install Dependencies

```bash
npm install
```

### 4️ Create `.env` File

Create a `.env` file in the **backend root directory**:

```env
MONGO_URI=mongodb+srv://kumarkrishna9801552_db_user:krishna%40123@cluster0.v67mfjw.mongodb.net/Auth?appName=Cluster0
PORT=5000
ACCESS_TOKEN_SECRET=fert84543490t4u6h4548y50
REFRESH_TOKEN_SECRET=tht54y50t4u6h4548y50rert84543490
```

---

##  Run the Project

### Create MongoDB Atlas Cluster

```bash
mongod
```

### Run Server

```bash
npm run dev
```

###  Successful Output

```
MongoDB Connected Successfully
Server running on port 5000
```

---

##  API Testing (Postman)

###  Register User

**POST**

```
http://localhost:5000/api/auth/register
```

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

---

###  Login User

**POST**

```
http://localhost:5000/api/auth/login
```

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

**Response**

```json
{
  "accessToken": "ACCESS_TOKEN",
  "refreshToken": "REFRESH_TOKEN"
}
```

---

###  Refresh Token

**POST**

```
http://localhost:5000/api/auth/refresh-token
```

```json
{
  "refreshToken": "REFRESH_TOKEN"
}
```

---

##  Authentication Flow

1. User logs in
2. Server returns **Access Token (short-lived)** and **Refresh Token (long-lived)**
3. Access Token is used for protected APIs
4. When Access Token expires, Refresh Token generates a new Access Token

---

##  Security

* Passwords are hashed using **bcrypt**
* Access Token expiry is short to reduce risk
* Refresh Token is stored securely in database

---

##  NPM Scripts

```bash
npm run dev   # Development mode
```

---



##  Status

✔ JWT Authentication implemented
✔ Refresh Token flow working
✔ MongoDB connected
✔ APIs tested with Postman
✔ Clean folder structure
