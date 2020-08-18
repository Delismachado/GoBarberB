import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
     fakeUserRepository = new FakeUserRepository();
     fakeMailProvider = new FakeMailProvider();
     fakeUserTokensRepository = new FakeUserTokensRepository();        

     sendForgotPasswordEmail = new SendForgotPasswordEmailService(
        fakeUserRepository,
        fakeMailProvider,
        fakeUserTokensRepository,
      );


  });

    it('should be able to recover the password using the email', async () => {
        
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUserRepository.create({
          name: 'teste',
          email: 'teste@teste.com',
          password: '123123',
        });

        await sendForgotPasswordEmail.execute({
          email: 'teste@teste.com',          
        });

        expect(sendMail).toHaveBeenCalled();
       
    });  
    
    it('should not be able to recover a non-existing user password', async () => {
      
      await expect(
        sendForgotPasswordEmail.execute({
          email: 'teste@teste.com',
        }),
      ).rejects.toBeInstanceOf(AppError);
    });
    
    it('should generate a forgot password token', async () => {
            const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUserRepository.create({
          name: 'teste',
          email: 'teste@teste.com',
          password: '123123',
        });

        await sendForgotPasswordEmail.execute({
          email: 'teste@teste.com',          
        });
        expect(generateToken).toHaveBeenCalledWith(user.id);
    })
        
});

