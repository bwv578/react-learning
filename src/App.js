import logo from './logo.svg';
import './App.css';

import {Fragment} from "react";
import {Component} from "react";

export function Apppp() {

    const value1 = 'abcdef';
    const value2 = 35;
    const name = 'reactt';
    const value3 = undefined;

    /**
     * 인라인 스타일링
     */
    const style = {
        backgroundColor: 'green',
        color: 'red',
        fontSize: '50px'
    };

  return (
      /** default */
/*    <div className="App">
      <header className="App-header">
        <h1>나는 리액트다</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/

      /** js block */
      /*<>
        <h1>{value1} abcd</h1>
        <h2>{value2/15} defg</h2>
        <h3>hijk</h3>
      </>*/

      /** if문 */
      /*<div>
          {name==='react' ? (<h1>리액트임</h1>) : (<h1>리액트 아님</h1>)}
      </div>*/

      /**
       * 조건식 && 태그  => 조건이 참일때만 태그 반환
       */
      /*<div>
          {value2>20 && <h1>으ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</h1>}
      </div>*/

      /** undefined 반환하면 오류난다 > ||연산자 써서 조치 */
      //<div style={style}>{value3 || '대신 사용할 값'}</div>

      /** 인라인 스타일랑 */
      //<div style={style}>나는 리액트다 아아아아아아아아</div>

      /**
       * 클래스넣기
       * 주석처리
       */
      <>
          <div>기본 태그</div>
          <div className="example">개쩌는 CSS가 적용된 클래스 입니다</div>
          <div className="example2" // 태그 여러줄로 사용할거면 이렇게 주석처리 사용 가능
          >
              // 주석처리 안되는 내용
              /** 안돼 */
          </div>
      </>

  );
}

export class App extends Component{
    render() {
        const name = 'react';
        return (
            <div className="example">
                {name}
            </div>
        )
    }
}

/*export class App;
export function Apppp;*/
