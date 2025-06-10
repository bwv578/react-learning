
1. 리액트 이해
   
	1. 뷰만 신경씀
	   
	2. 리액트는 라이브러리지 프레임워크가 아니다. 진짜 뷰만 신경쓰니까 뷰 제외 기능들은 니가 알아서 구현해야됨
	
	3. 초기랜더링 -> 리랜더링
		1. 초기랜더링: 컴포넌트가 어케생겼는지 정의
		2. render()함수 사용
		3. render()는 html반환하는게 아니고 걍 view가 어케생겼는지/어케작동하는지 정보를 담은 객체 반환
		4. 내부에 하위 컴포넌트들이 들어갈 수 있으며 render()실행시 하위 모든 컴포넌트들 재귀적으로 랜더링 => html 생성 => DOM에 주입
		
	4. 뷰가 바뀔때 수정하는게 아니고 뷰를 갈아끼워버림 (업데이트X 조회O) = 리랜더링

	5. 리랜더링시 반환된 정보를 그대로 DOM에 반영하는게 아니고 기존 DOM정보랑 비교해서 차이 연산 => 최소한의 수정된 부분만 반영
		1. DOM 직접사용 대신 Virtual DOM 사용
		2. 기존 자바스크립트처럼 DOM 바뀌면 전체 CSS연산하고 레이아웃 구성하고.. 염병떠는 대신 Virtual DOM의 수정된 사항만 연산해서 실제 DOM에 적용
		

 2. 환경설정
    
	 1. Node.js 설치 (=크롬V8 자바스크립트 엔진으로 빌드된 런타임)
		 1. 리액트는 걍 js라이브러리인데 이걸 왜설치함? => 그냥 프로젝트 개발 주요 도구들이 Node.js씀;;
		 2. Node.js설치하면 npm설치됨(패키지매니저)
			 1. 먼저 nvm설치 (버전별로 Node.js 설치하게 해주는 도구)
			 
				 ```bash curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash ``` 
				 
				 1. =url에서 스크립트 받아가지고 bash에서 바로 실행 => 깔림
			 2. 리눅스 : nvm install --lts (Node.js 최신버전 설치)
			 3. 윈도우는 걍 Node.js 공홈가서 설치
			 4. node -v 로 설치 확인

3. 프로젝트 만들기
   
	1. npm init react-app <프로젝트명>
	   
	2. npm start => 구동
		1. 이거 로컬호스트에 왜뜸
			1. > Node.js 자체에 서버실행 가능한 코드 들어있음
		2. 스프링+톰캣 프로젝트의 프론트부분에만 적용 어케함
			1. > 리액트 프로젝트를 npm run build로 빌드해서 스프링 프로젝트 webapp/..에 집어넣고 컨트롤러에서 서빙시키셈 (아직안해봄)
			   
	3. 프로젝트 들가보면 app.js 있음
		1. function app() = 이게 App이란 컴포넌트를 반환하고있는거임
		2. 이런게 함수 컴포넌트다. 
		3. 프로젝트에서 컴포넌트를 랜더링한다 = 함수에서 반환하는 내용을 나타낸다
		   
	4. JSX
		1. 위에서 본 코드들은 HTML도 아니고 문자열 템플릿도 아님. JSX(자바스크립트 확장 문법)코드임
		   
		2. 상단 import 구문들로 외부 코드/요소 번들링 
			1. 이때 쓰는게 번들러임. 합쳐진 코드뭉탱이 생성
			2. 웹팩 등
			   
		3. JSX는 번들링과정에서 바벨을 통해 일반 자바스크립트 코드로 바뀜. return 태그태그태그..... => return React.createElement(......) 이런식으로 
		   
		4. index.js 가보면 app.js 를 통째로 걍 html 태그처럼 쓰고있는거 확인 ㄱㄴ
		   
		5. 이상한게 index.js랑 index.html 양쪽에서 서로 경로를 가리키거나 import하는 부분이 없는데 index.js에서 
			```javascript 
			const root = ReactDOM.createRoot(document.getElementById('root')); 
			``` 
			이렇게하면 실제로 index.html의 root id를 가진 컴포넌트 태그를 실제로 지정 가능
			이거 왜됨?
			==서로 파일 참조관계나 번들링같은거 상관 없음.  저기서document.getElementById('root')는 브라우저 내장 DOM API임.==
			자바스크립트가 현재 열린 페이지 내에서 직접 DOM 탐색하는거임
