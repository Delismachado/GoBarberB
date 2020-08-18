import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
     fakeUserRepository = new FakeUserRepository();
     fakeUserTokensRepository = new FakeUserTokensRepository();        

     resetPassword = new ResetPasswordService(
        fakeUserRepository,
        fakeUserTokensRepository,
      );


  });

    it('should be able to reset passwordl', async () => {
        
        const user = await fakeUserRepository.create({
          name: 'teste',
          email: 'teste@teste.com',
          password: '123123',
        });

        const {token} = await fakeUserTokensRepository.generate(user.id);


        await resetPassword.execute({
          password: '123456',
          token,
        });

        const updatedUser = await fakeUserRepository.findById(user.id);

        expect(updatedUser?.password).toBe('123456');
       
    });  
    
         
});

