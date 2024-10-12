# Task Manager front end

This is a simple task management application built with Vue.js. The application allows users to create, edit, and delete tasks. Additionally, it includes tests implemented with Vitest to ensure the functionality and reliability of the application.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/abran89/task-manager-frontend.git
   cd task-manager-frontend
    ```
2. **Install the dependencies:**
    ```bash
    npm install
    ```
## Configuration

1. **Create the .env file:**

Copy the env.example file to create your .env file:
```
cp env.example .env
```
2. **Set the environment variables:**
Open the .env file in a text editor and set the necessary environment variables. Ensure you specify the correct API URL

## Usage
To run the application in development mode, use:
```
npm run serve
```
## Testing

This project uses [Vitest](https://vitest.dev/) for unit testing.

### Running Tests

To run the tests, use the following command:

```bash
npm run test
```
