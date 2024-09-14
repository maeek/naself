import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Node } from 'src/db/entities/node.entity';
import { FileDescriptor } from './filesystem.service';
import * as path from 'path';

@Injectable()
export class NodeUpdaterService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Node) private nodesRepository: Repository<Node>,
  ) {}

  async index(baseDir: string, files: FileDescriptor[]) {
    const nodesInBaseDir = await this.nodesRepository.find({
      where: { path: Like(`${baseDir}%`) },
    });

    const nodesInBaseDirMap = new Map<string, Node>();
    for (let i = 0; i < nodesInBaseDir.length; i++) {
      nodesInBaseDirMap.set(nodesInBaseDir[i].path, nodesInBaseDir[i]);
    }

    const newOrUpdatedNodes = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const node = nodesInBaseDirMap.get(path.join(baseDir, file.name));
      if (node) {
        node.size = file.size;
        node.isDirectory = file.isDirectory;
        node.isSymLink = file.isSymLink;
        newOrUpdatedNodes.push(node);
      } else {
        newOrUpdatedNodes.push({
          path: path.join(baseDir, file.name),
          name: file.name,
          isDirectory: file.isDirectory,
          size: file.size,
          isSymLink: file.isSymLink,
        });
      }
    }

    const data = await this.nodesRepository.save(newOrUpdatedNodes);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return data.map(({ path: filePath, id, ...rest }) => ({
      name: path.basename(filePath),
      ...rest,
    }));
  }

  // async removeOrphans(baseDir: string, files: FileDescriptor[]) {
  //   const nodesInBaseDir = await this.nodesRepository.find({
  //     where: { path: Like(`${baseDir}%`) },
  //   });

  //   const nodesInBaseDirMap = new Map<string, Node>();
  //   for (let i = 0; i < nodesInBaseDir.length; i++) {
  //     nodesInBaseDirMap.set(nodesInBaseDir[i].path, nodesInBaseDir[i]);
  //   }

  //   const nodesToDelete = [];

  //   for (let i = 0; i < nodesInBaseDir.length; i++) {
  //     const node = nodesInBaseDir[i];
  //     const file = files.find((f) => f.name === path.basename(node.path));
  //     if (!file) {
  //       nodesToDelete.push(node);
  //     }
  //   }

  //   await this.nodesRepository.remove(nodesToDelete);
  // }
}
