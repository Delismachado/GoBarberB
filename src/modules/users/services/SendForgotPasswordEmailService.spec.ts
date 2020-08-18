import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakesUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';



describe('SendForgotPasswordEmail', () => {
    it('should be able to recover the password using the email', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const SendForgotPasswordEmail = new SendForgotPasswordEmailService(
          fakeUserRepository,
          fakeMailProvider,
        );

        await fakeUserRepository.create({
          name: 'teste',
          email: 'teste@teste.com',
          password: '123123',
        });

        await SendForgotPasswordEmail.execute({
          email: 'teste@teste.com',          
        });

        expect(sendMail).toHaveBeenCalled();
       
    });             
       
        
});

