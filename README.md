[![Deploy Social Frontend](https://github.com/magnuspaal/social-frontend/actions/workflows/deploy.yml/badge.svg)](https://github.com/magnuspaal/social-frontend/actions/workflows/deploy.yml)

#### Running locally

Add environment in .env

```
NEXT_PUBLIC_AUTH_API_URL=http://localhost:8080/api/v1/auth
NEXT_PUBLIC_API_URL=http://localhost:8081/api/v1
NEXT_PUBLIC_FILE_API_URL=http://localhost:8082/media

FILE_API_PROTOCOL=http
FILE_API_HOSTNAME=localhost
FILE_API_PORT=8082
FILE_API_PATHNAME=/media/**
```

`npm run dev`

#### Release
  * npm version [major,minor,patch]
  * Push commit and tag and application will be deployed by Github Actions