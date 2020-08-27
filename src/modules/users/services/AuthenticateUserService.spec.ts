import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';


let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;



describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();        
        authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
    });


    it('should be able to authenticate user', async () => {

        const user = await fakeUserRepository.create({
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


        await expect(
            authenticateUser.execute({
                email: 'teste@teste.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);


    });

    it('should be able to authenticate user', async () => {


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
        await fakeUserRepository.create({
            name: 'teste',
            email: 'teste@teste.com',
            password: '123123',
        });

        await expect(
            authenticateUser.execute({
                email: 'teste@teste.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);


    });



});