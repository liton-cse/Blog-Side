---
### **Blog Site**  
A full-stack blog platform built with MongoDB, Express, React, and Node.js  

---

### **📌 Overview**  
This project is a **blogging platform** where users can:  
- **Create, read, update, and delete (CRUD) blog posts**  
- **Pagination on the blog list.**  
- **Allow filtering of blogs by category or other relevant criteria.** 
- **Add a search bar for free-text search across blog content or titles.** 
- **Use the same form for both creating and editing blogs.When editing, pre-fill the form with the selected blog's data.** 
- **Responsive UI with rich text editing**  

---

### **🛠 Tech Stack**  

#### **Frontend (React)**  
- **React.js** (Functional Components + Hooks)  
- **React Router** (Navigation)  
- **Axios** (API calls)  
- **Only CSS** (Styling)  
- **Context API** (State Management)  

#### **Backend (Node.js + Express)**  
- **Node.js** (Runtime)  
- **Express.js** (Server Framework)  
- **MongoDB** (Database)  
- **Mongoose** (ODM for MongoDB)   
- **Multer** (Image Uploads)  

#### **DevOps & Tools**  
- **Postman** (API Testing)  
- **Git & GitHub** (Version Control)  
- **Render** (Deployment)  

---



### **🔧 Setup & Installation**  

#### **1. Clone the Repository**  
```sh
git clone https://github.com/liton-cse/Blog-Side.git
cd Blog-Side
```

#### **2. Backend Packages:**
```sh
cd server
npm install
```

#### **3. Frontend Packages**
```sh
cd client
npm install
```

#### **4. Configure Environment**

```sh
Create .env file in /server with:
PORT = 3000
MONGO_URI = mongodb+srv://blog:blog856@cluster0.dfq3ijs.mongodb.net/
```



#### **5. Start server**
```sh
npm start
```

#### **6. Start client**
```sh
npm run dev
```


