-- AlterTable
ALTER TABLE `invoice` ADD COLUMN `product_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `invoice` ADD CONSTRAINT `invoice_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
