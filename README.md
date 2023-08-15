# Project Documentation

- _View Finished Challenge live site:_ [https://vuejs-code-challenge.netlify.app/]
- _Technologies Used:_
  - Vue Js,
  - Nuxt Js,
  - TypeScript
  - TailWindCSS

## Introduction

Welcome to the Cologne Zoo project! This documentation will guide you through the basic operations that you can perform with the project using the provided npm scripts.

### Getting Started

Install Dependencies: Before you can run any scripts, ensure you've installed all the necessary dependencies:

```bash
npm install
```

### Development:

If you want to run the application in development mode, use the following command:

```bash
npm run dev
```

This will start the application using nuxi dev.

### Build:

To build the application for production, use:

```bash
npm run build
```

This uses nuxi build to compile and optimize the code.

### Start:

To start the application after building, use:

```bash
npm start
```

This starts the server from the .output/server/index.mjs file.

### Linting:

The project has linting set up for types and styles:
For type checking:

```bash
npm run lint:types
```

For style linting:

```bash
npm run lint:style
```

Or to run both linting processes simultaneously:

```bash
npm run lint
```

### Code Formatting:

The project has code formatting set up to check for code format improvement.
For type checking:

```bash
npm run prettier
```

or simply let `prettier` to do the formatting

```bash
npm run prettier:fix
```

### Testing:

The project uses vitest for testing:
To run tests:

```bash
npm test
```

To run tests in watch mode:

```bash
npm run test:watch
```

### Reviewing:

If you're reviewing the code and need to perform build and test operations consecutively:

```bash
npm run test-for-reviewer
```

### Husky Setup:

To set up git hooks via Husky, use:

```bash
npm run prepare
```

## Additional Information

- Ensure that you have all the required environment variables and configurations set up before building or starting the application.
- It's a good practice to regularly lint and test your code during development to catch any potential issues early on.


[Changelog](CHANGELOG.md)
