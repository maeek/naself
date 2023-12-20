export interface FileDescriptor {
  name: string;
  isDirectory: boolean;
  mime: string;
  size: number;
  createdAt: number;
  modifiedAt: number;
  isSymLink: boolean;
}

export interface FilesImplementation {
  ls(
    filePath: string,
    hidden?: boolean,
  ): Promise<{
    name: string;
    size: number;
    createdAt: number;
    modifiedAt: number;
    timezone: string;
    total: number;
    children: FileDescriptor[];
  }>;
  read(filePath: string): Promise<Buffer>;
  write(filePath: string, content: Buffer): Promise<void>;
  delete(filePath: string): Promise<void>;
  move(sourcePath: string, destinationPath: string): Promise<void>;
  copy(sourcePath: string, destinationPath: string): Promise<void>;
  createFolder(filePath: string, name: string): Promise<void>;
  rename(filePath: string, name: string): Promise<void>;
  stat(filePath: string): Promise<FileDescriptor>;
  compress(
    filePath: string,
    type?: 'zip' | 'tar',
  ): Promise<{ archivePath: `${string}.${'zip' | 'tar'}` }>;
  decompress(filePath: string): Promise<void>;
}
