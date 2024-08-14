/*
  Warnings:

  - Added the required column `invoice_number` to the `invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoice` ADD COLUMN `invoice_number` VARCHAR(191) NOT NULL;
