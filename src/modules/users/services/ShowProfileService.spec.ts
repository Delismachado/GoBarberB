import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService'



let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;


describe('ShowProfile', () => {

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        showProfile = new ShowProfileService(fakeUserRepository);

    });

    it('should be able show the profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'derli',
            email: 'derli@gmail.com',
            password: '123123',
        });

        const profile = await showProfile.execute({
            user_id: user.id,          
        });

        expect(profile.name).toBe('derli');
        expect(profile.email).toBe('derli@gmail.com');

    }); 
    
    

    it('should not be able show the profile for non-existing user', async () => {
        
      expect(
        showProfile.execute({
          user_id: 'non-exiting-user',          
      }),

      ).rejects.toBeInstanceOf(AppError);    

  });    
  
    
});