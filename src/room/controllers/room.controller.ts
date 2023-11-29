import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from '../services';
import { JwtAuthGuard } from 'src/core/guards';
import { AddRoomDto } from '../dto';
import { Room } from '../entity';
import { IPagination } from '../interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Room')
@ApiBearerAuth()
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addRoom(@Body() room: AddRoomDto): Promise<Room> {
    return this.roomService.addNewRoom(room);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getAllRoom(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ): Promise<IPagination<Room>> {
    return this.roomService.getAll(page, limit);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getRoomById(@Param('id') id: string): Promise<Room> {
    return this.roomService.getRoomById(id);
  }
}
