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

    let [match, setMatch] = useState(false);
    let [gameStatus, setGameStatus] = useState({
        turn: 0,
        board: [],
        moves: [],
    });
    let [info, setInfo] = useState({
        selected: [],
        hints: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]
    });
    let [instruction, setInstruction] = useState({
        from: [],
        to: []
    })

    useEffect(() => {
        randomJoin();
    }, []);
    useEffect(() => {
        movePiece();
    }, [instruction.to]);

    const randomJoin = () => {
        fetch('/battleField/chess/randomJoin', {
            method: 'POST'
        })
            .then(res=>res.json())
            .then(data=>{
                switch (data.MSG){
                    case 'DENIED':
                        alert("MATCH DENIED");
                        return;

                    case 'MATCHED':
                        setGameStatus({
                            board: data.board,
                            moves: data.moves
                        })
                        updateGameStatus(1);
                        return;

                    case 'WAITING':
                        updateGameStatus(0);
                        return;
                }
            })
            .catch(err=>console.log(err));
    }

    const updateGameStatus = (pending) =>{
        alert('update');
        fetch('/battleField/chess/chessBoard?pending='+pending)
            .then(res=>res.json())
            .then(data => {
                setGameStatus(data);
                updateGameStatus(1);
            })
            .catch(err => console.log(err));
    }

    const hint = (moves)=>{
        let newHints = Array(8).fill().map(() => Array(8).fill(0));
        for(let move of moves){
            newHints[move[0]][move[1]] = 1;
        }
        setInfo({
            ...info,
            hints: newHints
        });
    }

    const movePiece = ()=>{
        fetch('/battleField/chess/move', {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(instruction)
        })
            .then(res=>res.json())
            .then(data=>{
                if(data===true) alert('move success');
                    //updateGameStatus(0);
            })
            .catch(err=>{alert('err')})
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
                            backgroundColor: info.selected[0]===rIdx && info.selected[1]===cIdx? 'yellow' :
                                (rIdx+cIdx)%2===1? "green" : "white",
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            position: 'relative'
                        }} onClick={(e)=>{
                            e.preventDefault();
                            e.stopPropagation();

                            const selected = info.hints[rIdx][cIdx]===0;
                            if(selected){
                                setInfo({
                                    ...info,
                                    selected: [rIdx, cIdx]
                                });
                                hint(gameStatus.moves[rIdx][cIdx]);
                                setInstruction({
                                    ...instruction,
                                    from: [rIdx, cIdx]
                                })
                            }else{
                                setInstruction({
                                    ...instruction,
                                    to: [rIdx, cIdx]
                                })
                            }
                        }}>
                            <img src={pieces[cell]}/>
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '20px',
                                height: '20px',
                                backgroundColor: 'cyan',
                                borderRadius: '50%',
                                opacity: 0.7,
                                pointerEvents: 'none',
                                visibility: info.hints[rIdx][cIdx]===0? 'hidden' : 'visible'
                            }} />
                        </td>
                    )
                }</tr>
            )}
            </tbody>
        </table>
    </div>
}