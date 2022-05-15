// External
import { Test, TestingModule } from '@nestjs/testing';

// Internal
import { DBService } from '../components/db.service';
import { ErrorService } from '../components/errors.service';
import { PublisherDto } from './dto/publisher.dto';
import { PublishersController } from './publishers.controller';
import { PublishersService } from './publishers.service';

describe('PublishersController', () => {
  let controller: PublishersController;
  let spyService: PublishersService;

  const APIServiceProvider = {
    provide: PublishersService,
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
      controllers: [PublishersController],
      providers: [APIServiceProvider, ErrorService, DBService]
    }).compile();

    controller = module.get<PublishersController>(PublishersController);
    spyService = module.get<PublishersService>(PublishersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('calling create method', () => {
    const publisher = new PublisherDto();
    controller.create(publisher)
    expect(spyService.create).toHaveBeenCalledWith(publisher);
  });

  it('calling update method', () => {
    const publisher = new PublisherDto();
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
      name: 'test-name',
      siret: 123
    };

    controller.getListWithStats(
      options.page,
      options.pageSize,
      options.name,
      options.siret
    );

    expect(spyService.getList).toHaveBeenCalledWith(options);
    expect(spyService.getStats).toHaveBeenCalledWith(options);
  });
});
