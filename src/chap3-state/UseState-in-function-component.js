import {useState} from "react";

export const Say = ()=>{
    const [message, setMessage] = useState('');
    const onClickEnter = () => setMessage('어서오십쇼');
    const onClickLeave = () => setMessage('안녕히가십쇼');

    const [color, setColor] = useState('black');

    return <div>
        <button onClick={onClickEnter}>입장</button>
        <button onClick={onClickLeave}>퇴장</button>
        <h1 style={{color: color}}>{message}</h1>
        <button style={{color: 'red'}} onClick={() => {
            setColor('red')
        }}>빨강
        </button>
        <button style={{color: 'blue'}} onClick={() => {
            setColor('blue')
        }}>파랑
        </button>
        <button style={{color: 'green'}} onClick={() => {
            setColor('green')
        }}>초록
        </button>
    </div>
}