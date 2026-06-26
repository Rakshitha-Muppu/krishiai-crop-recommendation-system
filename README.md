# 🌾 KrishiAI - Crop Recommendation System

## 📌 Project Overview

KrishiAI is a Machine Learning-based Crop Recommendation System that helps farmers identify the most suitable crop based on soil nutrients and current weather conditions.

The system combines real-time weather information with a trained Random Forest Machine Learning model to generate crop recommendations. User details and prediction history are stored in a MySQL database for future reference.

---

## 🚜 Problem Statement

Choosing the right crop is one of the biggest challenges faced by farmers. Crop selection depends on several environmental and soil-related factors such as:

- Soil fertility
- Temperature
- Humidity
- Rainfall
- Soil pH

Selecting an unsuitable crop can reduce productivity and increase financial loss.

---

## 💡 Proposed Solution

KrishiAI recommends the most suitable crop by combining:

- Soil information
- Weather conditions
- Machine Learning prediction

The system automatically fetches live weather data and predicts the best crop using a trained Random Forest model.

---

# 🏗 System Architecture

```
User
   │
   ▼
Frontend (HTML, CSS, JavaScript)
   │
   ▼
Flask REST API
   │
   ▼
Machine Learning Model (Random Forest)
   │
   ├── Predict Crop
   │
   ▼
MySQL Database
   │
   ▼
Prediction History
```

---

# ✨ Features

- 👤 User Registration & Login
- 📍 Automatic Location Detection
- 🌦 Live Weather Data Integration
- 🌱 Crop Recommendation using Machine Learning
- 🧠 Random Forest Prediction Model
- 📜 Prediction History
- 💾 MySQL Database Storage
- 🎨 Responsive User Interface

---

# 📝 User Inputs

The system collects the following inputs:

- Soil Type
- Temperature *(Auto-filled)*
- Humidity *(Auto-filled)*
- Rainfall *(Auto-filled)*
- Season
- Previous Crop
- Land Area
- Location

---

# 📤 Output

The system predicts:

- 🌾 Recommended Crop

The prediction is also stored in the database for future reference.

---

# 🤖 Machine Learning Model

Algorithm Used:

- Random Forest Classifier

Dataset Features:

- Nitrogen (N)
- Phosphorus (P)
- Potassium (K)
- Temperature
- Humidity
- Soil pH
- Rainfall

Target:

- Crop Label 

Model Accuracy:

**99.32%**

---

# 🛠 Technologies Used

## Frontend

- HTML5
- CSS3
- JavaScript

## Backend

- Python
- Flask

## Machine Learning

- Scikit-learn
- Pandas
- NumPy
- Pickle

## Database

- MySQL

## APIs

- Open-Meteo Weather API
- Open-Meteo Geocoding API

# 🔄 Workflow

1. User logs into the system.
2. User enters agricultural details.
3. Weather information is fetched automatically.
4. Backend prepares feature values.
5. Random Forest model predicts the most suitable crop.
6. Prediction is displayed to the user.
7. Prediction history is stored in MySQL.

---

# 📈 Future Enhancements

- Fertilizer Recommendation
- Crop Yield Prediction
- Disease Detection using Deep Learning
- Satellite Image Integration
- Mobile Application
- Multi-language Support


