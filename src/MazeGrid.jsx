import { useEffect, useState } from "react";
import "./App.css";

/**
 * MazeGrid Component
 * 
 * This component renders an interactive maze grid with pathfinding visualizations.
 * It allows users to generate random mazes and visualize Breadth-First Search (BFS)
 * and Depth-First Search (DFS) algorithms.
 * 
 * @param {Object} props - Component props
 * @param {number} [props.width=10] - Width of the maze grid
 * @param {number} [props.height=10] - Height of the maze grid
 */
export default function MazeGrid({ width = 20, height = 20 }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // State to store the maze grid
  // Each cell in the maze can be: 'wall', 'path', 'start', 'end', or 'visited'
  const [maze, setMaze] = useState([]);

  // State to store timeout IDs for clearing during refresh
  // This is used to stop ongoing visualizations when refreshing the maze
  const [timeoutIds, setTimeoutIds] = useState([]);

  // useEffect hook to generate the maze when the component mounts
  useEffect(() => {
    generateMaze(width, height);
  }, []);

  /**
   * Breadth-First Search (BFS) Algorithm
   * 
   * BFS explores the maze level by level, visiting all neighbors of a cell
   * before moving to the next level. It's guaranteed to find the shortest path
   * in an unweighted graph.
   * 
   * @param {number[]} startNode - Starting coordinates [x, y]
   */
  function bfs(startNode) {
    let queue = [startNode];
    let visited = new Set(`${startNode[0]},${startNode[1]}`);

    /**
     * Helper function to mark a cell as visited and check if it's the end
     * 
     * @param {number[]} [x, y] - Coordinates of the cell to visit
     * @returns {boolean} - True if the end is reached, false otherwise
     */
    function visitCell([x, y]) {
      console.log(x, y);

      // Update the maze state to mark the cell as visited
      setMaze((prevMaze) =>
        prevMaze.map((row, rowIndex) =>
          row.map((cell, cellIndex) => {
            if (rowIndex === y && cellIndex === x) {
              return cell === "end" ? "end" : "visited";
            }
            return cell;
          }),
        ),
      );

      // Check if we've reached the end
      if (maze[y][x] === "end") {
        setMessage("Path found!");
        console.log("path found!");
        return true;
      }
      return false;
    }

    /**
     * Step function for BFS
     * This function is called recursively to explore the maze
     */
    function step() {
      if (queue.length === 0) {
        return; // No more cells to explore
      }
      const [x, y] = queue.shift(); // Get the next cell from the queue
      console.log("new step");

      // Define possible directions: right, down, left, up
      const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];

      // Check all neighboring cells
      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;
        // Check if the neighboring cell is within bounds and not visited
        if (
          nx >= 0 &&
          nx < width &&
          ny >= 0 &&
          ny < height &&
          !visited.has(`${nx},${ny}`)
        ) {
          visited.add(`${nx},${ny}`);
          // If the cell is a path or the end, visit it
          if (maze[ny][nx] === "path" || maze[ny][nx] === "end") {
            if (visitCell([nx, ny])) {
              return true; // End found
            }
            queue.push([nx, ny]); // Add to queue for further exploration
          }
        }
      }

      // Set timeout for next step and store its ID
      // This creates a visual delay between steps for better visualization
      const timeoutId = setTimeout(step, 100);
      setTimeoutIds((previousTimeoutIds) => [...previousTimeoutIds, timeoutId]);
    }

    step(); // Start the BFS process
    return false;
  }

  /**
   * Depth-First Search (DFS) Algorithm
   * 
   * DFS explores the maze by going as deep as possible along each branch
   * before backtracking. It may not find the shortest path, but it's memory-efficient.
   * 
   * @param {number[]} startNode - Starting coordinates [x, y]
   */
  function dfs(startNode) {
    let stack = [startNode];
    let visited = new Set(`${startNode[0]},${startNode[1]}`);

    /**
     * Helper function to mark a cell as visited and check if it's the end
     * 
     * @param {number[]} [x, y] - Coordinates of the cell to visit
     * @returns {boolean} - True if the end is reached, false otherwise
     */
    function visitCell([x, y]) {
      // Update the maze state to mark the cell as visited
      setMaze((prevMaze) =>
        prevMaze.map((row, rowIndex) =>
          row.map((cell, cellIndex) => {
            if (rowIndex === y && cellIndex === x) {
              return cell === "end" ? "end" : "visited";
            }
            return cell;
          }),
        ),
      );

      // Check if we've reached the end
      if (maze[y][x] === "end") {
        setMessage("Path found!");
        console.log("path found!");
        return true;
      }
      return false;
    }

    /**
     * Step function for DFS
     * This function is called recursively to explore the maze
     */
    function step() {
      if (stack.length === 0) {
        return; // No more cells to explore
      }
      const [x, y] = stack.pop(); // Get the next cell from the stack
      console.log("new step");

      // Define possible directions: right, down, left, up
      const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];

      // Check all neighboring cells
      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;
        // Check if the neighboring cell is within bounds and not visited
        if (
          nx >= 0 &&
          nx < width &&
          ny >= 0 &&
          ny < height &&
          !visited.has(`${nx},${ny}`)
        ) {
          visited.add(`${nx},${ny}`);
          // If the cell is a path or the end, visit it
          if (maze[ny][nx] === "path" || maze[ny][nx] === "end") {
            if (visitCell([nx, ny])) {
              return true; // End found
            }
            stack.push([nx, ny]); // Add to stack for further exploration
          }
        }
      }
      // Set timeout for next step and store its ID
      // This creates a visual delay between steps for better visualization
      const timeoutId = setTimeout(step, 100);
      setTimeoutIds((previousTimeoutIds) => [...previousTimeoutIds, timeoutId]);
    }

    step(); // Start the DFS process
    return false;
  }

  /**
   * Function to generate a random maze
   * 
   * This function uses a recursive backtracking algorithm to create a maze.
   * It starts with a grid of walls and carves out paths to create the maze structure.
   * 
   * @param {number} height - Height of the maze
   * @param {number} width - Width of the maze
   */
  function generateMaze(height, width) {
    setLoading(true);  // Set loading to true at the start
    let matrix = [];

    // Initialize maze with all walls
    for (let i = 0; i < height; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        row.push("wall");
      }
      matrix.push(row);
    }
    console.log(matrix);

    // Define possible directions: right, down, left, up
    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    /**
     * Check if a cell is valid for carving a path
     * 
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @returns {boolean} - True if the cell is valid, false otherwise
     */
    function isCellValid(x, y) {
      return (
        y >= 0 && x >= 0 && x < width && y < height && matrix[y][x] === "wall"
      );
    }

    /**
     * Recursive function to carve paths in the maze
     * 
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    function carvePath(x, y) {
      matrix[y][x] = "path";

      // Shuffle directions for randomness
      const directions = dirs.sort(() => Math.random() - 0.5);

      for (let [dx, dy] of directions) {
        const nx = x + dx * 2;
        const ny = y + dy * 2;
        if (isCellValid(nx, ny)) {
          matrix[y + dy][x + dx] = "path";
          carvePath(nx, ny);
        }
      }
    }

    // Start carving from (1, 1)
    carvePath(1, 1);

    // Set start and end points
    matrix[1][0] = "start";
    matrix[height - 2][width - 1] = "end";
    setMaze(matrix);
    setLoading(false);  // Set loading to false once maze is generated
    setMessage("");  // Clear any previous messages
  }

  /**
   * Function to refresh the maze
   * 
   * This function clears all ongoing visualizations and generates a new maze.
   */
  function refreshMaze() {
    // Clear all timeouts to stop ongoing visualizations
    timeoutIds.forEach(clearTimeout);
    setTimeoutIds([]);
    // Generate a new maze
    generateMaze(20, 20);
  }

  // Render the maze grid and control buttons
  return (
    <div className="maze-grid">
      {loading && <div className="loading">Loading...</div>}
      {!loading && <div className="controls">
        <button className={"maze-button"} onClick={() => refreshMaze()}>
          Refresh Maze
        </button>
        <button className={"maze-button"} onClick={() => bfs([1, 0])}>
          Breadth-First Search
        </button>
        <button className={"maze-button"} onClick={() => dfs([1, 0])}>
          Depth-First Search
        </button>
      </div>}
      {message && <div className="message">{message}</div>}
      <div className={"maze"}>
        {maze.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div className={`cell ${cell}`} key={`${rowIndex}-${cellIndex}`}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}