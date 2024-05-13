import { Migration } from '@mikro-orm/migrations';

export class Migration20240216132042 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `campaigns` (`id` varchar(36) not null, `created_at` DATETIME not null, `updated_at` DATETIME not null, `name` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `campaigns` add unique `campaigns_name_unique`(`name`);');

    this.addSql('create table `clients` (`id` varchar(36) not null, `created_at` DATETIME not null, `updated_at` DATETIME not null, `name` varchar(255) not null, `secret` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `active-leads` (`id` varchar(36) not null, `created_at` DATETIME not null, `updated_at` DATETIME not null, `first_name` varchar(255) not null, `last_name` varchar(255) not null, `phone_number` varchar(255) not null, `email` varchar(255) not null, `lead_status` enum(\'Not started\', \'Not injured\', \'Transferred\', \'In progress\', \'Suppressed\', \'DNC\', \'Already DNC\', \'Done\') not null, `campaign_id` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `lead-history` (`id` varchar(36) not null, `created_at` DATETIME not null, `updated_at` DATETIME not null, `lead_id` varchar(36) not null, `type` enum(\'Created\', \'SMS\', \'Email\', \'Call\', \'Updated\', \'Done\') not null, `data` json not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `lead-history` add index `lead-history_lead_id_index`(`lead_id`);');

    this.addSql('create table `permissions` (`id` varchar(36) not null, `role` enum(\'manager\', \'agent\') not null, `value` json not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `permissions` add unique `permissions_role_unique`(`role`);');

    this.addSql('create table `users` (`id` varchar(36) not null, `created_at` DATETIME not null, `updated_at` DATETIME not null, `first_name` varchar(255) not null, `last_name` varchar(255) not null, `email` varchar(255) not null, `password` varchar(255) not null, `role` enum(\'manager\', \'agent\') not null default \'agent\', `permissions_id` varchar(36) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `users` add unique `users_email_unique`(`email`);');
    this.addSql('alter table `users` add index `users_permissions_id_index`(`permissions_id`);');

    this.addSql('alter table `lead-history` add constraint `lead-history_lead_id_foreign` foreign key (`lead_id`) references `active-leads` (`id`) on update cascade;');

    this.addSql('alter table `users` add constraint `users_permissions_id_foreign` foreign key (`permissions_id`) references `permissions` (`id`) on update cascade;');
  }

}
