import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from '../entity';
import { UserRepository } from '../repository';

@Injectable()
export class UserService {
  constructor(
    private connection: Connection,
    ) {}

  async updateRefreshToken(refreshToken: string, userId: string): Promise<User> {
    const userRepository = this.connection.getCustomRepository(UserRepository)
    const user = await userRepository.findOne(userId)
    if (!user) {
      throw new UnauthorizedException('user not found')
    }
    user.refreshToken = refreshToken
    return userRepository.save(user)
  }

  async findOneById(userId: string): Promise<User> {
    const userRepository = this.connection.getCustomRepository(UserRepository)
    const user = await userRepository.findOne(userId)
    if (!user) {
      throw new UnauthorizedException('user not found')
    }
    return user
  }
}
