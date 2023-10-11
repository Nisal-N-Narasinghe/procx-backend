import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/typeorm/entities/Todo';
import { CreateTodoParams, UpdateTodoParams } from 'src/utils/types';
import { IntegerType, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  findTodos() {
    return this.todoRepository.find();
  }

  createTodo(todoDetails: CreateTodoParams) {
    const newTodo = this.todoRepository.create({
      ...todoDetails,
      createdAt: new Date(),
    });
    return this.todoRepository.save(newTodo); // async, so return the promise and wait
  }

  async updateTodo(id, updateTodoDetails): Promise<Todo> {
    const existingTodo = await this.todoRepository.findOneBy({ id });
    if (!existingTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    const updatedTodo = { ...existingTodo, ...updateTodoDetails };
    await this.todoRepository.save(updatedTodo);
    return updatedTodo;
  }

  async deleteTodo(id): Promise<Todo> {
    const deletedTodo = await this.todoRepository.findOneBy({ id });
    if (!deletedTodo) {
      throw new NotFoundException('Todo not found');
    }
    await this.todoRepository.delete({ id });
    return deletedTodo;
  }
}
