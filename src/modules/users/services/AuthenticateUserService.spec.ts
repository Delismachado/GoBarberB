
import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakesUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';


describe('AuthenticateUser', () => {
    it('should be able to authenticate user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
        const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);

        const user = await createUser.execute({
            name: 'teste',
            email: 'teste@teste.com',
            password: '123123',
        });

       const response = await authenticateUser.execute({
            email: 'teste@teste.com',
            password: '123123',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
        
    });


    it('should not be able to authenticate with non existing user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
       

        expect(
            authenticateUser.execute({
            email: 'teste@teste.com',
            password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
        
        
    });

    it('should be able to authenticate user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
        const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);

        const user = await createUser.execute({
            name: 'teste',
            email: 'teste@teste.com',
            password: '123123',
        });

       const response = await authenticateUser.execute({
            email: 'teste@teste.com',
            password: '123123',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
        
    });


    it('should not be able to authenticate with wrong password', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
        const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);

        await createUser.execute({
            name: 'teste',
            email: 'teste@teste.com',
            password: '123123',
        });

        expect(
            authenticateUser.execute({
                email: 'teste@teste.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
        
        
    });

   

});