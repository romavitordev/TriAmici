CREATE TABLE IF NOT EXISTS pre_inscricoes (
  id               UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Dados pessoais
  nome             VARCHAR(200) NOT NULL,
  faixa_idade      VARCHAR(20)  NOT NULL
                   CHECK (faixa_idade IN (
                     '18-24','25-30','31-40','41-50',
                     '51-60','61-70','71-80','81-99','99+'
                   )),
  email            VARCHAR(200) NOT NULL,
  whatsapp         VARCHAR(20)  NOT NULL,
  cidade_estado    VARCHAR(150) NOT NULL,
  cpf_ultimos4     VARCHAR(4)   NOT NULL,
  instagram        VARCHAR(200),
  facebook         VARCHAR(200),
  -- Perfil fotográfico
  objetivo         VARCHAR(50)  NOT NULL
                   CHECK (objetivo IN (
                     'profissao_principal',
                     'renda_complementar',
                     'hobby_serio'
                   )),
  nivel            TEXT[]       NOT NULL DEFAULT '{}',
  camera_celular   VARCHAR(300),
  -- Vestibular de sensibilidade (perguntas abertas)
  resp_fotografia  TEXT         NOT NULL,
  resp_artista     TEXT         NOT NULL,
  resp_emocao      TEXT         NOT NULL,
  resp_hopper      TEXT         NOT NULL,
  -- Intenção final (múltipla escolha)
  intencoes        TEXT[]       NOT NULL DEFAULT '{}',
  -- Controle administrativo
  status           VARCHAR(20)  NOT NULL DEFAULT 'pendente'
                   CHECK (status IN ('pendente','contactado','rejeitado')),
  contactado_em    TIMESTAMPTZ,
  nota_admin       TEXT,
  criado_em        TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_preinsc_status    ON pre_inscricoes(status);
CREATE INDEX IF NOT EXISTS idx_preinsc_criado_em ON pre_inscricoes(criado_em DESC);
CREATE INDEX IF NOT EXISTS idx_preinsc_whatsapp  ON pre_inscricoes(whatsapp);
