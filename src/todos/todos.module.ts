import { Module } from '@nestjs/common';
import { TodosController } from './controllers/users/todos.controller';
import { TodosService } from './services/todos/todos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/typeorm/entities/Todo';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
