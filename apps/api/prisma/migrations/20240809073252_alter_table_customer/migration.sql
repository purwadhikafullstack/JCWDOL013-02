-- AlterTable
ALTER TABLE `customer` MODIFY `address` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NULL,
    MODIFY `type` VARCHAR(191) NULL DEFAULT 'individual';
