-- DropForeignKey
ALTER TABLE `tax` DROP FOREIGN KEY `tax_invoice_id_fkey`;

-- AlterTable
ALTER TABLE `invoice` ADD COLUMN `quantity` DOUBLE NULL DEFAULT 1,
    ADD COLUMN `tax` DOUBLE NULL,
    ADD COLUMN `totalPrice` DOUBLE NULL;
