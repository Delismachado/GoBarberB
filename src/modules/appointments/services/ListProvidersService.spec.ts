import AppError from '@shared/errors/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProfileService from './ListProvidersService';



let fakeUserRepository: FakeUserRepository;
let listProviders: ListProfileService;


describe('listProviders', () => {

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    listProviders = new ListProfileService(fakeUserRepository);

  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'derli',
      email: 'derli@gmail.com',
      password: '123123',
    });

    const user2 = await fakeUserRepository.create({
      name: 'derli2',
      email: 'derli2@gmail.com',
      password: '123123',
    });

    const loggeddUser = await fakeUserRepository.create({
      name: 'derli3',
      email: 'derli3@gmail.com',
      password: '123123',
    });



    const providers = await listProviders.execute({
      user_id: loggeddUser.id,
    });

    expect(providers).toEqual([user1, user2]);

  });
});