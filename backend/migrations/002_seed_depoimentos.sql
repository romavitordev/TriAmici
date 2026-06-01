-- ATENÇÃO: as URLs de foto abaixo são placeholders do Unsplash.
-- Quando a escola enviar fotos reais dos alunos, substituir as URLs aqui
-- e refazer o seed manualmente (este arquivo é a fonte da verdade — o
-- painel admin NÃO permite editar depoimentos, por decisão de produto).

INSERT INTO depoimentos (nome, turma, texto, foto, ativo, ordem)
SELECT v.nome, v.turma, v.texto, v.foto, v.ativo, v.ordem
FROM (VALUES
  ('Ana Carolina',          'Turma 2024',     'Entrei sem saber operar a câmera no manual e saí fotografando com intenção, luz e narrativa.',                                                                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80', TRUE,  1),
  ('Marcelo Dias',          'Turma 2023',     'A Tri Amici mudou meu olhar e abriu as portas para meus primeiros clientes profissionais.',                                                                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', TRUE,  2),
  ('Bianca Rocha',          'Turma 2025',     'A escola tem alma. Cada aula é um convite para criar melhor e enxergar o mundo de outro ângulo.',                                                             'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', TRUE,  3),
  ('Lucas Ferreira',        'Turma 2022',     'Saí com portfólio, clientes e uma visão de mundo completamente diferente. Recomendo sem hesitar.',                                                            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', TRUE,  4),
  ('Fernanda Alves',        'Turma 2023',     'Nunca imaginei aprender tanto em tão pouco tempo. A metodologia é única — prática desde o primeiro dia.',                                                     'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80', TRUE,  5),
  ('Ricardo Mendes',        'Turma 2024',     'Fotografava há anos, mas só depois da Tri Amici entendi o que significa ter intenção real nas imagens.',                                                      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80', TRUE,  6),
  ('Juliana Prado',         'Turma 2025',     'A escola é um ambiente de transformação. Saí pronta para trabalhar com fotografia profissionalmente.',                                                        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80', TRUE,  7),
  ('Pedro Almeida',         'Turma VIP 2024', 'Escolhi a VIP por causa do tempo de estúdio individual — fez toda a diferença. Em seis meses, eu tinha um portfólio que abriu portas reais.',                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', TRUE,  8),
  ('Camila Tavares',        'Turma 2024',     'Cheguei achando que precisava de uma câmera cara. Saí entendendo que precisava de olhar — e a câmera ficou simples no caminho.',                              'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80', TRUE,  9),
  ('Roberto Salles',        'Turma 2022',     'Faço fotografia como hobby sério há anos, e a Tri Amici me deu a base técnica que faltava. Hoje fotografo viagens com intenção real.',                        'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=600&q=80', TRUE, 10),
  ('Letícia Vasconcellos',  'Turma 2025',     'O método é prático desde a primeira semana. Em vez de teoria infinita, a gente fotografa, recebe direção e refaz — e o olhar muda rápido.',                   'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80', TRUE, 11),
  ('André Tobias',          'Turma 2023',     'Comecei fotografando minha família e terminei fazendo book de casamento. A parte de mercado e precificação foi o que mais me surpreendeu.',                   'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&w=600&q=80', TRUE, 12)
) AS v(nome, turma, texto, foto, ativo, ordem)
WHERE NOT EXISTS (SELECT 1 FROM depoimentos);
