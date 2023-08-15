This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running locally

Add environment in .env

```
NEXT_PUBLIC_AUTH_API_URL=http://192.168.10.225:8080/api/v1/auth
NEXT_PUBLIC_AUTH_API_KEY=test

API_URL=http://192.168.10.225:8081/api/v1
NEXT_PUBLIC_API_URL=http://192.168.10.225:8081/api/v1

NEXT_PUBLIC_IMAGE_API_URL=http://192.168.10.225:8082/media

JWT_SECRET=ouvezmcEqYLpP6yJc4oGHaNxppJjXiITfc1dl8ZW9ZI1uqLsjjqj56CjGCPP96Qf
```