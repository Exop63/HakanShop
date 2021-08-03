import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
} from 'typeorm';

abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created;

    @UpdateDateColumn()
    updated;

    @Column({ nullable: true })
    slug: string;

    // @Column({ default: true })
    // is_active: boolean;


    // @Column({ default: false })
    // is_deleted: boolean;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true, type: 'text' })
    content: string;

}

export class IBaseEntity {
    id?: number;

    created?: string;

    updated?: string;

    is_active?: boolean;

    is_deleted?: boolean;

    image?: string;
    
    title?: string;

    content?: string;

    slug?: string;
}

export default BaseEntity;