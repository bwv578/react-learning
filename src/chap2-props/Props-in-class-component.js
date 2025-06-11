import {Component} from "react";

// 그냥 사용
export class PropsInClassComponent extends Component{
    render() {
        const {name, location, food} = this.props; // 비구조화 할당
        return <div>
            <h1>나는 {name} 다</h1>
            <h1>나는 {location} 에 산다</h1>
            <h1>나는 {food} 를 먹는다</h1>
        </div>
    }
}

// 기본속성 부여
export class PropsInClassComponent2 extends Component{
    static defaultProps = {
        name: "똥파리"
    }
    render() {
        const {name, location, food} = this.props; // 비구조화 할당
        return <div>
            <h1>나는 {name} 다</h1>
            <h1>나는 {location} 에 산다</h1>
            <h1>나는 {food} 을 먹는다</h1>
        </div>
    }
}