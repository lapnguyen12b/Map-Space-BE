import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@ApiBearerAuth()
@Controller('favorites')
export class FavoritesController {}
