Movie Seat Booking App
A simple movie seat booking application built with React + Vite.
Users can select a movie, choose seats, and complete a booking.
An admin panel allows adding, editing, and deleting movies.

This project uses JSON‑Server as a lightweight backend when running locally.

Features
Choose a movie and see its price

Visual seat grid with occupied seats

Book seats with name + phone number

Admin panel to manage movies (CRUD)

JSON‑Server backend for storing:

Movies

Bookings

Tech Stack
React (with Vite)

JSON‑Server (local backend)

CSS for styling

Running the Project Locally
1. Install dependencies
Code
npm install
2. Start JSON‑Server
This project uses db.json as a fake backend.
Run this in a separate terminal:

Code
npx json-server db.json
Your API will be available at:

Code
http://localhost:3000/movies
http://localhost:3000/bookings
3. Start the React app
Code
npm run dev
Vite will start the site at:

Code
http://localhost:3000
The app will now communicate with JSON‑Server on port 3001.

GitHub Pages Deployment
The project can be viewed on GitHub Pages, but GitHub Pages cannot run JSON‑Server.
This means:

The UI will load

But movies and bookings will not work

Admin panel cannot save changes

Seat selection cannot load occupied seats

GitHub Pages is static hosting only, so backend features require running the project locally.

If you want full functionality, download the project and run:

Code
npm install
npx json-server db.json
npm run dev

