# 🎬 세미 해커톤 — Frontend

> 본 해커톤에 앞서 팀 합을 맞춰본 **48시간 연습 프로젝트**

영화를 탐색하고 찜하는 웹 앱입니다.

<br>

## 주요 기능

| 기능 | 설명 |
|---|---|
| **영화 탐색** | 인기 영화 목록, 무한 스크롤 |
| **검색** | 디바운스 적용 검색, 검색 결과 페이지 |
| **상세 페이지** | 영화 상세 정보 |
| **찜하기** | 관심 영화 저장 및 목록 조회 |
| **추천** | 추천 영화 페이지 |
| **애니메이션** | 애니메이션 카테고리 분리 |
| **로그인** | 소셜 로그인 + 리다이렉션 처리 |

<br>

## 기술 스택

| 구분 | 사용 기술 |
|---|---|
| Core | React 19, JavaScript, Vite (SWC) |
| 스타일링 | styled-components |
| 서버 상태 | TanStack Query v5 |
| 전역 상태 | Context API (`SearchContext`) |
| 네트워크 | Axios |
| 라우팅 | React Router v7 |
| 아이콘 | react-icons |

<br>

## 시작하기

```bash
yarn install
yarn dev
```

| 명령 | 설명 |
|---|---|
| `yarn dev` | 개발 서버 실행 |
| `yarn build` | 프로덕션 빌드 |
| `yarn preview` | 빌드 결과 미리보기 |
| `yarn lint` | ESLint 검사 |

<br>

## 프로젝트 구조

```
src/
├── pages/         MoviePage · SearchResults · DetailPage · FavoritesPage
│                  RecommendPage · AnimationPage · Find
│                  LoginPage · Redirection
├── components/    Navbar · Searchbar · Sidebar · animation/
├── layout/        MainLayout · LoginLayout
├── contexts/      SearchContext
└── hooks/         DebouncedSearch · DebouncedInfiniteScroll
```

### 성능 처리

- **검색 디바운스** (`DebouncedSearch`) — 입력마다 API를 때리지 않도록 지연 처리
- **무한 스크롤 + 디바운스** (`DebouncedInfiniteScroll`) — 스크롤 이벤트 폭주 방지
- 사이드바 반응형, 홈 화면 스크롤 독립 처리

<br>

## 팀

| GitHub |
|---|
| [@seongwwww](https://github.com/seongwwww) |
| [@youngbingo](https://github.com/youngbingo) |
| [@dlrkawo](https://github.com/dlrkawo) |
