
# CampaignHub Frontend

This project is the frontend application for **CampaignHub**, built using **Next.js**. It provides a smooth and responsive UI for data visualization, filtering, and more.

**GitHub Repository**: [CampaignHub Frontend](https://github.com/anujbhatt-dev/campaignhub_frontend.git)

## Features

- File upload functionality
- Data rendering in tables with filters
- Data visualization using D3.js
- Responsive design for mobile and desktop
- Animated sidebar with framer-motion

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version >= 14.x)
- npm (version >= 7.x)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/anujbhatt-dev/campaignhub_frontend.git
   cd campaignhub_frontend
   ```

2. Install the dependencies using npm:
   ```
   npm install --legacy-peer-deps
   ```
   The `--legacy-peer-deps` flag ensures compatibility with certain peer dependencies that might not match the current version.

3. Rename `.env.example` to `.env`:
   ```
   mv .env.example .env
   ```
   This file contains the necessary environment variables for your application.

## Running the Development Server

After installing the dependencies, you can run the development server:
```
npm run dev
```
This will start the development server at `http://localhost:3000`.

