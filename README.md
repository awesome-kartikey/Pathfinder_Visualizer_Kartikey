# MazeGrid: Interactive Maze Generator and Pathfinding Visualizer

This project is an interactive maze generator and pathfinding algorithm visualizer built with React. It allows users to generate random mazes and visualize two popular pathfinding algorithms: Breadth-First Search (BFS) and Depth-First Search (DFS).

## Features

- Random maze generation
- Interactive visualization of maze generation
- Breadth-First Search (BFS) pathfinding algorithm
- Depth-First Search (DFS) pathfinding algorithm
- Real-time visualization of pathfinding algorithms
- Responsive design for various screen sizes

## Demo

[Add a link to your live demo here, if available]

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js (version 12 or later)
- npm (usually comes with Node.js)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/mazegrid-react.git
   ```

2. Navigate to the project directory:
   ```
   cd mazegrid-react
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000` to see the application running.

## Usage

- Click the "Refresh Maze" button to generate a new random maze.
- Click "Breadth-First Search" to visualize the BFS algorithm.
- Click "Depth-First Search" to visualize the DFS algorithm.
- Watch as the algorithms explore the maze and find the path from start to end.

## Implementation Details

The project uses React for the user interface and implements the following key features:

1. Maze Generation: Uses a recursive backtracking algorithm to create random mazes.
2. Breadth-First Search (BFS): Implements BFS for pathfinding, guaranteeing the shortest path.
3. Depth-First Search (DFS): Implements DFS for pathfinding, which may not find the shortest path but is memory-efficient.
4. Visualization: Uses React state and timeouts to create step-by-step visualizations of the algorithms.

## Running React on Repl.it

This project is set up to run on Repl.it, which provides a quick and easy way to get started with React development.

- React is a popular JavaScript library for building user interfaces.
- Vite is a blazing fast frontend build tool that includes features like Hot Module Reloading (HMR), optimized builds, and TypeScript support out of the box.
- Using the two in conjunction is one of the fastest ways to build a web app.

### Getting Started on Repl.it

1. Hit the "Run" button
2. Edit `App.jsx` and watch it live update!

By default, Replit runs the `dev` script, but you can configure it by changing the `run` field in the `.replit` configuration file. Here are the [Vite docs for serving production websites](https://vitejs.dev/guide/build.html).

### TypeScript Support

To use TypeScript, just rename any file from `.jsx` to `.tsx`. You can also try our [TypeScript Template](https://replit.com/@replit/React-TypeScript).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Thanks to the React team for creating an amazing library
- Inspiration from various maze generation and pathfinding visualization projects