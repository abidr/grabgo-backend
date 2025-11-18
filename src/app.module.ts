import { ManagersModule } from './managers/managers.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminsModule } from './admins/admins.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AdminsModule, ManagersModule, TypeOrmModule.forRoot(
 { type: 'postgres',
 host: 'localhost',
 port: 5432,
 username: 'postgres',
 password: '77492007',
 database: 'adminDB',//Change to your database name
 autoLoadEntities: true,
 synchronize: true,
 } ),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
