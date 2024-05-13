import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Campaign } from './entities/campaign.entity';

@ApiTags('Campaigns')
@Controller('api/campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  @ApiOperation({ operationId: 'createCampaign', summary: 'Create campaign' })
  @ApiCreatedResponse({
    description: 'The campaign has been successfully created.',
    type: Campaign,
  })
  @ApiBadRequestResponse({
    description: 'Campaign with same name already exists',
  })
  @ApiBody({ type: CreateCampaignDto })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignsService.create(createCampaignDto);
  }

  @Get()
  @ApiOperation({
    operationId: 'findAllCampaigns',
    summary: 'Retrieve campaigns',
  })
  @ApiOkResponse({
    description: 'Return all campaigns.',
    type: Campaign,
    isArray: true,
  })
  findAll() {
    return this.campaignsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'findOneCampaign',
    summary: 'Get a campaign by id',
  })
  @ApiOkResponse({
    description: 'The campaign has been successfully found.',
    type: Campaign,
  })
  @ApiNotFoundResponse({ description: 'Campaign not found.' })
  findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ operationId: 'updateCampaign', summary: 'Update a campaign' })
  @ApiOkResponse({
    description: 'The campaign has been successfully updated.',
    type: Campaign,
  })
  @ApiNotFoundResponse({
    description: 'Campaign not found.',
  })
  @ApiBody({ type: UpdateCampaignDto })
  update(
    @Param('id') id: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    return this.campaignsService.update(id, updateCampaignDto);
  }

  @Delete(':id')
  @ApiOperation({ operationId: 'removeCampaign', summary: 'Delete a campaign' })
  @ApiOkResponse({
    description: 'The campaign has been successfully deleted.',
  })
  @ApiNotFoundResponse({ description: 'Campaign not found.' })
  remove(@Param('id') id: string) {
    return this.campaignsService.remove(id);
  }
}
