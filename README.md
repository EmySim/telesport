# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Project Architecture

The project comes with a predefined architecture, which you are free to customize as per your needs. The predefined structure includes the following (in addition to the default Angular architecture):

components folder: Contains reusable components.

pages folder: Contains components associated with routing and pages.

core folder: Encapsulates the business logic and includes:

services folder: For services managing the application's data.

models folder: For defining TypeScript interfaces and models.

## Where to start

To begin:

Familiarize yourself with the starter code provided. Pay close attention to the following files:

app-routing.module.ts: Defines the application's routing configuration.

olympic.service.ts: Contains the logic for fetching and processing Olympic data.

Enhance the type safety by creating TypeScript interfaces in the models folder. Two files (olympic.model.ts and another for related data) are already created, corresponding to the data in olympic.json. Replace any usage of any in the codebase with these interfaces for better type management.

Once you understand the structure and have implemented the interfaces, proceed to develop the requested features.

## Additional Notes

Follow best practices for Angular development, including the separation of concerns between components, services, and models.

Utilize the core folder for shared or essential application logic.

Ensure reusable components are modular and placed in the components folder.

You're now ready to start working on the project. Good luck!
