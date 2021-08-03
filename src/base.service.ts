import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import BaseEntity, { IBaseEntity } from "./base.entity";


export default class BaseService {


    constructor(protected repository: any) {


    }


    create(data: IBaseEntity) {
        delete data.id;
        return this.repository.save(data);
    }

    async remove(id: number) {
        try {
            await this.repository.delete(id);
            return {
                status: "success"
            };
        } catch (error) {
            return {
                status: "failed"
            };
        }
    }

    findAll() {
        return this.repository.find();
    }


    findOne(term: number | string) {
        return this.repository.findOne(
            {
                where: [
                    {
                        username: term
                    },
                    // {
                    //     slug: term
                    // }
                ]

            }
        );
    }


    async update(id: number, updateDataDto: IBaseEntity) {
        let data = await this.repository.findOne(id);
        await this.repository.update(
            id,
            {
                ...updateDataDto,
                id,
                created: data.created,
                updated: data.updated,
            }
        )
        return this.findOne(id);
    }

}