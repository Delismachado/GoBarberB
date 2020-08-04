import { injectable, inject} from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
    name: string,
    email: string,
    password: string,
}
@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hasProvider: IHashProvider,
    ){}

    public async execute({name, email, password}: IRequest): Promise<User>{
        const CheckuserExists = await this.usersRepository.findByEmail(email);
        

        if (CheckuserExists){
            throw new  AppError('Email address already used!');

        }

        const hashedPassword = await this.hasProvider.generateHash(password);

        const user  = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

       return user;
    }
}

export default CreateUserService;
