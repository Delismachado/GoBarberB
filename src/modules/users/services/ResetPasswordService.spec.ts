import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashprovider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashprovider;
let resetPassword: ResetPasswordService;

describe('ResetPasswordservice', () => {
  beforeEach(() => {
     fakeUserRepository = new FakeUserRepository();
     fakeUserTokensRepository = new FakeUserTokensRepository();
     fakeHashProvider = new FakeHashprovider();      

     resetPassword = new ResetPasswordService(
        fakeUserRepository,
        fakeUserTokensRepository,
        fakeHashProvider,
      );


  });

    it('should be able to reset password', async () => {
        
        const user = await fakeUserRepository.create({
          name: 'teste',
          email: 'teste@teste.com',
          password: '123123',
        });

        const {token} = await fakeUserTokensRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');


        await resetPassword.execute({
          password: '123456',
          token,
        });

        const updatedUser = await fakeUserRepository.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('123456');

        expect(updatedUser?.password).toBe('123456');
       
    }); 
    
    
    it('should not be able to reset the password with non-existing token', async () => {
      await expect(
        resetPassword.execute({
          token: 'non-existing-token',
          password: '123456',
        }),
      ).rejects.toBeInstanceOf(AppError);

    });
    
    
    it('should not be able to reset the password with non-existing user', async () => {

      const { token } = await fakeUserTokensRepository.generate('non-existing-user'); 


      await expect(
        resetPassword.execute({
          token: 'non-existing-token',
          password: '123456',
        }),
      ).rejects.toBeInstanceOf(AppError);

    });
    
    
    it('should no t be able to reset password if passed more then 2 hours', async () => {
        
      const user = await fakeUserRepository.create({
        name: 'teste',
        email: 'teste@teste.com',
        password: '123123',
      });

      const {token} = await fakeUserTokensRepository.generate(user.id);
      
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        const customDate = new Date();
        return customDate.setHours(customDate.getHours() + 3);
      });

      await expect(
        resetPassword.execute({
          password: '123456',
          token,
        }),
      ).rejects.toBeInstanceOf(AppError);      
      
  }); 
         
});

