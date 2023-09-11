import { Module } from '@nestjs/common';
import { FileController } from './controllers';
import { FileService } from './services';
import { FileProviders } from './interfaces';

@Module({
  imports: [],
  controllers: [FileController],
  providers: [
    {
      provide: FileProviders.FileService,
      useClass: FileService,
    },
  ],
})
export class FileModule {}
