## Project Description

It's an Angular built front-end project that displays olympics data in different formats, including pie and line charts.

# Installation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

Please make sure that any additional library are compatible with dependencies (cf angular.json to check versions)

    Prerequisites
Ensure you have the following installed on your system:
Node.js (for managing packages)
Angular CLI (for running Angular projects)

    Clone the repository
    `git clone https://github.com/yourusername/your-repository-name.git`

    Navigate to the project directory:
    `cd your-repository-name`

    Install dependencies
    `npm install`

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

## Features
Responsive Design: The application is designed to be responsive and works on both desktop and mobile devices.
Data Integration: Data for the charts is mapped and formatted to ensure accurate display of information.
Interactive Pie and Line Charts: The project uses ngx-charts to display Olympic data in pie and line chart formats.

## Technologies Used
Angular: A platform for building web applications.
Ngx-Charts: A charting library for Angular.
Font Awesome: Used for icons like medals and trophies in tooltips.
Sass: For styling and managing stylesheets.

## Where to start

To begin:

Familiarize yourself with the starter code provided. Pay close attention to the following files:

app-routing.module.ts: Defines the application's routing configuration.

olympic.service.ts: Contains the logic for fetching and processing Olympic data.

Enhance the type safety by creating TypeScript interfaces in the models folder. Two files (olympic.model.ts and another for related data) are already created, corresponding to the data in olympic.json. Replace any usage of any in the codebase with these interfaces for better type management.

Once you understand the structure and have implemented the interfaces, proceed to develop the requested features.

## Contributing
Fork the repository.
Create a new branch (git checkout -b feature-name).
Make changes and commit (git commit -am 'Add new feature').
Push to the branch (git push origin feature-name).
Open a pull request.

## Additional Notes

Follow best practices for Angular development, including the separation of concerns between components, services, and models.

Utilize the core folder for shared or essential application logic.

Ensure reusable components are modular and placed in the components folder.

You're now ready to start working on the project. Good luck!
