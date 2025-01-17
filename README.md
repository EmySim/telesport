# Front-End Development with Angular

## Project Description
This is an Angular-based front-end project that displays Olympic data in different formats, including pie and line charts. The application integrates interactive charts and tooltips to present information in a user-friendly manner.

## Installation
This project was generated with Angular CLI version 18.0.3.
Please ensure that all additional libraries are compatible with the dependencies (refer to angular.json for version checks).

### Prerequisites
Ensure you have the following installed on your system:

![Node.js Badge](https://img.shields.io/badge/Node.js-16.0.0-brightgreen)

![npm Badge](https://img.shields.io/badge/npm-7.20.0-blue)

### Steps to Install
To get started with the project, clone the repository, navigate to the project directory, and install the dependencies:

- Clone the repository by running: git clone https://github.com/yourusername/your-repository-name.git
- Navigate to the project directory using: cd your-repository-name
- Install the required dependencies by executing: 'npm install'

## Development Server
To run the application locally, use the 'ng serve' command. Afterward, navigate to http://localhost:4200/ in your browser. The application will automatically reload if you change any of the source files.

## Build
For production, use the 'ng build' command to build the project. The output will be stored in the dist/ directory.

## Project Architecture
The project follows a predefined architecture, which can be customized to suit your needs. It includes the following folders:

- components: Contains reusable components.
- pages: Contains components related to routing and pages.
- core: Encapsulates business logic and includes:
- services: Manages the application's data.
- models: Defines TypeScript interfaces and models.

## Features
- Responsive Design: The application is designed to be responsive and works on both desktop and mobile devices.
- Data Integration: The data for the charts is mapped and formatted to ensure accurate display of information.
- Interactive Pie and Line Charts: The project uses ngx-charts to display Olympic data in pie and line chart formats.
- Loading and notification

## Technologies Used
![Angular Badge](https://img.shields.io/badge/Angular-18.0.3-red) A platform for building web applications.

![Ngx-Charts Badge](https://img.shields.io/badge/Ngx--Charts-2.0.0-green) A charting library for Angular.

![Font Awesome Badge](https://img.shields.io/badge/Font%20Awesome-6.0.0-blue) Used for icons such as medals and trophies in tooltips.

![Sass Badge](https://img.shields.io/badge/Sass-1.32.0-pink) For styling and managing stylesheets.

## Where to Start
To begin, familiarize yourself with the starter code provided. Pay close attention to the following files:
* app-routing.module.ts: This file defines the application's routing configuration.
* olympic.service.ts: Contains the logic for fetching and processing Olympic data.

## Contributing
If you want to contribute to the project, follow these steps:
1. Fork the repository.
2. Create a new branch for your feature: git checkout -b feature-name
3. Make your changes and commit them: git commit -am 'Add new feature'
4. Push your changes to the branch: git push origin feature-name
5. Open a pull request.

## Additional Notes
Follow best practices for Angular development, such as maintaining a clear separation of concerns between components, services, and models.
Utilize the core folder for shared or essential application logic.
Ensure reusable components are modular and placed in the components folder.
For further details, refer to the following wireframe specification:

You're now ready to start working on the project. Good luck!