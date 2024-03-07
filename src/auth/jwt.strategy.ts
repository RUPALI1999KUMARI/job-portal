import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    ConfigModule.forRoot(),

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: any) {    
    return { userId: payload.userId, name: payload.name, email: payload.email, userType: payload.userType };
  }

  // TO IMPLEMENT LOGOUT, WE HAVE TO USE CUSTOM JWT
  // BUT EVEN THAN SINCE JWT is STATELESS, it would be meaningless to store its token

}