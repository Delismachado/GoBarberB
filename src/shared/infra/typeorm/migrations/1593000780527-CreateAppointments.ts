import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateAppointments1593000780527 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns:[
                    {
                        name: 'id',
                        type: 'uuid',
                        isNullable: true,
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                        
                    },
                    {
                        name: 'date',
                        type: 'timestamp',
                        
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },

                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],

            }),
        )        
        
                 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }

}
