import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('candidate')
// @UseGuards(AuthGuard('local'))

export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  async create(@Body() createCandidateDto: CreateCandidateDto) {
    const existingCandidate = await this.candidateService.getCandidateByEmail(createCandidateDto.email);
    // console.log({ existingCandidate });
    if (existingCandidate) {
      return {success: false, message: "Email already exists in the database"}
    }
    
    const recruiter = await this.candidateService.createCandidate(createCandidateDto);;
    // console.log({ recruiter });
    if (recruiter) return {success: true}
    
    return {success: false}
  }

  @UseGuards(AuthGuard('jwt'))
  @Post("/logout")
  async logout(@Request() req) {
    if (req.user.userType != 'candidate') {
      return { success: false, message: "Invalid Token"}
    }
    
    return {success: true, message:"Successfully logged out. (Have to delete the jwt from the client side, as we are using JWT which is stateless, so we can either store the logged out token (seems like a bad idea), or wait for the token to expire(still dangerous), best way is to use refresh_token(long life) and access_token(short_life) together" }
  }

  // @Get()
  // findAll() {
  //   return this.candidateService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.candidateService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCandidateDto: UpdateCandidateDto) {
  //   return this.candidateService.update(+id, updateCandidateDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.candidateService.remove(+id);
  // }
}
