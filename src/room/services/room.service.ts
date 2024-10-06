import { BadRequestException, Injectable } from '@nestjs/common';
import { Room } from '../entity';
import { Connection } from 'typeorm';
import { AddRoomDto } from '../dto';
import { IPagination } from '../interface';

@Injectable()
export class RoomService {
  constructor(private connection: Connection) {}

  async addNewRoom(dto: AddRoomDto): Promise<Room> {
    // commit
    const {
      title = '',
      description,
      pricePerMonth,
      pricePerYear,
      size,
      address,
      lat,
      lng,
      service,
      numberOfProple,
    } = dto;
    const roomRepository = this.connection.getRepository(Room);
    const room = new Room();
    (room.title = title),
      (room.description = description),
      (room.pricePerMonth = pricePerMonth),
      (room.pricePerYear = pricePerYear),
      (room.size = size),
      (room.lat = lat),
      (room.lng = lng),
      (room.address = address),
      (room.service = service),
      numberOfProple;

    return roomRepository.save({
      ...room,
    });
  }

  async getAll(page: number, limit: number): Promise<IPagination<Room>> {
    const skip = page * limit - limit;
    const roomRepository = this.connection.getRepository(Room);
    const query = roomRepository.createQueryBuilder('room');
    query.take(limit);
    query.skip(skip);
    const [data, totalItems] = await query.getManyAndCount();

    const totalPages = Math.ceil(totalItems / limit);
    return {
      data,
      currentPage: page,
      itemsPerPage: limit,
      totalItems,
      totalPages,
    };
  }

  async getRoomById(id: string): Promise<Room> {
    const roomRepository = this.connection.getRepository(Room);
    const room = await roomRepository.findOne({
      where: {
        id,
      },
    });
    if (!room) {
      throw new BadRequestException(`Room id ${id} not found!`);
    }
    return room;
  }
}
