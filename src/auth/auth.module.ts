import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { LocalStrategy as AdminStrategy } from './admin.local.strategy';
import { AuthService } from './auth.service';
import { RecruiterModule } from 'src/recruiter/recruiter.module';
import { CandidateModule } from 'src/candidate/candidate.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6000s' },
    }),
    RecruiterModule,
    CandidateModule,
  ],
  providers: [AuthService, LocalStrategy, AdminStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
