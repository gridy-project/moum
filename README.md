## [모음 - moum](https://moum.cloud/)
![OG](https://user-images.githubusercontent.com/87969561/182757470-a9d5e986-eb55-4ab2-afe8-15926e58147e.png)

## 관련 자료

발표영상 [바로가기](https://youtu.be/iqAPE-S5U0Y) <br />
발표자료 [바로가기](https://docs.google.com/presentation/d/1oUR1FTfab3gZJ-425_0NAHIrWwfS60ne/edit?usp=sharing&ouid=114270280051508663065&rtpof=true&sd=true) <br />
팀 노션 주소 [바로가기](https://hanghae.notion.site/moum-d1945da49e7b40deaf5edb9103614d1f) <br />
사이트 바로가기 : [바로가기](https://moum.cloud/) <br />

## Github

프론트엔드 GitHub : [바로가기](https://github.com/reality023/moum) <br />
백엔드 GitHub : [바로가기](https://github.com/Mmuseng/hanghae99_finally_project_6) <br />

### 팀원 소개
<details>
  <summary>DESIGNER</summary>
  <ul>
    <li>윤수현</li>
  </ul>
</details>
<details>
  <summary>FRONTEND</summary>
  <ul>
    <li>박수봉 (팀장)</li>
    <li>지송이</li>
  </ul>
</details>
<details>
  <summary>BACKEND</summary>
  <ul>
    <li>김민주 (부팀장)</li>
    <li>백현명</li>
    <li>서다빈</li>
  </ul>
</details>

### <span>모음(moum)</span> 소개
- 가끔 급하게 카카오톡이나 메모장에 링크 혹은 메모를 붙여넣고 나중에 가져다 쓰신 적이 있지 않으신가요?
- 모음(moum)은 그런 메모와 링크 혹은 그 이외의 간단한 정보들을 따로 모아서 빠르게 추가하고 보관할 수 있다면 어떨까? 라는 생각에서 나왔습니다

### 서비스 아키텍처
<img width="1100" alt="그림1" src="https://user-images.githubusercontent.com/87969561/183245200-66e20ad3-68ba-4aa5-b020-3f7da5169ed4.png">

### 기술 선정 이유

프론트엔드에서는 프론트엔드가 백엔드보다 인원이 적은 점을 고려하여 빠른 작업속도에 초점을 맞추어 기술을 선정하게 되었습니다. 각 프레임워크의 기술 선정 이유는 아래에서 확인할 수 있습니다.

<details>
  <summary>React</summary>
  <ul>
    <li>프론트 프레임워크 중에서 가장 많이 사랑받고 있는 프레임워크이며, 인터넷에서 더 많은 레퍼런스를 참고할 수 있고, 타 프레임워크에 비해 javascript에 대한 더 많은 이해도를 요구하기 때문에 학습용으로 더 적합하다 판단하여 사용했습니다.</li>
  </ul>
</details>
<details>
  <summary>Axios</summary>
  <ul>
    <li>React에서 가장 많이 사용되는 HTTP 비동기 통신 라이브러리로, fetch api와 다르게 라이브러리이기 때문에 더 많은 편의 기능을 제공해주어 사용했습니다.</li>
  </ul>
</details>
<details>
  <summary>React Query</summary>
  <ul>
    <li>기존에 리덕스 툴킷을 사용하여 서버 상태관리와 전역 상태관리를 하였는데, 프론트 인원이 더 적어 백엔드의 구현속도에 따라 가기 위해 더 빠르게 작업할 방법을 찾다 서버 상태관리를 대신 해주는 React Query를 알게 되었습니다. 알게 된 이후, 빠르게 서버 상태 관리 코드를 전부 리액트 쿼리로 교체하고 작업하게 되었습니다.</li>
  </ul>
</details>
<details>
  <summary>Recoil</summary>
  <ul>
    <li>더 빠른 작업 속도를 위해 리액트 쿼리를 도입하고 나서 전역 상태 관리에 대해서도 고민하게 되었습니다. 서버 상태 관리가 리액트 쿼리로 빠지면서 관리해야 할 전역 상태의 크기가 작아졌고, 그에 따라 전역 상태를 리덕스로 관리하는 것보다 더욱 쉽게 관리할 수 있는 전역 상태 관리 라이브러리를 사용해도 되겠다고 판단하였습니다. 그래서 useState와 같이 전역 상태를 관리할 수 있는 Recoil이라는 전역 상태 관리 라이브러리를 알게 되었고 적용하게 되었습니다.</li>
  </ul>
</details>
<details>
  <summary>Styled Components</summary>
  <ul>
    <li>CSS-in-JS의 대표적인 라이브러리로 컴포넌트 자체에 바로 CSS를 작성할 수 있기 때문에 css, sass 파일을 작성하여 임포트하는 것보다 작업 속도와 유지 보수 측면에서의 이점을 가지고 있어 사용하게 되었습니다.</li>
  </ul>
</details>
<details>
  <summary>tailwind CSS</summary>
  <ul>
    <li>styled-components로 작업을 진행하다가 tailwind CSS라는 것을 알게 되었습니다. tailwind CSS를 사용하면 css 작업 속도가 훨씬 빨라진다는 점을 알게 되었지만, styled-components를 이미 많이 작성한 상태였습니다. 여기서 twin.macro를 사용하면 두개를 병행하여 사용할 수 있고 서로의 장단점을 어느정도 상충할 수 있다는 것도 알게 되어 바로 적용하게 되었습니다.</li>
  </ul>
</details>

### 🗓 프로젝트 기간
- 2022년 6월 24일 ~ 2022년 08월 05일

### 모음 페이지 소개
<details>
  <summary>펼치기</summary>
  <div>

> 홈
> 
> ![Aug-07-2022 20-22-05](https://user-images.githubusercontent.com/87969561/183288156-022fc975-8390-40e6-a6de-9daf7c6517be.gif)

> 로그인
> 
> ![Aug-07-2022 20-29-59](https://user-images.githubusercontent.com/87969561/183288411-fdeef1ff-9d14-458e-8208-ce3aaa71a2d5.gif)

> 나의 모음
>
> ![Aug-07-2022 20-32-29](https://user-images.githubusercontent.com/87969561/183288488-d8568a7f-129f-4c6e-a440-b05f08ea0f78.gif)

> 전체 모음
> 
> ![Aug-07-2022 20-35-03](https://user-images.githubusercontent.com/87969561/183288598-c048ca6e-1f3d-4e90-9bce-d0bbf110368f.gif)


> 다른 사용자 모음
> 
> ![Aug-07-2022 20-36-35](https://user-images.githubusercontent.com/87969561/183288657-39f9e7c9-8c1f-4269-985c-2197bbc1541d.gif)

  <div>
</details>

### 모음 기능 소개
- 일반 로그인
- 소셜 로그인 (구글)
- 액세스 토큰 만료시 리프레시 토큰을 사용한 토큰 재발급
- 모음 CRUD
- 조각 CRUD
- 모음 및 조각 검색
- 유저 팔로우, 언팔로우
- 팔로우한 유저 목록
- 모음 스크랩, 스크랩한 모음 목록 보기
- 다른 유저의 조각을 내 조각으로 저장하기
- 빠른 조각 추가시 하단 플로팅 박스로 상세 작성하기 가능

### 유저 피드백 이후 개선한 점
- 모음 페이지 사용법에 대한 설명 팝업 제작
- 하단에서 최상단으로 가는 스크롤 버튼 생성
- 각 버튼에 인터렉션 추가
- 더 작은 화면에서 로그인 화면이 깨지지 않도록 스타일 조정
- 소셜 로그인 잘 보이게 컬러 수정
- 각 이벤트 성공시 나오던 팝업 -> 토스트 메시지로 교체
- 로그인 이후 홈 화면 -> 나의 모음으로 변경
- 나의 모음 하단에서도 조각을 추가할 수 있도록 하단에 조각 추가 팝업 제작
- 모음 소개 메뉴 삭제 -> 홈 화면이 모음 소개 페이지
- 로그인시 입력 값이 없을 경우 안내 문구 추가
- 각종 버그 FIX
  
더 자세한 설명을 보시려면 아래 노션 링크를 참고해 주세요

[노션링크 바로가기](https://neat-apartment-b02.notion.site/moum-625b66e189ee4151b21f2f60e8935582)


### 기술스택
<p>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
  <img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
  <img src="https://camo.githubusercontent.com/41326de293d3848e2ab0f29bf1680427128757fe6b586ceddf1097cb4eeb5ff7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f7374796c65642d2d636f6d706f6e656e74732d4442373039333f7374796c653d666f722d7468652d6261646765266c6f676f3d7374796c65642d636f6d706f6e656e7473266c6f676f436f6c6f723d7768697465" alt="Styled Components" data-canonical-src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&amp;logo=styled-components&amp;logoColor=white" style="max-width: 100%;">
  <br />
  <img src="https://camo.githubusercontent.com/469d51dd03eb2bea7080300247476ae376048af66c8040c2047afa2312e2c052/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5265636f696c2d3030376166342e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d646174613a696d6167652f7376672b786d6c3b6261736536342c50484e325a7942705a443069513246736358566c587a45694947526864474574626d46745a543069513246736358566c49444569494868746247357a50534a6f644852774f693876643364334c6e637a4c6d39795a7938794d4441774c334e325a794967646d6c6c64304a76654430694d434177494449314e5334794d5341324d6a4d754f544569506a786b5a575a7a506a787a64486c735a5434755932787a4c5446375a6d6c736244703361476c305a5830384c334e306557786c506a77765a47566d637a3438634746306143426a6247467a637a30695932787a4c54456949475139496d30334e4334324d6941794e7a63754e4459674d5334794e4330754d544d674d7a51754e7a67744d7934794f4330314d7934304e7930314f4334324e6b45354e6934304e7941354e6934304e794177494441674d53417a4d6941784e5441754d30677a595445794e53347a494445794e53347a494441674d43417749444d794c6a67674f4451754e546461545445334e7934784d79417a4e4464734c544d3249444d754e4341314d79347a4d6941314f4334314d5545354e6934304d5341354e6934304d534177494441674d5341794d546b754e6a4d674e446330614449344c6a6b79595445794e5334794f4341784d6a55754d6a67674d434177494441744d7a49754e7a59744f4451754e5464614969382b50484268644767675932786863334d39496d4e73637930784969426b50534a4e4d6a557a4c6a59354944497a4d5334324f474d744e69347a4d79307a4d53347a4c544d774c6a67354c5455304c6a41354c5459794c6a55334c5455344c6a4133624330324c6a4d314c5334334f5745304f5334324d5341304f5334324d534177494441674d5330304d79347a4e5330304f5334784d3359744d6a42684e5449754e7a55674e5449754e7a55674d434178494441744d6a67754f5445744c6a4d32646a49774c6a4d34595463344c6a5532494463344c6a5532494441674d434177494459344c6a5931494463334c6a6779624459754d7a59754f474d794d7934794e4341794c6a6b7949444d304c6a63344944497749444d334c6a677a49444d314c6a467a4c5334354d79417a4e53347a4d6930794d5334794d6941304e3245334d7934344d5341334d7934344d534177494441674d53307a4d4334774e6941354c6a5979624330354e5334324e694135595445774d6934304e5341784d4449754e4455674d434177494441744e4445754f4341784d79347a4f454d3549444d7a4d6934304e5330304c6a677849444d324d7941784c6a557949444d354e4334794f584d7a4d4334344f5341314e4334774f4341324d6934314e7941314f4334774e6d77324c6a4d314c6a68684e446b754e6941304f533432494441674d4341784944517a4c6a4d31494451354c6a4579646a4534595455794c6a6331494455794c6a6331494441674d534177494449344c6a6b784c6a4932646930784f4334794e6d45334f4334314e5341334f4334314e534177494441674d4330324f4334324e5330334e7934344d5777744e69347a4e6930754f474d744d6a4d754d6a51744d6934354d69307a4e4334334f4330794d4334774e53307a4e7934344d79307a4e5334784d584d754f544d744d7a55754d7a49674d6a45754d6a49744e4464684e7a4d754e6a67674e7a4d754e6a67674d434177494445674d7a41754d4459744f5334324d3277354e5334324e693035595445774d6934304e5341784d4449754e4455674d434177494441674e4445754f4330784d79347a4f474d794e7934324e5330784e6934774d6941304d5334304c5451324c6a553049444d314c6a41354c5463334c6a673257694976506a777663335a6e50673d3d266c6f676f436f6c6f723d7768697465" alt="Recoil" data-canonical-src="https://img.shields.io/badge/Recoil-007af4.svg?style=for-the-badge&amp;logo=data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI1NS4yMSA2MjMuOTEiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDp3aGl0ZX08L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Im03NC42MiAyNzcuNDYgMS4yNC0uMTMgMzQuNzgtMy4yOC01My40Ny01OC42NkE5Ni40NyA5Ni40NyAwIDAgMSAzMiAxNTAuM0gzYTEyNS4zIDEyNS4zIDAgMCAwIDMyLjggODQuNTdaTTE3Ny4xMyAzNDdsLTM2IDMuNCA1My4zMiA1OC41MUE5Ni40MSA5Ni40MSAwIDAgMSAyMTkuNjMgNDc0aDI4LjkyYTEyNS4yOCAxMjUuMjggMCAwIDAtMzIuNzYtODQuNTdaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjUzLjY5IDIzMS42OGMtNi4zMy0zMS4zLTMwLjg5LTU0LjA5LTYyLjU3LTU4LjA3bC02LjM1LS43OWE0OS42MSA0OS42MSAwIDAgMS00My4zNS00OS4xM3YtMjBhNTIuNzUgNTIuNzUgMCAxIDAtMjguOTEtLjM2djIwLjM4YTc4LjU2IDc4LjU2IDAgMCAwIDY4LjY1IDc3LjgybDYuMzYuOGMyMy4yNCAyLjkyIDM0Ljc4IDIwIDM3LjgzIDM1LjFzLS45MyAzNS4zMi0yMS4yMiA0N2E3My44MSA3My44MSAwIDAgMS0zMC4wNiA5LjYybC05NS42NiA5YTEwMi40NSAxMDIuNDUgMCAwIDAtNDEuOCAxMy4zOEM5IDMzMi40NS00LjgxIDM2MyAxLjUyIDM5NC4yOXMzMC44OSA1NC4wOCA2Mi41NyA1OC4wNmw2LjM1LjhhNDkuNiA0OS42IDAgMCAxIDQzLjM1IDQ5LjEydjE4YTUyLjc1IDUyLjc1IDAgMSAwIDI4LjkxLjI2di0xOC4yNmE3OC41NSA3OC41NSAwIDAgMC02OC42NS03Ny44MWwtNi4zNi0uOGMtMjMuMjQtMi45Mi0zNC43OC0yMC4wNS0zNy44My0zNS4xMXMuOTMtMzUuMzIgMjEuMjItNDdhNzMuNjggNzMuNjggMCAwIDEgMzAuMDYtOS42M2w5NS42Ni05YTEwMi40NSAxMDIuNDUgMCAwIDAgNDEuOC0xMy4zOGMyNy42NS0xNi4wMiA0MS40LTQ2LjU0IDM1LjA5LTc3Ljg2WiIvPjwvc3ZnPg==&amp;logoColor=white" style="max-width: 100%;">
  <img src="https://img.shields.io/badge/React_Query-purple?style=for-the-badge&logo=react-query&logoColor=white">
</p>

### 개발 도구
<p> 
  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white">
  <img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white">
<br>
