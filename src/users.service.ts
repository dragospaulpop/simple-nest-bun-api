import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto, SetUserDto, UpdateUserDto } from "./user.dto";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createUser(body: CreateUserDto) {
    this.logger.log("Creating user");
    const user = this.userRepository.create({
      firstName: body.firstName,
      lastName: body.lastName,
      age: body.age,
    });

    const entity = await this.userRepository.save(user);
    return entity;
  }

  async listUsers(page: number, limit: number) {
    this.logger.log("Listing users");
    return this.userRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getUser(id: number) {
    this.logger.log("Getting user");
    return this.userRepository.findOne({ where: { id } });
  }

  async deleteUser(id: number) {
    this.logger.log(`Deleting user ${id}`);
    return this.userRepository.delete(id);
  }

  async setUser(id: number, body: SetUserDto) {
    this.logger.log(`Setting user ${id} with body ${JSON.stringify(body)}`);
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    user.firstName = body.firstName ?? null;
    user.lastName = body.lastName ?? null;
    user.age = body.age ?? null;
    return this.userRepository.update(id, user);
  }

  async patchUser(id: number, body: UpdateUserDto) {
    this.logger.log(`Patching user ${id} with body ${JSON.stringify(body)}`);
    return this.userRepository.update(id, body);
  }
}
