# Direção criativa — CR Films

## Três abordagens exploradas

| Tema | Introdução breve | Probabilidade |
| --- | --- | --- |
| **Precisão em Movimento** | Editorial técnico com superfícies escuras, recortes assimétricos e reflexos azulados. Traduz proteção e acabamento com uma presença contemporânea, sem apelar para estética automotiva genérica. | 0,03 |
| **Casa do Sol** | Arquitetura quente e sofisticada, com luz natural, superfícies minerais e foco em conforto térmico. Aproxima a marca dos projetos residenciais e comerciais premium. | 0,06 |
| **Oficina de Autor** | Uma estética de atelier: fotografia de processo, tipografia humana e materiais táteis para valorizar o cuidado artesanal da instalação. | 0,08 |

---

# Abordagem escolhida: Precisão em Movimento

## Movimento de design

**Editorial técnico de produto**, inspirado em catálogos de engenharia de precisão, superfícies fotocromáticas e fotografia automotiva contemporânea. A página deve transmitir controle, tecnologia e resultado visível — com o veículo ou vidro sempre como protagonista.

## Princípios centrais

1. **Prova visual antes da promessa:** grandes imagens de textura, reflexo e acabamento sustentam cada benefício.
2. **Ritmo assimétrico:** o conteúdo se revela por trilhos laterais, faixas de especificação e blocos desalinhados; evitar composições excessivamente centralizadas.
3. **Clareza comercial:** cada seção fecha com uma ação clara de orçamento, identificando o contexto de uso.
4. **Precisão palpável:** espaçamento rigoroso, detalhes lineares e microtipografia conferem segurança sem poluir a leitura.

## Filosofia de cor

O fundo **Grafite de Cabine** (#0B0E12) cria a profundidade de uma película vista em contra-luz e mantém a atenção nas imagens. O **Azul Polar** (#36A9E1) é a assinatura de tecnologia e proteção, usada apenas para pontos de foco e ações. Um **Areia Técnica** (#D7BE94) surge em informações arquitetônicas e etiquetas, humanizando a frieza do grafite sem cair em dourado ornamental. Textos principais usam branco-alumínio para contraste real.

## Paradigma de layout

Uma **linha de produção editorial**: à esquerda, uma régua vertical fixa com categorias e indicadores; à direita, seções em larguras alternadas. O hero é dividido entre uma frase em grande escala e uma janela de imagem cortada como película aplicada. Em dispositivos móveis, a régua vira uma faixa de progresso horizontal e os módulos permanecem em sequência narrativa.

## Elementos de assinatura

- **Janelas de película:** molduras em paralelogramos discretos recortam imagens como uma lâmina sendo aplicada.
- **Faixa de especificação:** filetes finos com microcopy técnica — “PROTEÇÃO · CONFORTO · ACABAMENTO” — conectam as seções.
- **Marcadores de foco:** pequenos círculos azuis com numeração e linhas de chamada, usados para destacar benefícios e etapas.

## Filosofia de interação

As interações imitam foco e acabamento. Ao passar o cursor, imagens recebem uma variação sutil de contraste e uma linha de especificação se desloca para revelar o próximo conteúdo. Botões respondem com pressão curta, sem efeitos decorativos excessivos. O WhatsApp deve ser sempre acessível, mas nunca competir com a hierarquia da informação.

## Animação

Entradas utilizam opacidade e deslocamento horizontal de 12–20 px, em cascata de 50 ms, com `cubic-bezier(0.23, 1, 0.32, 1)` e duração máxima de 280 ms. As imagens aparecem por uma máscara que abre lateralmente, lembrando a aplicação de uma película. Indicadores e filetes podem correr 8–16 px em hover. As animações respeitam `prefers-reduced-motion` e não alteram layout.

## Sistema tipográfico

- **Destaques:** `Roboto Condensed`, em caixa alta, pesos 600–800 e rastreio curto; traz uma voz de grotesca de engenharia, precisa e controlada.
- **Leitura e interfaces:** `Manrope`, pesos 400–700, com numerais tabulares quando houver medidas ou etapas.
- **Hierarquia:** títulos assumem escalas largas e quebradas em linhas deliberadas; textos de apoio ficam compactos, com largura máxima de leitura controlada.

## Essência da marca

**Posicionamento:** películas de vidro e PPF para veículos, ambientes e máquinas que precisam de conforto, proteção solar e presença em Telêmaco Borba.  
**Personalidade:** precisa, segura, refinada.

## Voz da marca

A voz é objetiva, especialista e visual. Manchetes descrevem uma transformação concreta; CTAs convidam para uma conversa rápida, sem pressão ou frases genéricas.

> “O sol entra. O desconforto não precisa entrar junto.”

> “Seu próximo acabamento começa com um orçamento de dois minutos.”

## Wordmark e símbolo

O símbolo é formado por **quatro planos inclinados** que sugerem uma película sendo assentada e, em negativo, desenham uma seta de avanço. O wordmark “CR FILMS” usa uma construção condensada, com `CR` dominante e “FILMS” como legenda técnica — nunca uma fonte padrão aplicada sem adaptação.

## Cor de assinatura

**Azul Polar — #36A9E1.** É o sinal de foco, proteção e tecnologia da CR Films.

## Arquitetura preliminar do site

1. Hero com proposta de valor, localização e orçamento imediato.
2. Seleção de solução: Películas automotivas, PPF, Residencial & Comercial, Máquinas Agrícolas e Máquinas Florestais.
3. Benefícios tangíveis: proteção solar, privacidade, conforto térmico e acabamento.
4. Processo de atendimento em três passos.
5. Portfólio visual por contexto de aplicação.
6. CTA final de orçamento por WhatsApp e links sociais.

## Style Decisions

- O **Azul Polar #36A9E1** funciona como um sinal de precisão: CTAs, ênfases de título, numeração, ícones e filetes técnicos. Ele não ocupa painéis extensos da interface.
- O ambiente dominante é **Grafite de Cabine**, com imagens reflexivas de automóveis, vidro e aplicação. Momentos claros de arquitetura permanecem como contraste pontual, sempre enquadrados por trilhos, recortes de película ou marcadores numéricos.
- O motivo de **película aplicada** aparece como recorte angular, janela interna, régua de processo ou faixa de especificação em todas as páginas finais.
- A tela inicial desta etapa permanece assumidamente interna, destinada à aprovação das direções. No site público final, não haverá linguagem de proposta, opções ou mockup.
- A tipografia de display usa uma **grotesca condensada de engenharia**, limpa e objetiva; não se aproxima de texturas grunge, de competição ou de cartaz esportivo.
- Cada seção principal recebe pelo menos um dispositivo de **película aplicada**: janela angular, moldura em camada, faixa de especificação, marcação numérica ou linha de chamada.
- Os quatro planos inclinados da logo oficial orientam pequenos recortes, filetes e molduras da interface, tornando a geometria da marca recorrente sem redesenhar o símbolo original.
