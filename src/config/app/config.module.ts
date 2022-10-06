import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BaseResource } from '@utils/base-class/base.resource';
import config from './config';
import schema from './schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      expandVariables: true,
      validationSchema: schema,
    }),
  ],
  providers: [BaseResource],
})
export class AppConfigModule {
  static BaseResouce: BaseResource;

  constructor(readonly baseResource: BaseResource) {
    AppConfigModule.BaseResouce = baseResource;
  }
}
