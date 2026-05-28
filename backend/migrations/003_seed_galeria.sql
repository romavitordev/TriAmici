USE triamici_db;
GO

IF NOT EXISTS (SELECT 1 FROM galeria_fotos)
BEGIN
  INSERT INTO galeria_fotos (url, legenda, aluno, ativo)
  VALUES
    (N'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80', N'Estudo de luz em estudio', N'Alunos Tri Amici', 1),
    (N'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80', N'Fotodocumentario urbano', N'Turma 2024', 1),
    (N'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80', N'Direcao de retrato', N'Ana Carolina', 1),
    (N'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=900&q=80', N'Ensaio autoral', N'Bianca Rocha', 1),
    (N'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=900&q=80', N'Livro e portfolio', N'Marcelo Dias', 1),
    (N'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&w=900&q=80', N'Fotografia e movimento', N'Turma 2025', 1);
END
GO
