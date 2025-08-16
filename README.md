# Maze Pathfinder Visualizer

This project is an interactive maze generator and pathfinding algorithm visualizer built using React and Vite. It allows users to generate random mazes using a recursive backtracking algorithm and visualize the process of finding a path from a start point to an end point using Breadth-First Search (BFS) and Depth-First Search (DFS) algorithms.

## Features

- **Random Maze Generation**: Creates complex mazes using the Recursive Backtracking algorithm.
- **Pathfinding Algorithms**: Implements and visualizes:
  - **Breadth-First Search (BFS)**: Finds the shortest path in an unweighted grid.
  - **Depth-First Search (DFS)**: Explores paths deeply before backtracking.
- **Step-by-Step Visualization**: Clearly shows how the algorithms explore the maze cells.
- **Interactive Controls**: Buttons to generate a new maze and run pathfinding algorithms.
- **Responsive Design**: Adapts to different screen sizes using CSS variables.
- **Loading Indicator**: Provides feedback while the maze is generating.
- **Status Messages**: Displays messages like "Path found!".

## Tech Stack

- **Frontend Library**: React 18
- **Build Tool**: Vite
- **Language**: JavaScript (JSX), CSS
- **Development Environment**: Node.js, npm
- **(TypeScript Ready)**: The project includes `tsconfig.json` and Vite configuration for TypeScript, though the core components are currently implemented in JavaScript (`.jsx`).

## Demo

[Live](https://algomaze.netlify.app/)

*Screenshot:*
[Screenshot](https://iamkartikey.vercel.app/project-screenshots/maze-pathfinder-visualizer.png)


## Setup and Installation

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v18 or later recommended)
- npm (usually included with Node.js)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd pathfinder_visualizer_kartikey
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

    This command starts the Vite development server, typically on `http://localhost:5173`.

4.  **Open in browser:**
    Navigate to the URL provided in the terminal (e.g., `http://localhost:5173`) to view the application.

## Usage

1.  **Generate Maze**: Upon loading, a random maze is generated. Click the "Refresh Maze" button to create a new one.
2.  **Run BFS**: Click the "Breadth-First Search" button to visualize the BFS algorithm exploring the maze from the start (top-left green cell) to the end (bottom-right red cell). Visited cells are marked in light green.
3.  **Run DFS**: Click the "Depth-First Search" button to visualize the DFS algorithm exploring the maze.
4.  **Observe**: Watch the visualization progress. A message "Path found!" will appear if the end cell is reached.
