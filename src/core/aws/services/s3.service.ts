import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IStorageService } from 'src/core/types';

@Injectable()
export class AwsS3Service implements IStorageService {
  private _s3: S3;
  private _s3Bucket: string;
  private _temporaryFolder: string;
  private _urlPrefix: string;
  private _uploadPresignTTL = 30 * 60;
  constructor(private _configService: ConfigService) {
    this._s3 = new S3({
      region: _configService.get('REGION'),
      credentials: {
        accessKeyId: _configService.get('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: _configService.get('AWS_SECRET_ACCESS_KEY')!,
      },
    });
    this._temporaryFolder =
      _configService.get('S3_UPLOAD_FOLDER') || 'temporary';
    this._s3Bucket = _configService.get('S3_BUCKET')!;
    this._urlPrefix = `https://${this._s3Bucket}.s3.${_configService.get(
      'REGION',
    )}.amazonaws.com`;
  }
  getUrl(path: string): string {
    return `${this._urlPrefix}/${path}`;
  }
  private _generateFilePath(): string {
    return `${this._temporaryFolder}/${Date.now()}`;
  }
  public async uploadFile(file: Express.Multer.File) {
    const filePath = this._generateFilePath();
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Body: file.buffer,
      Key: filePath,
      ContentType: file.mimetype,
    });
    await this._s3.send(command);
    return this._getS3UploadResponse(filePath);
  }
  async storePermanent(path: string, newFolder: string) {
    const filePath = this.getFilePath(path);
    const newFileKey = newFolder + '/' + filePath.split('/')[1];
    const command = new CopyObjectCommand({
      Bucket: this._s3Bucket,
      CopySource: '/' + this._s3Bucket + '/' + filePath,
      Key: newFileKey,
    });
    await this._s3.send(command);
    return this._getS3UploadResponse(newFileKey);
  }
  public async remove(path: string): Promise<void> {
    const fileKey = this.getFilePath(path);
    const command = new DeleteObjectCommand({
      Bucket: this._s3Bucket,
      Key: fileKey,
    });
    await this._s3.send(command);
  }

  public async presign(url: string): Promise<string> {
    const filePath = this.getFilePath(url);
    return this._getUrl(filePath);
  }

  public getFilePath(path: string) {
    return path.replace(`${this._urlPrefix}/`, '').split('?')[0];
  }

  private async _getS3UploadResponse(path: string) {
    return {
      path,
      url: await this._getUrl(path),
    };
  }

  private _getUrl(path: string) {
    const getObjectCommand = new GetObjectCommand({
      Bucket: this._s3Bucket,
      Key: path,
    });
    return getSignedUrl(this._s3, getObjectCommand, {
      expiresIn: this._uploadPresignTTL,
    });
  }
}
