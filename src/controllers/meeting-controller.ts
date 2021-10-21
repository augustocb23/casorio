import { Body, Delete, Get, JsonController, OnUndefined, Post, Res } from 'routing-controllers';
import { Response } from 'express';
import { Service } from 'typedi';

import { Meeting, MeetingUpdate } from '../models';
import { MeetingService } from '../services';
import { environment } from '../environments';
import { MeetingDelete } from '../models/meeting-delete';

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
    if (obj.changeCode != environment.changeCode) {
      res.sendStatus(401);
    }
    if (!obj.id || !obj.link || !obj.password) {
      res.sendStatus(400);
    }

    try {
      delete obj.changeCode;
      return await this.service.save(obj);
    } catch (e) {
      return e;
    }
  }

  @Delete()
  async delete(@Body() obj: MeetingDelete, @Res() res: Response): Promise<void> {
    if (obj.changeCode != environment.changeCode) {
      res.sendStatus(401);
    }

    try {
      await this.service.clear();
      res.sendStatus(204);
    } catch (e) {
      return e;
    }
  }
}
