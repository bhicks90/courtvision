# CourtVision 🏀

A modern basketball analytics web application that aggregates data from multiple APIs and presents it through an interactive, data-driven dashboard.

This project is a demonstration of full-stack development capabilities, showcasing scalable architecture, API integration, and modern frontend and backend practices. While basketball serves as the domain, the patterns and design decisions used in this application are transferable to a wide range of data-centric applications.

---

## Features

- Landing page with NBA/basketball news *(coming soon)*
- Player profile pages with stats, images, and career information  
- Team pages with advanced statistics dashboards  
- Search functionality for players and teams  

### API Integrations

- **BallDontLie API** – player, team, and statistical data  
- **SportsData.io** – player images, betting odds, and game schedules *(free tier)*  
- **ESPN (unofficial)** – team logos and rankings  

---

## Tech Stack

### Frontend
- React  
- Next.js (SSR + routing)  
- Redux Toolkit  
- Tailwind CSS  
- Chart.js  

> **Note:** The current frontend uses a Redux-driven SPA pattern within Next.js and does not yet fully leverage SSR or server components. See [Architecture Notes](#architecture-notes) for details.

### Backend
- Node.js  
- Express  
- TypeScript  

### API Layer
- Axios for external API communication  

### DevOps
- Docker  
- Docker Compose  

### Testing
- Jest (unit and integration testing)  

---

## Architecture Notes

This project currently uses Next.js alongside a Redux-based client architecture that behaves similarly to a traditional React SPA. While this approach is functional and familiar, it does not fully leverage Next.js features such as server-side rendering (SSR), static generation, or server components.

This reflects an evolving design rather than an oversight. The original goal for CourtVision was to build **two parallel frontend implementations**:

- A **Next.js application** that emphasizes SSR and performance-oriented patterns  
- A **React + Redux SPA** that demonstrates client-side state management at scale  

Both clients were intended to consume the same backend, allowing for a direct comparison of architectural tradeoffs, performance characteristics, and developer experience.

Current development has been focused on backend integration and core feature delivery, so the frontend presently leans toward the Redux-driven SPA model within a Next.js environment.

A future iteration will refactor the Next.js client to more fully utilize its native capabilities (e.g., SSR, server components, and reduced client-side state where appropriate), along with completing the original goal of maintaining two distinct frontend approaches.

---

## Folder Structure

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

## Getting Started

### Prerequisites
- Node.js >= 18  
- Docker & Docker Compose  

### Install & Run Locally

```bash
git clone https://github.com/bhicks90/courtvision.git
cd courtvision

# Install client and server dependencies
cd client && npm install
cd ../server && npm install

# Run in development mode
docker-compose up
```

## Running Tests

### Backend

```bash
cd server
npm run test
```

### Frontend

```bash
cd client
npm run test
```

---

## API & Caching Strategy

- The BallDontLie API is cached locally using a file-based caching system to reduce redundant requests and mitigate rate limiting.  
- API responses are normalized to ensure consistent data structures across the frontend.  
- Additional APIs (SportsData.io, ESPN) are integrated to enrich data with images, odds, and team metadata.  

---

## Contributing

Contributions are welcome, particularly those that improve architecture, performance, or developer experience.

## Notes

This project is intended as a demonstration of full-stack development practices. It highlights:

- Scalable full-stack architecture  
- TypeScript across both client and server  
- State management with Redux Toolkit  
- API integration and caching strategies  

Data may not always reflect real-time updates.

## Screenshots

Screenshots will be added as features are completed.

---

## License

MIT License