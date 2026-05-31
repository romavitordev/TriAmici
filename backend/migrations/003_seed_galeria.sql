-- ATENÇÃO: URLs abaixo são placeholders temporários do Unsplash.
-- Substituir por fotos reais dos alunos antes de ir para produção.

INSERT INTO galeria_fotos (url, legenda, aluno, ativo)
SELECT v.url, v.legenda, v.aluno, v.ativo
FROM (VALUES
  ('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80', 'Estudo de luz em estudio', 'Alunos Tri Amici', TRUE),
  ('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80', 'Fotodocumentario urbano', 'Turma 2024', TRUE),
  ('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80', 'Direcao de retrato', 'Ana Carolina', TRUE),
  ('https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=900&q=80', 'Ensaio autoral', 'Bianca Rocha', TRUE),
  ('https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=900&q=80', 'Livro e portfolio', 'Marcelo Dias', TRUE),
  ('https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&w=900&q=80', 'Fotografia e movimento', 'Turma 2025', TRUE)
) AS v(url, legenda, aluno, ativo)
WHERE NOT EXISTS (SELECT 1 FROM galeria_fotos);
