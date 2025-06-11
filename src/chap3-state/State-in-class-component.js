import {Component} from "react";

export class StateInClassComponent extends Component{

    constructor(props) {
        super(props);
        this.state = { // state의 초기값 설정
            btn1Clicked: 0,
            btn2Clicked: 0,
            btn3Clicked: 0,
            btn4Clicked: 0,
            btn5Clicked: 0,
            btn6Clicked: 0
        }
    }

    render() {
        const {btn1Clicked, btn2Clicked} = this.state; // state 조회시 this.state 로 조회

        return <div>
            <h1>버튼1 누른횟수 : {btn1Clicked}</h1>
            <button
                onClick={() => {
                    this.setState({btn1Clicked: btn1Clicked + 1})
                }}
            >버튼1
            </button>

            <br/>

            <h1>버튼2 누른횟수 : {btn2Clicked}</h1>
            <button
                onClick={() => {
                    this.setState({btn2Clicked: btn2Clicked + 1})
                }}
            >버튼2
            </button>
            `
            <br/>

            <h1>버튼3 누른횟수 : {this.state.btn3Clicked}</h1>
            <button
                onClick={() => {
                    this.setState({btn3Clicked: this.state.btn3Clicked + 1})
                }}
            >버튼3
            </button>

            <br/>

            <h1>버튼4 누른횟수 : {this.state.btn4Clicked}</h1>
            <button
                onClick={() => {
                    // 이렇게해도 2씩 안더해짐
                    // this.setStatus() 한다고 바로 state값이 바뀌는게 아니라서그럼 ㅇㅇ
                    // this.state.btn4Clicked+1 까지만 계산해놓고 업데이트는 이후에 진행되는거
                    this.setState({btn4Clicked: this.state.btn4Clicked + 1});
                    this.setState({btn4Clicked: this.state.btn4Clicked + 1});
                }}
            >버튼4
            </button>

            <h1>버튼5 누른횟수 : {this.state.btn5Clicked}</h1>
            <button
                onClick={() => {
                    // 이런식으로 this.setState() 호출시 prevState를 인자로 받아 업데이트할 내용을 리턴하는 함수를 사용하면 state를 바로 업데이트 가능.
                    this.setState(prevState=>{
                        return {
                            btn5Clicked:prevState.btn5Clicked+1
                        }
                    });
                    this.setState(prevState=>{
                        return {
                            btn5Clicked:prevState.btn5Clicked+1
                        }
                    });
                    // 리액트에서 코드블록{} 을 생략하면 return 생략하고 바로 리턴 가능.
                    // 여기선 객체형식으로 반환해야되는데 prevState=>{} 식으로 써버리면 코드블록 형태로 인식되기 때문에 겉에 () 추가 필요.
                    this.setState(prevState=>({
                        btn5Clicked:prevState.btn5Clicked+1
                    }));
                }}
            >버튼5
            </button>

            <h1>버튼6 누른횟수: {this.state.btn6Clicked}</h1>
            <button onClick={()=>{
                this.setState(prevState=>({
                    btn6Clicked:prevState.btn6Clicked+1
                }), ()=>{
                    // this.setState()의 두번째 인자로 함수를 집어넣으면 state 업데이트후 실행할 콜백함수로 사용 가능함
                    alert("setState 호출됨");
                });
            }}
            >버튼6
            </button>
        </div>
    }
}