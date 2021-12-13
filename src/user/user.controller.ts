import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user')
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('/user/:username')
  getUser(@Param('username') username: string): Promise<User> {
    return this.userService.getUser(username);
  }

  @Post('/user')
  @HttpCode(HttpStatus.OK)
  addUser(@Body() newUser: Partial<User>) {
    return this.userService.addUser(newUser);
  }

  @Put('/user/:username')
  updUser(@Param('username') username: string, @Body() updUser: User): Promise<User> {
    return this.userService.updateUser(username, updUser);
  }

  @Delete('/user/:username')
  deleteUser(@Param('username') username: string): Promise<any> {
    return this.userService.deleteUser(username);
  }
}
