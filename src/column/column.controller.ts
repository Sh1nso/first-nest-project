import { Body, Controller, Post, Req, UseGuards, Put, Param, Delete } from '@nestjs/common';
import { identity } from 'rxjs';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column-dto';
import { UpdateColumnDto } from './dto/update-column-dto';

@Controller('column')
export class ColumnController {
    constructor(private readonly columnService: ColumnService){}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    createColumn(@Body() columnDto: CreateColumnDto, @Req() request) {
        const user = request.user
        return this.columnService.createColumn(columnDto, user)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateColumn(@Param('id') id:number, @Body() updateDto: UpdateColumnDto, @Req() request) {
        const user = request.user
        return this.columnService.updateColumn(id, updateDto, user)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    deleteColumn(@Param('id') id:number, @Req() request) {
        const user = request.user
        return this.columnService.deleteColumn(id, user)
    }
}
