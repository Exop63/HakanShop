import { Injectable, Param, Patch, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import BaseService from 'src/base.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@UseGuards(JwtAuthGuard)
@Injectable()
export class ProductsService extends BaseService{
  constructor(
    @InjectRepository(Product)
    protected repository: Repository<Product>
  ) {
    super(repository);
  }
  

   @Patch('image/:id')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads/',
            filename: editFileName
        })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Param('id') id: string) {
        this.update(+id, {
            image: file.filename
        })

    }

}
export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};