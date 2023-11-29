import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Review')
@ApiBearerAuth()
@Controller('reviews')
export class ReviewsController {}
