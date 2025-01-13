const developers = {
  Frontend: {
    type: 'Frontend Developer',
    description: '사용자 경험을 개선하는 것을 즐기시나요?',
    topics: ['JavaScript', 'TypeScript', 'React', 'HTML/CSS'],
  },
  Backend: {
    type: 'Backend Developer',
    description: '서버 로직과 데이터 처리에 더 흥미를 느끼시나요?',
    topics: ['Java', 'Node.js', 'Spring', 'Database'],
  },
  iOS: {
    type: 'iOS Developer',
    description: '모바일 앱 개발과 애플 생태계에 관심이 있으신가요?',
    topics: ['Swift', 'SwiftUI', 'UIKit', 'Xcode'],
  },
} as const;

type DeveloperType = keyof typeof developers;

export type Developer = (typeof developers)[DeveloperType];

export type DeveloperTypes = Developer['type'];

export const TYPE_TO_KEY: Record<DeveloperTypes, DeveloperType> = {
  'Frontend Developer': 'Frontend',
  'Backend Developer': 'Backend',
  'iOS Developer': 'iOS',
} as const;

export default developers;
