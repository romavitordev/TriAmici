USE triamici_db;
GO

IF NOT EXISTS (SELECT 1 FROM depoimentos)
BEGIN
  INSERT INTO depoimentos (nome, turma, texto, foto, ativo, ordem)
  VALUES
    (N'Ana Carolina', N'Turma 2024', N'Entrei sem saber operar a camera no manual e sai fotografando com intencao, luz e narrativa.', N'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80', 1, 1),
    (N'Marcelo Dias', N'Turma 2023', N'A Tri Amici mudou meu olhar. O curso e pratico, intenso e abriu as portas para meus primeiros clientes.', N'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', 1, 2),
    (N'Bianca Rocha', N'Turma 2025', N'A escola tem alma. Cada aula parece uma experiencia de vida e um convite para criar melhor.', N'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', 1, 3);
END
GO
