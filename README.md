# rps-results
An app that shows live results of rock-paper-scissors games and the history of each player.

## Explore
Production: https://rps-results-2022.herokuapp.com/ \
Development (2 ways): \

1. If you have Docker and docker-compose installed, just run \
``docker-compose -f docker-compose.dev.yml``\
in the root folder, it should work. Then localhosts are: \
frontend: http://localhost:3000 or http://localhost:8080 \
backend: http://localhost:3001/api/history or http://localhost:8080/api/history \
2. Run following commands in the root folder: \
``npm run start:frontend`` \
``npm run start:backend`` \
Now you can access frontend in http://localhost:3000 and backend in http://localhost:3001/api/history.
