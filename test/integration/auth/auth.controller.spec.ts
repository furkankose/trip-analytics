import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../src/modules';
import { AuthController } from '../../../src/modules/auth/auth.controller';

describe('AuthController', () => {
  let app: INestApplication;
  let authController: AuthController;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await moduleFixture.createNestApplication().init();
    authController = app.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should return a JWT access token', async () => {
      const req = {
        user: { id: '604134d914453e3755709a04', username: 'furkan' },
      };

      const result = await authController.login(req);
      expect(result.access_token).toBeDefined();
    });
  });
});
