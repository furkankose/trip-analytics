import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { resolve } from 'path';

import { AuthModule } from './auth/auth.module';

config({ path: resolve(process.cwd(), '.env') });

@Module({
  imports: [AuthModule],
})
export class AppModule {}
