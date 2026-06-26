# 🌾 KrishiAI – Crop Recommendation System

## Project Overview

KrishiAI is a Machine Learning-based web application that recommends the most suitable crop based on soil type and real-time weather conditions.

The system uses a Random Forest Machine Learning model trained on agricultural data. It automatically fetches weather information using the Open-Meteo API and stores user prediction history in a MySQL database.

---

## Problem Statement

Selecting the right crop is an important decision for farmers. Crop selection depends on several environmental factors such as:

* Soil Type
* Temperature
* Humidity
* Rainfall

Without proper analysis, farmers may choose crops that are not suitable for their land or weather conditions, reducing productivity.

---

## Proposed Solution

KrishiAI helps farmers by:

* Accepting agricultural inputs from users.
* Automatically retrieving real-time weather information.
* Applying a Machine Learning model to recommend a suitable crop.
* Storing prediction history in a MySQL database.

---

## Project Architecture

Frontend (HTML, CSS, JavaScript)

↓

Flask Backend API

↓

Random Forest Machine Learning Model

↓

MySQL Database

↓

Prediction History

---

## Features

* User Registration and Login
* Real-Time Weather Integration (Open-Meteo API)
* Crop Recommendation using Machine Learning
* Prediction History
* Responsive User Interface

---

## User Inputs

The user provides:

* Soil Type
* Previous Crop
* Season
* Land Area

The system automatically retrieves:

* Temperature
* Humidity
* Rainfall
* User Location

---

## System Output

The system recommends:

* Best Suitable Crop

---

## Machine Learning

### Dataset Features

The model is trained using:

* Nitrogen (N)
* Phosphorus (P)
* Potassium (K)
* Temperature
* Humidity
* pH
* Rainfall

### Algorithm

* Random Forest Classifier

Model Accuracy:

**99.32%**

---

## Technologies Used

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Python
* Flask

### Machine Learning

* Pandas
* NumPy
* Scikit-learn
* Pickle

### Database

* MySQL

### APIs

* Open-Meteo Weather API

### Version Control

* Git
* GitHub

---

## Workflow

User Input

↓

Weather API

↓

Soil Mapping (N, P, K, pH)

↓

Random Forest Model

↓

Crop Recommendation

↓

MySQL Database

↓

Prediction History

---

## Current Limitation

The public dataset used for training contains only:

* N
* P
* K
* Temperature
* Humidity
* pH
* Rainfall

It does **not** contain Soil Type, Previous Crop, or Season.

Therefore:

* Soil Type is mapped to approximate N, P, K, and pH values.
* Previous Crop and Season are currently stored in the database for future enhancement but are not used by the Machine Learning model.

---

## Future Enhancements

* Fertilizer Recommendation
* Crop Yield Prediction
* Disease Detection
* Better agricultural datasets containing crop rotation and seasonal information
* Mobile Application

---

## Expected Benefits

* Helps farmers choose suitable crops based on environmental conditions.
* Demonstrates practical implementation of Machine Learning with Flask.
* Integrates Machine Learning, REST APIs, MySQL, and Web Development into a complete application.
