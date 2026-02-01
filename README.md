This repository contains two independent solutions developed as part of the Iron Lady – AI & Technology Internship Assignment.

The objective of this assignment is to demonstrate:

Strong understanding of business problems

Practical and responsible use of AI

Ability to design real-world, usable applications

Clean engineering, clear workflows, and system thinking

🔹 Task 1: AI-based Customer Interaction Solution
Iron Lady AI Program Discovery & Counselling Assistant
📌 Problem Statement

Users visiting Iron Lady often face challenges such as:

Difficulty identifying the right program based on their background

Lack of clarity on the learning journey and counselling process

Uncertainty about next steps before enrollment

These gaps can reduce user engagement and delay decision-making.

💡 Solution Overview

An AI-powered interactive assistant designed to support users during the early discovery phase.

The assistant:

Collects basic user background and career goals

Analyses user intent using AI-assisted logic

Recommends suitable Iron Lady programs

Clearly explains the Iron Lady learning and counselling journey

Guides users toward the next step, such as booking career counselling

To ensure reliability and a smooth user experience, the solution includes intelligent rule-based fallback logic when external AI services are unavailable.

✨ Key Features

Personalized program recommendations

Clear explanation of Iron Lady’s learning and counselling process

Interactive and user-friendly interface

AI-assisted intent analysis with safe fallback handling

Improved customer clarity, engagement, and confidence

🛠️ Tech Stack

Backend: Spring Boot (REST API)

Frontend: React + Material UI

AI: AI-assisted intent analysis (with deterministic fallback logic)

▶️ How to Run – Task 1
Backend
cd task-1-ai-customer-interaction/backend
mvn spring-boot:run


Backend runs on:

http://localhost:8080

Frontend
cd task-1-ai-customer-interaction/frontend
npm install
npm start


Frontend runs on:

http://localhost:3000

🔹 Task 2: Internal Business Automation Solution
Iron Lady Lead Management System
📌 Problem Statement

Iron Lady’s internal team manages multiple learner enquiries every day.
Manual tracking methods can lead to:

Missed or delayed follow-ups

Lack of visibility into lead status

Increased manual workload

💡 Solution Overview

A Lead Management System designed to automate internal operations and improve efficiency.

The system provides:

Centralized lead tracking

Clear visibility into the counselling lifecycle

Reduced dependency on manual tracking tools

A structured CRUD workflow aligned with real business needs

✨ Key Features (CRUD)

Create new learner leads

View all leads in a centralized table

Edit lead details and update lead status

Delete irrelevant or closed leads

Lead status tracking:

NEW

CONTACTED

COUNSELLING_DONE

ENROLLED

DROPPED

🛠️ Tech Stack

Backend: Spring Boot + Spring Data JPA

Database: H2 (In-memory database)

Frontend: React + Material UI

▶️ How to Run – Task 2
Backend
cd task-2-lead-management-system/backend
mvn spring-boot:run


Backend runs on:

http://localhost:8081

Frontend
cd task-2-lead-management-system/frontend
npm install
npm start


Frontend runs on:

http://localhost:3000

🎥 Demo Videos

Separate demo videos have been recorded for each task:

Task 1: AI-based Customer Interaction Solution

https://github.com/user-attachments/assets/27c0a18b-3375-453b-bb22-4e62092f82c2

Task 2: Internal Lead Management System

https://github.com/user-attachments/assets/06789c8e-3ef1-4a64-bcf1-795f75d8133c

Each demo video demonstrates:

The identified problem

The solution workflow

Business relevance

Practical use of AI and automation

✅ Conclusion

These solutions are designed to:

Closely align with Iron Lady’s business model

Demonstrate responsible and practical AI usage

Showcase real-world engineering judgment

Deliver stable, demo-ready applications suitable for production-like scenarios
