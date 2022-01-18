/*
  Warnings:

  - A unique constraint covering the columns `[numA]` on the table `Afiliado` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
CREATE UNIQUE INDEX [Afiliado_numA_key] ON [dbo].[Afiliado]([numA]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
