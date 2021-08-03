import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './constant';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(req: any): Promise<any> {
    const { username, password, remember_me } = req;

    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return this.login(result, remember_me);
    }
    throw new NotFoundException();
  }

  async login(user: any, refresh: boolean) {
    const payload = { username: user.username, sub: user.userId };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(
      payload,
      jwtConstants.refresh_sign_options,
    );

    return {
      access_token: access_token,
      ...(refresh ? { refresh_token: refresh_token } : {}),
      user: user,
    };
  }

  async refresh(refresh_token: any) {
    try {
      const user = this.jwtService.verify(
        refresh_token,
        jwtConstants.refresh_verify_options,
      );

      return this.login(user, false);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async getUser(token: string) {
    const decoded = this.jwtService.decode(token);
    if (decoded) {
      return {
        username: decoded['username'],
      };
    }
  }
}
