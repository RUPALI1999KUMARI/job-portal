import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RecruiterService } from './recruiter.service';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('recruiter')
// @UseGuards(AuthGuard('admin'))

export class RecruiterController {
  constructor(private readonly recruiterService: RecruiterService) {}

  @Post()
  async create(@Body() createRecruiterDto: CreateRecruiterDto) {
    const existingRecruiter = await this.recruiterService.getRecruiterByEmail(createRecruiterDto.email);
    // console.log({ existingRecruiter });
    if (existingRecruiter) {
      return {success: false, message: "Email already exists in the database"}
    }
    
    const recruiter = await this.recruiterService.createRecruiter(createRecruiterDto);
    // console.log({ recruiter });
    if (recruiter) return {success: true}
    
    return {success: false}
  }

  @UseGuards(AuthGuard('jwt'))
  @Post("/logout")
  async logout(@Request() req) {    
    if (req.user.userType != 'recruiter') {
      return { success: false, message: "Invalid Token"}
    }
    return {success: true, message:"Successfully logged out. (Have to delete the jwt from the client side, as we are using JWT which is stateless, so we can either store the logged out token (seems like a bad idea), or wait for the token to expire(still dangerous), best way is to use refresh_token(long life) and access_token(short_life) together" }
  }

  // @Get()
  // findAll() {
  //   return this.recruiterService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.recruiterService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRecruiterDto: UpdateRecruiterDto) {
  //   return this.recruiterService.update(+id, updateRecruiterDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.recruiterService.remove(+id);
  // }
}
