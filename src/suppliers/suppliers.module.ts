import { Module } from '@nestjs/common';
import { SuppliersController } from './controllers/suppliers/suppliers.controller';
import { SuppliersService } from './services/suppliers/suppliers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from 'src/typeorm/entities/Supplier';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
