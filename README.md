# Agriculture Yield Prediction and Crop Recommendation System

## Project Overview

This project is a Data, AI, and Cloud-based system designed to predict crop yield and recommend suitable crops based on agricultural conditions.

The system uses machine learning techniques along with a data processing pipeline to analyze agricultural data and generate meaningful predictions.

Users can either manually enter agricultural details or upload CSV files for analysis. The system processes the data, applies machine learning models, stores results in the cloud database, and displays predictions through a dashboard.

## Problem Statement

Farmers often lack data-driven insights regarding:

* Expected crop production
* Suitable crops for specific environmental conditions
* Efficient utilization of agricultural resources

This can lead to reduced productivity and poor crop planning decisions.

## Proposed Solution

The system provides a complete Data, AI, and Cloud solution by:

* Collecting agricultural data through manual input or CSV upload
* Cleaning and processing agricultural data
* Applying machine learning models for crop recommendation and yield prediction
* Storing prediction results in Azure SQL Database
* Displaying insights through dashboards and visualizations

## Project Architecture

Frontend (React) → Backend API (Flask) → Machine Learning Models → Azure SQL Database

Users provide agricultural data through manual input forms or CSV uploads. The backend processes the data, interacts with machine learning models, stores prediction history in Azure SQL Database, and returns results to the frontend dashboard.

## Key Features

* Manual agricultural data input
* CSV dataset upload
* Data cleaning and preprocessing
* Crop recommendation
* Crop yield prediction
* Prediction history storage
* Dashboard-based visualization

## User Inputs

### Manual Input

* Soil Type
* Temperature
* Rainfall
* Land Area
* Crop Information

### CSV File Upload

* Agricultural datasets in CSV format for batch analysis and prediction

## System Outputs

* Predicted Crop Yield
* Recommended Crop
* Data Insights Dashboard
* Stored Prediction History

## Technologies Used

### Frontend

* React
* HTML
* CSS
* JavaScript

### Backend

* Python
* Flask

### Machine Learning

* Pandas
* NumPy
* Scikit-Learn

### Database (Cloud)

* Azure SQL Database

### Version Control

* GitHub

## Data Pipeline Flow

Raw Data → Data Validation → Data Cleaning → Feature Engineering → Machine Learning Models → Prediction → Azure SQL Storage → Dashboard Visualization

## Expected Benefits

* Supports data-driven farming decisions
* Improves crop planning and management
* Helps estimate agricultural production
* Demonstrates practical integration of Data, AI, and Cloud technologies
* Demonstrates practical implementation of Data Engineering, Artificial Intelligence, and Cloud Computing concepts

## Future Enhancements

* Weather Impact Analysis
* Real-Time Weather API Integration
* Fertilizer Recommendation System
* Mobile Application Support
* Advanced Agricultural Analytics Dashboard
