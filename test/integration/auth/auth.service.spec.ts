import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../src/modules';
import { AuthService } from '../../../src/modules/auth/auth.service';

describe('AuthService', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await moduleFixture.createNestApplication().init();
    authService = app.get<AuthService>(AuthService);
  });

  describe('validateUser', () => {
    it('should throw bad request error', () => {
      const username = 'demo';
      const password = 'wrongpassword';

      const result = authService.validateUser(username, password);
      expect(result).rejects.toThrowError();
    });

    it('should return user', async () => {
      const username = 'demo';
      const password = 'demo';
      const expectedUser = { id: '604134c790efd09efeca75ef', username: 'demo' };

      const result = await authService.validateUser(username, password);
      expect(result).toEqual(expectedUser);
    });
  });

  describe('login', () => {
    it('should return a JWT access token', async () => {
      const user = { id: '604134d914453e3755709a04', username: 'furkan' };

      const result = await authService.login(user);
      expect(result.access_token).toBeDefined();
    });
  });
});
