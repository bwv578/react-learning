
const Prop1 = (props) => {
    return <div>
        이 태그의 name 속성 값은 {props.name} 이다
    </div>
}

Prop1.defaultProps = {
    name : "기본값"
}

export default Prop1;