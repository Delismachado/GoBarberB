const AdminJS = require('adminjs')

import { Database, Resource } from '@adminjs/typeorm';
import Appointments from '@modules/appointments/infra/typeorm/entities/Appointments';
import User from '@modules/users/infra/typeorm/entities/User';
import { createConnection, getConnection, getConnectionManager, getConnectionOptions } from 'typeorm';

AdminJS.registerAdapter({ Database, Resource });

const adminJS = async function () {
    let connection = null;
    if (!getConnectionManager().has('default')) {
        const connectionOptions = await getConnectionOptions();
        connection = await createConnection(connectionOptions);
    } else {
        connection = getConnection();
    }
    connection.runMigrations();

    await User.useConnection(connection);

    return new AdminJS({
        rootPath: '/admin',
        resources: [
            // { resource: User, options: {} }, { resource: Appointments, options: {} }
        ],
    })
}

export default adminJS;