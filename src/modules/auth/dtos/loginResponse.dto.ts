import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDTO {
  @ApiProperty()
  access_token: string;
}
