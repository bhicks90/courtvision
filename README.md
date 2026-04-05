CourtVision 🏀

A modern basketball analytics web app that aggregates data from multiple APIs and presents it in an interactive dashboard.

This project is a demo application to showcase full-stack development skills for Upwork/portfolio purposes. Basketball was chosen as the focus because it’s a sport I love, but the architecture and patterns are applicable to any data-driven web app.

Features
Landing page with NBA/basketball news (coming soon)
Player profile pages with stats, images, and career info
Team pages with advanced statistics dashboards
Search functionality for players and teams
Integration with multiple APIs:
BallDontLie API
 – player, team, and stats data
SportsData.io – player images, betting odds, game schedules (free tier)
ESPN (unofficial) – logos and rankings
Tech Stack

Frontend: React, Next.js (SSR + routing), Redux Toolkit, Tailwind CSS, Chart.js
Backend: Node.js, Express, TypeScript
API Layer: Axios for external API requests
DevOps: Docker, Docker Compose
Testing: Jest for unit and integration tests

Folder Structure
```
courtvision
│
├── client (Next.js + React)
│   ├── components
│   ├── pages
│   ├── store (Redux)
│   ├── services
│   └── hooks
│
├── server (Node + Express)
│   ├── routes
│   ├── controllers
│   ├── services
│   └── apiClients
│
└── README.md
```
Getting Started
Prerequisites
Node.js >= 18
Docker & Docker Compose
Install & Run Locally
git clone https://github.com/bhicks90/courtvision.git
cd courtvision

# Install client and server dependencies
cd client && npm install
cd ../server && npm install

# Run in development mode
docker-compose up
Run Tests
# Backend tests
cd server
npm run test

# Frontend tests
cd client
npm run test
API & Caching Strategy
BallDontLie API is cached locally via file-based cache to reduce redundant calls and avoid rate limits.
API responses are normalized for consistent frontend consumption.
Additional APIs (SportsData.io, ESPN) are planned for images, odds, and team data.
Contributing

This is a demo portfolio project — contributions are welcome but mainly for learning purposes.

Notes
This app is for demo purposes only. Data may not always be fully up-to-date.
Focus is on demonstrating full-stack development, TypeScript, Redux patterns, and API integration.
Screenshots

Add screenshots here once pages are built

License

MIT License