import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthorizationGuard } from '@/infra/guards/authorization.guard';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Roles, RolesGuard } from '@/infra/guards/role.guard';
import { Role } from '@/constants/roles.enum';
import { ExceptionDto } from '@/_shared/dtos/exception.dto';

@ApiTags('Users')
@UseGuards(AuthorizationGuard, RolesGuard)
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ operationId: 'createUser', summary: 'Create a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully created.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
    type: ExceptionDto,
  })
  @ApiCookieAuth()
  @Roles([Role.MANAGER])
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ operationId: 'findAllUsers', summary: 'Get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Array of users.',
    type: User,
    isArray: true,
  })
  @ApiCookieAuth()
  @Roles([Role.MANAGER])
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    operationId: 'findOneUser',
    summary: 'Get a single user by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found user.',
    type: User,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @ApiCookieAuth()
  @Roles([Role.MANAGER])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ operationId: 'updateUser', summary: 'Update a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully updated.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiCookieAuth()
  @Roles([Role.MANAGER])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ operationId: 'removeUser', summary: 'Delete a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully deleted.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiCookieAuth()
  @Roles([Role.MANAGER])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
