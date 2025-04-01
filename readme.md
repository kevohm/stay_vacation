# StayVacation 🏡✈️  
*Book Vacation Rentals with Mobile Money (M-Pesa)*

[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![M-Pesa](https://img.shields.io/badge/M--Pesa-FF6A00?style=flat&logo=safaricom&logoColor=white)](https://developer.safaricom.co.ke/)  
*(Replace Safaricom logo if needed)*

StayVacation is a full-stack MERN vacation rental platform with **M-Pesa mobile money integration**, designed to streamline bookings and payments for users in regions where mobile money is widely adopted.

**Live Demo:** [StayVacation Demo](https://your-demo-link.com)  
**API Docs:** [Postman/Swagger Link](https://your-api-docs.com)

![StayVacation M-Pesa Payment Demo](/screenshots/mpesa-payment.gif)

---

## ✨ Key Features

- **M-Pesa Integration**: Securely process payments via Safaricom’s M-Pesa API.
- **User Authentication**: JWT-based signup/login with password encryption.
- **Property Search**: Filter rentals by price, location, and amenities.
- **Booking Management**: Reserve properties, view booking history, and cancel reservations.
- **Mobile-First Design**: Responsive UI optimized for smartphones.
- **Admin Portal**: Manage users, properties, and transactions (if applicable).

---

## 🛠️ Tech Stack

### **Frontend**
- **React.js** with React Router
- **Context API** for state management
- **Axios** for API calls
- **Chakra UI** or **Tailwind CSS** *(customize based on your UI library)*

### **Backend**
- **Node.js/Express.js** REST API
- **MongoDB** with Mongoose for data modeling
- **M-Pesa Daraja API** for mobile payments
- **JWT** for authentication
- **Bcrypt** for password hashing

### **DevOps**
- **Git/GitHub** for version control
- **Postman** for API testing
- **Render/Heroku** for deployment

---

## 🔧 Installation & Setup

1.  **Clone the repo**
   ```bash
   git clone https://github.com/kevohm/stay_vacation.git
   cd stay_vacation
```
2. **setup .env**
   Should have the following
   ## M-Pesa Credentials (from Safaricom Developer Portal)
   ```
   MPESA_CONSUMER_KEY=your_consumer_key
   MPESA_CONSUMER_SECRET=your_consumer_secret
   MPESA_PASSKEY=your_passkey
   MPESA_BUSINESS_SHORTCODE=your_shortcode
   MPESA_CALLBACK_URL=https://your-backend-url/mpesa-callback
   ```
   ## Database & Auth
   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
3. **install packages using node.js**
   ```
   npm i
   ```
4. **start dev server**
   ```
   npm run dev
   ```
6.  **run frontend**
   ```
   cd client && npm i && npm run dev
   ```
