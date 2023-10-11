import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './typeorm/entities/Todo';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db-procx-do-user-13171573-0.b.db.ondigitalocean.com',
      port: 25060,
      username: 'doadmin',
      password: 'AVNS_RTTlLG6iD1sutqHe2K6',
      database: 'defaultdb',
      entities: [Todo],
      synchronize: true, // every single time we do a modification, then this automatically updates
    }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
