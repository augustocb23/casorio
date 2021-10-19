import { Body, Get, JsonController, OnUndefined, Post, Res } from 'routing-controllers';
import { Meeting, MeetingUpdate } from '../models';

import { readFile, writeFile } from 'fs/promises';
import { environment } from '../environments';
import { Response } from 'express';

@JsonController('/meeting')
export class MeetingController {
  @Get()
  @OnUndefined(204)
  async get(): Promise<Meeting> {
    try {
      const buffer = await readFile('meeting.json');
      const json = buffer.toString();

      return JSON.parse(json) as Meeting;
    } catch {
      return undefined;
    }
  }

  @Post()
  async post(@Body() obj: MeetingUpdate, @Res() res: Response): Promise<Meeting> {
    if (!obj.password || obj.changeCode != environment.changeCode) {
      res.sendStatus(401);
    }
    if (!obj.id || !obj.link || !obj.password) {
      res.sendStatus(400);
    }

    try {
      const json = JSON.stringify(obj);
      await writeFile('meeting.json', json);

      return obj;
    } catch (e) {
      return e;
    }
  }
}
