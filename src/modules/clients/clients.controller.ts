import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Client } from './entities/client.entity';
import { Roles, RolesGuard } from '@/infra/guards/role.guard';
import { Role } from '@/constants/roles.enum';
import { AuthorizationGuard } from '@/infra/guards/authorization.guard';

@ApiTags('Clients')
@UseGuards(AuthorizationGuard, RolesGuard)
@Controller('api/clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Client,
  })
  @ApiBody({ type: CreateClientDto })
  @Roles([Role.MANAGER])
  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({
    status: 200,
    description: 'Array of clients.',
    type: [Client],
  })
  @Roles([Role.MANAGER])
  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @ApiOperation({ summary: 'Get a client by id' })
  @ApiResponse({
    status: 200,
    description: 'The client with the given id.',
    type: Client,
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'Client ID',
  })
  @Roles([Role.MANAGER])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a client secret' })
  @ApiResponse({
    status: 200,
    description: 'This operation will renew the client secret.',
    type: Client,
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'Client ID',
  })
  @Roles([Role.MANAGER])
  @Patch(':id')
  update(@Param('id') id: string) {
    return this.clientsService.renewSecret(id);
  }

  @ApiOperation({ summary: 'Delete a client' })
  @ApiResponse({
    status: 200,
    description: 'The client has been successfully deleted.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'Client ID',
  })
  @Roles([Role.MANAGER])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
