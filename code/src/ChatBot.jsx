import React, { useState, useEffect, useRef } from "react";
import stringSimilarity from "string-similarity";
import ChatIcon from "./components/ChatIcon";
import ChatContainer from "./components/ChatContainer";
import "./ChatBot.css";

const knownTopics = {
  cumprimento: {
    text: () => {
      const horaAtual = new Date().getHours();
      if (horaAtual >= 6 && horaAtual < 12) {
        return "BOM DIA, MITO! PRONTO PARA MAIS UM JOGO DE PESO? A FURIA TE ESPERA!";
      } else if (horaAtual >= 12 && horaAtual < 18) {
        return "BOA TARDE, CAMPEÃO! QUAL JOGO DA FURIA VOCÊ ACOMPANHOU HOJE?";
      } else {
        return "BOA NOITE, MITO! A FURIA SEMPRE ESTÁ ON, E OS JOGOS NÃO PARAM!";
      }
    },
    suggestions: [
      "Horários de jogos?",
      "Últimos resultados da FURIA",
      "Próximo confronto",
      "contato com a furia",
      "histórico da furia",
      "quem são os jogadores da furia?",
    ],
  },
  "contato com a furia": {
    text: "Quer trocar uma ideia direta com a tropa da FURIA? Cola aqui no Whats: 👉 [https://wa.me/5511993404466](https://wa.me/5511993404466)\n\nSó chega no grau, manda um 'Salve' e já era!",
    suggestions: [
      "Simulador de torcida",
      "Próximas partidas",
      "Últimos resultados",
    ],
  },
  "horários de jogos": {
    text: "A agenda da FURIA está sempre agitada! Para te dar os horários precisos, qual modalidade te interessa mais: CS:GO, VALORANT, League of Legends ou Rocket League?",
    suggestions: [
      "Próximos jogos de CS:GO",
      "Próximos jogos de VALORANT",
      "Próximos jogos de LoL",
      "Próximos jogos de RL",
    ],
  },
  "próximos jogos de cs:go": {
    text: "Fique ligado! Nosso time de CS:GO tem o(s) seguinte(s) confronto(s) agendado(s):\n- 10 de Maio, as 01:00 (Horario de Brasilia) contra a equipe The MongolZ pela PGL Astana\n- Quer saber mais detalhes sobre alguma dessa(s) partida(s) ou onde assistir?",
    suggestions: [
      "Detalhes do jogo contra The MongolZ",
      "Onde assistir o(s) jogo(s)?",
      "Line-up da FURIA",
    ],
  },
  "Detalhes do jogo contra The MongolZ": {
    text: "O jogo sera em decidido em uma série melhor de três mapas (MD3),\n- válida pela fase de grupos do torneio PGL Astana 2025.\n- Esta marcada para esse sabado dia 10, venha nos apoiar na busca de mais um titulo!!",
    suggestions: [
      "Onde assistir o(s) jogo(s)?",
      "Line-up da FURIA",
    ],
  },
  "Onde assistir o(s) jogo(s)?": {
    text: "O jogo sera transmitido pelo canal da FURIA no Youtube e no canal da PGL Astana 2025",
    suggestions: [
      "Line-up da FURIA",
    ],
  },
  "Line-up da FURIA": {
    text: "Confira quem vai estar na linha de batalha do proximo jogo:\n- Gabriel 'FalleN' Toledo\n- Yuri 'yuurih' Santos\n- Kaike 'KSCERATO' Cerato\n- Mareks 'YEKINDAR' Gaļinskis\n- molodoy \n- juntamente com o nosso professor Sidde e seu auxiliar Hepa \n #DaleFURIA 🖤",
    suggestions: [
      "Próximos jogos de VALORANT",
      "Próximos jogos de LoL",
      "Próximos jogos de RL",
    ],
  },
  "próximos jogos de valorant": {
    text: "A cavalaria do VALORANT está pronta para a batalha! Os próximos jogos são:\n- 05 de Maio, 20:00 (Horario de Brasilia) contra a LOUD valida pelo VCT Americas League \n- 08 de Maio, 17:00 BRT vs Sentinels (VCT Americas League)\nQuer informações sobre algumas dessas partidas ou quer saber onde assistir?",
    suggestions: [
      "Detalhes do jogo contra LOUD",
      "Histórico contra Sentinels",
      "Elenco do VALORANT",
      "Informações sobre o campeonato",
    ],
  },
  "Detalhes do jogo contra LOUD": {
    text: "O jogo sera em decidido em uma série melhor de três mapas (MD3),\n- válida pela fase de grupos do torneio VCT Americas League 2025.\n- Esta marcada para esse sabado dia 05, venha nos apoiar na busca de mais um titulo!!",
    suggestions: [
      "Onde assistir o(s) jogo(s)?",
      "Line-up da FURIA",
    ],
  },
  "Histórico contra Sentinels": {
    text: "A FURIA e Sentinels ja se enfrentaram 10 vezes, com o saldo de 6 vitórias para a FURIA e 4 para o Sentinels",
    suggestions: [
      "Onde assistir o(s) jogo(s)?",
      "Line-up da FURIA",
    ],
  },
  "Elenco do VALORANT": {
    text: "Confira quem vai estar na linha de batalha do proximo jogo:\n- Khalil 'khalil' Schmidt Faur Awad\n- Ilan 'havoc' Eloy\n- Olavo 'heat' Marcelo\n- Rafael 'raafa' Lima \n- Luis 'pryze' Henrique\n- Nosso tecnico da equipe de VAVA e nada mais nada menos Pedro 'peu' Lopes,\n e seu fiel assistente Lucas 'lukzera' Soares.\n #DaleFURIA 🖤",
    suggestions: [
      "Próximos jogos de VALORANT",
      "Próximos jogos de LoL",
    ],
  },
  "Informações sobre o campeonato": {
    text: "O VCT Americas League 2025 é um torneio de VALORANT que acontece no mes de maio, e conta com 12 equipes participantes, sendo 10 times classificados e 2 wildcards. A competição é dividida em 3 fases: grupos, playoffs e final. As equipes são distribuídas em 3 grupos de 4 times, onde cada time joga contra os outros times do seu grupo. As duas melhores equipes de cada grupo passam para o playoffs, onde os confrontos são decididos em melhor de 3 séries. A final é disputada em melhor de 5 séries.",
    suggestions: [
      "Próximos jogo(s) de VALORANT",
      "Próximos jogo(s) de LoL",
      "Próximos jogo(s) de RL",
      "Próximos jogo(s) de CS:GO",
    ],
  },
  "próximos jogos de lol": {
    text: "A FURIA no League of Legends está se preparando para dominar o Rift! Confira o(s) próximo(s) horário(s):\n- 11 de maio, 11:00 (horario de brasilia) vs Fluxo pelo LTA South 2025 Split 2\nO que mais você gostaria de saber sobre o nosso time de LoL?",
    suggestions: [
      "Detalhes do jogo contra Fluxo",
      "Jogadores em destaque no Academy",
      "Estratégias da equipe",
    ],
  },
  "Detalhes do jogo contra Fluxo": {
    text: "O jogo sera em decidido em uma série melhor de três mapas (MD3),\n- válida pela fase de grupos do torneio LTA South 2025 Split 2.\n- Esta marcada para esse sabado dia 11, venha nos apoiar na busca de mais um titulo!!",
    suggestions: [
      "Jogadores em destaque no Academy",
      "Estratégias da equipe",
    ],
  },
  "Jogadores em destaque no Academy": {
    text: "Os jogadores em destaque da FURIA no Academy são:\n- Top: Guilherme 'GUIGO' Ruiz\n- Support: Gabriel 'JoJo' Dzelme de Oliveira\n- Mid: Arthur 'Tutsz' Peixoto Machado\n- Jungle:  Pedro 'Tatu' Seixas\n- ADC: Andrey 'Ayu' Saraiva \n- Coach:  Thinkcard\n- Assistente: furyz \n- Pra cima deles FURIA!!",
    suggestions: [
      "Estratégias da equipe",
    ],
  },
  "Estratégias da equipe": {
    text: "A FURIA no CBLOL sempre foi aquela equipe que curte jogar\n com comp de late game, eles buscam escalar bem com campeões como Jinx e Azir, e sempre focam muito\n em controlar os objetivos do mapa, tipo dragões e arauto.\n O early game não é muito agressivo, o jungler foca\n mais em garantir que nada fuja do controle. Ultimamente, temos tentado algo mais ousado,\n pegando campeões com mais pressão no começo, tipo Ahri e Tristana, pra surpreender nossos adversários \n#DaleFURIA 🖤",
    suggestions: [
      "próximos jogos de lol",
      "próximos jogos de cs:go",
      "próximos jogos de valorant",
      "próximos jogos de RL",
    ],
  },
  "próximos jogos de RL": {
    text: "Os mestres do Rocket League da FURIA estão a todo vapor! Anote aí o(s) próximo(s) horário(s):\n- 06 de Maio, 22:00 BRT vs Team Liquid (RLCS NA Spring Open)\n- 09 de Maio, 19:30 BRT vs G2 Esports (RLCS NA Spring Open)\nTem alguma pergunta sobre a nossa participação no cenário de Rocket League?",
    suggestions: [
      "Últimos campeonatos de RL",
      "Melhores momentos da FURIA no RL",
      "Quem são os craques do RL?",
    ],
  },
  "Últimos campeonatos de RL": {
    text: "Nos últimos tempos, a nossa equipe de Rocket League tem\n arrasado nas competições internacionais! Em março de 2025,\n a FURIA ficou com o 3º lugar no RLCS 2025 - Birmingham\n Major, um dos maiores torneios, e venceu times pesados\n como o Team Vitality por 4 a 3. 🙌\n\nAlém disso, estamos em uma sequência de vitórias incrível,\n com 5 partidas ganhas seguidas e uma taxa de vitória de\n 100% nos últimos 30 dias! 🔥\n\nFique ligado nos próximos jogos e resultados\n por aqui mesmo\n Vamos junto, FURIA! 🦁💛",
    suggestions: [
      "Melhores momentos da FURIA no RL",
      "Quem são os craques do RL?",
    ],
  },
  "Melhores momentos da FURIA no RL": {
    text: "Confira os melhores momentos da FURIA no RL:\n A jornada da FURIA no Rocket League tem sido incrível! 🦁🚀\n🏆 Campeões do Gamers8 2022 FURIA levou o título em um torneio internacional!\n⚔️ Vitória sobre a Team Vitality no RLCS Major Vitória emocionante por 3 a 2!\n🌍 Top 4 no Mundial de Rocket League 2022 FURIA fez história chegando nas semifinais como a primeira equipe sul-americana!\n🔥 Sequência de 5 vitórias seguidas \n Fase impressionante com 100% de vitórias nos últimos jogos!\nVamos continuar com tudo, FURIA! 💛🦁",
    suggestions: [
      "Quem são os craques do RL?",
    ],
  },
  "Quem são os craques do RL?": {
    text: "Os craques da FURIA no Rocket League são eles:\n -Yan 'yanxnz' Nolasco\n -Gabriel 'Lostt' Souza Buzon\n -Arthur 'Drufinho' Langsch Miguel\n -Mateus 'STL' Santos Tornilio Lemos",
    suggestions: [
      "Últimos resultados da FURIA",
      "Próximos jogos de RL",
    ],
  },
  "últimos resultados da furia": {
    text: "Confira os resultados mais recentes da FURIA:\n- 02 de Maio - FURIA 2 vs 1 Cloud9 (CS:GO BLAST Premier) - Resultado: Vitória\n- 01 de Maio - FURIA 0 vs 2 Sentinels (VALORANT VCT Americas) - Resultado: Derrota\nQuer saber mais sobre algum desses jogos?",
    suggestions: [
      "Detalhes da vitória contra Cloud9",
      "Como foi o desempenho contra Sentinels?",
      "Próximos desafios após esses jogos",
    ],
  },
  "próximo confronto": {
    text: "De qual modalidade você quer saber o próximo confronto?",
    suggestions: [
      "próximos jogos de CS:GO",
      "próximos jogos de VALORANT",
      "próximos jogos de LoL",
      "próximos jogos de RL",
    ],
  },
  "histórico da furia": {
    text: "A história da FURIA é marcada por paixão e conquistas! Desde nossa fundação em 2017, colecionamos títulos importantes como o Campeonato da ESL Pro League Season 12 e o VCT Brasil 2021. Qual período ou conquista te interessa mais?",
    suggestions: [
      "Primeiro título da FURIA",
      "A trajetória no IEM Katowice 2023",
      "Jogadores lendários da FURIA",
    ],
  },
  "Primeiro título da FURIA": {
    text: "O primeiro título da FURIA foi conquistado em 2018, quando a equipe de CS:GO foi campeã da Gamers Club Liga Profissional - Série A com o placar de \nFURIA 2 x 0 YeaH! Gaming. A vitória foi incrível e marcou a ascensão da FURIA\n como uma das principais equipes de CS:GO do mundo.",
    suggestions: [
      "A trajetória no IEM Katowice 2023",
      "Jogadores lendários da FURIA",
    ],
  },
  "A trajetória no IEM Katowice 2023": {
    text: "🦁 Fala, FURIOSO! Tá querendo saber da nossa caminhada na IEM Katowice, né? Cola comigo que eu te conto rapidinho:\n\nA gente já tentou levantar o caneco lá em Katowice algumas vezes, mas ainda tá engasgado…\nÉ um dos campeonatos mais casca-grossa do CS, e a disputa sempre é pesada. Bora pro resumão:\n\n🔹 2020: Tentamos colar na fase principal, mas caímos no Play-In. Ainda era o começo da nossa jornada internacional.\n\n🔹 2021: Conseguimos entrar na fase de grupos! Jogamos contra uns times brabos, mas infelizmente não deu pra passar pros playoffs.\n\n🔹 2022: Chegamos mais fortes, fizemos boas partidas, mas ainda ficamos na fase de grupos. Faltou pouco, mano!\n\n🔹 2023: Foi dureza. Acabamos eliminados no Play-In de novo. Ano de altos e baixos pra gente.\n\n🔹 2024 e 2025 (CS2): Ainda estamos tentando achar o ritmo certo no Katowice com o CS novo. Estamos no corre pra voltar mais fortes e, quem sabe, meter um topzera logo logo.\n\n⚔️ Ainda não veio o título, mas não falta raça!\nSegue com a gente que a história tá só começando.\n#DaleFURIA 🖤,🔹 2023: Foi dureza. Acabamos eliminados no Play-In de novo. Ano de altos e baixos pra gente.\n\n🔹 2024 e 2025 (CS2): Ainda estamos tentando achar o ritmo certo no Katowice com o CS novo. Estamos no corre pra voltar mais fortes e, quem sabe, meter um topzera logo logo.\n\n⚔️ Ainda não veio o título, mas não falta raça!\nSegue com a gente que a história tá só começando.\n#DaleFURIA 🖤",
    suggestions: [
      "Jogadores lendários da FURIA",
    ]
  },
  "Jogadores lendários da FURIA": {
    text: "🦁 Quer saber quem são os jogadores mais lendários da história da FURIA? Então segura essa lista braba:\n🔥 KSCERATO – Desde 2018 no bonde. É o clutch master, o monstro que segura a bomba sozinho e ainda leva geral!\n🔥 yuurih – Parceiro de guerra do KSCERATO. Joga MUITO, sempre consistente e decisivo nas horas que importam.\n🔥 arT – O cérebro da FURIA. IGL com o estilo mais doido do cenário. Rush de AWP? Ele faz.\n🔥 VINI – Foi o cara da raça e do suporte. Nunca brilhou nas estatísticas, mas sempre jogou pelo time. Ídolo da torcida!\n🔥 HEN1 – Passagem curta, mas marcante. AWP quente, clutchador e dono de highlight.\n\n🏅 Menções Honrosas:\n– drop: segurou a bronca numa fase de transição.\n– chelo e FalleN: tão escrevendo a história agora no CS2! A lenda e o showman juntos, dá bom hein?\n\nFURIA é mais que time, é legado.\n#DaleFURIA 🖤",
    suggestions: [
      "Primeiro título da FURIA",
      "A trajetória no IEM Katowice 2023",
      "Últimos resultados da FURIA",
      "Próximos jogos de CS:GO",
      "Próximos jogos de VALORANT",
      "Próximos jogos de LoL",
      "Próximos jogos de RL",
    ],
  },
  "quem são os jogadores da furia?": {
    text: "A FURIA tem talentos incríveis em todas as suas modalidades! Em qual equipe você está mais interessado: CS:GO, VALORANT, League of Legends ou Rocket League?",
    suggestions: [
      "Jogadores do CS:GO",
      "Jogadores do VALORANT",
      "Jogadores do LoL",
      "Jogadores do RL",
    ],
  },
  "tchau": {
    text: "GG WP! Foi um prazer trocar uma ideia com você sobre a FURIA. Fique ligado em nossas redes e nos próximos jogos! Volte sempre!",
    suggestions: [],
  },
  default: {
    text: "Desculpe, não consegui entender completamente sua pergunta. Para te ajudar melhor, tente perguntar sobre os próximos jogos, nossos jogadores ou a história da FURIA. Quais desses temas te interessam?",
    suggestions: [
      "Próximos jogos",
      "Quem são os jogadores?",
      "História da FURIA",
    ],
  },
};

const topicAliases = {
  oi: "cumprimento",
  olá: "cumprimento",
  "bom dia": "cumprimento",
  "boa tarde": "cumprimento",
  "boa noite": "cumprimento",
  "e aí": "cumprimento",
  "tudo bem?": "cumprimento",
  "como vai?": "cumprimento",
  "horário dos jogos": "horários de jogos",
  "calendário de jogos": "horários de jogos",
  "quando joga a furia?": "horários de jogos",
  "resultados da furia": "últimos resultados da furia",
  "placar dos últimos jogos": "últimos resultados da furia",
  "quem ganhamos?": "últimos resultados da furia",
  "quem perdemos?": "últimos resultados da furia",
  "próximo jogo": "próximo confronto",
  "quem vamos enfrentar agora?": "próximo confronto",
  "história da organização": "histórico da furia",
  "como surgiu a furia?": "histórico da furia",
  "quem faz parte da furia?": "quem são os jogadores da furia?",
  "elenco da furia": "quem são os jogadores da furia?",
  "onde é a base da furia?": "onde está a sede da furia?",
  "como entrar em contato?": "contato com a furia",
  "falar com o marketing": "falar com a equipe de marketing",
  "quero falar com vocês": "contato com a furia",
  ajuda: "suporte ao fã",
  "quero falar com um jogador": "falar com os jogadores",
  "ver redes sociais dos jogadores": "falar com os jogadores",
  adeus: "tchau",
  "até a próxima": "tchau",
  valeu: "tchau",
  "não entendi": "default",
  "o que você pode fazer?": "default",
  "?": "default",
  "informações do campeonato": "informações sobre o campeonato",
  "sobre o campeonato": "informações sobre o campeonato",
  "campeonatos da furia": "informações sobre o campeonato",
};

function getBotResponse(message) {
  const lowerCaseMessage = message.toLowerCase().trim();

  let bestMatch = null;
  let bestSimilarity = 0;

  if (knownTopics[lowerCaseMessage]) {
    return knownTopics[lowerCaseMessage];
  }

  if (topicAliases[lowerCaseMessage]) {
    return knownTopics[topicAliases[lowerCaseMessage]];
  }

  for (const topic in knownTopics) {
    if (topic !== "xingamento") {
      const similarity = stringSimilarity.compareTwoStrings(
        lowerCaseMessage,
        topic
      );
      if (similarity > bestSimilarity) {
        bestSimilarity = similarity;
        bestMatch = topic;
      }
    }
  }

  if (bestSimilarity > 0.7) {
    return knownTopics[bestMatch];
  }

  return knownTopics.default;
}

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text,
      sender: "user",
    };

    const response = getBotResponse(text);

    setMessages((prev) => [...prev, userMessage]);

    setMessages((prev) => [
      ...prev,
      { id: Date.now() + 1, text: "Digitando...", sender: "bot" },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          id: Date.now() + 2,
          text:
            typeof response.text === "function"
              ? response.text()
              : response.text,
          sender: "bot",
          suggestions: response.suggestions,
        },
      ]);
    }, 800);

    setInputMessage("");
    setSelectedSuggestion(text);
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    handleSendMessage(suggestion);
  };

  const toggleChat = () => {
    setChatOpen((prev) => !prev);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage(inputMessage);
    }
  };

  return (
    <div>
      <ChatIcon isOpen={chatOpen} onClick={toggleChat} />
      <ChatContainer
        isOpen={chatOpen}
        onClose={toggleChat}
        messages={messages}
        onSendMessage={handleSendMessage}
        inputMessage={inputMessage}
        onInputChange={handleInputChange}
        onInputKeyPress={handleInputKeyPress}
        selectedSuggestion={selectedSuggestion}
        onSuggestionClick={handleSuggestionClick}
        chatBottomRef={chatBottomRef}
      />
    </div>
  );
}

export default ChatBot;
