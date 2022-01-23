import Appointments from "@modules/appointments/infra/typeorm/entities/Appointments";
import User from "@modules/users/infra/typeorm/entities/User";
import Notification from "@modules/notifications/infra/typeorm/schemas/Notification"
import { ConnectionOptions } from "typeorm";

const production = process.env.PRODUCTION;
const folder = production ? 'src' : 'dist';
const extension = production ? 'js' : 'ts';
const ssl_config = production ? { rejectUnauthorized: false } : false;

const db = [
    {
        name: "default",
        type: "postgres",
        url: process.env.DATABASE_URL,
        synchronize: false,
        logging: false,
        ssl: ssl_config,
        entities: [
            User,
            Appointments
        ],
        migrations: [
            `./${folder}/shared/infra/typeorm/migrations/*.${extension}`
        ],
        cli: {
            migrationsDir: `./${production ? 'dist' : 'src'}/shared/infra/typeorm/migrations`
        }
    },
    {
        "name": "mongo",
        "type": "mongodb",
        "url": process.env.MONGO_URL,
        "useUnifiedTopology": true,
        "entities": [
            Notification
        ]
    }
] as ConnectionOptions[]

export default db;