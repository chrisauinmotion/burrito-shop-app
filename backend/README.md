Burrito Shop REST API

This project is a simple REST API built with Node.js, Express, and Prisma.

**Project Structure**

The project is structured into several directories:

- controllers: This directory contains the logic for handling requests and responses. Each controller corresponds to a specific entity (burrito or order).
- routes: This directory contains the route definitions for the API. Each route file corresponds to a specific entity and imports the relevant controllers.
- services: This directory contains the business logic of the application. Each service file corresponds to a specific entity and interacts with the database using Prisma.
- tests: This directory contains the test files for the services.
- utils: This directory contains utility functions, such as environment variable validation.

**Running the Application**

Run ``yarn`` to install all necessary dependencies.

Use example.env file to setup your local .env file.

To run the application ensure you have Docker installed and setup. Then use ``docker-compose up -d``
to instantiate a docker instance.   

Then run ``npm run prisma:all`` to get your DB ready.

Finally, use the ``npm run start`` command. To run the tests, use the npm run test command.

Use Postman or your API platform of preference for testing.  

You could also run this together with the frontend portion of this project and check prisma studio to see results in the DB.

