import { Body, Get, JsonController, OnUndefined, Post, Res } from 'routing-controllers';
import { Response } from 'express';
import { Service } from 'typedi';

import { Meeting, MeetingUpdate } from '../models';
import { MeetingService } from '../services';
import { environment } from '../environments';

@JsonController('/meetings')
@Service()
export class MeetingController {
  constructor(private service: MeetingService) {
  }

  @Get()
  @OnUndefined(204)
  async get(): Promise<Meeting> {
    try {
      return await this.service.read();
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
      return await this.service.save(obj);
    } catch (e) {
      return e;
    }
  }
}
