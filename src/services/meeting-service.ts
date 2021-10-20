import { readFile, writeFile } from 'fs/promises';

import { Meeting } from '../models';


export class MeetingService {
  private filename: string = 'meeting.json';
  private currentMeeting: Meeting;

  async read(): Promise<Meeting> {
    if (this.currentMeeting)
      return this.currentMeeting;

    const buffer = await readFile(this.filename);
    const json = buffer.toString();

    this.currentMeeting = JSON.parse(json) as Meeting;
    return this.currentMeeting;
  }

  async save(meeting: Meeting): Promise<Meeting> {
    const json = JSON.stringify(meeting);
    await writeFile(this.filename, json);

    return meeting;
  }
}
