import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { SubscriptionPackagesModule } from './subscription-packages/subscription-packages.module';
import { PackageBenefitsModule } from './package-benefits/package-benefits.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'u_market',
      entities: [__dirname + '/**/*.entity{.ts}'],
      synchronize: true,
      autoLoadEntities: true
    }),
    // MODULES
    UsersModule,
    SubscriptionsModule,
    SubscriptionPackagesModule,
    PackageBenefitsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
