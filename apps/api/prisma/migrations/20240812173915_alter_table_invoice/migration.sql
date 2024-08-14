/*
  Warnings:

  - You are about to drop the `_CustomerToInvoice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CustomerToInvoice` DROP FOREIGN KEY `_CustomerToInvoice_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CustomerToInvoice` DROP FOREIGN KEY `_CustomerToInvoice_B_fkey`;

-- AlterTable
ALTER TABLE `invoice` ADD COLUMN `customer_id` VARCHAR(191) NULL,
    ADD COLUMN `invoice_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'Pending';

-- DropTable
DROP TABLE `_CustomerToInvoice`;

-- AddForeignKey
ALTER TABLE `invoice` ADD CONSTRAINT `invoice_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
