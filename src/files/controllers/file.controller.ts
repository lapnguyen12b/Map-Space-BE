import {
  Controller,
  Inject,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { BaseController } from 'src/shared';
import { FileProviders, IFileService } from '../interfaces';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@ApiBearerAuth()
@Controller('files')
export class FileController extends BaseController {
  constructor(
    @Inject(FileProviders.FileService) private _fileService: IFileService,
  ) {
    super();
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() response: Response,
  ) {
    const filename = await this._fileService.uploadFile(file);
    return this.responseCustom(response, filename);
  }
}
