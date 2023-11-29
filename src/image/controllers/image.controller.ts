import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Image')
@ApiBearerAuth()
@Controller('image')
export class ImageController {}
