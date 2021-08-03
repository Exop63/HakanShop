import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import BaseController from 'src/base.controller';

@Controller('products')
export class ProductsController extends BaseController {
  constructor(protected readonly productsService: ProductsService) {
    super(productsService);
  }

   
}
