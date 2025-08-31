import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'API Rest de Login Rodando...';
  }

  getStatus(): { status: number; message: string; data: string; hora: string } {
    return {
      status: 200,
      message: 'Api Online!',
      data: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
    };
  }
}
