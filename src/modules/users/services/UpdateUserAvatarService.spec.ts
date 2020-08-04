import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakesUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUseravatarService from './UpdateUserAvatarService';




describe('UpdateUserAvatar', () => {
    it('should be able to create a new user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeStorageProvider = new FakeStorageProvider();
       
       
        const updateUserAvatar = new UpdateUseravatarService(
            fakeUserRepository,
            fakeStorageProvider
        );

        const user = await fakeUserRepository.create({
                name: 'teste',
                email: 'teste@teste.com',
                password: '123123',
            });

            await updateUserAvatar.execute({
                user_id: user.id,
                avatarFilename: 'avatar.jpg',
            });

            expect(user.avatar).toBe('avatar.jpg');
            
        });


        it('should  not be able to update avatar from non existing user', async () => {
            const fakeUserRepository = new FakeUserRepository();
            const fakeStorageProvider = new FakeStorageProvider();
           
           
            const updateUserAvatar = new UpdateUseravatarService(fakeUserRepository, fakeStorageProvider);    
    
                
            expect(
                updateUserAvatar.execute({
                    user_id: 'non-exiting-user',
                    avatarFilename: 'avatar.jpg',
                }),
            ).rejects.toBeInstanceOf(AppError);
                
        });



        it('should delete  the old avatar when updating new one', async () => {
            const fakeUserRepository = new FakeUserRepository();
            const fakeStorageProvider = new FakeStorageProvider();
           
            const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

            const updateUserAvatar = new UpdateUseravatarService(
                fakeUserRepository,
                fakeStorageProvider
            );
    
            const user = await fakeUserRepository.create({
                    name: 'teste',
                    email: 'teste@teste.com',
                    password: '123123',
                });
    
                await updateUserAvatar.execute({
                    user_id: user.id,
                    avatarFilename: 'avatar.jpg',
                });

                await updateUserAvatar.execute({
                    user_id: user.id,
                    avatarFilename: 'avatar2.jpg',
                });

                expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');    
                expect(user.avatar).toBe('avatar2.jpg');
                
            });   

});