import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateAppointmentsServices from '@modules/appointments/services/CreateAppointmentsServices';


export default class AppointmentsController {
    public async create( request: Request, response: Response): Promise<Response> { 
        const user_id = request.user.id;       
        const { provider_id, date } = request.body;
           
        const createAppointment = container.resolve(CreateAppointmentsServices);
    
        const appointment = await createAppointment.execute({ date: date, provider_id, user_id });
    
        return response.json(appointment);
    }
}