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



