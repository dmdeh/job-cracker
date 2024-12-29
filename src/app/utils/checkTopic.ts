import { TOPIC_MAP, TopicKey } from "../constants/topics";

export function isTopic(value: string | null): value is TopicKey {
  return value !== null && Object.keys(TOPIC_MAP).includes(value);
}

export function getTopic(value: string | null): TopicKey | null {
  if (isTopic(value)) {
    return value;
  }
  return null;
}
