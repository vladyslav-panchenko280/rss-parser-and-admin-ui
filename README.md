# Parser RSS feed + Admin UI

## Main features

- Authorization, Log in
- RSS Parser
- Pagination
- Filtration
- Sorting
- CRUD

Used technologies:

### Back-end
- Node.js
- Express.js
- MongoDB, mongoose
- JWT auth
- TypeScript
- REST API

### Front-end
- React
- TypeScript
- Redux-toolkit
- Next.js
- PrimeReact
`

## Run application

1. Open a new bash shell
2. Execute `./makefile.sh` and press 1 to install
3. Execute `./makefile.sh` and press 2 to build
4. Execute `./makefile.sh` and press 3 to run locally or press 4 to start
5. Execute `./makefile.sh` and press 5 to update parsed feed

## Alternative way
1. Open a new bash shell
2. Execute `npm install && cd ./client && npm install`
3. Execute `npm run build && cd ./client && npm build`
4. Execute `npm run start && cd ./client && npm run dev` or `npm run start && cd ./client && npm run start`
5. Make API request using curl or any other suitable tool `curl -X GET http://localhost:3010/api/rssParse`
