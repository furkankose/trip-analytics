import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginRequestDTO {
  @ApiProperty({ example: 'demo' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'demo' })
  @IsString()
  password: string;
}
