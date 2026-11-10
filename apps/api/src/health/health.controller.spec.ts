import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller.js';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('returns status OK and the current server time', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));
    const response = controller.health();

    expect(response).toEqual({
      status: 'OK',
      timestamp: '2026-01-01T00:00:00.000Z',
    });
  });

  afterEach(async () => {
    vi.useRealTimers();
  });
});
