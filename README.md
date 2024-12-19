# Ingredish

Ingredish is a webpage to find out which recipes you can make with the ingredients you have. Save your favorite ones to keep making what you loved most!

This webpage has a backend and a frontend and is powered by Spring Boot, Docker, and Postgres in the backend, as well as Vite and Clerk in the frontend.
This application also communicates with the [Spoonacular API](https://spoonacular.com/food-api)! You can find a diagram below:

![Ingredish Architecture](ingredish_high_level_architecture.png)

## Running Ingredish locally

To start up the application locally, follow these simple steps:

0. You will require a Clerk API key and a Spoonacular API key to run this application. Add them to the .env.local file in the frontend directory:
  ```shell
  cd frontend
  touch .env.local
  ```

  Inside the .env.local file, add the following environment variables:
  ```txt
  VITE_CLERK_PUBLISHABLE_KEY=<clerk_key>
  VITE_SPOONACULAR_API_KEY=<spoonacular_api_key>
  ```
1. Start the Postgres Docker container:
  ```shell
  cd backend
  docker compose up
  ```
2. Start the backend:
  ```shell
  cd backend
  mvn clean package
  ```
3. Start the frontend application:
  ```shell
  cd frontend
  yarn run dev
  ```

## Database Architecture

The database was created to hold users and the users' favorite dishes only. This is exemplified by the following database diagram:

![Database Diagram](ingredish_database_diagram.png)

## Frontend Mockup

The frontend was built to keep it simple, displaying all the recipes brought from the Spoonacular API. A search bar is included to search from all of the existing recipes.
A favorite button is provided to aggregate all the best recipes, and a My Favorites button allows you to view all your saved favorite recipes.

You can view the frontend mockup down below:

![Frontend Mockup](ingredish_frontend_mockup.png)
