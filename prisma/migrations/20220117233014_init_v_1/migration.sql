/*
  Warnings:

  - You are about to drop the column `idCommerce` on the `Afiliado` table. All the data in the column will be lost.
  - You are about to drop the column `idUser` on the `Afiliado` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ccId]` on the table `Afiliado` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ccId` to the `Afiliado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numA` to the `Afiliado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Afiliado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idTypeCcId` to the `Commerce` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identNum` to the `Commerce` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Afiliado] DROP COLUMN [idCommerce],
[idUser];
ALTER TABLE [dbo].[Afiliado] ADD [ccId] INT NOT NULL,
[numA] INT NOT NULL,
[userId] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Commerce] ADD [idTypeCcId] INT NOT NULL,
[identNum] NVARCHAR(1000) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX [Afiliado_ccId_key] ON [dbo].[Afiliado]([ccId]);

-- AddForeignKey
ALTER TABLE [dbo].[Commerce] ADD CONSTRAINT [Commerce_idTypeCcId_fkey] FOREIGN KEY ([idTypeCcId]) REFERENCES [dbo].[IdentType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Afiliado] ADD CONSTRAINT [Afiliado_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Afiliado] ADD CONSTRAINT [Afiliado_ccId_fkey] FOREIGN KEY ([ccId]) REFERENCES [dbo].[Commerce]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
