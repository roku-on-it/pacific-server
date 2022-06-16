import { Injectable } from '@nestjs/common';
import {
  BinaryLike,
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from 'node:crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EncryptionService {
  private algorithm = 'aes-256-ctr';
  private passphrase = this.configService.get('SESSION_SECRET');

  constructor(private configService: ConfigService) {}

  async encrypt(
    data: BinaryLike,
    passphrase = this.passphrase,
  ): Promise<string> {
    const iv: Buffer = randomBytes(16);
    const encrypted: Buffer = createCipheriv(
      this.algorithm,
      passphrase,
      iv,
    ).update(data);

    return iv.toString('hex') + encrypted.toString('hex');
  }

  async decrypt(data: string, passphrase = this.passphrase): Promise<string> {
    const iv = Buffer.from(data.slice(0, 32), 'hex');
    const encrypted = Buffer.from(data.slice(32), 'hex');

    return createDecipheriv(this.algorithm, passphrase, iv)
      .update(encrypted)
      .toString();
  }
}
