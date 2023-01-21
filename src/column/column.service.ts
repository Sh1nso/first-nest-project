import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { contentColumn } from 'src/entitys/column.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column-dto';
import { UpdateColumnDto } from './dto/update-column-dto';

@Injectable()
export class ColumnService {
    constructor(
        @InjectRepository(contentColumn) private readonly columnRepository: Repository<contentColumn>,) {}

    async createColumn(columnData: CreateColumnDto, user): Promise<contentColumn> {
        const newPost = await this.columnRepository.create({
          name: columnData.name,
          description: columnData.discription,
          user: user.id
        });
        await this.columnRepository.save(newPost);
        return newPost;
      }


    async updateColumn(id: number, columnData: UpdateColumnDto, userData): Promise<contentColumn> {
        const column = await this.columnRepository.findOne({where: {id}})
        if (column)
        {  
          if (column.user === userData.id)
          { 
           console.log(column.user);
           
           await this.columnRepository.update(id, {
           name: columnData.name,
           description: columnData.discription
           })
           const updatedColumn = await this.columnRepository.findOne({where: {id}})
           return updatedColumn

          }else{throw new HttpException('You are not the owner', HttpStatus.UNAUTHORIZED)}
        }
        throw new HttpException('Column not found', HttpStatus.NOT_FOUND)
      }

    async deleteColumn(id: number, userData){
      const column = await this.columnRepository.findOne({where: {id}})
      if (column){
        if (column.user === userData.id)
        {
          await this.columnRepository.delete(id)
          return `Column with id ${id} has been removed`

        }else{throw new HttpException('You are not the owner', HttpStatus.UNAUTHORIZED)}
      }
      throw new HttpException('Column not found', HttpStatus.NOT_FOUND)
    }
}
