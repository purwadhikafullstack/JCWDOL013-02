/*
  Warnings:

  - You are about to drop the `RecurringInvoice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `RecurringInvoice`;

-- CreateTable
CREATE TABLE `recurring_invoice` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
