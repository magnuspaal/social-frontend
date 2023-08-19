#### Running locally

Add environment in .env

`npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```
NEXT_PUBLIC_AUTH_API_URL=http://192.168.10.225:8080/api/v1/auth
NEXT_PUBLIC_API_URL=http://192.168.10.225:8081/api/v1
NEXT_PUBLIC_FILE_API_URL=http://192.168.10.225:8082/media

FILE_API_PROTOCOL=http
FILE_API_HOSTNAME=192.168.10.225
FILE_API_PORT=8082
FILE_API_PATHNAME=/media/**
```

## Release

#### Release
* Bump version
  * Change version in **package.json**
  * Create commit with message `docs: bump to <version>`
  * Create git tag with version
* Build Docker image `docker build -t <registry/social-frontend:version> --build-arg="APP_VERSION=<version>" .`
* Push Docker image `docker push <registry/social-frontend:version>`