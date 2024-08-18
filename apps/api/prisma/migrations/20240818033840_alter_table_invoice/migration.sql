-- AlterTable
ALTER TABLE `invoice` ADD COLUMN `recurrenceType` VARCHAR(191) NULL,
    ADD COLUMN `scheduleDate` DATETIME(3) NULL;
