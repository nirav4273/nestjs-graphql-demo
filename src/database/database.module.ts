import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory:(config: ConfigService) => ({
          database: config.get("DB_NAME"),
          host: config.get("DB_HOST"),
          username: config.get("DB_USER"),
          password: config.get("DB_PASSWORD"),
          port: 3306,
          autoLoadModels: true,
          synchronize: false,
          dialect: "mysql"
      }),
      inject: [ConfigService]
    })
  ],
  exports: [SequelizeModule],
})

export class DatabaseModule {}