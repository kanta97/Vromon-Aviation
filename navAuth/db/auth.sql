/*
SQLyog Enterprise - MySQL GUI v8.14 
MySQL - 5.5.5-10.1.37-MariaDB : Database - auth
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`auth` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `auth`;

/*Table structure for table `all_logs` */

DROP TABLE IF EXISTS `all_logs`;

CREATE TABLE `all_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `all_log_type` varchar(255) DEFAULT NULL,
  `logger_data` varchar(255) DEFAULT NULL,
  `logger_desc` varchar(255) DEFAULT NULL,
  `logger_ref` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `all_logs` */

/*Table structure for table `forgotpasswordprivots` */

DROP TABLE IF EXISTS `forgotpasswordprivots`;

CREATE TABLE `forgotpasswordprivots` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `v_code` varchar(255) DEFAULT NULL,
  `is_active` enum('0','1') DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `forgotpasswordprivots` */

/*Table structure for table `menus` */

DROP TABLE IF EXISTS `menus`;

CREATE TABLE `menus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu` varchar(255) NOT NULL,
  `display_menu` varchar(255) NOT NULL,
  `menu_path` varchar(255) NOT NULL,
  `menu_icon` varchar(255) NOT NULL,
  `parent_id` int(11) DEFAULT '0',
  `service_id` int(11) DEFAULT '0',
  `createdBy` int(11) DEFAULT '0',
  `updatedBy` int(11) DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `menus` */

/*Table structure for table `permissions` */

DROP TABLE IF EXISTS `permissions`;

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_permission` varchar(255) NOT NULL,
  `menu` int(11) NOT NULL,
  `service_id` int(11) DEFAULT '0',
  `createdBy` int(11) DEFAULT '0',
  `updatedBy` int(11) DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `permissions` */

/*Table structure for table `role_menus` */

DROP TABLE IF EXISTS `role_menus`;

CREATE TABLE `role_menus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `createdBy` int(11) DEFAULT '0',
  `updatedBy` int(11) DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `role_menus` */

/*Table structure for table `role_permissions` */

DROP TABLE IF EXISTS `role_permissions`;

CREATE TABLE `role_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` int(11) NOT NULL,
  `permission` int(11) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `updatedBy` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `role_permissions` */

/*Table structure for table `role_users` */

DROP TABLE IF EXISTS `role_users`;

CREATE TABLE `role_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `updatedBy` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `role_users` */

insert  into `role_users`(`id`,`role`,`user`,`createdBy`,`updatedBy`,`createdAt`,`updatedAt`,`deletedAt`) values (1,4,1,1,1,'2019-03-14 00:28:52','2019-03-13 18:28:52',NULL),(2,4,2,2,2,'2019-03-15 00:44:02','2019-03-14 18:44:02',NULL);

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  `is_active` enum('0','1') DEFAULT '1',
  `display_role_name` varchar(255) NOT NULL,
  `service_id` int(11) DEFAULT '0',
  `createdBy` int(11) NOT NULL,
  `updatedBy` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `roles` */

/*Table structure for table `sequelizemeta` */

DROP TABLE IF EXISTS `sequelizemeta`;

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `sequelizemeta` */

insert  into `sequelizemeta`(`name`) values ('20190123181509-create-user.js'),('20190123185637-create-token.js'),('20190124072324-create-menus.js'),('20190124072335-create-permissions.js'),('20190124072343-create-role-menus.js'),('20190124072351-create-role-permissions.js'),('20190124072357-create-roles.js'),('20190128114846-create-role-users.js'),('20190208152602-create-user-type.js'),('20190309113421-create-all-log.js'),('20190309133700-create-forgotpasswordprivot.js');

/*Table structure for table `tokens` */

DROP TABLE IF EXISTS `tokens`;

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `role` int(11) DEFAULT '0',
  `is_active` enum('0','1') DEFAULT '1',
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `tokens` */

insert  into `tokens`(`id`,`token`,`userId`,`role`,`is_active`,`createdBy`,`updatedBy`,`createdAt`,`updatedAt`) values (1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJubSI6ImRlYmFzMTJoaWRzMSIsInBob25lX25vIjoiKzg4MDExMzg0MjExNjEiLCJyb2xlIjoiNCIsImNyZWF0ZWRBdCI6IjIwMTktMDMtMTNUMTg6Mjg6NTIuMjIxWiIsImlhdCI6MTU1MjUwMTczMn0.0RVaXUgA3j4TXsLkWB4aDMUPGa5YWNHyFUSx52Vw-j',1,4,'1',1,1,'2019-03-14 00:28:52','2019-03-13 18:28:52'),(2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJubSI6InNkc2FzZCIsInBob25lX25vIjoiKzg4MDE5Mzg0MjExNjEiLCJyb2xlIjoiNCIsImNyZWF0ZWRBdCI6IjIwMTktMDMtMTRUMTg6NDQ6MDIuMzE2WiIsImlhdCI6MTU1MjU4OTA0Mn0.DJGCnHvD7RGImkyHiUi5C6EzFNlUIwfsOB85FwWYblM',2,4,'1',2,2,'2019-03-15 00:44:02','2019-03-14 18:44:02');

/*Table structure for table `user_types` */

DROP TABLE IF EXISTS `user_types`;

CREATE TABLE `user_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_type_name` varchar(255) NOT NULL,
  `service_id` int(11) DEFAULT '0',
  `createdBy` int(11) DEFAULT '0',
  `updatedBy` int(11) DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `user_types` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usernm` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL DEFAULT 'e10adc3949ba59abbe56e057f20f883e',
  `phone_no` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `user_type` int(11) DEFAULT '1',
  `service_id` int(11) DEFAULT '0',
  `role` int(11) DEFAULT '0',
  `is_active` enum('0','1') DEFAULT '1',
  `reference_one` int(11) DEFAULT '0',
  `reference_two` int(11) DEFAULT '0',
  `createdBy` int(11) DEFAULT '0',
  `updatedBy` int(11) DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usernm` (`usernm`),
  UNIQUE KEY `phone_no` (`phone_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`usernm`,`display_name`,`password`,`phone_no`,`email`,`user_type`,`service_id`,`role`,`is_active`,`reference_one`,`reference_two`,`createdBy`,`updatedBy`,`createdAt`,`updatedAt`) values (1,'debas12hids1','Debashis Nag','q12345678','+8801138421161','debahsisss@saddsa.com',3,1,4,'1',0,0,1,1,'2019-03-14 00:28:52','2019-03-13 18:28:52'),(2,'sdsasd','Debashis Nag','q12345678','+8801938421161','debahsisss@saddsa.com',3,1,4,'1',0,0,1,1,'2019-03-15 00:44:02','2019-03-14 18:44:02');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
