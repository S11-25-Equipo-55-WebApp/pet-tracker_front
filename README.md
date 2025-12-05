# PetTrackerFront

### Descriptión
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.10. An interesting project designed to develop a professional simulation where participants located in different Latin American countries can work collaboratively. The goal is to develop a functional minimum viable product (MVP) of a digital platform for managing pet information for end users.

## 🎞🎥🎞 Project Demo

- Insert Vídeo:

Click the image above to watch the project demostration.

## Technologies Used

- **Frontend**: Angular / Angular~MAterial / SCSS / TypeScript / Google~Icons.

## Project Structure ~ Feature Module Angular@20.

src/
 ├── app/
 │    ├── auth/
 │    │     ├── login/
 │    │     │     ├── login.page.ts
 │    │     │     ├── login.page.html
 │    │     │     └── login.page.css
 │    │     ├── register/
 │    │     │     ├── register.page.ts
 │    │     │     ├── register.page.html
 │    │     │     └── register.page.css
 │    │     ├── auth.service.ts
 │    │     └── auth.routes.ts
 │    │
 │    ├── pets/
 │    │     ├── pets-list/
 │    │     │     ├── pets-list.page.ts
 │    │     │     ├── pets-list.page.html
 │    │     │     └── pets-list.page.css
 │    │     ├── pet-detail/
 │    │     │     ├── pet-detail.page.ts
 │    │     │     ├── pet-detail.page.html
 │    │     │     └── pet-detail.page.css
 │    │     ├── pet-form/
 │    │     │     ├── pet-form.component.ts
 │    │     │     ├── pet-form.component.html
 │    │     │     └── pet-form.component.css
 │    │     ├── pets.service.ts
 │    │     └── pets.routes.ts
 │    │
 │    ├── health/
 │    │     ├── vaccines/
 │    │     │     ├── vaccines.page.ts
 │    │     │     ├── vaccines.page.html
 │    │     │     └── vaccines.page.css
 │    │     ├── deworming/
 │    │     │     ├── deworming.page.ts
 │    │     │     ├── deworming.page.html
 │    │     │     └── deworming.page.css
 │    │     ├── vet-visits/
 │    │     │     ├── vet-visits.page.ts
 │    │     │     ├── vet-visits.page.html
 │    │     │     └── vet-visits.page.css
 │    │     ├── health.service.ts
 │    │     └── health.routes.ts
 │    │
 │    ├── nutrition/
 │    │     ├── meal-log/
 │    │     │     ├── meal-log.page.ts
 │    │     │     ├── meal-log.page.html
 │    │     │     └── meal-log.page.css
 │    │     ├── reminders/
 │    │     │     ├── feeding-reminders.page.ts
 │    │     │     ├── feeding-reminders.page.html
 │    │     │     └── feeding-reminders.page.css
 │    │     ├── nutrition.service.ts
 │    │     └── nutrition.routes.ts
 │    │
 │    ├── reminders/
 │    │     ├── list/
 │    │     │     ├── reminders-list.page.ts
 │    │     │     ├── reminders-list.page.html
 │    │     │     └── reminders-list.page.css
 │    │     ├── calendar/
 │    │     │     ├── reminders-calendar.page.ts
 │    │     │     ├── reminders-calendar.page.html
 │    │     │     └── reminders-calendar.page.css
 │    │     ├── reminders.service.ts
 │    │     └── reminders.routes.ts
 │    │
 │    ├── dashboard/
 │    │     ├── dashboard.page.ts
 │    │     ├── dashboard.page.html
 │    │     └── dashboard.page.css
 │    │
 │    ├── shared/
 │    │     ├── components/
 │    │     │     ├── navbar/
 │    │     │     │     ├── navbar.component.ts
 │    │     │     │     ├── navbar.component.html
 │    │     │     │     └── navbar.component.css
 │    │     │     ├── footer/
 │    │     │     │     ├── footer.component.ts
 │    │     │     │     ├── footer.component.html
 │    │     │     │     └── footer.component.css
 │    │     │     └── card/
 │    │     │           ├── card.component.ts
 │    │     │           ├── card.component.html
 │    │     │           └── card.component.css
 │    │     ├── pipes/
 │    │     ├── directives/
 │    │     └── utils/
 │    │
 │    ├── app.routes.ts
 │    └── app.component.ts
 │
 ├── assets/
 │    ├── icons/
 │    ├── img/
 │    └── styles/
 │
 ├── environments/
 │    ├── environment.ts
 │    └── environment.prod.ts
 │
 └── main.ts

## ⚙️Functional Requirements

1. User Management

Register and log in with email and password.
Password recovery option.

2. Pet Profile

Create, edit, and delete pet profiles.
Fields: name, species, breed, age, weight, photo.

3. Health Record

Upload vaccination, deworming, and veterinary visit information.
Attach documents or images (optional).

4. Nutritional Tracking

Record meals or diets.
Feeding schedule reminders.

5. Automatic Reminders

Email alerts or in-app notifications.
Calendar of upcoming events.

6. Dashboard

Overview with summary of health status, upcoming vaccines and active alerts.

## 🧾🖋 User Registration and Authentication.

- To fully utilize the application, registration is required.
- Users can register by providing the following information: First Name, Last Name, Email Address, and Password.
- It features an Authentication module that uses JWT to validate the user from the backend by generating a token.
- An interactive and visually appealing dashboard that will excite users.
- And a series of sections with spectacular functionalities.

## Technical Requirements:

- Node.js v20+ / .Net SDk v8.0+
- Angular CLI / Angular Core v20+
- PostgreSQL 
- Access to the Server API: (se requiere una cuenta en https://*******)

## To start a local development server, run:

#### Clone this repository:
- **Frontend**: https://github.com/S11-25-Equipo-55-WebApp/pet-tracker_front
- Install dependencies on the frontend:
```bash
$ cd.. frontend
$ npm install
```
- Create the src/environments/environment.ts directory for development environment variables.
```bash
$ ng g environments
```
```
 export const environment = {
  baseUrl: 'http://pettrakerapi.runasp.net'
  //baseUrl: 'http://localhost:4200'
};
```
- Run the Angular development server:
>-- ng serve ó npm start ó ng s

### This is a small demonstration of the app.
<p align="center">
    <img width="680" src="/imges/demo.png">
</p>

## Licencia
Este proyecto está bajo la  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/).  Ver el archivo LICENSE para más detalles.

