import { Meeting } from './meeting';

export interface MeetingUpdate extends Meeting {
  changeCode: string;
}
