# NodeJS test for Busuu

Tried to use DDD architecture here, also used some Onion architecture, Repository Pattern, Dependency Injection, Middlewares, Validation

Didn't finish with auth, would like to add it in future using JWT.
Also, would like to add seeds for DB.

Used: 
- Typescript
- Express.js
- ajv - lib for JSON Schema validations
- mongoose - for working with mongoDB
- jest - for unit tests 

###  Setup
 - ```cp .env.example .env``` .env for port and mongoDB
 - ```docker-compose up -d``` runs mongoDB in docker
 - ```yarn install``` 

### Run DEV
- ```yarn run dev```

### Test 
- ```yarn run test```