// External
import { Test, TestingModule } from '@nestjs/testing';

// Internal
import { PublishersService } from '../publishers/publishers.service';
import { ErrorService } from '../components/errors.service';
import { DBService } from '../components/db.service';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { GameDto } from './dto/game.dto';

describe('GamesController', () => {
  let controller: GamesController;
  let spyService: GamesService;

  const APIServiceProvider = {
    provide: GamesService,
    useFactory: () => ({
      create: jest.fn(() => {}),
      update: jest.fn(() => {}),
      delete: jest.fn(() => {}),
      get: jest.fn(() => {}),
      getStats: jest.fn(() => {}),
      getList: jest.fn(() => [])
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [APIServiceProvider, DBService, ErrorService, PublishersService],
    }).compile();

    controller = module.get<GamesController>(GamesController);
    spyService = module.get<GamesService>(GamesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('calling create method', () => {
    const publisher = new GameDto();
    controller.create(publisher)
    expect(spyService.create).toHaveBeenCalledWith(publisher);
  });

  it('calling update method', () => {
    const publisher = new GameDto();
    const id = 1;
    controller.update(publisher, id)
    expect(spyService.update).toHaveBeenCalledWith(id, publisher);
  });

  it('calling delete method', () => {
    const id = 1;
    controller.delete(id);
    expect(spyService.delete).toHaveBeenCalledWith(1);
  });

  it('calling get method', () => {
    const id = 1;
    controller.get(id);
    expect(spyService.get).toHaveBeenCalledWith(id);
  });

  it('calling getListWithStats method', () => {
    const options = {
      page: 1,
      pageSize: 1,
      tag: 'test-name',
      title: 'test-title',
      publisherId: 1
    };

    controller.getListWithStats(
      options.page,
      options.pageSize,
      options.tag,
      options.title,
      options.publisherId
    );

    expect(spyService.getList).toHaveBeenCalledWith(options);
    expect(spyService.getStats).toHaveBeenCalledWith(options);
  });
});