import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { InteractionType } from '@/constants/interaction-type.enum';
import { AuthorizationGuard } from '@/infra/guards/authorization.guard';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Lead } from './entities/lead.entity';
import { ExceptionDto } from '@/_shared/dtos/exception.dto';
import { OutgoingTwilioMessageDto } from './dto/outgoing-twillio-message.dto';

@ApiTags('Leads')
@UseGuards(AuthorizationGuard)
@Controller('api/leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @ApiOperation({ operationId: 'createLead', summary: 'Create a new lead' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Lead successfully created.',
    type: Lead,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
    type: ExceptionDto,
  })
  @ApiCookieAuth()
  @Post()
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.create(createLeadDto);
  }

  @ApiOperation({ operationId: 'findAllLeads', summary: 'Get all leads' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Array of leads.',
    type: Lead,
    isArray: true,
  })
  @ApiQuery({
    name: 'phoneNumber',
    required: false,
    type: String,
    description: 'Phone number to filter leads',
  })
  @ApiCookieAuth()
  @Get()
  findAll(@Query('phoneNumber') phoneNumber?: string) {
    return this.leadsService.findAll(phoneNumber);
  }

  @ApiOperation({
    operationId: 'findOneLead',
    summary: 'Get a single lead by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found lead.',
    type: Lead,
  })
  @ApiBadRequestResponse({
    description: 'Lead not found.',
    type: ExceptionDto,
  })
  @ApiParam({ name: 'id', required: true, description: 'Lead ID' })
  @ApiCookieAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(id);
  }

  @ApiOperation({ operationId: 'updateLead', summary: 'Update a lead' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lead successfully updated.',
    type: Lead,
  })
  @ApiBadRequestResponse({
    description: 'Lead not found.',
    type: ExceptionDto,
  })
  @ApiParam({ name: 'id', required: true, description: 'Lead ID' })
  @ApiCookieAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadsService.update(id, updateLeadDto);
  }

  @ApiOperation({
    operationId: 'addLeadHistory',
    summary: 'Add history to a lead',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'History added to lead.',
    type: Lead,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request or Lead not found.',
    type: ExceptionDto,
  })
  @ApiParam({ name: 'id', required: true, description: 'Lead ID' })
  @ApiCookieAuth()
  @Post(':id/history')
  addHistory(
    @Param('id') id: string,
    @Body('type') type: InteractionType,
    @Body('data') data: unknown,
  ) {
    return this.leadsService.addHistory(id, type, data);
  }

  @ApiOperation({
    operationId: 'sendSms',
    summary: 'Send an SMS to a lead',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'SMS sent.',
  })
  @ApiNotFoundResponse({
    description: 'Lead not found.',
    type: ExceptionDto,
  })
  sendSms(@Body() body: OutgoingTwilioMessageDto) {
    return this.leadsService.sendSms(body.leadId, body.body);
  }
}
