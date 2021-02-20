
export default (board, start, end) => {
    const startRowIdx = start[0];
    const startColIdx = start[1];
    const endRowIdx = end[0];
    const endColIdx = end[1];

    const nodeOrder = [];

    const startNode = board[startRowIdx][startColIdx];
    startNode.distance = 0;
    startNode.visited = true;
    const queue = [startNode];
    board[startRowIdx][startColIdx].distance = 0;
    let success = false;
    while (queue.length !== 0) {
        const node = queue[0];
        queue.shift();
        nodeOrder.push(node);
        if (node.prevNode) node.distance = node.prevNode.distance + 1;

        if (endRowIdx === node.row && endColIdx === node.col || node.end){
            success = true;
            break;
        }
        
        if (node.col-1 >= 0 && !board[node.row][node.col-1].wall && !board[node.row][node.col-1].visited) {
            const nextNode = board[node.row][node.col-1];
            nextNode.prevNode = node;
            nextNode.visited = true;
            queue.push(nextNode);
        }
        if (node.col+1 < board[0].length && !board[node.row][node.col+1].wall && !board[node.row][node.col+1].visited) {
            const nextNode = board[node.row][node.col+1];
            nextNode.prevNode = node;
            nextNode.visited = true;
            queue.push(nextNode);
        }
        if (node.row-1 >= 0 && !board[node.row-1][node.col].wall && !board[node.row-1][node.col].visited) {
            const nextNode = board[node.row-1][node.col]
            nextNode.prevNode = node;
            nextNode.visited = true;
            queue.push(nextNode);
        }
        if (node.row+1 < board.length && !board[node.row+1][node.col].wall && !board[node.row+1][node.col].visited) {
            const nextNode = board[node.row+1][node.col];
            nextNode.prevNode = node;
            nextNode.visited = true;
            queue.push(nextNode);
        }
    }
        if (success) {
            nodeOrder.pop();
        }
        nodeOrder.shift();
        return nodeOrder;
}

export function createPath(finalNode) {
    const shortestPath = [];
    let currNode = finalNode;
    while (currNode !== null) {
        shortestPath.unshift(currNode);
        currNode = currNode.prevNode;
    }
    shortestPath.pop();
    shortestPath.shift();
    return shortestPath;
}