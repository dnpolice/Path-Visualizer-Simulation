import React from 'react';

import './Node.css';

const Node = ({row, col, wall, visitedVisual, shortestPath, start, end, mouseUp, mouseDown, mouseHold}) => {
    let nodeClass = wall ? 'wall' :
                        start ? 'start' :
                        end ? 'end' :
                        shortestPath ? 'shortestPath' :
                        visitedVisual ? 'visited' :
                        '';
    return (
        <div className={'node ' + nodeClass}
            id={`node-${row}-${col}`}
            onMouseDown={() => mouseDown(row,col)}
            onMouseEnter={() => mouseHold(row,col)}
            onMouseUp={mouseUp}
        >
        </div>
    )
}

export default Node;