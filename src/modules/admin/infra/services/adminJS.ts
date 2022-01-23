const AdminJS = require('adminjs')

import { Database, Resource } from '@adminjs/typeorm';
import Appointments from '@modules/appointments/infra/typeorm/entities/Appointments';
import User from '@modules/users/infra/typeorm/entities/User';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import { Connection, createConnection, getConnection, getConnectionManager, getConnectionOptions } from 'typeorm';
import AppError from '@shared/errors/AppError';

AdminJS.registerAdapter({ Database, Resource });

const getOrCreateConnection = async function (connName: string) {
    if (getConnectionManager().has(connName)) {
        return getConnection(connName);
    }
    throw new AppError("Connection " + connName + " is not established!");
}

const adminJS = async function () {
    let connection = await getOrCreateConnection('default');
    let connectionMongoDB = await getOrCreateConnection('mongo');

    await connection.runMigrations();
    await connectionMongoDB.runMigrations();

    User.useConnection(connection);
    Appointments.useConnection(connection);
    Notification.useConnection(connectionMongoDB);

    return new AdminJS({
        rootPath: '/admin',
        resources: [
            { resource: User, options: {} },
            { resource: Appointments, options: {} },
            { resource: Notification, options: {} }
        ],
    })
}

export default adminJS;