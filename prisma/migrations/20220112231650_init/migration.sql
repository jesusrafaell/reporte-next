BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[IdentType] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [IdentType_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [IdentType_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [identTypeId] INT NOT NULL,
    [identNum] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [User_email_key] UNIQUE ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Commerce] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Commerce_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Commerce_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Afiliado] (
    [id] INT NOT NULL IDENTITY(1,1),
    [idCommerce] INT NOT NULL,
    [idUser] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Afiliado_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Afiliado_pkey] PRIMARY KEY ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_identTypeId_fkey] FOREIGN KEY ([identTypeId]) REFERENCES [dbo].[IdentType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
