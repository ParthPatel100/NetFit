To run the server CD into the Server folder then run the commands:
npm install express
node index.js
To run the front-end cd into the Client/front-end then run the commands: 
npm install
npm start

To run the seeding script follow the bellow instructions:
Clone the repository into one of your folders and run the command:
docker-compose up
This will build the project in docker (note: Please wait for the mongo express connection
to start before running the seeding script)
To run the seeding script enter the command:
Cd Server/MongoDB
Followed by:
node seed.js
