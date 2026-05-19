import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  BullBoardModule,
  type BullBoardModuleOptions,
} from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BULL_BOARD_ROUTE } from './bull-board.constants';
import { QUEUE_EMAIL } from './queue.constants';

export const bullBoardRootModule = (): DynamicModule => {
  return BullBoardModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: () => {
      const options: BullBoardModuleOptions = {
        route: BULL_BOARD_ROUTE,
        adapter: ExpressAdapter,
        // middleware: TODO,
      };
      return options;
    },
  });
};

export const bullBoardFeatureModule = (): DynamicModule => {
  return BullBoardModule.forFeature({
    name: QUEUE_EMAIL,
    adapter: BullMQAdapter,
  });
};
