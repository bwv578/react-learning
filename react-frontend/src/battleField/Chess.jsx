import {useEffect, useState} from "react";

import pawn0 from '../assets/pieces/1.png';
import pawn1 from '../assets/pieces/11.png';
import knight0 from '../assets/pieces/2.png';
import knight1 from '../assets/pieces/12.png';
import bishop0 from '../assets/pieces/3.png';
import bishop1 from '../assets/pieces/13.png';
import rook0 from '../assets/pieces/4.png';
import rook1 from '../assets/pieces/14.png'
import queen0 from '../assets/pieces/5.png';
import queen1 from '../assets/pieces/15.png';
import king0 from '../assets/pieces/6.png';
import king1 from '../assets/pieces/16.png';
import {data} from "react-router-dom";

export const Chess = ()=>{

    let [board, setBoard] = useState([]);
    let [gameStatus, setGameStatus] = useState({
        turn: 0,
        board: [],
        moves: []
    });
    //let []

    useEffect(() => {
        //getBoard();
        updateGameStatus();
    }, []);

    const getBoard = ()=>{
        fetch('/battleField/chess/chessBoard')
            .then(res => res.json())
            .then(board => {
                setBoard(board);
            })
            .catch(err => console.log(err));
    }

    const updateGameStatus = () =>{
        fetch('/battleField/chess/chessBoard')
            .then(res=>res.json())
            .then(data => {
                setGameStatus(data)
            })
            .catch(err => console.log(err));
    }

    const hint = (rIdx, cIdx)=>{
        gameStatus.moves[rIdx][cIdx].map(
            move => document.querySelector('[data-row]')
        )
    }

    const pieces = [
        null, pawn0, knight0, bishop0, rook0, queen0, king0,
        null, null, null, null,
        pawn1, knight1, bishop1, rook1, queen1, king1
    ];

    return <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0
    }}>
        <table>
            <tbody>
            {gameStatus.board.map(
                (row, rIdx) => <tr key={rIdx}>{
                    row.map(
                        (cell,cIdx) => <td key={cIdx} style={{
                            width: '70px',
                            height: '70px',
                            backgroundColor: (rIdx+cIdx)%2===1? "green" : "white",
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center'
                        }} onClick={(e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                            hint(rIdx, cIdx);
                            console.log(
                                gameStatus.moves[rIdx][cIdx]
                            )
                        }}>
                            <img src={pieces[cell]}/>
                        </td>
                    )
                }</tr>
            )}
            </tbody>
        </table>
    </div>
}