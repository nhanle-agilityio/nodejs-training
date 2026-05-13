import { Test, TestingModule } from '@nestjs/testing';
import { SlotsController } from './slots.controller';
import { SlotsService } from './slots.service';
import { Slot, SlotStatus } from './slot.entity';

describe('SlotsController', () => {
  let controller: SlotsController;
  let slotsService: jest.Mocked<Pick<SlotsService, keyof SlotsService>>;

  const slot = {
    id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    title: 'Slot Tile 1',
    startTime: new Date('2026-06-01T10:00:00.000Z'),
    endTime: new Date('2026-06-01T11:00:00.000Z'),
    price: 40,
    status: SlotStatus.Open,
  } as Slot;

  beforeEach(async () => {
    slotsService = {
      getAllSlots: jest.fn(),
      getSlotById: jest.fn(),
      createSlot: jest.fn(),
      updateSlot: jest.fn(),
      deleteSlot: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [SlotsController],
      providers: [{ provide: SlotsService, useValue: slotsService }],
    }).compile();

    controller = moduleRef.get(SlotsController);
  });

  it('getAllSlots maps entities to DTOs', async () => {
    slotsService.getAllSlots.mockResolvedValue([slot]);

    const dto = await controller.getAllSlots({ status: SlotStatus.Open });

    expect(slotsService.getAllSlots).toHaveBeenCalledWith({
      status: SlotStatus.Open,
    });
    expect(dto[0]).toMatchObject({
      id: slot.id,
      title: slot.title,
      status: slot.status,
    });
  });

  it('getSlotById delegates to service', async () => {
    slotsService.getSlotById.mockResolvedValue(slot);

    const dto = await controller.getSlotById(slot.id);

    expect(slotsService.getSlotById).toHaveBeenCalledWith(slot.id);
    expect(dto).toMatchObject({ id: slot.id });
  });

  it('createSlot delegates to service', async () => {
    const body = {
      title: 'Slot Name',
      startTime: '2026-07-01T12:00:00.000Z',
      endTime: '2026-07-01T13:00:00.000Z',
      price: 20,
    };
    slotsService.createSlot.mockResolvedValue({
      ...slot,
      title: body.title,
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
      price: body.price,
    });

    const dto = await controller.createSlot(body);

    expect(slotsService.createSlot).toHaveBeenCalledWith(body);
    expect(dto.title).toBe(body.title);
  });

  it('updateSlot delegates to service', async () => {
    slotsService.updateSlot.mockResolvedValue({
      ...slot,
      title: 'Slot Name Updated',
    });

    const dto = await controller.updateSlot(slot.id, {
      title: 'Slot Name Updated',
    });

    expect(slotsService.updateSlot).toHaveBeenCalledWith(slot.id, {
      title: 'Slot Name Updated',
    });
    expect(dto.title).toBe('Slot Name Updated');
  });

  it('deleteSlot delegates to service', async () => {
    slotsService.deleteSlot.mockResolvedValue(undefined);

    await controller.deleteSlot(slot.id);

    expect(slotsService.deleteSlot).toHaveBeenCalledWith(slot.id);
  });
});
