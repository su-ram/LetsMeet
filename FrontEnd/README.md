# Frontend

## 폴더 구조

- public : 정적파일 폴더
- src
  - components : page 단위가 아닌 세부 컴포넌트 모음
  - pages : 페이지 단위의 컴포넌트 모음
  - scss : scss 모음 => main.scss로 최종적으로 묶여서 나감
  - App.js : main.scss 가 적용됨
  - index.js : react 최상위 컴포넌트

## scss 사용 방법

- \_[이름].scss 파일을 만들고, css 사용하듯이 사용한다.
- main.scss에서 import 문을 해당 파일에 대해서 쓴다.

## Routing

| url     | 컴포넌트   |
| ------- | ---------- |
| /Create | CreatePlan |
| /[url]  | ManagePlan |
|         |            |
