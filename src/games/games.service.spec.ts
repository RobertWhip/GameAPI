// External
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as sinon from 'sinon';

// Internal
import { GamesController } from './games.controller';
import { ErrorService } from '../components/errors.service';
import { GamesService } from './games.service';
import { DBService } from '../components/db.service';
import { GameDto } from './dto/game.dto';
import Game from './entity/game'
import { PublishersService } from '../publishers/publishers.service';

describe('GamesService', () => {
  let gameService: GamesService;
  let sandbox: sinon.SinonSandbox;

  beforeAll(async () => {
    sandbox = sinon.createSandbox();
    
    const module: TestingModule = await Test.createTestingModule({
        controllers: [GamesController],
        providers: [
            DBService, ErrorService, PublishersService,
            GamesService,
            {
                provide: getRepositoryToken(Game),
                useValue: sinon.createStubInstance(Repository),
            },
        ],
    }).compile();

    gameService = module.get<GamesService>(GamesService);
  });

  it('should call create method with expected params', async () => {
    const createGameSpy = jest.spyOn(gameService, 'create');
    const dto = new GameDto();
    gameService.create(dto);
    expect(createGameSpy).toHaveBeenCalledWith(dto);
  });

  it('should call get method with expected param', async () => {
    const findOneNoteSpy = jest.spyOn(gameService, 'get');
    const options: FindOneOptions = {};
    gameService.get(options);
    expect(findOneNoteSpy).toHaveBeenCalledWith(options);
  });

  it('should call getList method with expected param', async () => {
    const getListSpy = jest.spyOn(gameService, 'getList');
    const options: FindManyOptions = {};
    gameService.getList(options);
    expect(getListSpy).toHaveBeenCalledWith(options);
  });

  it('should call getStats method with expected param', async () => {
    const getStatsSpy = jest.spyOn(gameService, 'getStats');
    const options: FindManyOptions = {};
    gameService.getStats(options);
    expect(getStatsSpy).toHaveBeenCalledWith(options);
  });

  it('should call update method with expected params', async () => {
    const updateSpy = jest.spyOn(gameService, 'update');
    const id = 1;
    const dto = new GameDto();
    gameService.update(id, dto);
    expect(updateSpy).toHaveBeenCalledWith(id, dto);
  });

  it('should call delete method with expected param', async () => {
    const deleteSpy = jest.spyOn(gameService, 'delete');
    const id = 1;
    gameService.delete(id);
    expect(deleteSpy).toHaveBeenCalledWith(id);
  });

  it('should return table name', async () => {
    const expectedName = 'games';
    const gamesTableName = gameService.getTableName();
    expect(gamesTableName).toEqual(expectedName);
  });
  
  it('should call getPublisherOfGame method with expected param', async () => {
    const spy = jest.spyOn(gameService, 'getPublisherOfGame');
    const id = 1;
    gameService.getPublisherOfGame(id);
    expect(spy).toHaveBeenCalledWith(id);
  });

  afterAll(async () => {
    sandbox.restore();
  });
});