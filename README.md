# 🏪 React Native Store App (Expo Challenge)

## 📱 Overview

A minimal **3-screen React Native app** built with **Expo** and **TypeScript**, demonstrating authentication, offline caching, and biometric unlocking using the [DummyJSON API](https://dummyjson.com/docs).

### ✨ Features
- Login via **DummyJSON** API  
- **Auto-lock after 10 seconds** of inactivity or when the app goes to the background  
- **Unlock using biometrics** (with password fallback)  
- View all products and one specific category list  
- **Offline persistence** via **React Query + MMKV**  
- **Superadmin** user can simulate product deletion  

---

## 📂 Screens

1. **Login Screen**
   - Authenticates using `POST /auth/login`
   - Saves access token in MMKV
   - On relaunch, validates session using `GET /auth/me`
   - If token is valid → shows **Biometric Unlock Modal**

2. **All Products Screen**
   - Displays all products from `/products`
   - Pull-to-refresh supported
   - If logged in as **emilys**, enables delete button (`DELETE /products/{id}`)
   - Includes a **Sign Out** button in the bottom tab bar

3. **Category Screen**
   - Displays products from a chosen category (`/products/category/{category}`)
   - Pull-to-refresh supported
   - Same layout as All Products screen

---

## ⚙️ Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Expo** | Simplified RN development & testing |
| **React Native (TypeScript)** | Core app framework |
| **React Navigation** | Screen navigation |
| **React Query** | API state management & caching |
| **MMKV** | High-performance storage (offline support) |
| **Redux Toolkit** | Global state management |
| **expo-local-authentication** | Biometrics (FaceID / TouchID) |
| **@react-native-community/netinfo** | Offline detection |

---

## 🧠 App Configuration

- **Chosen Category:** `smartphones`  
- **Superadmin Username:** `emilys`  
- **Auto-lock Timeout:** 10 seconds  

---

## 🚀 Setup & Run

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/react-native-store-challenge.git](https://github.com/Ebrahimgad123/storeTask.git)
cd react-native-store-challenge
