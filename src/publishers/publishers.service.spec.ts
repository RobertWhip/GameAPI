// External
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as sinon from 'sinon';

// Internal
import { PublishersController } from './publishers.controller';
import { ErrorService } from '../components/errors.service';
import { PublishersService } from './publishers.service';
import { DBService } from '../components/db.service';
import { PublisherDto } from './dto/publisher.dto';
import Publisher from './entity/publisher'

describe('PublishersService', () => {
  let publisherService: PublishersService;
  let sandbox: sinon.SinonSandbox;

  beforeAll(async () => {
    sandbox = sinon.createSandbox();
    
    const module: TestingModule = await Test.createTestingModule({
        controllers: [PublishersController],
        providers: [
            DBService, ErrorService,
            PublishersService,
            {
                provide: getRepositoryToken(Publisher),
                useValue: sinon.createStubInstance(Repository),
            },
        ],
    }).compile();

    publisherService = module.get<PublishersService>(PublishersService);
  });

  it('should call create method with expected params', async () => {
    const createPublisherSpy = jest.spyOn(publisherService, 'create');
    const dto = new PublisherDto();
    publisherService.create(dto);
    expect(createPublisherSpy).toHaveBeenCalledWith(dto);
  });

  it('should call get method with expected param', async () => {
    const findOneNoteSpy = jest.spyOn(publisherService, 'get');
    const options: FindOneOptions = {};
    publisherService.get(options);
    expect(findOneNoteSpy).toHaveBeenCalledWith(options);
  });

  it('should call getList method with expected param', async () => {
    const getListSpy = jest.spyOn(publisherService, 'getList');
    const options: FindManyOptions = {};
    publisherService.getList(options);
    expect(getListSpy).toHaveBeenCalledWith(options);
  });

  it('should call getStats method with expected param', async () => {
    const getStatsSpy = jest.spyOn(publisherService, 'getStats');
    const options: FindManyOptions = {};
    publisherService.getStats(options);
    expect(getStatsSpy).toHaveBeenCalledWith(options);
  });

  it('should call update method with expected params', async () => {
    const updateSpy = jest.spyOn(publisherService, 'update');
    const id = 1;
    const dto = new PublisherDto();
    publisherService.update(id, dto);
    expect(updateSpy).toHaveBeenCalledWith(id, dto);
  });

  it('should call delete method with expected param', async () => {
    const deleteSpy = jest.spyOn(publisherService, 'delete');
    const id = 1;
    publisherService.delete(id);
    expect(deleteSpy).toHaveBeenCalledWith(id);
  });

  it('should return table name', async () => {
    const expectedName = 'publishers';
    const publishersTableName = publisherService.getTableName();
    expect(publishersTableName).toEqual(expectedName);
  });
  
  afterAll(async () => {
    sandbox.restore();
  });
});