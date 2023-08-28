import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { SALTROUNDS } from 'src/constants/constant';
import { STATUS } from 'src/enums/status.enum';
import { UserLoginDto, UserSigninDto, UserSignupDto } from 'src/user/dto';
import { User } from 'src/user/entity';
import { UserAccessToken } from 'src/user/interfaces';
import { UserService } from 'src/user/services';
import { Connection } from 'typeorm';
import { RefreshTokenDto } from '../dto';
import { env } from 'src/config/env.config';
import { UserRepository } from 'src/user/repository';

@Injectable()
export class AuthService {
  constructor(
    private connection: Connection,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  
  async signUpUser(dto: UserSignupDto): Promise<User> {
    const { userName, password } = dto
    const userRepo = this.connection.getCustomRepository(UserRepository)
    const existedUser = await userRepo.getUserByEmail(dto.email)
    if (existedUser && existedUser?.status !== STATUS.INACTIVE) {
      throw new BadRequestException('User already exists')
    }
    const pass = this.createHash(password)
    const user = await this.connection.transaction(async entityManager => {
    let newUser: User
		const userRepository = entityManager.getCustomRepository(UserRepository)
		newUser = await userRepository.save({
		  ...dto,
		  userName,
		  status: STATUS.ACTIVE,
		  password: pass,
		})
      return newUser
    })

    return user
  }
  
  async signin(dto: UserSigninDto): Promise<User> {
    const { email, password } = dto
    const user = await this.validateSignin(email, password)
    if (!user) { throw new BadRequestException('User not found') }
    console.log('email:', email)
    return user
  }

  async validateSignin(email: string, password: string): Promise<User | null> {
    const userRepository = this.connection.getCustomRepository(UserRepository)
    const user = await userRepository.findOne({ email: email })

    if (user && user.password) {
      if (user.status === STATUS.INACTIVE) {
        throw new BadRequestException('Your account is currently inactive')
      }
      if (!compareSync(password, user.password)) {
        throw new ForbiddenException('Password is incorrect')
      }
      return user
    }
    return null
  }

  async signToken(user: User): Promise<UserAccessToken> {
    const { id, email } = user
    const payload = { email: email, sub: id }
    const refreshToken = this.jwtService.sign(payload, {
      secret: env.REFRESH_TOKEN_SECRET,
      expiresIn: '30d',
    })
    const accessToken = this.jwtService.sign(payload, {
      secret: env.ACCESS_TOKEN_SECRET,
      expiresIn: '7d',
    })
    await this.userService.updateRefreshToken(refreshToken, id)
    return { user, token: accessToken, refreshToken }
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{ accessToken: string, refreshToken: string }> {
    const { id, refreshToken } = refreshTokenDto
    if (!refreshToken) {
      throw new BadRequestException('Token not null')
    }

    const tokenVerify = await this.jwtService.verifyAsync<{ email: string; exp: number }>(refreshToken, { secret: env.REFRESH_TOKEN_SECRET })
    if (!tokenVerify || !tokenVerify.email) {
      throw new BadRequestException('Invalid refresh token')
    }

    const user = await this.userService.findOneById(id)
    if (!user.refreshToken) {
      throw new BadRequestException('User Invalid refresh token')
    }

    if (refreshToken !== user.refreshToken) {
      throw new BadRequestException('Invalid refresh token')
    }

    const payload = { email: user.email, sub: user.id }
    const newRefreshToken = this.jwtService.sign(payload, {
      secret: env.REFRESH_TOKEN_SECRET,
      expiresIn: '30d',
    })
    const token = this.jwtService.sign(payload)
    await this.userService.updateRefreshToken(refreshToken, user.id)
    return { accessToken: token, refreshToken: newRefreshToken }
  }

  //Authorization
  login(data: UserLoginDto): string {
    const accessToken = this.jwtService.sign(data, {
      secret: env.ACCESS_TOKEN_SECRET,
       expiresIn: '60s',
      })
    return accessToken
  }

  private createHash(password: string): string {
    const salt = genSaltSync(SALTROUNDS)
    return hashSync(password, salt)
  }
}
