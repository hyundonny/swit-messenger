# Swit 메신저

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

배포 링크: [SWIT 메신저](https://swit-messenger.vercel.app/)

## 구현 사항

로그인 페이지에서 입력받은 사용자 정보를 redux-persist를 통해 세션 스토리지에 저장하고, Redux Toolkit을 사용하여 구현한 다양한 채팅 기능(메시지 전송, 삭제, 답장 등)을 제공합니다. 추가로 화면 좌측 사이드바에는 대화방 목록, 채널 목록, 연락처 목록을 제공합니다.

### 로그인

- floating label 구현

  - input과 label 태그를 div로 감싼 후, input에 focus가 되었거나 작성 내용이 존재할 경우, label이 input창 상단으로 올라가도록 구현

- 로그인

  - form 태그를 이용해 엔터키으로 로그인 가능
  - input 태그의 maxLength attribute를 활용해 과도하게 긴 이름을 방지

- 에러 방지
  - 이름 없이 submit 버튼 누를시 따로 input 태그 border-color 빨간 색으로 변경
  - 로그인하지 않은 채 채팅방 접근 시 자동으로 로그인 페이지로 이동

### 채팅 관련

- 메시지 전송

  - 컨텐츠 입력 시 메시지 전송 가능, 컨텐츠 없을 시 비활성화
  - shift + 엔터키로 줄바꿈, 엔터키로 전송 구현
  - useRef와 scrollIntoView 활용해 새로운 메시지 전송 시 채팅창 스크롤 되도록 구현

- 메시지 삭제

  - 삭제 버튼을 클릭하면 "{메시지} 메시지를 삭제하시겠습니까?" 라는 메시지가 모달창에 출력
  - 메시지 내용 중 최대 10자 까지 보여주며 뒤에는 ... 처리
  - 삭제 버튼 누를 시 Redux 스토어와 채팅창에서 삭제

- 메시지 답장

  - 답장을 클릭하면 "사용자 이름\n" + "메시지 내용\n" + "(회신)\n" 입력창 앞에 자동으로 삽입
  - 메시지에 대한 답장 전송 시, 채팅창에서도 메시지 앞에 답장을 적어두어 답장임을 확인 가능

- 메시지 정렬

  - 메시지의 정렬은 오래된 순으로 정렬
  - 날짜의 경우 yyyy-mm-dd hh:MM:ss 포멧으로 출력, 내가 전송한 메시지의 경우 이름 옆에 \* 문자 출력.

### 레이아웃

- 사이드바
  - 사이드바 상단에는 현재 로그인되어있는 사용자의 정보를 표시
  - 톱니바퀴 아이콘 눌러 사용자 정보 수정 모달 창 켤 수 있도록 구현
  - 메시지 / 연락처 두 개의 탭을 나눠 탭별로 토글 버튼 구현
  - 메시지 탭에는 대화방 목록과 채널명 목록 구현
  - 연락처 탭에는 연락처 리스트와 연락처 검색할 수 있는 input 구현

### Redux Toolkit

- `리덕스 툴킷`으로 로그인, 메시지, 모듈의 데이터 모델을 관리.
  - 유저 정보 수정: login, logout, editUserName, changeChattingStatus
  - 메시지 모델: id, userId, userName, profileImage, content, date
- 커스텀 훅을 활용해 컴포넌트와 전역 상태 관리 코드를 분리함으로써 코드 유지 및 보수를 쉽게 하고, 코드 중복을 줄여 편의성 향상

## 리팩토링

- 리팩토링 이전: [링크](https://youthful-almeida-e80ef9.netlify.app/)
- 리팩토링 후: [링크](https://swit-messenger.vercel.app/)

### 리팩토링 사항

- 로그인 및 채팅 페이지 디자인을 더 깔끔하게 구현
- 사이드바를 position: absolute로 모바일 화면에서 숨기던 것을, width 크기를 조절하는 방식으로 바꿔서 더 자연스럽게 움직이도록 변경
- 채팅 목록 중 마지막 메시지에 ref를 걸고 새로운 메시지가 생길 때마다 scrollIntoView를 활용해 채팅창이 가장 하단으로 움직이도록 구현
- 유저명 변경, 로그아웃할 수 있는 환경 설정 모달 창 새롭게 구현
- 다른 메시지에 대답 시 메시지 전송 버튼 높이가 커지는 것을 막기 위해 버튼 크기 고정 및 디자인 변경
- 대화방 목록, 연락처 목록, 채팅 목록 hover 시 스크롤바가 나타나도록 변경
- 메시지 삭제 시, 기존 모달 창에서 닫기 누르면 페이지가 꺼지는 문제 해결

### 기억에 남는 어려움

textarea 요소를 활용해 메시지 입력을 가능하게 했다. 엔터키를 누를 시 메시지 전송이 되고, shift와 엔터키를 누를 시 줄 바꿈이 되도록 React onKeyDown 이벤트 핸들러를 활용했다. 각 이벤트 핸들러는 다음과 같다.

```javascript
const handleKeyDown = e => {
  if (e.isComposing || e.keyCode === 229) return;

  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendNewMessage();
  }
};
```

사용자가 누른 키가 엔터키인지, shift 키는 누르지 않았는지를 확인해서 만약 두 조건이 모두 성립할 때 `e.preventDefault()`로 줄 바꿈을 막고 새로운 메시지를 전송하도록 했다. 그런데 이 과정에서 한글로 메시지를 작성해서 전송할 때 onKeyDown 이벤트가 두 번 작동되는 것을 확인했다.

![onKeyDown 에러](https://hyundonmoon-files.s3.amazonaws.com/onKeyDown_error.png)

검색을 해보니 생각보다 많은 사람이 이 문제를 겪고 있음을 알 수 있었다. keydown, keyup 이벤트를 활용 시 이런 문제가 발생했고, 많은 사람이 해결하기 위해 keypress 이벤트를 대신 활용하고 있었다. 다만 근본적인 문제가 무엇인지 궁금해서 조금 더 찾아봤고, 결국 문제를 발생시키는 원인과 해결 방법을 찾아낼 수 있었다.

기본적으로 브라우저가 제공하는 textarea와 input 요소는 한글, 일본어, 한자 등을 단독으로는 처리를 못 하는 듯하다. 이 문제를 해결하기 위해 Input Method Editor (IME)라는 프로그램이 사용자가 한글을 입력하면 그것을 "가로채" 대신 처리해준다. 그래서 한글을 입력하고 keyCode를 확인하면 229가 나오는 경우가 존재한다고 한다. 229 keyCode는 해당 이벤트를 IME가 처리했음을 나타낸다.

이 과정에서 내가 겪은 문제가 발생했다. MDN을 읽어보니 IME가 작동하는 과정에서 keydown과 keyup 이벤트가 호출됨을 알게 되었다. 그래서 IME 처리 과정에서 한번, 처리 완료 후 한 번, 총 두 번 keydown 이벤트가 발생하는 것이었다.

```javascript
// 해결책
if (e.isComposing || e.keyCode === 229) return;
```

다행히 문제 해결은 어렵지 않았다. MDN에 적혀있는 IME가 입력값을 처리 중일 때 발생하는 이벤트를 조건문을 활용해 무시해버리는 방법으로 해결했다. 이렇게 하니 keydown 이벤트가 두 번 발생하는 문제는 없어지고 의도한 대로 메시지를 전송할 때 딱 한 번만 keydown 이벤트가 발생하였다.

[MDN 참고 자료](https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event#ignoring_keydown_during_ime_composition)
