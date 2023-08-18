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
NEXT_PUBLIC_API_URL=http://192.168.10.225:8081/api/v1
NEXT_PUBLIC_FILE_API_URL=http://192.168.10.225:8082/media

FILE_API_PROTOCOL=http
FILE_API_HOSTNAME=192.168.10.225
FILE_API_PORT=8082
FILE_API_PATHNAME=/media/**
```