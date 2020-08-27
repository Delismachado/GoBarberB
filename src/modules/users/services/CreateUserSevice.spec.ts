import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();
        createUser = new CreateUserService(fakeUserRepository, fakeHashProvider, fakeCacheProvider);

    });


    it('should be able to create a new user', async () => { 
        const appointment = await createUser.execute({
            name: 'teste',
            email: 'teste@teste.com',
            password: '123123',
        });

        expect(appointment).toHaveProperty('id');
        
    });

    it('should be able to create a new user whith same email from another', async () => {
        await createUser.execute({
            name: 'teste',
            email: 'teste@teste.com',
            password: '123123',
        });

        expect(
            createUser.execute({
                name: 'teste',
                email: 'teste@teste.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
        
    });

});