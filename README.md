[![Deploy Social Frontend](https://github.com/magnuspaal/social-frontend/actions/workflows/deploy.yml/badge.svg)](https://github.com/magnuspaal/social-frontend/actions/workflows/deploy.yml)

#### Running locally

Add environment in .env

```
VITE_AUTH_API_URL=http://localhost:8080/api/v1/auth
VITE_API_URL=http://localhost:8081/api/v1
VITE_FILE_API_URL=http://localhost:8082
VITE_FILE_API_V=/api/v1
VITE_FILE_API_MEDIA=media
VITE_MESSAGING_API_URL=http://localhost:8083/api/v1
VITE_WEBSOCKET_URL=http://localhost:8083/api/v1/messaging

VITE_JWT_SECRET=ouvezmcEqYLpP6yJc4oGHaNxppJjXiITfc1dl8ZW9ZI1uqLsjjqj56CjGCPP96Qf

VITE_WEBSOCKET_DOMAIN=
```

`npm run dev`

#### Release
  * npm version [major,minor,patch]
  * Push commit and tag and application will be deployed by Github Actions