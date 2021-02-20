import React, {useEffect, useState} from 'react';
import Node from '../Node/Node';
import './Board.css'

import breadthFirstSearch, {createPath} from '../Algorithms/BreadthFirstSearch';

const NUMBER_OF_ROWS = 20;
const NUMBER_OF_COLUMNS = 50;
const INITIAL_START = [10, 10];
const INITIAL_END = [10, 40];

const Board = () => {
    const [board, setBoard] = useState([]);
    const [mousePressed, setMousePressed] = useState(false);
    const [moveStart, setMoveStart] = useState(false);
    const [moveEnd, setMoveEnd] = useState(false);
    const [startPosition, setStartPosition] = useState(INITIAL_START);
    const [endPosition, setEndPosition] = useState(INITIAL_END);
    const [algoInProgress, setAlgoInProgress] = useState(false);
    
    useEffect(() => {
        const initBoard = initializeBoard()
        setBoard(initBoard);
    }, []);

    const initializeBoard = () => {
        const nodeGrid = [];
        for (let row = 0; row < NUMBER_OF_ROWS; row++) {
            const currRowOfNodes = [];
            for (let col = 0; col < NUMBER_OF_COLUMNS; col++) {
                const node = newNode(row, col);
                currRowOfNodes.push(node);
            }
            nodeGrid.push(currRowOfNodes);
        }
        return nodeGrid;
    }

    const newNode = (row, col) => {
        return {
            row,
            col,
            wall: false,
            visited: false,
            start: row === INITIAL_START[0] && col === INITIAL_START[1],
            end: row === INITIAL_END[0] && col === INITIAL_END[1],
            prevNode: null,
            distance: Infinity,
            visitedVisual: false,
            shortestPath: false
        }
    }

    const breadthFirst = () => {
        setAlgoInProgress(true);
        const nodeOrder = breadthFirstSearch(board, startPosition, endPosition);
        const shortestPath = createPath(board[endPosition[0]][endPosition[1]]);
        let i = 0;
        for (; i < nodeOrder.length; i++) {
            const node = nodeOrder[i];
            setTimeout(() => {
                node.visitedVisual = true;
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node visited';
            }, 15*i);
        }
        setTimeout(() => {
            animateShortestPath(shortestPath);
        }, i*15);
    }
    
    const animateShortestPath = (shortestPath) => {
        let count = 0;
        for (let i = 0; i < shortestPath.length; i++) {
            setTimeout(() => {
                const node = shortestPath[i];
                node.shortestPath = true;
                setBoard(board.slice());
            }, 15*i);
            count++;
        }
        setTimeout(() => {
            setAlgoInProgress(false);
        }, 15* count);
    }

    const reset = () => {
        if (algoInProgress){
            alert('Please wait for the algorithm to finish');
            return;
        }
        const initBoard = initializeBoard();
        setStartPosition(INITIAL_START);
        setEndPosition(INITIAL_END);
        setBoard(initBoard);
    }

    const mouseDown = (row, col) => {
        const node = board[row][col];
        if (node.start) {
            setMoveStart(true);
        } else if (node.end) {
            setMoveEnd(true);
        } else {
            turnOnWall(row, col);
            setMousePressed(true);
        }
    }

    const mouseUp = () => {
        setMousePressed(false);
        setMoveEnd(false);
        setMoveStart(false);
    }

    const mouseHold = (row, col) => {
        if (!mousePressed && !moveStart && !moveEnd) return;
        const node = board[row][col];
        if (moveStart && !node.end) {
            moveStartPosition(row, col);
        } else if (moveEnd && !node.start) {
            moveEndPosition(row, col);
        } else {
            turnOnWall(row, col);
        }
    }

    const turnOnWall = (row, col) => {
        const newBoard = board.slice();
        const node = newBoard[row][col];
        if (node.start || node.end || node.visited) return;
        node.wall = !node.wall;
        setBoard(newBoard);
    }

    const moveStartPosition = (row, col) => {
        const newBoard = board.slice();
        newBoard[startPosition[0]][startPosition[1]].start = false;
        setStartPosition([row, col]);
        newBoard[row][col].start = true;
        setBoard(newBoard);
    }

    const moveEndPosition = (row, col) => {
        const newBoard = board.slice();
        newBoard[endPosition[0]][endPosition[1]].end = false;
        setEndPosition([row, col]);
        newBoard[row][col].end = true;
        setBoard(newBoard);
    }

    return (
        <div>
            <button onClick={breadthFirst}>Breadth First Search</button>
            <button onClick={() => reset()}>Reset</button>
            <div className="grid">
                {board.map((row, rowNum) => {
                    return <div key={rowNum} className="row">
                        {row.map((node, nodeNum) => {
                           return <Node
                           row = {node.row}
                           col = {node.col}
                           wall = {node.wall}
                           visited = {node.visited}
                           visitedVisual = {node.visitedVisual}
                           start = {node.start}
                           end = {node.end}
                           prevNode = {node.prevNode}
                           key = {nodeNum}
                           distance = {node.distance}
                           shortestPath = {node.shortestPath}
                           mouseUp = {mouseUp}
                           mouseDown = {mouseDown}
                           mouseHold = {mouseHold}
                           />
                        })}
                    </div>
                })}    
            </div>            
        </div>
    )
}

export default Board
