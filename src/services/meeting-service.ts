import { readFile, unlink, writeFile } from 'fs';

import { Meeting } from '../models';


export class MeetingService {
  private filename: string = `${process.env.HOMEPATH}/meeting.json`;
  private currentMeeting: Meeting;

  async read(): Promise<Meeting> {
    if (this.currentMeeting)
      return this.currentMeeting;

    const buffer = await new Promise((resolve, reject) => {
      readFile(this.filename, (err, data) => {
        if (err)
          if (err.code === 'ENOENT')
            resolve(null);
          else
            reject(err);
        resolve(data);
      });
    });

    this.currentMeeting = buffer ? JSON.parse(buffer.toString()) as Meeting : null;

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

    console.log('Meeting data updated');
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

    console.log('Meeting data removed');
    this.currentMeeting = undefined;
  }
}
