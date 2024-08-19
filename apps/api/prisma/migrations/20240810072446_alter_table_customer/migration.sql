/*
  Warnings:

  - You are about to drop the column `customerEmail` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the `payment_method` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[customer_email]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `payment_method` DROP FOREIGN KEY `payment_method_customer_id_fkey`;

-- DropIndex
DROP INDEX `customer_customerEmail_key` ON `customer`;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `customerEmail`,
    ADD COLUMN `customer_email` VARCHAR(191) NULL,
    ADD COLUMN `payment_method` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `payment_method`;

-- CreateIndex
CREATE UNIQUE INDEX `customer_customer_email_key` ON `customer`(`customer_email`);
