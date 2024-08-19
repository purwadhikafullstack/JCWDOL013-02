-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `item_category_item_fkey`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `item_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `item_tax_id_fkey`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `item_user_id_fkey`;

-- AlterTable
ALTER TABLE `item` MODIFY `price` DOUBLE NULL,
    MODIFY `type` VARCHAR(191) NULL,
    MODIFY `user_id` VARCHAR(191) NULL,
    MODIFY `customer_id` VARCHAR(191) NULL,
    MODIFY `category_item` VARCHAR(191) NULL,
    MODIFY `tax_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_category_item_fkey` FOREIGN KEY (`category_item`) REFERENCES `category_item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_tax_id_fkey` FOREIGN KEY (`tax_id`) REFERENCES `tax`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
