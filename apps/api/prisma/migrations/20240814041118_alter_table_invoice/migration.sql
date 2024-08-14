-- DropIndex
DROP INDEX `tax_invoice_id_fkey` ON `tax`;

-- AlterTable
ALTER TABLE `invoice` ADD COLUMN `deletedAt` DATETIME(3) NULL;
