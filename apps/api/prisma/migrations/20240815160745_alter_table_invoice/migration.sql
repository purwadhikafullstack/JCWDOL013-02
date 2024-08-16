-- CreateTable
CREATE TABLE `ProductItem` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `price` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_InvoiceToProductItem` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_InvoiceToProductItem_AB_unique`(`A`, `B`),
    INDEX `_InvoiceToProductItem_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_InvoiceToProductItem` ADD CONSTRAINT `_InvoiceToProductItem_A_fkey` FOREIGN KEY (`A`) REFERENCES `invoice`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InvoiceToProductItem` ADD CONSTRAINT `_InvoiceToProductItem_B_fkey` FOREIGN KEY (`B`) REFERENCES `ProductItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
