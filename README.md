# Simple nodejs user management with mongodb
simple-nodejs-user-management-with-mongodb
## How to use 

### Get User

Every 5th request will fail per instance!

```bash
curl --location --request GET 'localhost:3000/users'
```

### Create Users

```bash
curl --location --request POST 'localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "lastname": "Boullon",
    "name": "Daniel",
    "email": "dboullon@taglatam.com"
}'
```

### Health Service

Verify that there is a connection to the db

```bash
curl --location --request GET 'localhost:3000:3000/health'
```