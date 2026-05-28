IF DB_ID(N'triamici_db') IS NULL
BEGIN
  CREATE DATABASE triamici_db;
END
GO

USE triamici_db;
GO

IF OBJECT_ID(N'leads', N'U') IS NULL
BEGIN
  CREATE TABLE leads (
      id            UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
      nome          NVARCHAR(200)    NOT NULL,
      email         NVARCHAR(200)    NOT NULL,
      telefone      NVARCHAR(50)     NULL,
      mensagem      NVARCHAR(MAX)    NULL,
      tipo          NVARCHAR(20)     NOT NULL DEFAULT 'CONTATO'
                    CHECK (tipo IN ('CONTATO', 'AULA_GRATIS')),
      respondido    BIT              NOT NULL DEFAULT 0,
      criado_em     DATETIME2        NOT NULL DEFAULT GETDATE()
  );

  CREATE INDEX idx_leads_tipo ON leads(tipo);
  CREATE INDEX idx_leads_respondido ON leads(respondido);
END
GO

IF OBJECT_ID(N'depoimentos', N'U') IS NULL
BEGIN
  CREATE TABLE depoimentos (
      id       UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
      nome     NVARCHAR(200)  NOT NULL,
      turma    NVARCHAR(100)  NULL,
      texto    NVARCHAR(MAX)  NOT NULL,
      foto     NVARCHAR(500)  NULL,
      ativo    BIT            NOT NULL DEFAULT 1,
      ordem    INT            NOT NULL DEFAULT 0
  );

  CREATE INDEX idx_depoimentos_ativo ON depoimentos(ativo, ordem);
END
GO

IF OBJECT_ID(N'galeria_fotos', N'U') IS NULL
BEGIN
  CREATE TABLE galeria_fotos (
      id        UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
      url       NVARCHAR(500)  NOT NULL,
      legenda   NVARCHAR(300)  NULL,
      aluno     NVARCHAR(200)  NULL,
      ativo     BIT            NOT NULL DEFAULT 1,
      criado_em DATETIME2      NOT NULL DEFAULT GETDATE()
  );

  CREATE INDEX idx_galeria_ativo ON galeria_fotos(ativo);
END
GO

IF OBJECT_ID(N'admins', N'U') IS NULL
BEGIN
  CREATE TABLE admins (
      id    UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
      email NVARCHAR(200) NOT NULL UNIQUE,
      senha NVARCHAR(300) NOT NULL
  );
END
GO
