
#JSX

1. 함수 컴포넌트에서 여러 태그를 return하는 경우 얘네를 무조건 하나의 부모 태그로 감싸서 반환해야된다.
	1. 왜냐 하나의 트리구조로 만들기 위해서임 그래야지 Virual DOM으로 만들었을때 변경사항 추척할때 효율적임
		1. DIV쓰기싫은데요? => <> 태그(Fragment기능) 사용하면 됩니다
			1. impot {Frangment} from 'react';
			   
2. JSX 내부에서 자바스크립트 표현 사용 가능
   
	1. {} 안에다 js코드 집어넣으면 됨 ㅇㅇ
		1. JSX 내부 js표현에는 if문 사용 못한다. 대신 삼항연산자 쓰면 됨.
			```return ( <div>{name==='react' ? (<h1>리액트임</h1>) : (<h1>리액트 아님</h1>)}</div>);```
			이런식으로 ㅇㅇ
				
	2. null 반환하면 컴포넌트 아무것도 안보여짐.
	   
	3. && 연산자를 아주 신박하게씀
		1. return {조건식 && 태그} 이렇게쓰면 조건식이 참일때만 태그를 반환함 ㅁㅊ??	
		2. 주의할 점 - falsy한 값 0은 예외적으로 화면에 보여진다.
		
	4. undefined 반환하면 오류난다
		1. 어떤 값이 undefined일수도 있는 상황이면 || 연산자를 쓰렴
		2. {값 || '값이 undefined임'} 이런 식으로 사용하면 주어진 값이 undefined일때 두번째 항의 문자열을 반환한다
		
3. 인라인 스타일링
   
	1. DOM 요소에 스타일 적용할땐 문자열 형태가 아니라 객체 형태로 넣어야됨
	2. -이 포함되는 스타일 이름은 대신 카멜케이스로 표현
	3. 대충 이런식으로 쓰면 된다

```jsx
const style = {  
    backgroundColor: 'green',  
    color: 'red',  
    fontSize: '50px'  
};
return <div style={style}>개쩌는 스타일</div>
```

4. 태그에 클래스 설정
	1. class 가 아니고 className="reactClass" 이런식으로 태그에 설정하면됨
```jsx
return (
	<>  
	    <div>기본 태그</div>  
	    <div className="example">개쩌는 CSS가 적용된 클래스 입니다</div>  
	</>
)
```
		이런식으로 하고 css파일에 example 클래스 효과 설정해두면 적용됨 ㅇㅇ


4. JS표현식에서 주석달기
	1. 태그 선언부(꺾쇠 내부)에서는 //나 /** */ 로 주석 사용 가능
	 ``` jsx 
	 {/** 주석내용 */}
``` 
	2. 태그 내부에선 이런식으로 주석 사용 안됨ㅇㅇ 그대로 화면에 표시됨
	3. 해보니까 태그 안에서는 <!-- --> 이런식으로도 주석 안먹힘 걍 컴파일오류남



#컴포넌트 및 props

1. 함수형 & 클래스형 컴포넌트
	1. 지금까지 본건 함수형 컴포넌트임 (return ... 뭐시기)
```jsx
import {Component} from "react";

class App extends Component{  
    render() {  
        const name = 'react';  
        return (  
            <div className="example">  
                {name}  
            </div>  
        )        
    }  
}
```
	 이렇게 Component를 상속하는 클래스형 컴포넌트 사용 가능
	 
	 2. 기능은 함수형 컴포넌트랑 같긴 한데 차이점도 있음
		 1. state 기능 사용 ㄱㄴ
		 2. 라이프사이클 사용 ㄱㄴ
		 3. 임베디드 메소드 사용 ㄱㄴ
		 4. 내부에 render()함수 무조건 구현하고 여기서 태그 반환해야됨
		    
		근데 Hooks라는 기능 도입돼서 함수형도 state/라이프사이클 이제 사용 가능

2. 컴포넌트 생성
	1. src 경로 아래에다가 js파일 생성하고 아래처럼 컴포넌트 생성
```js
const MyComponent = ()=>{  
    return <div>이건 함수형 컴포넌트다</div>  
}
```


3. 컴포넌트 모듈 내보내기 / 불러오기
   
	1. export default = 이 파일을 import하면 export default 된 컴포넌트를 자동으로 뱉는다 
```js
	export default MyComponent;
```

	2. 아니면 함수나 클래스 선언부에 직접 export 박아버려도 됨 
	   => 하나의 js파일에서 여러 컴포넌트 export 가능 
```jsx
	export const MyComponent2 = ()=>{  
		return <div>함수형 컴포넌트 (3)</div>  
	}

	export const MyComponent3 = ()=>{  
		return <div>함수형 컴포넌트 (4)</div>  
	}
```

	3. index.js - default export 된거 import하기
```jsx
import MyComponent from "./ComponentPrac250530";

const root = ReactDOM.createRoot(document.getElementById('root'));  
root.render(  
  <React.StrictMode>  
      <MyComponent />  
  </React.StrictMode>  
);
```

	4. index.js - 하나의 js파일에서 여러 컴포넌트 import해서 쓰기
```jsx
import {MyComponent2, MyComponent3} from "./ComponentPrac2_250530";

const root = ReactDOM.createRoot(document.getElementById('root'));  
root.render(  
  <React.StrictMode>   
      <MyComponent2 />  
      <MyComponent3 />  
  </React.StrictMode>  
);
```



4. 컴포넌트 속성 (props)
	1. 컴포넌트에서 jsx 표현식 안에서 파라미터로 받은 속성 사용 
	   => 컴포넌트를 사용시 태그에서 속성값을 지정하면 화면에 해당 값 표출 ㄱㄴ

prop1.js
```jsx
const propTest1 = (props) => {  
    return <div>  
        이 태그의 name 속성 값은 {props.name} 이다  
    </div>  
}  
export default propTest1;
```
index.js
```jsx
import PropTest1 from "./prop1";  
  
const root = ReactDOM.createRoot(document.getElementById('root'));  
root.render(  
  <React.StrictMode>  
      <PropTest1 name='dd' />  
  </React.StrictMode>  
);
```

	2. 속성의 기본값 설정
		1. defaultProps 설정하는 방식은 이제 지원 안함
		2. 컴포넌트 내부에서 디폴트값을 가져야 하는 속성은 내부에서 JSX 표현식으로 기본값 
		   선언 후 파라미터로 받는 속성객체의 특정 키를 할당하면 됨

Proptest.js
```JSX
const Proptest = (props)=>{  
    const {name="기본값"} = props;  
    return <div>  
        <h1>내 이름은 {name}임</h1>  
        <h2>난 {props.location} 출신이다</h2>  
    </div>  
}  
  
export default Proptest;
```

index.js
```JSX
import Proptest from "./Proptest";

const root = ReactDOM.createRoot(document.getElementById('root'));  
root.render(  
  <React.StrictMode>  
	  <Proptest />  
      <Proptest name="홍길동" />  
      <Proptest location="경상도" />  
  </React.StrictMode>  
);
```


	3. 비구조화 할당 문법
		1. 별건 아니고 그냥 컴포넌트 내부에서 props의 형태를 명시하고 여기에 인자로 받은 
		   속성을 할당하면 
		   => {props.name} 이런식으로 쓰던걸 {name} 이렇게 간단히 쓸수있음

Proptest.js
```JSX
export const Proptest2 = props => {  
    const {name, location} = props;  
    return <div>  
        <h1>내 이름은 {name}임</h1>  
        <h2>나는 {location} 출신이다</h2>  
    </div>  
}
```
index.js
```JSX
import {Proptest, Proptest2} from "./Proptest";

const root = ReactDOM.createRoot(document.getElementById('root'));  
root.render(  
  <React.StrictMode>  
      <Proptest2 />  
      <Proptest2 name="홍길동" />  
      <Proptest2 location="경상도" />  
      <Proptest2 name="윤석열" location="서울"/>  
  </React.StrictMode>  
);
```
		
		2. 또는 애초에 함수형 컴포넌트에서 파라미터로 속성값 받을때 분해된 속성들로 받을수도 
		   있음. 속성명으로 알아서 매핑됨.
Proptest.js
```JSX
export const Proptest3 = ({name, location}) => {  
    return <div>  
        <h1>이름 : {name}</h1>  
        <h1>지역 : {location}</h1>  
    </div>  
}
```
index.js
```JSX
import {Proptest3} from "./Proptest";
const root = ReactDOM.createRoot(document.getElementById('root'));  
root.render(  
  <React.StrictMode>  
      <Proptest3 name="돼지" location="돼지우리"/>  
  </React.StrictMode>  
);
```


	2. 클래스형 컴포넌트에서 props 사용
Props-in-class-component.js
```JSX
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
```

index.js
```JSX
import {PropsInClassComponent, PropsInClassComponent2} from "./Props-in-class-component";  
  
const root = ReactDOM.createRoot(document.getElementById('root'));  
root.render(  
  <React.StrictMode>  
      <PropsInClassComponent name="개" location="개집" food="개사료"/>  
      <br/>  
      <PropsInClassComponent2 location="시궁창" food="똥"/>  
  </React.StrictMode>  
);
```


#state


1. state
	1. 컴포넌트 내부에서 바뀔 수 있는 값
	2. state는 constructor 메소드 내부에서 설정
		1. 생성자함수 내부에선 반드시 super(props) 호출 필요
		2. this.state = {...} 형식으로 설정 (객체형식)
```JSX
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
    return ...
    }
```
	1. render() 함수 내부에서 state를 조회할땐 this.state로 조회
		1. 해보니까 조회 후 지역변수에 할당 안하고 그냥 this.state.~ 식으로 바로 값 꺼내다 쓸수 있음.
	2. this.setState로 state 변경 가능
		1. 변경시 해당 state를 조회하는 부분들 바로 변경 적용됨 (비동기적으로 업데이트)
	3. this.setState({...})에서 안에다가 명시 안한 state 키들은 값 변경만 없을 뿐이고 사라지는거 아님.
	4. 리액트는 여러 setState 호출을 하나로 병합(batch) 처리함.
		1. 하나의 함수 내에서 setState가 여러번 호출돼도 업데이트할 값을 현재 state 기준으로 계산 후 대기, 이후 한번에 업데이트 수행 
		2. 따라서 한 함수 내에서 setState({속성: 현재값+1}) 식으로 여러번 호출해도 결국 1씩만 올라감
		3. 이에 대한 해결책으로 this.setState(prevState, props)=>{return 업데이트할 내용} 사용이 가능함. 
			1. prevState는 기존상태, props는 필요없으면 생략가능.
			2. 리액트에서 코드블록{} 을 생략하면 return 생략하고 바로 리턴 가능.
			
<버튼 클릭시 state 속성값에 +1 하는 예시 - 클래스형 컴포넌트의 render 메소드 내부에서> 
```JSX
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
        }))  
    }}  
>버튼5  
</button>
```

	7. .setState()의 두번째 인자로 함수를 집어넣으면 state 업데이트후 실행할 콜백함수로 
	   사용 가능함.
```JSX
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
```


	8. 함수형 컴포넌트에서 useState 사용
		1. 리액트 16.8버전부터 함수 컴포넌트에서 useState 사용 가능.
		2. 배열 비구조화 할당
			1. 비구조화 할당 사용 이전 코드
```JSX
	const array = [1, 2];
	const one = array[0];
	const two = array[1];
```
			2. 비구조화 할당 적용한 코드
```JSX
	const array = [1, 2];
	const [one, two] = array;
```

		3. useState() 함수의 인자에는 상태의 초기값을 넣는다.
		4. 클래스형 컴포넌트에서 상태는 객체여야 하지만 useState 내부에 들어가는 초기값은 
		   객체여야만 할 필요가 없다. 문자, 배열, 숫자, 객체 등등 다 가능함.
		5. useState() 함수는 배열을 반환한다. 배열의 첫 인자는 현재 상태, 두번째 인자는 
		   상태의 setter함수이다.
```JSX
import {useState} from "react";  
  
export const Say = ()=>{  
    const [message, setMessage] = useState('');  
    const onClickEnter = () => setMessage('어서오십쇼');  
    const onClickLeave = () => setMessage('안녕히가십쇼');  
  
    return <div>  
        <button onClick={onClickEnter}>입장</button>  
        <button onClick={onClickLeave}>퇴장</button>  
        <h1>{message}</h1>  
    </div>  
}
```
> 이렇게 하면 입장버튼과 퇴장버튼 클릭시 각각 상황에 맞는 메시지가 화면에 업데이트된다.

		6. useState는 하나의 컴포넌트에서 여러번 사용해도 무방하다.
		7. state 사용시 주의점
			1. state 값을 바꿔야할땐 클래스형 컴포넌트에선 setState, 함수형 컴포넌트에선
			   useState로 반환받은 setter함수를 사용해야만 한다. 
			   단순히 this.state.특정속성 = 새로운값; 식으로 =를 통해 할당하는 코드는 
			   작동하지 않음. 
			2. 객체나 배열을 다룰땐 해당 객체나 배열의 사본을 만들고 이를 변형 및 state
			   업데이트에 적용









