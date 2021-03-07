import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../src/modules';
import { UserService } from '../../../src/modules/user/user.service';

describe('UserService', () => {
  let app: INestApplication;
  let userService: UserService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await moduleFixture.createNestApplication().init();
    userService = app.get<UserService>(UserService);
  });

  describe('findByUsername', () => {
    it('should throw bad request error', () => {
      const username = 'wrongusername';
      const result = userService.findByUsername(username);
      expect(result).rejects.toThrowError();
    });

    it('should return user', async () => {
      const username = 'demo';
      const result = await userService.findByUsername(username);
      expect(result.id).toBeDefined();
    });
  });
});
