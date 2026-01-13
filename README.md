# Wini - 감정 기록 및 자기 성찰 앱

> DND 13기 4팀 프론트엔드 프로젝트

Wini는 사용자의 감정을 기록하고 자기 성찰을 돕는 모바일 애플리케이션입니다. React Native와 Expo를 기반으로 iOS와 Android 양쪽 플랫폼에서 동작하는 크로스 플랫폼 앱입니다.

## 목차

- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [핵심 구현 사항](#핵심-구현-사항)
- [설치 및 실행](#설치-및-실행)

## 주요 기능

### 1. 감정 노트 작성

- 현재 감정 기록 (Feeling)
- 다짐 및 약속 작성 (Promise)
- 실천 계획 수립 (Action)
- 단계별 노트 작성 플로우

### 2. 마음 편지

- 사용자 간 감정 공유
- 편지 작성 및 읽기 기능
- 감정 교류를 통한 공감대 형성

### 3. 매칭 시스템

- 감정 공유를 위한 사용자 매칭
- 초대자/피초대자 역할 구분
- 안전한 매칭 프로세스

### 4. 아카이브

- 작성한 노트 기록 보관
- 시간순 정렬 및 검색
- 개인 성장 기록 추적

### 5. 통계 및 분석

- 감정 변화 추이 시각화
- 차트를 통한 데이터 인사이트 제공
- 자기 성찰 도구

## 기술 스택

### Core

- **React Native** 0.79.5 - 크로스 플랫폼 모바일 앱 프레임워크
- **Expo** 53.0.22 - React Native 개발 플랫폼
- **TypeScript** 5.8.3 - 타입 안정성 확보
- **Expo Router** - 파일 기반 라우팅 시스템

### State Management & Data Fetching

- **Zustand** 5.0.7 - 경량 상태 관리
- **TanStack Query** (React Query) 5.84.0 - 서버 상태 관리 및 캐싱
- **AsyncStorage** - 로컬 데이터 영속성

### Backend & Services

- **Axios** - HTTP 클라이언트
- **Firebase** (Analytics, Messaging, App) - 푸시 알림 및 분석
- **React Native SSE** - Server-Sent Events 실시간 통신

### UI/UX

- **React Navigation** - 네비게이션 관리
- **React Native Reanimated** - 고성능 애니메이션
- **React Native Gesture Handler** - 제스처 처리
- **Gifted Charts** - 데이터 시각화
- **React Native Reanimated Carousel** - 캐러셀 UI
- **Bottom Sheet** (@gorhom/bottom-sheet) - 바텀시트 UI
- **Expo Linear Gradient** - 그라디언트 효과

### Authentication

- **Expo Apple Authentication** - Apple 소셜 로그인
- **Google Auth Library** - Google 소셜 로그인

### Development Tools

- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **EAS Build** - Expo Application Services 빌드 시스템

## 프로젝트 구조

```
dnd-13th-4-frontend/
├── app/                          # Expo Router 기반 화면
│   ├── (tabs)/                  # 탭 네비게이션
│   │   ├── index.tsx           # 홈 화면
│   │   ├── MindLetter.tsx      # 마음 편지
│   │   ├── ReadMindLetter.tsx  # 편지 읽기
│   │   ├── Statistics.tsx      # 통계
│   │   ├── MyPage.tsx          # 마이페이지
│   │   ├── notes/              # 노트 작성 플로우
│   │   │   ├── feeling.tsx
│   │   │   ├── promise.tsx
│   │   │   ├── ActionFirst.tsx
│   │   │   └── ActionSecond.tsx
│   │   └── archive/            # 아카이브
│   ├── matching/               # 매칭 시스템
│   └── privacy-policy/         # 개인정보 처리방침
├── components/                  # 재사용 가능한 컴포넌트
│   ├── ui/                     # 공통 UI 컴포넌트
│   ├── button/                 # 버튼 컴포넌트
│   ├── icons/                  # 아이콘
│   ├── modal/                  # 모달
│   ├── header/                 # 헤더
│   └── [feature]/              # 기능별 컴포넌트
├── constants/                   # 상수 및 설정
│   └── Colors.ts               # 디자인 시스템 컬러
├── hooks/                       # Custom React Hooks
├── services/                    # API 통신 레이어
│   └── authService.ts
├── store/                       # Zustand 상태 관리
├── types/                       # TypeScript 타입 정의
├── utils/                       # 유틸리티 함수
└── lib/                         # 외부 라이브러리 설정
```

## 핵심 구현 사항

### 1. 파일 기반 라우팅 시스템

Expo Router를 활용하여 직관적인 폴더 구조로 라우팅을 관리합니다.

```typescript
// app/(tabs)/_layout.tsx에서 탭 네비게이션 구성
// 파일 시스템 = 라우팅 구조
```

### 2. 서버 상태 관리 최적화

TanStack Query를 사용하여 효율적인 서버 상태 관리와 캐싱 전략을 구현했습니다.

- 자동 리페칭
- 낙관적 업데이트
- 무한 스크롤
- 백그라운드 동기화

### 3. 컴포넌트 기반 아키텍처

- 재사용 가능한 UI 컴포넌트 설계
- Atomic Design Pattern 적용
- 기능별 컴포넌트 모듈화

### 4. 타입 안정성

- TypeScript를 활용한 엄격한 타입 체크
- API 응답에 대한 타입 정의
- Props 인터페이스 명시

### 5. 크로스 플랫폼 대응

- iOS와 Android 플랫폼별 최적화
- 플랫폼별 네이티브 기능 통합 (Apple/Google 로그인)
- Firebase를 통한 푸시 알림

### 6. 성능 최적화

- React Native Reanimated를 활용한 60fps 애니메이션
- 이미지 최적화 (Expo Image)
- 메모이제이션 및 렌더링 최적화

### 7. 실시간 통신

- Server-Sent Events(SSE)를 통한 실시간 데이터 수신
- 효율적인 네트워크 통신 관리

## 설치 및 실행

### 환경 요구사항

- Node.js 18.x 이상 (`.nvmrc` 참조)
- npm 또는 pnpm
- Expo CLI
- iOS 개발: macOS + Xcode
- Android 개발: Android Studio

### 설치

```bash
# 의존성 설치
npm install
# 또는
pnpm install
```

### 환경 변수 설정

`.env.example`을 참고하여 `.env` 파일을 생성합니다.

```bash
cp .env.example .env
```

### 실행

```bash
# 개발 서버 시작
npm start

# iOS 시뮬레이터에서 실행
npm run ios

# Android 에뮬레이터에서 실행
npm run android

# 웹에서 실행
npm run web
```

### 디바이스에서 빌드

```bash
# iOS 디바이스
npm run build:local:ios

# Android 디바이스
npm run build:local:android
```

## 프로젝트 관리

### 코드 품질 관리

```bash
# ESLint 실행
npm run lint
```

### Git 커밋 컨벤션

Pull Request 템플릿을 활용한 체계적인 코드 리뷰 프로세스를 따릅니다.

## 배포

- **플랫폼**: iOS App Store, Google Play Store
- **빌드 시스템**: EAS Build
- **버전 관리**: Semantic Versioning
- **업데이트**: Expo Updates를 통한 OTA 업데이트

## 협업 도구

- **버전 관리**: Git & GitHub
- **코드 리뷰**: Pull Request Template
- **이슈 트래킹**: GitHub Issues
- **자동화**: Code Rabbit (`.coderabbit.yaml`)
