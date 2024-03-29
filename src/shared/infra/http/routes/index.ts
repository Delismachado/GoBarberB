import { Router } from 'express';

import adminRouter from '@modules/admin/infra/http/admin.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import adminJS from '@modules/admin/infra/services/adminJS';


const routes = async function () {
    const routes = Router();

    routes.use('/appointments', appointmentsRouter);
    routes.use('/providers', providersRouter);
    routes.use('/users', usersRouter);
    routes.use('/sessions', sessionsRouter);
    routes.use('/password', passwordRouter);
    routes.use('/profile', profileRouter);

    const adminRouterA = await adminRouter();
    const adminJSA = await adminJS();
    routes.use(adminJSA.options.rootPath, adminRouterA);
    return routes
}

export default routes;