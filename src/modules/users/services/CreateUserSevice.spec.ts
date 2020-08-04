import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakesUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';



describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

       const appointment = await createUser.execute({
            name: 'teste',
            email: 'teste@teste.com',
            password: '123123',
        });

        expect(appointment).toHaveProperty('id');
        
    });

    it('should be able to create a new user whith same email from another', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

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