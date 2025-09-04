import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { CreateUserDto, SetUserDto, UpdateUserDto } from "./user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  listUsers(@Query("page") page = "1", @Query("limit") limit = "10") {
    return this.usersService.listUsers(Number(page), Number(limit));
  }

  @Get(":id(\\d+)")
  getUser(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Delete(":id(\\d+)")
  deleteUser(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }

  @Put(":id(\\d+)")
  setUser(@Param("id", ParseIntPipe) id: number, @Body() body: SetUserDto) {
    return this.usersService.setUser(id, body);
  }

  @Patch(":id(\\d+)")
  patchUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateUserDto
  ) {
    return this.usersService.patchUser(id, body);
  }
}
