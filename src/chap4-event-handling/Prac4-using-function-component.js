import {Component, useState} from "react";

// 함수형 컴포넌트로 이벤트처리 구현
export const EventPrac6 = () => {
    const [name, setName] = useState('돼지');
    const [home, setHome] = useState('돼지우리');
    const [food, setFood] = useState('옥수수');
    const [message, setMessage] = useState('꿀꿀');

    return <div>
        <h1>난 {name}</h1>
        <h1>난 {home}에 산다</h1>
        <h1>난 {food}먹는다</h1>
        <h1>{message}</h1>
        <input type="text" name="name" onChange={(e) => {
            setName(e.target.value)
        }}/>
        <input type="text" name="home" onChange={(e) => {
            setHome(e.target.value)
        }}/>
        <input type="text" name="food" onChange={(e) => {
            setFood(e.target.value)
        }}/>
        <input type="text" name="message" onChange={(e) => {
            setMessage(e.target.value)
        }}/>
    </div>
}

// 함수형 컴포넌트에서 여러개의 인풋 이벤트를 하나의 핸들러로 다룰땐 useState를 객체형식으로 초기화해서 구현 가능
export const EventPrac7 = () => {
    const [form, setForm] = useState({
        name : '돼지',
        home : '돼지우리',
        food : '옥수수',
        message : '꿀꿀'
    });

    const handleChange = (e)=>{
        setForm({
           ...form,
           [e.target.name] : e.target.value
        });
    }

    return <div>
        <h1>난 {form.name}</h1>
        <h1>난 {form.home}에 산다</h1>
        <h1>난 {form.food}먹는다</h1>
        <h1>{form.message}</h1>
        <input type="text" name="name" onChange={(e) => {
            handleChange(e);
        }}/>
        <input type="text" name="home" onChange={(e) => {
            handleChange(e);
        }}/>
        <input type="text" name="food" onChange={(e) => {
            handleChange(e);
        }}/>
        <input type="text" name="message" onChange={(e) => {
            handleChange(e);
        }}/>
    </div>
}