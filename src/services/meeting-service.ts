import { readFile, unlink, writeFile } from 'fs';

import { Meeting } from '../models';


export class MeetingService {
  private filename: string = 'meeting.json';
  private currentMeeting: Meeting;

  async read(): Promise<Meeting> {
    if (this.currentMeeting)
      return this.currentMeeting;

    const buffer = await new Promise((resolve, reject) => {
      readFile(this.filename, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });

    const json = buffer.toString();
    this.currentMeeting = JSON.parse(json) as Meeting;

    return this.currentMeeting;
  }

  async save(meeting: Meeting): Promise<Meeting> {
    const json = JSON.stringify(meeting);

    await new Promise((resolve, reject) => {
      writeFile(this.filename, json, err => {
        if (err) reject(err);
        resolve();
      });
    });

    this.currentMeeting = meeting;
    return meeting;
  }

  async clear(): Promise<void> {
    await new Promise((resolve, reject) => {
      unlink(this.filename, err => {
        // ignore if the file don't exists
        if (err && err.code !== 'ENOENT') reject(err);
        resolve();
      });
    });

    this.currentMeeting = undefined;
  }
}
