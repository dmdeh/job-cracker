import { DeveloperKey, DeveloperTypeMap } from '@/types/developerType';
import { TOPICS_BACKEND, TOPICS_FRONTEND, TOPICS_IOS } from './topics';

const developers = {
  Frontend: {
    type: 'Frontend Developer',
    description: '사용자 경험을 개선하는 것을 즐기시나요?',
    topics: TOPICS_FRONTEND,
  },
  Backend: {
    type: 'Backend Developer',
    description: '서버 로직과 데이터 처리에 더 흥미를 느끼시나요?',
    topics: TOPICS_BACKEND,
  },
  iOS: {
    type: 'iOS Developer',
    description: '모바일 앱 개발과 애플 생태계에 관심이 있으신가요?',
    topics: TOPICS_IOS,
  },
} as const;

export const TYPE_TO_KEY = Object.entries(developers).reduce(
  (acc, [key, info]) => {
    acc[info.type] = key as DeveloperKey;
    return acc;
  },
  {} as DeveloperTypeMap
);

export default developers;
