import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTables1674525419589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE user(
            id varchar(36) NOT NULL,
            email char(50) NOT NULL,
            password varchar(64) NOT NULL,
            nickname varchar(20) NOT NULL,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);

    await queryRunner.query(`
        CREATE TABLE post(
            id varchar(36) NOT NULL,
            userId varchar(36) NOT NULL,
            title varchar(50) NOT NULL,
            content longtext NOT NULL,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NULL,
            deletedAt timestamp NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (userId) REFERENCES user (id)
        )ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);

    await queryRunner.query(`
        CREATE TABLE comment(
            id varchar(36) NOT NULL,
            userId varchar(36) NOT NULL,
            postId varchar(36) NOT NULL,
            content mediumtext NOT NULL,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NULL,
            deletedAt timestamp NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (userId) REFERENCES user (id),
            FOREIGN KEY (postId) REFERENCES post (id)
        )ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);

    await queryRunner.query(`
        CREATE TABLE tag(
            id varchar(36) NOT NULL,
            postId varchar(36) NOT NULL,
            name char(20) NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (postId) REFERENCES post (id)
        )ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);

    await queryRunner.query(`
        CREATE TABLE postLike(
            id varchar(36) NOT NULL,
            userId varchar(36) NOT NULL,
            postId varchar(36) NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (userId) REFERENCES user (id),
            FOREIGN KEY (postId) REFERENCES post (id)
        )ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);

    await queryRunner.query(`
        CREATE TABLE commentLike(
            id varchar(36) NOT NULL,
            userId varchar(36) NOT NULL,
            commentId varchar(36) NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (userId) REFERENCES user (id),
            FOREIGN KEY (commentId) REFERENCES comment (id)
        )ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE tag;
    `);

    await queryRunner.query(`
        DROP TABLE commentLike;
    `);

    await queryRunner.query(`
        DROP TABLE postLike;
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
