import{Component} from "react";

export class EventPrac1 extends Component{
    render(){
        return <div>
            <h1>이벤트연습1</h1>
            <input type="text"
                   onChange={(e)=>{
                       console.log(e); // 이벤트 객체 (브라우저의 네이티브 이벤트를 감싸는 SyntheticEvent)
                       console.log(e.target.value); // 이벤트에서 앞으로 변할 값 추출
                   }}
            />
        </div>
    }
}