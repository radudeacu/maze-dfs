// maze as  2D array S is start, E end, 1 is wall and 0 is path
const maze = [
    ['S', '0', '1', '0', '0', '0', '1', '1', '1', '1', '1', '0', '0', '0', '0'],
    ['1', '0', '1', '0', '1', '0', '1', '0', '0', '0', '1', '0', '1', '1', '0'],
    ['0', '0', '1', '0', '1', '0', '1', '0', '1', '0', '0', '0', '0', '1', '0'],
    ['0', '1', '1', '0', '1', '0', '0', '0', '1', '1', '1', '1', '0', '1', '0'],
    ['0', '0', '0', '0', '0', '1', '1', '0', '1', '0', '0', '1', '0', '1', '0'],
    ['0', '1', '1', '1', '0', '0', '0', '0', '0', '0', '1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0', '1', '1', '1', '1', '0', '1', '0', '0', '1', '0'],
    ['1', '0', '1', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1', '1', '0'],
    ['1', '0', '0', '0', '1', '1', '1', '0', '1', '1', '1', '0', '1', '0', '0'],
    ['1', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['0', '0', '1', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '1'],
    ['0', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['0', '0', '0', '1', '0', '1', '1', '1', '1', '1', '1', '1', '1', '0', '1'],
    ['1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', '0', 'E']
];

const mazeContainer = document.getElementById('maze');

function createMazeGrid(maze) {
    maze.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            if (cell === '1') {
                cellElement.classList.add('wall');
            } else {
                cellElement.classList.add('path');
            }
            cellElement.id = `cell-${rowIndex}-${colIndex}`;
            mazeContainer.appendChild(cellElement);
        });
    });
}

createMazeGrid(maze);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function visualizeDFS(maze, start, end) {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;
    const stack = [[startRow, startCol]]; // stack 4 dfs
    const visited = new Set(); // keep track of visited cells
    const path = []; // path to store the solution

    // main dfs loop
    while (stack.length > 0) {
        const [currentRow, currentCol] = stack.pop();
        const cellId = `cell-${currentRow}-${currentCol}`;
        
        if (visited.has(cellId)) continue;
        
        visited.add(cellId);
        path.push([currentRow, currentCol]);

        if (currentRow === endRow && currentCol === endCol) {
            for (let [row, col] of path) {
                document.getElementById(`cell-${row}-${col}`).classList.add('solution');
                await sleep(50);
            }
            return true;
        }

        document.getElementById(cellId).classList.add('visited');
        await sleep(50);

        const neighbors = getNeighbors(maze, currentRow, currentCol);
        for (let [neighborRow, neighborCol] of neighbors) {
            if (!visited.has(`cell-${neighborRow}-${neighborCol}`)) {
                stack.push([neighborRow, neighborCol]);
            }
        }
    }
    return false;
}

function getNeighbors(maze, row, col) {
    const directions = [
        [1, 0],  // down
        [0, 1],  // right
        [-1, 0], // up
        [0, -1]  // left
    ];
    const neighbors = [];
    for (let [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < maze.length && newCol >= 0 && newCol < maze[0].length && maze[newRow][newCol] !== '1') {
            neighbors.push([newRow, newCol]);
        }
    }
    return neighbors;
}

// Start visualization from 'S' to 'E'
visualizeDFS(maze, [0, 0], [14, 14]);
