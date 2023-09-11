import { Inject, Injectable } from '@nestjs/common';
import { CoreServices, IStorageService } from 'src/core/types';
import { IFileService } from '../interfaces';
import { File } from '../entity';
import { Connection } from 'typeorm';
import { FileRepository } from '../repository';

@Injectable()
export class FileService implements IFileService {
  private _fileRepository: FileRepository;
  constructor(
    @Inject(CoreServices.StorageService)
    private _storageService: IStorageService,
    private _connection: Connection,
  ) {
    this._fileRepository = _connection.getCustomRepository(FileRepository);
  }

  async uploadFile(file: Express.Multer.File) {
    const upload = await this._storageService.uploadFile(file);
    await this._fileRepository.save(
      new File({ path: upload.path, type: file.mimetype }),
    );
    return upload.url;
  }
  async remove(filename: string): Promise<void> {
    await this._storageService.remove(filename);
  }
}
