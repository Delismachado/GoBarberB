import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdatePrifileService from './UpdateProfileService'



let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdatePrifileService;


describe('UpdateProfile', () => {

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        updateProfile = new UpdatePrifileService(
          fakeUserRepository,
          fakeHashProvider
        );

    });

    it('should be able update the profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'derli',
            email: 'derli@teste.com',
            password: '123123',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'derli2',
            email: 'derli2@gmail.com'
        });

        expect(updatedUser.name).toBe('derli2');
        expect(updatedUser.email).toBe('derli2@gmail.com');

    });


    it('should not be able update the profile for non-existing user', async () => {        
      expect(
        updateProfile.execute({
          user_id: 'non-exiting_id',
          name: 'teste',
          email: 'teste@exemplo.com',          
      }),

      ).rejects.toBeInstanceOf(AppError);    

  });    


    it('should not be able to change to another user email', async () => {
      await fakeUserRepository.create({
          name: 'derli',
          email: 'derli@teste.com',
          password: '123123',
      });

      const user = await fakeUserRepository.create({
        name: 'Test',
        email: 'test@teste.com',
        password: '123123',
    });

      const updatedUser = await updateProfile.execute({
          user_id: user.id,
          name: 'derli2',
          email: 'derli2@gmail.com'
      });

     await expect(updateProfile.execute({
      user_id: user.id,
      name: 'derli',
      email: 'derli@teste.com'

     })).rejects.toBeInstanceOf(AppError);

  });



  it('should be able update the password', async () => {
    const user = await fakeUserRepository.create({
        name: 'derli',
        email: 'derli@teste.com',
        password: '123456',
    });

    const updatedUser = await updateProfile.execute({
        user_id: user.id,
        name: 'derli2',
        email: 'derli2@gmail.com',
        old_password: '123456',
        password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
   

});


  it('should not be able update the password without old password', async () => {
    const user = await fakeUserRepository.create({
        name: 'derli',
        email: 'derli@teste.com',
        password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'derli5',
        email: 'derli5@gmail.com',
        password: '123123',
    
      }),
    ).rejects.toBeInstanceOf(AppError);     

  });


  it('should not be able update the password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
        name: 'derli',
        email: 'derli@teste.com',
        password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'derli5',
        email: 'derli5@gmail.com',
        old_password: 'wrong_old_password',
        password: '123123',
    
      }),
    ).rejects.toBeInstanceOf(AppError);     

  });
    
});