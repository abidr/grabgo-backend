import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

export interface FileUploadOptions {
  maxSize?: number; // in bytes
  allowedMimeTypes?: string[];
}

@Injectable()
export class FileUploadValidationPipe implements PipeTransform {
  constructor(private readonly options: FileUploadOptions = {}) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const file = value;

    // Ensure a file was provided
    if (!file) {
      throw new BadRequestException('File is required');
    }

    // Validate size
    if (this.options.maxSize && typeof file.size === 'number') {
      if (file.size > this.options.maxSize) {
        throw new BadRequestException(`File too large. Max size is ${this.options.maxSize} bytes`);
      }
    }

    // Validate mime type
    if (this.options.allowedMimeTypes && this.options.allowedMimeTypes.length) {
      const mimetype = file.mimetype || file.type;
      if (!mimetype || !this.options.allowedMimeTypes.includes(mimetype)) {
        throw new BadRequestException(
          `Invalid file type. Allowed types: ${this.options.allowedMimeTypes.join(', ')}`,
        );
      }
    }

    return value;
  }
}
