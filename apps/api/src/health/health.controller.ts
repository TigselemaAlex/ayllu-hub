import { Controller, Get } from '@nestjs/common';

export interface HealthResponse {
  status: 'OK' | 'BAD';
  timestamp: string;
}

@Controller('health')
export class HealthController {
  @Get()
  health(): HealthResponse {
    return { status: 'OK', timestamp: new Date().toISOString() };
  }
}
