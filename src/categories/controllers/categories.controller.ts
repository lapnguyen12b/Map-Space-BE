import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {}
