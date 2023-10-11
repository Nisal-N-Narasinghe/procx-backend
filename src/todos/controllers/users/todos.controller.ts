import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateTodoDto } from 'src/todos/dtos/CreateTodo.dto';
import { UpdateTodoDto } from 'src/todos/dtos/UpdateTodo.dto';
import { TodosService } from 'src/todos/services/todos/todos.service';

import { Todo } from 'src/typeorm/entities/Todo';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  async getTodos() {
    return this.todoService.findTodos();
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createTodo(createTodoDto);
  }

  @Put(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDetails: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.updateTodo(id, updateTodoDetails);
  }

  @Delete(':id')
  async deleteTodoById(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return await this.todoService.deleteTodo(id);
  }
}
