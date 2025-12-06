# PetTrackerFront

### Descriptión
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.10. An interesting project designed to develop a professional simulation where participants located in different Latin American countries can work collaboratively. The goal is to develop a functional minimum viable product (MVP) of a digital platform for managing pet information for end users.

## 🎞🎥🎞 Project Demo

- Insert Vídeo:

Click the image above to watch the project demostration.

## Technologies Used

- **Frontend**: Angular ~ Angular Material ~ SCSS ~ TypeScript ~ Google ~ Icons.

## Project Structure ~ Feature Module Angular@20.
```bash
src/
├── ⚙️ app/
│   │
│   ├── 🔒 auth/                  # **Dominio: Autenticación**
│   │   ├── login/                
│   │   │     ├── login.page.ts
│   │   │     └── ...
│   │   ├── register/
│   │   │     ├── register.page.ts
│   │   │     └── ...
│   │   ├── auth.service.ts
│   │   ├── auth.routes.ts        # o auth-routing.module.ts
│   │   └── auth.module.ts
│   │
│   ├── 🐶 pets/                   # **Dominio: Mascotas**
│   │   ├── pets-list/
│   │   ├── pet-detail/
│   │   ├── pet-form/             # Si es un componente reutilizable dentro del dominio
│   │   ├── pets.service.ts
│   │   ├── pets.routes.ts
│   │   └── pets.module.ts
│   │
│   ├── 🩺 health/                # **Dominio: Salud**
│   │   ├── vaccines/
│   │   ├── deworming/
│   │   ├── vet-visits/
│   │   ├── health.service.ts
│   │   └── health.routes.ts
│   │
│   ├── 🍎 nutrition/            # **Dominio: Nutrición**
│   │   ├── meal-log/
│   │   ├── reminders/           # (Recordatorios de alimentación)
│   │   ├── nutrition.service.ts
│   │   └── nutrition.routes.ts
│   │
│   ├── 🔔 reminders/           # **Dominio: Recordatorios Generales**
│   │   ├── list/
│   │   ├── calendar/
│   │   ├── reminders.service.ts
│   │   └── reminders.routes.ts
│   │
│   ├── 📊 dashboard/            # **Dominio: Vista Principal**
│   │   ├── dashboard.page.ts
│   │   └── dashboard.routes.ts
│   │
│   ├── 📦 shared/                # Módulos y componentes reutilizables
│   │   ├── 🖼️ components/        # (Navbar, Footer, Card, etc.)
│   │   │   ├── navbar/
│   │   │   │     ├── navbar.component.ts
│   │   │   │     └── ...
│   │   │   └── card/
│   │   │         ├── card.component.ts
│   │   │         └── ...
│   │   ├── 💧 pipes/            
│   │   ├── ✨ directives/       
│   │   └── shared.module.ts
│   │
│   │
│   ├── app.routes.ts            # Rutas de la aplicación principal
│   └── app.component.*          # Componente raíz
│
├── 🖼️ assets/
│   ├── icons/
│   ├── img/
│   └── styles/
│
├── ⚙️ environments/
│   ├── environment.ts
│   └── environment.prod.ts
│
└── main.ts
```

## ⚙️Functional Requirements

1. User Management

  Register and log in with email and password. Password recovery option.

2. Pet Profile

  Create, edit, and delete pet profiles. Fields: name, species, breed, age, weight, photo.

3. Health Record

  Upload vaccination, deworming, and veterinary visit information. Attach documents or images (optional).

4. Nutritional Tracking

  Record meals or diets. Feeding schedule reminders.

5. Automatic Reminders

  Email alerts or in-app notifications. Calendar of upcoming events.

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
Pending...

## Licencia
This project is under the  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/).  See the LICENSE file for more details.

