export const Proptest = (props)=>{
    const {name="기본값"} = props;
    return <div>
        <h1>내 이름은 {name}임</h1>
        <h2>난 {props.location} 출신이다</h2>
    </div>
}

export const Proptest2 = props => {
    const {name, location} = props;
    return <div>
        <h1>내 이름은 {name}임</h1>
        <h2>나는 {location} 출신이다</h2>
    </div>
}

export const Proptest3 = ({name, location}) => {
    return <div>
        <h1>이름 : {name}</h1>
        <h1>지역 : {location}</h1>
    </div>
}