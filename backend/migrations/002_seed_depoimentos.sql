-- ATENÇÃO: URLs abaixo são placeholders temporários do Unsplash.
-- Substituir por fotos reais dos alunos antes de ir para produção.

INSERT INTO depoimentos (nome, turma, texto, foto, ativo, ordem)
SELECT v.nome, v.turma, v.texto, v.foto, v.ativo, v.ordem
FROM (VALUES
  ('Ana Carolina', 'Turma 2024', 'Entrei sem saber operar a camera no manual e sai fotografando com intencao, luz e narrativa.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80', TRUE, 1),
  ('Marcelo Dias', 'Turma 2023', 'A Tri Amici mudou meu olhar. O curso e pratico, intenso e abriu as portas para meus primeiros clientes.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', TRUE, 2),
  ('Bianca Rocha', 'Turma 2025', 'A escola tem alma. Cada aula parece uma experiencia de vida e um convite para criar melhor.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', TRUE, 3)
) AS v(nome, turma, texto, foto, ativo, ordem)
WHERE NOT EXISTS (SELECT 1 FROM depoimentos);
