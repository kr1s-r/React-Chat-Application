import { Timestamp } from "firebase/firestore";
import type { Message } from "../contexts/ChatProvider";

export const formatRoom = (message: Message) => {
  if (!message) return { text: "...", timestamp: new Timestamp(0, 0) };

  const text = message?.text;
  const timestamp = message?.createdAt as Timestamp;

  return { text, timestamp };
};

export function formatTime(num: number): string {
  // if num is less than 10, add a 0
  // else display num as string
  return num < 10 ? `0${num}` : num.toString();
}

// utility function to calculate the time difference in certain amount of minutes
export function calculateTimeDifference(
  currentTimestamp: Timestamp,
  previosuTimestamp: Timestamp,
  n: number
): boolean {
  const currentTime = currentTimestamp.toDate();
  const previousTime = previosuTimestamp.toDate();
  const timeDifference =
    (currentTime.getTime() - previousTime.getTime()) / 1000 / 60;

  // if difference between the times is less than 'n' amount of minutes
  return timeDifference < n;
}
