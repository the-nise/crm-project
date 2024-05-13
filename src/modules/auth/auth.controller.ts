import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  ServiceUnavailableException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { AuthenticationGuard } from '../../infra/guards/authentication.guard';
import { LoginDto } from './dto/login.dto';
import { AuthorizationGuard } from '@/infra/guards/authorization.guard';
import { AuthDto } from './dto/auth.dto';
import { Request } from '@/infra/express/request';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  @UseGuards(AuthenticationGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ operationId: 'login', summary: 'User login' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful login',
    type: AuthDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBody({ type: LoginDto })
  login(@Req() request: Request): AuthDto {
    return { user: request.user };
  }

  @UseGuards(AuthorizationGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'logout', summary: 'User logout' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful logout' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async logout(@Req() request: Request) {
    return new Promise((resolve) => {
      request.session.destroy(() => {
        resolve({ message: 'User logged out' });
      });
    });
  }

  @UseGuards(AuthorizationGuard)
  @Get('verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    operationId: 'verifySession',
    summary: 'Verify user session',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Session verified',
    type: AuthDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  verifySession(@Req() request: Request): AuthDto {
    if (!request.user) throw new ServiceUnavailableException('User not found');
    return { user: request.user };
  }
}
