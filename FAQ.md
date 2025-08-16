# Frequently Asked Questions (FAQ)

### Q1: What algorithms are used in this project?

*   **Maze Generation**: The project uses the **Recursive Backtracking** algorithm to generate the maze. It starts with a grid full of walls and recursively carves out paths.
*   **Pathfinding**: Two pathfinding algorithms are implemented and visualized:
    *   **Breadth-First Search (BFS)**: Explores the maze layer by layer, guaranteeing the shortest path in terms of the number of steps for an unweighted grid like this maze.
    *   **Depth-First Search (DFS)**: Explores as far as possible along each branch before backtracking. It does not guarantee the shortest path.

### Q2: How is the visualization implemented?

The visualization is achieved using a combination of React's state management and JavaScript's `setTimeout` function.
1.  The maze grid is stored in a React state variable (`maze`).
2.  When a pathfinding algorithm (BFS or DFS) runs, instead of exploring instantly, it updates the state to mark a cell as 'visited' (`setMaze(...)`).
3.  Each step of the exploration (visiting a neighbor) is wrapped in a `setTimeout` call with a delay (e.g., 100ms).
4.  This schedules the next step of the algorithm to run after the delay, causing React to re-render the grid with the updated cell colors, creating the visual step-by-step effect.
5.  Timeout IDs are stored in state (`timeoutIds`) so they can be cleared if the user refreshes the maze or starts a different algorithm, preventing multiple visualizations from running concurrently or continuing after a refresh.

### Q3: Can I change the size of the maze grid?

The `MazeGrid` component accepts `width` and `height` props (`<MazeGrid width={30} height={25} />`). However, the current implementation hardcodes the size to `20x20` in two places:
1.  The default prop values in `MazeGrid.jsx` (`width = 20, height = 20`).
2.  The `refreshMaze` function calls `generateMaze(20, 20)`.
To make the size easily configurable, you would need to modify the `refreshMaze` function to use the component's props or manage the desired size in state. The CSS (`--cell-size`) is designed to adapt to the number of cells relative to viewport size.

### Q4: Why does BFS find the shortest path but DFS might not?

*   **BFS** explores nodes level by level. It checks all nodes at distance 1 from the start, then all nodes at distance 2, and so on. Because it expands outwards uniformly, the first time it reaches the target node, it must have done so via a path with the minimum number of steps.
*   **DFS** explores by going as deep as possible down one path before backtracking. It might find the target node via a long, winding path before it explores a potentially shorter path.

### Q5: How can I change the visualization speed?

The visualization speed is determined by the delay value (in milliseconds) passed to `setTimeout` within the `step` functions of the BFS and DFS algorithms in `MazeGrid.jsx`. Currently, it's hardcoded to `100`ms:
```javascript
// Inside bfs step() and dfs step()
const timeoutId = setTimeout(step, 100); // Change 100 to speed up/slow down
```
To make it adjustable, you could add a slider or input field in the UI, store the selected speed in the component's state, and use that state variable in the `setTimeout` calls.

### Q6: Is TypeScript used in this project?

The project is set up to support TypeScript. It includes a `tsconfig.json` file, and the Vite configuration (`vite.config.js`) uses the React plugin which handles TypeScript. However, the core application logic in `src/index.jsx` and `src/MazeGrid.jsx` is written in JavaScript (`.jsx`). You can convert these files to TypeScript (`.tsx`) and add type annotations if desired.

### Q7: Why does the visualization stop/reset when I click "Refresh Maze"?

The `refreshMaze` function is designed to provide a clean slate. Before generating a new maze, it explicitly clears any pending visualization steps scheduled by `setTimeout`. It does this by calling `clearTimeout` for every ID stored in the `timeoutIds` state array and then resetting this array. This prevents old visualizations from continuing on the new maze.

### Q8: The visualization only shows visited cells. How can I see the final path?

The current implementation only visualizes the exploration process (visited cells). To show the actual path found from start to end, the algorithms (BFS/DFS) would need to be modified:
1.  **Track Parents**: During the search, when moving from cell A to cell B, store A as the "parent" of B (e.g., using a Map or an auxiliary grid).
2.  **Backtrack**: Once the end cell is found, backtrack from the end cell to the start cell using the stored parent pointers.
3.  **Visualize Path**: As you backtrack, update the state of the cells on the path to a distinct 'final-path' state, which would have a specific CSS style (e.g., a different color).