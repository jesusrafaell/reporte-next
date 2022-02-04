BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[IdentType] (
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [IdentType_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [IdentType_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [contactId] INT NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [User_email_key] UNIQUE ([email]),
    CONSTRAINT [User_contactId_key] UNIQUE ([contactId])
);

-- CreateTable
CREATE TABLE [dbo].[Contact] (
    [id] INT NOT NULL IDENTITY(1,1),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Contact_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [email] NVARCHAR(1000) NOT NULL,
    [identTypeId] INT NOT NULL,
    [identNum] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Contact_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [Contact_identTypeId_identNum_key] UNIQUE ([identTypeId],[identNum])
);

-- CreateTable
CREATE TABLE [dbo].[Commerce] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [idTypeCcId] INT NOT NULL,
    [identNum] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Commerce_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Commerce_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [Commerce_idTypeCcId_identNum_key] UNIQUE ([idTypeCcId],[identNum])
);

-- CreateTable
CREATE TABLE [dbo].[Afiliado] (
    [id] INT NOT NULL IDENTITY(1,1),
    [numA] INT NOT NULL,
    [contactId] INT NOT NULL,
    [ccId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Afiliado_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Afiliado_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [Afiliado_numA_key] UNIQUE ([numA]),
    CONSTRAINT [Afiliado_ccId_key] UNIQUE ([ccId])
);

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_contactId_fkey] FOREIGN KEY ([contactId]) REFERENCES [dbo].[Contact]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Contact] ADD CONSTRAINT [Contact_identTypeId_fkey] FOREIGN KEY ([identTypeId]) REFERENCES [dbo].[IdentType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Commerce] ADD CONSTRAINT [Commerce_idTypeCcId_fkey] FOREIGN KEY ([idTypeCcId]) REFERENCES [dbo].[IdentType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Afiliado] ADD CONSTRAINT [Afiliado_contactId_fkey] FOREIGN KEY ([contactId]) REFERENCES [dbo].[Contact]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

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
