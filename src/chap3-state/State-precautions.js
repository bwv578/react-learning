import {useState} from "react";

export const StatePrecautions = () => {
    const [object, setObject] = useState({id:1, value:1});
    const [array, setArray] = useState([1, 2, 3, 4, 5, 2]);

    return <div>
        <h1>id:{object.id} value:{object.value}</h1>
        <button onClick={() => {
            //object.value = object.value+1; //할당연산자(=) 를 통해 state를 바꾸는건 불가능함.
            setObject({id: object.id, value: object.value + 1});
        }}
        >value+1
        </button>
        <button onClick={() => {
            // spread 연산자 ...을 사용하면 객체의 사본을 만들 수 있다.
            // 사본 생성 후 바꾸려는 키만 명시하면 됨.
            setObject({...object, id: object.id + 1});
        }}
        >id+1
        </button>

        <h1>sequence : {array[0]}{array[1]}{array[2]}{array[3]}{array[4]}{array[5]}</h1>
        <button onClick={() => {
            // 배열의 경우 내장함수를 사용 가능
            // filter : 조건에 맞는 성분만 리턴
            setArray(array.filter(item => item !== 2));
        }}
        >remove 2
        </button>
        <button onClick={()=>{
            // 값이 2이면 6으로 치환
            // map : 배열의 각 요소를 변형
            setArray(array.map(item=>{
               return item===2 ? 6 : item
            }))
        }}
        >change 2 to 6
        </button>

    </div>
}