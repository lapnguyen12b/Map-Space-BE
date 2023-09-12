export interface IFileService {
  uploadFile(file: Express.Multer.File): Promise<string>;
}
