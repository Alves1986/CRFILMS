/**
 * ESTILO CR FILMS — Precisão em Movimento
 * Página de exploração: editorial técnico, cortes assimétricos, grafite profundo e Azul Polar.
 * Esta peça prioriza transformação visual, hierarquia de conversão e acabamento premium.
 */
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ClipboardList,
  CircleGauge,
  Crosshair,
  MapPin,
  ShieldCheck,
  Sun,
} from "lucide-react";

type MockupVariant = "impacto" | "solucoes" | "processo";

type MockupPageProps = {
  variant: MockupVariant;
};

const assets = {
  hero: "/manus-storage/cr-films-hero-automotivo_5fec1d4b.jpg",
  ppf: "/manus-storage/cr-films-ppf-macro_0bb47cb6.jpg",
  arquitetura: "/manus-storage/cr-films-arquitetura_034c70f6.jpg",
  maquinas: "/manus-storage/cr-films-maquinas_cc35b2d3.jpg",
  logo: "/manus-storage/cr-films-mark_c7b6ba86.svg",
};

const serviceCards = [
  {
    label: "01",
    title: "Películas\nautomotivas",
    detail: "Proteção solar, privacidade e visual alinhado ao seu carro.",
    icon: Sun,
  },
  {
    label: "02",
    title: "PPF\nproteção de pintura",
    detail: "Uma camada discreta para preservar os detalhes que importam.",
    icon: ShieldCheck,
  },
  {
    label: "03",
    title: "Residencial\ne comercial",
    detail: "Conforto e controle de luz para vidro, ambiente e rotina.",
    icon: CircleGauge,
  },
  {
    label: "04",
    title: "Máquinas agrícolas\ne florestais",
    detail: "Películas para cabines que trabalham sob sol, calor e uso intenso.",
    icon: Crosshair,
  },
];

function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <a className={`brand brand--official ${dark ? "brand--dark" : ""}`} href="/" aria-label="CR Films — Películas de Controle Solar">
      <img src={assets.logo} alt="Símbolo oficial CR Films" />
    </a>
  );
}

function SpecLine({ children }: { children: React.ReactNode }) {
  return <div className="spec-line"><span />{children}<span /></div>;
}

function TopBar({ light = false }: { light?: boolean }) {
  return (
    <header className={`mockup-nav ${light ? "mockup-nav--light" : ""}`}>
      <Brand dark={!light} />
      <div className="mockup-nav__middle">
        <span>PELÍCULAS · PPF · DETALHAMENTO</span>
        <span className="mockup-nav__dot" />
        <span>TELEMACO BORBA · PR</span>
      </div>
      <a href="/" className="mockup-nav__back"><ChevronLeft size={16} /> Opções</a>
    </header>
  );
}

function QuoteFormButton({ inverted = false }: { inverted?: boolean }) {
  return (
    <a href="/#orcamento" className={`quote-button ${inverted ? "quote-button--inverted" : ""}`}>
      <ClipboardList size={18} />
      <span>Preencher formulário</span>
      <ArrowUpRight size={17} />
    </a>
  );
}

function ImpactoMockup() {
  return (
    <div className="mockup-shell mockup-shell--impacto">
      <TopBar />
      <main>
        <section className="impact-hero">
          <div className="impact-hero__rail" aria-hidden="true">
            <span>01</span><i /><span>04</span>
          </div>
          <div className="impact-hero__copy">
            <p className="eyebrow">ESTÚDIO DE PROTEÇÃO E ACABAMENTO</p>
            <h1>O <em>sol</em> entra.<br />O desconforto<br />não precisa.</h1>
            <p className="impact-hero__intro">Películas de vidro e PPF para quem procura proteção e conforto — do seu carro ao seu ambiente ou máquina.</p>
            <div className="impact-hero__actions">
              <QuoteFormButton />
              <a href="#servicos" className="text-link">Conheça as soluções <ArrowDownRight size={17} /></a>
            </div>
          </div>
          <div className="impact-hero__media">
            <img src={assets.hero} alt="SUV premium com películas escuras em estúdio" />
            <div className="impact-hero__overlay" />
            <div className="media-stamp"><Crosshair size={18} /><span>ACABAMENTO<br />SOB MEDIDA</span></div>
            <div className="hero-caption">Películas automotivas<br /><b>PROTEÇÃO · ESTILO · CONFORTO</b></div>
          </div>
        </section>

        <SpecLine>O resultado aparece antes de qualquer explicação</SpecLine>

        <section id="servicos" className="impact-services">
          <div className="section-heading">
            <p className="eyebrow">SOLUÇÕES CR FILMS</p>
            <h2>Proteção que acompanha<br /><em>o seu ritmo.</em></h2>
          </div>
          <div className="impact-services__grid">
            {serviceCards.map((service) => {
              const Icon = service.icon;
              return <article className="service-tile" key={service.label}>
                <div><span className="service-tile__number">{service.label}</span><Icon size={21} strokeWidth={1.4} /></div>
                <h3>{service.title.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</h3>
                <p>{service.detail}</p>
                <ArrowUpRight className="service-tile__arrow" size={21} />
              </article>;
            })}
          </div>
        </section>

        <section className="impact-cta">
          <img src={assets.ppf} alt="Aplicação detalhada de película PPF na pintura" />
          <div>
            <p className="eyebrow">PROTEÇÃO INVISÍVEL. PRESENÇA TOTAL.</p>
            <h2>Seu próximo<br /><em>acabamento</em> começa<br />em uma conversa.</h2>
            <QuoteFormButton />
          </div>
        </section>
      </main>
      <footer className="mockup-footer"><Brand /><span><MapPin size={14} /> Telêmaco Borba · PR</span><span>INSTAGRAM @CRFILMSOFICIAL_</span></footer>
    </div>
  );
}

function SolucoesMockup() {
  return (
    <div className="mockup-shell mockup-shell--solucoes">
      <TopBar />
      <main>
        <section className="solutions-hero">
          <div className="solutions-hero__copy">
            <p className="eyebrow eyebrow--blue">CONTROLE SOLAR, DO SEU JEITO</p>
            <h1>Uma película.<br /><em>Duas formas</em> de<br />sentir a diferença.</h1>
            <p>Do volante à janela da sua casa, a CR Films trata proteção, conforto e estética como uma única decisão bem feita.</p>
            <QuoteFormButton inverted />
          </div>
          <div className="solutions-hero__visual">
            <div className="solutions-hero__auto"><img src={assets.hero} alt="Veículo com película premium" /></div>
            <div className="solutions-hero__home"><img src={assets.arquitetura} alt="Fachada residencial com vidro de controle solar" /></div>
            <div className="solutions-marker solutions-marker--1"><b>01</b><span>VEÍCULO</span></div>
            <div className="solutions-marker solutions-marker--2"><b>02</b><span>AMBIENTE</span></div>
          </div>
        </section>

        <section className="solution-path">
          <div className="solution-path__label"><span>ESCOLHA SEU CONTEXTO</span><i /></div>
          <a href="/#orcamento" className="solution-path__row">
            <span className="path-number">01</span><div><h2>Automotivo</h2><p>Películas de vidro e PPF com atenção total à proteção e à presença do seu carro.</p></div><ArrowUpRight size={28} />
          </a>
          <a href="/#orcamento" className="solution-path__row solution-path__row--dark">
            <span className="path-number">02</span><div><h2>Residencial & comercial</h2><p>Controle de luz e conforto para fachadas, interiores e rotina.</p></div><ArrowUpRight size={28} />
          </a>
        </section>

        <section className="solutions-proof">
          <p className="eyebrow eyebrow--blue">A DIFERENÇA ESTÁ NO PLANEJAMENTO</p>
          <div className="solutions-proof__grid">
            <h2>Visual, conforto<br />e cuidado em <em>camadas.</em></h2>
            <ul>
              <li><Check size={18} /> Diagnóstico do veículo ou ambiente</li>
              <li><Check size={18} /> Indicação de solução sob medida</li>
              <li><Check size={18} /> Aplicação profissional e acabamento preciso</li>
            </ul>
          </div>
        </section>
      </main>
      <footer className="mockup-footer"><Brand /><span><MapPin size={14} /> Telêmaco Borba · PR</span><QuoteFormButton /></footer>
    </div>
  );
}

function ProcessoMockup() {
  return (
    <div className="mockup-shell mockup-shell--processo">
      <TopBar />
      <main>
        <section className="process-hero">
          <div className="process-hero__image"><img src={assets.maquinas} alt="Cabines de máquinas agrícolas e florestais com película de vidro" /></div>
          <div className="process-hero__word"><span>SEU</span><strong>ACABAMENTO</strong><em>COMEÇA AQUI.</em></div>
          <div className="process-hero__copy">
            <p className="eyebrow">PRECISÃO QUE SE VÊ DE PERTO</p>
            <p>Uma oficina de proteção para quem não aceita que o visual, o conforto ou o cuidado fiquem para depois.</p>
            <QuoteFormButton />
          </div>
          <div className="process-hero__counter"><span>03</span><small>ETAPAS PARA<br />O RESULTADO CERTO</small></div>
        </section>

        <section className="process-steps">
          <div className="process-steps__header"><p className="eyebrow">O MÉTODO CR FILMS</p><h2>Menos dúvida.<br /><em>Mais resultado.</em></h2></div>
          <div className="process-steps__list">
            <article><span>01</span><div><h3>Entendemos o cenário.</h3><p>Você mostra o carro ou o ambiente. A gente escuta o que precisa mudar.</p></div><span className="step-tag">DIAGNÓSTICO</span></article>
            <article><span>02</span><div><h3>Indicamos a proteção certa.</h3><p>Uma recomendação clara para equilibrar função, estética e contexto de uso.</p></div><span className="step-tag">CURADORIA</span></article>
            <article><span>03</span><div><h3>Finalizamos com cuidado.</h3><p>Aplicação e acabamento de quem trata cada superfície como peça única.</p></div><span className="step-tag">EXECUÇÃO</span></article>
          </div>
        </section>

        <section className="process-gallery">
          <div className="process-gallery__large"><img src={assets.ppf} alt="Aplicação de PPF em detalhe" /><span>PROTEÇÃO DE PINTURA</span></div>
          <div className="process-gallery__small"><img src={assets.arquitetura} alt="Projeto arquitetônico com película de controle solar" /><span>CONFORTO ARQUITETÔNICO</span></div>
          <div className="process-gallery__cta"><p>Agende seu horário e dê um upgrade no visual e proteção do seu carro.</p><QuoteFormButton /></div>
        </section>
      </main>
      <footer className="mockup-footer"><Brand /><span>INSTAGRAM @CRFILMSOFICIAL_</span><span>42 99148-9798</span></footer>
    </div>
  );
}

export default function MockupPage({ variant }: MockupPageProps) {
  if (variant === "solucoes") return <SolucoesMockup />;
  if (variant === "processo") return <ProcessoMockup />;
  return <ImpactoMockup />;
}
