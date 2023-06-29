import { Body, Controller, Post } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { PersonData } from './types';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import { VerifyTokenPayload } from 'src/account/types/Token';
import { Public } from 'src/common/decorators';

@Controller('follower')
export class FollowerController {
  constructor(
    private FollowerService: FollowerService,
    private config: ConfigService,
  ) {}

  @Public()
  @Post('follow')
  follow(@Body() personData: PersonData, req: Request) {
    console.log(req.headers)
    const token: string = req.headers['authorization']
      .replace('Bearer', '')
      .trim();
    const data = verify(
      token,
      this.config.get('VT-SECRET'),
    ) as VerifyTokenPayload;

    this.FollowerService.follow(data.sub, personData.id);
  }

  @Post('unfollow')
  unfollow(@Body() personData: PersonData, req: Request){
    const token: string = req.headers['authorization']
      .replace('Bearer', '')
      .trim();
    const data = verify(
      token,
      this.config.get('VT-SECRET'),
    ) as VerifyTokenPayload;

    this.FollowerService.unfollow(personData.id);
  }
}
