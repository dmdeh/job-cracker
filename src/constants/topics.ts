export const TOPICS_FRONTEND = {
  'HTML/CSS': [
    '시맨틱 태그',
    'Flexbox / Grid 레이아웃',
    '미디어 쿼리, 반응형 디자인',
    'CSS 전처리기',
    'CSS 애니메이션, 트랜지션',
    '웹 접근성',
  ],
  JavaScript: [
    '스코프',
    '프로토타입',
    'this 바인딩',
    '클로저',
    'Array.Prototype 메서드',
    'Number.Prototype 메서드',
    'String.Prototype 메서드',
    '브라우저의 렌더링 과정',
    '이벤트 전파 / 위임',
    '이벤트 루프, 태스크 큐',
    '비동기 처리',
    'Promise, async/await',
  ],
  TypeScript: [
    '인터페이스와 타입 앨리어스',
    '제네릭',
    '유니언 및 인터섹션 타입',
    '타입 가드',
    '열거형',
    '타입 유추',
    '디코레이터',
    '유틸리티 타입',
  ],
  React: [
    '리액트 렌더와 커밋',
    '리액트 Hooks',
    '컴포넌트 상태 관리',
    '컨텍스트 API',
    'React Router',
    '고차 컴포넌트',
    '리액트 성능 최적화',
    '테스팅',
  ],
} as const;

export const TOPICS_BACKEND = {
  Java: [
    'Java 언어 기초',
    '객체지향 프로그래밍 (OOP) 개념',
    '클래스와 객체',
    '상속과 다형성',
    '인터페이스와 추상 클래스',
    '컬렉션 프레임워크',
    '예외 처리',
    '스트림 API',
    '람다 표현식',
    '멀티스레딩',
    'JVM 구조와 메모리 관리',
    'Java 8 이상 새 기능',
    'JUnit을 이용한 테스트',
  ],
  Spring: [
    'Spring 프레임워크 개요',
    'Spring Boot 설정 및 구성',
    '의존성 주입 (DI)',
    '애플리케이션 컨텍스트',
    'Spring MVC 아키텍처',
    'RESTful API 개발',
    'Spring Data JPA',
    '트랜잭션 관리',
    'Spring Security',
    '테스트 작성',
    'Spring Batch',
    'Spring Cloud 개요',
  ],
  Database: [
    '데이터베이스 개요',
    'SQL 기본',
    '데이터 모델링',
    '정규화와 비정규화',
    '트랜잭션 및 ACID',
    '인덱스',
    '조인',
    '서브쿼리',
    '데이터베이스 성능 최적화',
    'NoSQL 개요',
    'MongoDB',
    'Redis',
  ],
  API: [
    'REST 기본 원칙과 제약조건',
    'HTTP 메서드와 상태 코드',
    'API 버전 관리',
    'API 보안과 인증',
    'API 문서화',
    'API 캐싱 전략',
    'Error Handling',
    'API 테스팅',
  ],
} as const;

export const TOPICS_IOS = {
  Swift: [
    'Swift 기초 문법',
    '옵셔널',
    '컬렉션 타입(Array, Set, Dictionary)',
    '함수 및 클로저',
    '구조체와 클래스',
    '프로토콜',
    '에러 처리',
    '메모리 관리 (ARC)',
    '기본 데이터 타입',
    '열거형과 연관 값',
  ],
  'iOS 개발': [
    'Xcode 사용법',
    '스토리보드와 인터페이스 빌더',
    'UIView와 UIViewController',
    'Auto Layout',
    '테이블 뷰와 컬렉션 뷰',
    '네트워킹 (URLSession)',
    '데이터 저장 (Core Data, UserDefaults)',
    'iOS 앱 생명 주기',
    '애니메이션',
    '테스팅 (Unit Test, UI Test)',
    '앱 배포 및 앱 스토어',
    'SwiftUI 개요',
  ],
  Architecture: [
    'MVC 패턴',
    'MVVM 패턴',
    'Clean Architecture',
    'Coordinator 패턴',
    'VIPER 패턴',
    '의존성 주입',
    '반응형 프로그래밍 (RxSwift, Combine)',
    '상태 관리',
    '테스트 가능한 설계',
    '모듈화와 컴포넌트 기반 설계',
  ],
} as const;
