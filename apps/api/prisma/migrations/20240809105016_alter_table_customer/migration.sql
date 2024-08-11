-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `customer_user_id_fkey`;

-- AlterTable
ALTER TABLE `customer` MODIFY `user_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
