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
    text: "Fique ligado! Nosso time de CS:GO tem os seguintes confrontos agendados:\n- 07 de Maio, 15:00 BRT vs Natus Vincere (BLAST Premier Spring Groups)\n- 10 de Maio, 18:30 BRT vs G2 Esports (IEM Dallas Qualifiers)\nQuer saber mais detalhes sobre alguma dessas partidas?",
    suggestions: [
      "Detalhes do jogo contra Natus Vincere",
      "Onde assistir o BLAST Premier?",
      "Line-up da FURIA",
    ],
  },
  "próximos jogos de valorant": {
    text: "A cavalaria do VALORANT está pronta para a batalha! Os próximos jogos são:\n- 05 de Maio, 20:00 BRT vs LOUD (VCT Americas League)\n- 08 de Maio, 17:00 BRT vs Sentinels (VCT Americas League)\nAlguma dessas partidas te interessa em especial ou quer saber sobre o VCT Americas League?",
    suggestions: [
      "Detalhes do jogo contra LOUD",
      "Histórico contra Sentinels",
      "Elenco do VALORANT",
      "Informações sobre o campeonato",
    ],
  },
  "próximos jogos de lol": {
    text: "A FURIA no League of Legends está se preparando para dominar o Rift! Confira os próximos horários:\n- 12 de Maio, 19:00 BRT vs paiN Gaming (CBLOL Academy)\n- 15 de Maio, 21:30 BRT vs RED Canids (CBLOL Academy)\nO que mais você gostaria de saber sobre o nosso time de LoL?",
    suggestions: [
      "Próximo split do CBLOL",
      "Jogadores em destaque no Academy",
      "Estratégias da equipe",
    ],
  },
  "próximos jogos de rl": {
    text: "Os mestres do Rocket League da FURIA estão a todo vapor! Anote aí os próximos jogos:\n- 06 de Maio, 22:00 BRT vs Team Liquid (RLCS NA Spring Open)\n- 09 de Maio, 19:30 BRT vs G2 Esports (RLCS NA Spring Open)\nTem alguma pergunta sobre a nossa participação no cenário de Rocket League?",
    suggestions: [
      "Últimos campeonatos de RL",
      "Melhores momentos da FURIA no RL",
      "Quem são os craques do RL?",
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
    text: "O nosso próximo desafio será contra Natus Vincere no dia 07 de Maio às 15:00 BRT. A partida será válida pelo BLAST Premier Spring Groups. Quer saber mais sobre o adversário ou o campeonato?",
    suggestions: [
      "Histórico de confrontos contra Na'Vi",
      "Sobre o BLAST Premier Spring Groups",
      "Expectativas para o jogo",
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
