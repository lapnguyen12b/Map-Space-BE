import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from '../entity';
import { UserRepository } from '../repository';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { SEND_EMAIL_QUEUE, WELCOME_EMAIL } from 'src/core/constants';

@Injectable()
export class UserService {
  constructor(
    private connection: Connection,
    @InjectQueue(SEND_EMAIL_QUEUE)
    private sendEmail: Queue,
  ) {}

  async updateRefreshToken(
    refreshToken: string,
    userId: string,
  ): Promise<User> {
    const userRepository = this.connection.getCustomRepository(UserRepository);
    const user = await userRepository.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('user not found');
    }
    user.refreshToken = refreshToken;
    return userRepository.save(user);
  }

  async findOneById(userId: string): Promise<User> {
    const userRepository = this.connection.getCustomRepository(UserRepository);
    const user = await userRepository.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('user not found');
    }
    return user;
  }

  //Queue send email Welcome
  async sendEmailRegister(email: string, name: string): Promise<void> {
    await this.sendEmail.add(
      WELCOME_EMAIL,
      {
        to: email,
        name,
      },
      {
        priority: 1,
        removeOnComplete: true,
      },
    );
  }
}
