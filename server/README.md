# Minio is used for S3 storage.

## Development Minio

```
docker run -d -p 8000:9000 \
  -e "MINIO_ACCESS_KEY=minio" \
  -e "MINIO_SECRET_KEY=secretkey" \
  minio/minio server /data
```

# Postgresql is the Database Engine
## Development Database
```
 docker run -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```


# Testing
> Jest is used as the testing library.

## Naming Scheme
Opted to use the scheme: 
`Expected Behavior -- When Test Case`
