import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTables1674525419589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE user(
            id varchar(36) NOT NULL,
            email char(50) NOT NULL,
            password varchar(64) NOT NULL,
            nickname varchar(20) NOT NULL,
            PRIMARY KEY (id)
        )ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);

    await queryRunner.query(`
        CREATE TABLE post(
            id varchar(36) NOT NULL,
            user_id varchar(36) NOT NULL,
            title varchar(50) NOT NULL,
            content longtext NOT NULL,
            created_at datetime NOT NULL,
            updated_at datetime NULL,
            deleted_at datetime NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (user_id) REFERENCES user (id)
        )ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);

    await queryRunner.query(`
        CREATE TABLE comment(
            id varchar(36) NOT NULL,
            user_id varchar(36) NOT NULL,
            post_id varchar(36) NOT NULL,
            content mediumtext NOT NULL,
            created_at datetime NOT NULL,
            updated_at datetime NULL,
            deleted_at datetime NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (user_id) REFERENCES user (id),
            FOREIGN KEY (post_id) REFERENCES post (id)
        )ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);

    await queryRunner.query(`
        CREATE TABLE tag(
            id varchar(36) NOT NULL,
            post_id varchar(36) NOT NULL,
            name char(20) NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (post_id) REFERENCES post (id)
        )ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);

    await queryRunner.query(`
        CREATE TABLE post_like(
            id varchar(36) NOT NULL,
            user_id varchar(36) NOT NULL,
            post_id varchar(36) NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (user_id) REFERENCES user (id),
            FOREIGN KEY (post_id) REFERENCES post (id)
        )ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);

    await queryRunner.query(`
        CREATE TABLE comment_like(
            id varchar(36) NOT NULL,
            user_id varchar(36) NOT NULL,
            comment_id varchar(36) NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (user_id) REFERENCES user (id),
            FOREIGN KEY (comment_id) REFERENCES comment (id)
        )ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE tag;
    `);

    await queryRunner.query(`
        DROP TABLE comment_like;
    `);

    await queryRunner.query(`
        DROP TABLE post_like;
    `);

    await queryRunner.query(`
        DROP TABLE comment;
    `);

    await queryRunner.query(`
        DROP TABLE post;
    `);

    await queryRunner.query(`
        DROP TABLE user;
    `);
  }
}
