# La Grand Pharmacie d'Alger

## Overview

A luxury digital pharmacy experience — "Le Grand Comptoir Digital" — built for La Grand Pharmacie d'Alger. Four wellness universes (Médical, Paramédical, Cosmétique, Compléments Alimentaires) harmonized in a single haut-de-gamme interface with Algerian aesthetic heritage (Zellige patterns, Moorish color palette).

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifact: `pharmacie-alger`, preview at `/`)
- **API framework**: Express 5 (artifact: `api-server`, preview at `/api`)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Animations**: Framer Motion
- **Typography**: Cormorant Garamond (serif) + Inter (sans)

## Architecture

### Frontend (`artifacts/pharmacie-alger`)
- **Route `/`** — Homepage narrative: hero + 4 pole galleries + Besoin filters + Ordonnance CTA
- **Route `/catalogue`** — Full catalogue with pole tabs + Besoin diagnostic filters
- **Route `/produit/:id`** — Hybrid product page (Médical: Expertise block; Cosmétique: Sensorial block)
- **Route `/ordonnance`** — Concierge Ordonnance 2-step upload flow
- **Route `/panier`** — Conciergerie cart with delivery/gift/retrait options
- **Route `/atelier`** — L'Atelier megamenu landing with category galleries + Conseil du Pharmacien

### API (`artifacts/api-server`)
- `GET /api/products` — list with pole/category/besoin/search filters
- `GET /api/products/:id` — product detail
- `GET /api/categories` — filtered by pole
- `GET /api/catalog/summary` — homepage counts + featured besoins + new arrivals
- `GET /api/catalog/featured` — featured products by pole
- `GET /api/catalog/besoins` — diagnostic filter besoins
- `GET /api/cart` — cart by sessionId
- `POST /api/cart` — add to cart
- `DELETE /api/cart/:itemId` — remove from cart
- `POST /api/prescriptions` — upload ordonnance

### Database Schema (`lib/db/src/schema/`)
- `products` — pole, category, besoin, price, ingredients, posologie, contreIndications, texture, origin
- `categories` — pole-based categories
- `besoins` — diagnostic filter needs with icons
- `cart_items` — session-based cart
- `prescriptions` — ordonnance submissions with reference numbers

## Color Palette
- Base: Warm parchment (background), umber (foreground), terracotta (primary), gold (accent)
- Médical: Deep emerald (`hsl(152,45%,25%)`)
- Paramédical: Steel blue (`hsl(210,35%,35%)`)
- Cosmétique: Dusty rose (`hsl(340,28%,55%)`)
- Compléments: Sage green (`hsl(95,30%,35%)`)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
