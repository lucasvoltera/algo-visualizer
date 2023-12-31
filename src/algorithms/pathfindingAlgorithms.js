function dijkstra(grid, start, finish) {
    const visitedInOrder = [];
    start.distance = 0;
    const unvisited = allNodes(grid);
    while (unvisited.length) {
        sortNodes(unvisited);
        const closest = unvisited.shift();
        if (closest === finish) {
            return visitedInOrder;
        }
        if (closest.isWall) continue;
        if (closest.distance === Infinity) return visitedInOrder;
        closest.isVisited = true;
        visitedInOrder.push(closest);

        updateUnvisitedNeighbors(closest, grid);
    }
    return visitedInOrder;
}


function DFS(grid, start, finish) {
    const visitedInOrder = [];
    let unvisited = [];
    unvisited.push(start);
    while (unvisited.length) {
        const node = unvisited.pop();
        if (node === finish) {
            return visitedInOrder;
        }
        if (node.isWall) continue;
        node.isVisited = true;
        visitedInOrder.push(node);

        unvisited = unvisited.concat(getUNeighbors(node, grid));
    }

    return visitedInOrder;
}



function getUNeighbors(node, grid) {
    const neighbors = [];
    const reN = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (col > 0) neighbors.push(grid[row][col - 1]);

    for (let index = 0; index < neighbors.length; index++) {
        const neighbor = neighbors[index];
        if (!neighbor.isVisited) {
            neighbor.previousNode = node;
            neighbor.isVisited = true;
            reN.push(neighbor);
        }
    }
    return reN;

}


function allNodes(grid) {
    const re = [];
    for (const row of grid) {
        for (const node of row) {
            re.push(node);
        }
    }
    return re;
}


function sortNodes(nodes) {
    nodes.sort((a, b) => a.distance - b.distance);
}


function updateUnvisitedNeighbors(closest, grid) {
    const neighbors = [];
    const { row, col } = closest;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    for (const neighbor of neighbors) {
        if (!neighbor.isVisited) {
            neighbor.distance = closest.distance + 1;
            neighbor.previousNode = closest;
        }
    }
}



