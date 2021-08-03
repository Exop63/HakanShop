import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { jwtSignOptions } from './constant';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register(jwtSignOptions)],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
