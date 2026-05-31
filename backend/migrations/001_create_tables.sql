CREATE TABLE IF NOT EXISTS leads (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  nome        VARCHAR(200) NOT NULL,
  email       VARCHAR(200) NOT NULL,
  telefone    VARCHAR(50),
  mensagem    TEXT,
  tipo        VARCHAR(20)  NOT NULL DEFAULT 'CONTATO'
              CHECK (tipo IN ('CONTATO', 'AULA_GRATIS')),
  respondido  BOOLEAN      NOT NULL DEFAULT FALSE,
  criado_em   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_tipo       ON leads(tipo);
CREATE INDEX IF NOT EXISTS idx_leads_respondido ON leads(respondido);

CREATE TABLE IF NOT EXISTS depoimentos (
  id    UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  nome  VARCHAR(200) NOT NULL,
  turma VARCHAR(100),
  texto TEXT         NOT NULL,
  foto  VARCHAR(500),
  ativo BOOLEAN      NOT NULL DEFAULT TRUE,
  ordem INT          NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_depoimentos_ativo ON depoimentos(ativo, ordem);

CREATE TABLE IF NOT EXISTS galeria_fotos (
  id        UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  url       VARCHAR(500) NOT NULL,
  legenda   VARCHAR(300),
  aluno     VARCHAR(200),
  ativo     BOOLEAN      NOT NULL DEFAULT TRUE,
  criado_em TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_galeria_ativo ON galeria_fotos(ativo);
