/**
 * Banco de perguntas para o Quiz sobre Anabolizantes e Hormônio GH
 */
const quizQuestions = [
    // Perguntas sobre Anabolizantes - O que são e exemplos
    {
        question: "O que são anabolizantes?",
        options: [
            "Substâncias que diminuem a massa muscular",
            "Hormônios sintéticos derivados da testosterona",
            "Suplementos naturais sem efeitos colaterais",
            "Medicamentos usados apenas para perda de peso"
        ],
        correctAnswer: "B",
        category: "anabolizantes"
    },
    {
        question: "Qual destes é um exemplo de anabolizante?",
        options: [
            "Paracetamol",
            "Creatina",
            "Oxandrolona",
            "Vitamina D"
        ],
        correctAnswer: "C",
        category: "anabolizantes"
    },
    {
        question: "Qual é a principal função dos anabolizantes no organismo?",
        options: [
            "Aumentar a produção de gordura corporal",
            "Promover o crescimento muscular e ósseo",
            "Diminuir a resistência física",
            "Reduzir os níveis de proteína no sangue"
        ],
        correctAnswer: "B",
        category: "anabolizantes"
    },
    
    // Perguntas sobre Anabolizantes - Uso clínico e estético
    {
        question: "Qual das seguintes condições médicas pode ser tratada com anabolizantes sob prescrição médica?",
        options: [
            "Resfriado comum",
            "Perda de massa muscular em pacientes com HIV",
            "Hipertensão arterial",
            "Diabetes tipo 1"
        ],
        correctAnswer: "B",
        category: "anabolizantes"
    },
    {
        question: "Por que alguns atletas usam anabolizantes de forma ilegal?",
        options: [
            "Para melhorar a concentração mental",
            "Para aumentar a flexibilidade",
            "Para aumentar a força e performance física",
            "Para diminuir o tempo de recuperação após lesões leves"
        ],
        correctAnswer: "C",
        category: "anabolizantes"
    },
    {
        question: "Qual é um uso clínico legítimo dos anabolizantes?",
        options: [
            "Tratamento de puberdade atrasada em meninos",
            "Tratamento de acne",
            "Tratamento de resfriados",
            "Tratamento de hipertensão"
        ],
        correctAnswer: "A",
        category: "anabolizantes"
    },
    
    // Perguntas sobre Anabolizantes - Riscos e efeitos colaterais
    {
        question: "Qual destes é um efeito colateral comum do uso de anabolizantes em homens?",
        options: [
            "Aumento da produção natural de testosterona",
            "Redução do tamanho dos testículos",
            "Aumento da fertilidade",
            "Diminuição da pressão arterial"
        ],
        correctAnswer: "B",
        category: "anabolizantes"
    },
    {
        question: "Nas mulheres, o uso de anabolizantes pode causar:",
        options: [
            "Aumento da fertilidade",
            "Voz mais aguda",
            "Crescimento de pelos faciais e corporais",
            "Aumento do ciclo menstrual"
        ],
        correctAnswer: "C",
        category: "anabolizantes"
    },
    {
        question: "Qual órgão pode ser seriamente afetado pelo uso prolongado de anabolizantes?",
        options: [
            "Pulmões",
            "Fígado",
            "Pâncreas",
            "Baço"
        ],
        correctAnswer: "B",
        category: "anabolizantes"
    },
    {
        question: "Qual problema cardiovascular está associado ao uso de anabolizantes?",
        options: [
            "Pressão arterial baixa",
            "Frequência cardíaca reduzida",
            "Aumento do risco de ataques cardíacos",
            "Melhora na circulação sanguínea"
        ],
        correctAnswer: "C",
        category: "anabolizantes"
    },
    
    // Perguntas sobre Anabolizantes - Questões éticas no esporte e na saúde
    {
        question: "Por que o uso de anabolizantes é proibido em competições esportivas?",
        options: [
            "Porque são muito caros",
            "Porque dão vantagem injusta aos atletas",
            "Porque causam sonolência durante as competições",
            "Porque diminuem a resistência física"
        ],
        correctAnswer: "B",
        category: "anabolizantes"
    },
    {
        question: "Qual é um dos principais problemas éticos relacionados ao uso de anabolizantes no esporte?",
        options: [
            "Eles são muito baratos e acessíveis",
            "Eles violam o princípio de competição justa",
            "Eles tornam o esporte menos interessante para o público",
            "Eles são facilmente detectáveis em testes"
        ],
        correctAnswer: "B",
        category: "anabolizantes"
    },
    {
        question: "Qual é um problema ético relacionado à venda ilegal de anabolizantes?",
        options: [
            "Os produtos são sempre de alta qualidade",
            "Os usuários recebem orientação médica adequada",
            "Os produtos podem conter substâncias desconhecidas ou perigosas",
            "Os preços são regulamentados pelo governo"
        ],
        correctAnswer: "C",
        category: "anabolizantes"
    },
    {
        question: "Por que o uso de anabolizantes sem prescrição médica é considerado um problema de saúde pública?",
        options: [
            "Porque aumenta os custos do sistema de saúde com tratamentos para efeitos colaterais",
            "Porque diminui o número de pessoas que praticam esportes",
            "Porque reduz a venda de suplementos legais",
            "Porque causa dependência em 100% dos usuários"
        ],
        correctAnswer: "A",
        category: "anabolizantes"
    },
    {
        question: "Qual é a principal preocupação ética sobre o uso de anabolizantes por adolescentes?",
        options: [
            "Pode afetar negativamente o desenvolvimento físico e hormonal",
            "Torna os adolescentes muito competitivos",
            "Diminui o interesse por atividades acadêmicas",
            "Aumenta o custo das mensalidades escolares"
        ],
        correctAnswer: "A",
        category: "anabolizantes"
    },
    
    // Perguntas sobre Hormônio GH - Função no corpo
    {
        question: "O que é o hormônio GH?",
        options: [
            "Hormônio Gástrico",
            "Hormônio do Crescimento",
            "Glicose Humana",
            "Glândula Hipotalâmica"
        ],
        correctAnswer: "B",
        category: "gh"
    },
    {
        question: "Qual glândula do corpo humano produz naturalmente o hormônio GH?",
        options: [
            "Tireoide",
            "Pâncreas",
            "Hipófise (pituitária)",
            "Suprarrenal"
        ],
        correctAnswer: "C",
        category: "gh"
    },
    {
        question: "Qual é a principal função do hormônio GH no corpo humano?",
        options: [
            "Regular a temperatura corporal",
            "Controlar os níveis de açúcar no sangue",
            "Promover o crescimento e desenvolvimento dos tecidos",
            "Controlar o sono e o ciclo circadiano"
        ],
        correctAnswer: "C",
        category: "gh"
    },
    {
        question: "Em que fase da vida a produção natural de GH é mais elevada?",
        options: [
            "Na terceira idade",
            "Durante a puberdade",
            "Na vida adulta",
            "Durante a gravidez"
        ],
        correctAnswer: "B",
        category: "gh"
    },
    {
        question: "Além do crescimento, qual outra função importante do GH no organismo?",
        options: [
            "Regulação do metabolismo de gorduras e proteínas",
            "Produção de insulina",
            "Controle da pressão arterial",
            "Produção de células sanguíneas"
        ],
        correctAnswer: "A",
        category: "gh"
    },
    
    // Perguntas sobre Hormônio GH - Uso médico
    {
        question: "Qual condição médica é tratada com GH sintético em crianças?",
        options: [
            "Obesidade infantil",
            "Déficit de crescimento por deficiência de GH",
            "Diabetes tipo 1",
            "Asma"
        ],
        correctAnswer: "B",
        category: "gh"
    },
    {
        question: "Como é administrado o GH em tratamentos médicos?",
        options: [
            "Em comprimidos orais",
            "Por meio de adesivos na pele",
            "Por injeções subcutâneas",
            "Por inalação"
        ],
        correctAnswer: "C",
        category: "gh"
    },
    {
        question: "Qual síndrome pode ser tratada com GH sob supervisão médica?",
        options: [
            "Síndrome de Down",
            "Síndrome de Turner",
            "Síndrome de Asperger",
            "Síndrome do Pânico"
        ],
        correctAnswer: "B",
        category: "gh"
    },
    {
        question: "Em adultos, o GH pode ser prescrito para tratar:",
        options: [
            "Deficiência de GH devido a problemas na hipófise",
            "Calvície",
            "Hipertensão",
            "Depressão"
        ],
        correctAnswer: "A",
        category: "gh"
    },
    
    // Perguntas sobre Hormônio GH - Perigos do uso indevido
    {
        question: "Qual é um possível efeito colateral do uso indevido de GH?",
        options: [
            "Diminuição da massa muscular",
            "Crescimento anormal de órgãos internos (visceromegalia)",
            "Aumento da densidade óssea",
            "Melhora da visão"
        ],
        correctAnswer: "B",
        category: "gh"
    },
    {
        question: "O uso não médico de GH pode aumentar o risco de:",
        options: [
            "Hipoglicemia (baixo açúcar no sangue)",
            "Diminuição da pressão arterial",
            "Diabetes e resistência à insulina",
            "Diminuição do colesterol"
        ],
        correctAnswer: "C",
        category: "gh"
    },
    {
        question: "Qual condição física característica pode se desenvolver em adultos que abusam do GH?",
        options: [
            "Nanismo",
            "Acromegalia (crescimento anormal das extremidades)",
            "Raquitismo",
            "Osteoporose"
        ],
        correctAnswer: "B",
        category: "gh"
    },
    {
        question: "Por que o uso de GH para fins estéticos é perigoso?",
        options: [
            "Porque causa dependência psicológica imediata",
            "Porque pode causar desequilíbrios hormonais graves e efeitos colaterais irreversíveis",
            "Porque causa perda de cabelo em todos os usuários",
            "Porque é extremamente caro"
        ],
        correctAnswer: "B",
        category: "gh"
    },
    {
        question: "Qual é um risco específico do uso de GH não prescrito em adolescentes?",
        options: [
            "Fechamento prematuro das placas de crescimento, limitando a altura final",
            "Desenvolvimento precoce da visão",
            "Melhora excessiva da memória",
            "Aumento da capacidade pulmonar"
        ],
        correctAnswer: "A",
        category: "gh"
    }
];
