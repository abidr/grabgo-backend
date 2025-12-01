
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AdminsModule } from './admins/admins.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './customers/auth/jwt.guard';
import { AuthModule } from './customers/auth/auth.module';


@Module({
  imports: [AuthModule, CustomersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12345',
    database: 'grabgo',
    autoLoadEntities: true,
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
