import { Post, Body, Get, Param, Put, Delete, Patch, UseInterceptors, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { IBaseEntity } from "./base.entity";
// import { editImageName } from "./file-upload.utils";


export default class BaseController {

    /**
     *
     */
    constructor(protected service: any) { }



    @Post()
    create(@Body() createDataDto: IBaseEntity) {
        return this.service.create(createDataDto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':slug')
    findOne(@Param('slug') slug: string | number) {
        return this.service.findOne(slug);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDataDto: IBaseEntity) {
        return this.service.update(+id, updateDataDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(+id);
    }

    // @Patch('image/:id')
    // @UseInterceptors(FileInterceptor('image', {
    //     storage: diskStorage({
    //         destination: './uploads/',
    //         filename: editImageName
    //     })
    // }))
    // uploadFile(@UploadedFile() file: Express.Multer.File, @Param('id') id: string) {
    //     this.update(id, {
    //         image: file.filename
    //     })

    // }

}