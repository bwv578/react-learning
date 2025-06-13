import {Component} from "react";

export class EventPrac5 extends Component{

    constructor(props) {
        super(props);
        this.state = {
            name: '돼지',
            home: '돼지우리',
            food: '옥수수',
            message: '꿀꿀'
        }
    }

    // 객체형식의 키를 []로 감싸면, 내부의 레퍼런스가 가리키는 실제 값을 키로 사용할 수 있다.
    handleEvent = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    render() {
        const {name, home, food, message} = this.state;

        return <div>
            <h1>나는 {name}이다.</h1>
            <h1>내가 사는 곳은 {home}다.</h1>
            <h1>난 {food}를 먹는다.</h1>
            <h1>{message}</h1>
            <br/>
            <input type="text" name="name" onChange={this.handleEvent} />
            <input type="text" name="home" onChange={this.handleEvent} />
            <input type="text" name="food" onChange={this.handleEvent} />
            <input type="text" name="message" onChange={this.handleEvent} />
        </div>
    }
}