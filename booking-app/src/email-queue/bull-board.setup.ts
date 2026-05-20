import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  BullBoardModule,
  type BullBoardModuleOptions,
} from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BULL_BOARD_ROUTE } from './bull-board.constants';

export const bullBoardRootModule = (): DynamicModule => {
  return BullBoardModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: () => {
      const options: BullBoardModuleOptions = {
        route: BULL_BOARD_ROUTE,
        adapter: ExpressAdapter,
      };
      return options;
    },
  });
};
