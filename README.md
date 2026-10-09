# Hotspot Kernel Landing Environment

Minimal, production-oriented full-stack project kernel for the proposed Android-first Internet Coupon Hotspot application.

## Purpose

This project provides a clean, stable technical landing environment awaiting the upload of the authoritative `.ai` instruction pack.

Application features (coupon generation, customer management, payment gateways, hotspot hardware controls) are intentionally not implemented in this kernel.

## Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite SPA. Mobile-first responsive layout prepared for future hybrid packaging.
- **Backend**: Express on Node.js 22, exposing `/api/health` for uptime and diagnostic reporting.
- **Dev Integration**: Unified `server.ts` mounting Vite middleware in development mode on port 3000.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Starts the unified Express server with Vite middleware at `http://0.0.0.0:3000`.

### 3. Run TypeScript Checks
```bash
npm run lint
```
Executes `tsc --noEmit` across all client and server TypeScript files.

### 4. Build Frontend for Production
```bash
npm run build
```
Creates production bundle in the `dist` directory.

### 5. Run Production Server
```bash
npm start
```
Starts Express server serving production static assets from `dist` and API endpoints.

## Health Verification Endpoint

- **Endpoint**: `GET /api/health`
- **Sample Response**:
  ```json
  {
    "status": "ok",
    "service": "hotspot-kernel-backend",
    "timestamp": "2026-10-09T15:17:00.000Z",
    "uptimeSeconds": 42,
    "nodeVersion": "v22.23.2",
    "environment": "development"
  }
  ```

## Next Phase

Awaiting direct upload of the `.ai` ZIP archive to project root to initiate autonomous implementation.
