import { DeveloperInfo, DeveloperKey } from '@/types/developerType';

const developers: Record<DeveloperKey, DeveloperInfo> = {
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

type DeveloperTypeMap = {
  [K in DeveloperInfo['type']]: DeveloperKey;
};

export const TYPE_TO_KEY = Object.entries(developers).reduce(
  (acc, [key, info]) => {
    acc[info.type] = key as DeveloperKey;
    return acc;
  },
  {} as DeveloperTypeMap
);

export default developers;
