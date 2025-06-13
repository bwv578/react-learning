import {useState} from "react";
import {Component} from "react";

// 함수형 컴포넌트로 하기
export const EventPrac2 = () => {
    const [title, setTitle] = useState('기본 제목');
    return <div>
        <h1>제목 : {title}</h1>
        <input type="text" placeholder="바꿀 제목을 입력하십쇼" onChange={(e)=>{
            setTitle(e.target.value);
        }}/>
    </div>
}

// 클래스형 컴포넌트로 하기
export class EventPrac3 extends Component{
    constructor(props) {
        super(props);
        this.state = {
            body: '기본 본문',
            writer: '홍길동'
        };
    }

    render(){
        const {body, writer} = this.state;
        return <div>
            <h2>본문:{body}</h2>
            <h2>작성자:{writer}</h2>

            <br/>
            <input type="text" placeholder="바꿀 내용을 입력하십쇼" onChange={(e)=>{
                this.setState({body: e.target.value});
            }}/>
        </div>
    }
}

// 이벤트 핸들링 함수를 미리 만들어둬서 가독성 높이기
export class EventPrac4 extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: '기본메시지'
        };
        // js에서 클래스 메소드는 기본적으로 this가 자동 바인드되지 않음. 생성자 내부에서 직접 this를 연결해줘야됨.
        // this가 현재 클래스의 인스턴스를 가리키도록 강제함
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({
            message: e.target.value
        });
    };

    // 화살표함수를 쓰면 생성자에서 굳이 this를 바인드할 필요가 없다.
    // this는 선언된 시점에 결정되는데, 정의될 당시의 상위스코프를 캡처한다.
    // 화살표함수에서의 this는 handleEvent가 아닌 클래스 인스턴스를 가리키기 때문에 바인드 안해도 되는거임
    handleEvent = (e)=>{
        this.setState({
            message: e.target.value
        });
    }

    render() {
        const {message} = this.state;
        return <div>

            <h1>message : {message}</h1>
            일반함수 사용 &nbsp;
            <input type="text" onChange={this.handleChange}/>
            <br/>
            화살표함수 사용 &nbsp;
            <input type="text" onChange={this.handleEvent}/>
        </div>
    }
}