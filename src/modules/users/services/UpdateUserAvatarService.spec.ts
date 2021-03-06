import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUseravatarService from './UpdateUserAvatarService';
import UpdateUserAvatarService from './UpdateUserAvatarService';


let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;


describe('UpdateUserAvatar', () => {

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeStorageProvider = new FakeStorageProvider();
        updateUserAvatar = new UpdateUseravatarService(fakeUserRepository, fakeStorageProvider);

    });

    it('should be able to create a new user', async () => {
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

       await expect(
            updateUserAvatar.execute({
                user_id: 'non-exiting-user',
                avatarFilename: 'avatar.jpg',
            }),
        ).rejects.toBeInstanceOf(AppError);

    });



    it('should delete  the old avatar when updating new one', async () => {
        
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
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