Markdown

# MedicalChatbot

A comprehensive chatbot application designed for medical consultations and information dissemination. This project utilizes a modern architecture with a FastAPI backend (Python) for REST API and WebSocket communication, a React frontend, and MongoDB Atlas for data persistence.  It offers a user-friendly interface for interacting with medical information and AI-driven assistance.

## Note :
**In the second stage, AI integration will involve fine-tuning an open-source LLM, such as DeepSeek R1, using a medical dataset. This process will incorporate real-time reinforcement learning, allowing the model to continuously update with new scientific articles and research findings.**

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Manual Installation](#manual-installation)
    - [Backend Installation](#backend-installation)
    - [Frontend Installation](#frontend-installation)
  - [Docker Installation](#docker-installation)
- [Usage](#usage)
  - [Manual Usage](#manual-usage)
    - [Backend Usage](#backend-usage)
    - [Frontend Usage](#frontend-usage)
  - [Docker Usage](#docker-usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The MedicalChatbot project aims to provide an accessible and informative platform for users seeking medical advice or information. It leverages a combination of natural language processing (NLP) and potentially machine learning models to understand user queries and provide relevant responses ( in the second stage of the project ).  This README provides a guide to setting up and running the project, along with details about its architecture and components.  It utilizes WebSockets for real-time communication and REST APIs for other data exchange.

## Features

- **Interactive Chat Interface:** Engage in real-time conversations with the chatbot through WebSockets.
- **AI-Powered Assistance:** Utilize AI for preliminary assessments and guidance (Note: to be implemented).
- **User Authentication (Potentially):** Secure user accounts for personalized interactions.
- **Data Privacy (Considerations):**

## Technologies Used

- **Backend (Python - FastAPI):**
  - Python 3.9
  - FastAPI
  - Uvicorn (ASGI server)
  - Motor (MongoDB driver)
  - WebSockets (through FastAPI)
  - Other libraries: 
- **Frontend (React):**
  - React 
  - Node.js and npm 
  - Socket.IO Client 
  - UI Library: Bootstarp 5
- **Database:** MongoDB Atlas
- **Docker:** For containerization and simplified deployment.

## Installation

### Manual Installation

#### Backend Installation

1. **Clone the repository:**
   ```
   git clone [https://github.com/ahmedhamzaa/MedicalChatbot.git]
   cd MedicalChatbot/Backend
   ```
2. **Create a virtual environment (recommended):**


```
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate    # Windows

```
3. **Install dependencies:**


```
pip install -r requirements.txt
Set up environment variables:
```
4. **Create a .env file in the Backend directory.**
Add necessary environment variables:

MONGODB_URI: Your MongoDB Atlas connection string.

[Other environment variables as needed]

## Frontend Installation
1. **Navigate to the frontend directory:**

```

cd MedicalChatbot/Frontend/medical-chatbot
```
2. **Install dependencies:**


```
npm install

```
3. **Set up environment variables:**

Create a .env file in the medical-chatbot directory.

4. **Add necessary environment variables:**

REACT_APP_BACKEND_URL: URL of your backend

[Other environment variables as needed]

## Docker Installation
Build the Docker images:

```

cd MedicalChatbot
docker-compose build
```
Set up environment variables:

Create a .env file in the root of the project.
Add necessary environment variables:
MONGODB_URI: Your MongoDB Atlas connection string.
REACT_APP_BACKEND_URL: http://backend:8000 .
[Other environment variables as needed]
Usage
Manual Usage
Backend Usage
Activate the virtual environment (if not already activated):

```

source venv/bin/activate  # Linux/macOS
venv\Scripts\activate    # Windows

```
Run the backend server:

```

uvicorn main:app --reload  # For development with hot reloading

```
## Frontend Usage
Start the development server:

```
cd MedicalChatbot/Frontend/medical-chatbot
npm start
```
## Docker Usage
Start the Docker containers:

```

cd MedicalChatbot
docker-compose up -d  # -d for detached mode (runs in the background)
```
Access the application: Open your web browser and go to the specified URL (usually http://localhost:3000 for React development servers).


### Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

### License
This project is licensed under the 1  Apache 2.0 License. 
