/**
 * ESTILO CR FILMS — Impacto Visual / Precisão em Movimento
 * Página institucional: grafite técnico, contraste editorial e Azul Polar usado como sinal de conversão.
 * Cada seção parte de uma composição assimétrica e conduz ao formulário de orçamento.
 */
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  ClipboardList,
  Crosshair,
  MapPin,
  MessageCircle,
  MoveUpRight,
  ShieldCheck,
  Sun,
} from "lucide-react";
import { QuoteDialog } from "@/components/QuoteDialog";
import { useState, type CSSProperties } from "react";

const INSTAGRAM = "https://www.instagram.com/crfilmsoficial_/";

const assets = {
  logo: "/manus-storage/cr-films-logo-vetorial_78e0e4b2.svg",
  heroStudioTinted: "/manus-storage/cr-films-hero-studio-com-pelicula_882e5418.jpg",
  heroStudioClear: "/manus-storage/cr-films-hero-studio-sem-pelicula_b8e73f79.png",
  ppf: "/manus-storage/cr-films-ppf-macro_0bb47cb6.jpg",
  arquitetura: "/manus-storage/cr-films-arquitetura_034c70f6.jpg",
  maquinas: "/manus-storage/cr-films-maquinas_cc35b2d3.jpg",
};

const services = [
  { number: "01", title: "Películas automotivas", description: "Conforto térmico, privacidade e um visual que acompanha o seu carro.", icon: Sun },
  { number: "02", title: "PPF proteção de pintura", description: "Uma camada discreta para cuidar da presença e dos detalhes da pintura.", icon: ShieldCheck },
  { number: "03", title: "Residencial e comercial", description: "Controle de luz e conforto para fachadas, vidros e ambientes.", icon: Crosshair },
  { number: "04", title: "Máquinas agrícolas", description: "Películas de vidro para mais conforto e proteção durante a operação.", icon: MoveUpRight },
  { number: "05", title: "Máquinas florestais", description: "Aplicações para cabines que trabalham sob sol, calor e uso intenso.", icon: MoveUpRight },
];

function Brand() {
  return (
    <a className="brand brand--official site-brand" href="#inicio" aria-label="CR Films — Películas de Controle Solar">
      <img src={assets.logo} alt="CR Films — Películas de Controle Solar" />
    </a>
  );
}

function QuoteButton({ label = "Pedir orçamento", subtle = false, onRequestQuote }: { label?: string; subtle?: boolean; onRequestQuote: () => void }) {
  return (
    <button type="button" className={`site-quote ${subtle ? "site-quote--subtle" : ""}`} onClick={onRequestQuote}>
      <MessageCircle size={17} />
      <span>{label}</span>
      <ArrowUpRight size={17} />
    </button>
  );
}

function HeroFilmComparator() {
  const [position, setPosition] = useState(50);
  const revealMask = position === 0
    ? "linear-gradient(90deg, transparent 0, transparent 100%)"
    : position === 100
      ? "linear-gradient(90deg, #000 0, #000 100%)"
      : `linear-gradient(90deg, #000 0, #000 calc(${position}% - 26px), transparent calc(${position}% + 26px), transparent 100%)`;

  return (
    <div className="hero-compare" aria-label="Comparador de película automotiva antes e depois">
      <img className="hero-compare__image hero-compare__image--clear" src={assets.heroStudioClear} alt="Carro azul em estúdio, sem película nos vidros" />
      <div className="hero-compare__tinted" style={{ maskImage: revealMask, WebkitMaskImage: revealMask } as CSSProperties} aria-hidden="true">
        <img className="hero-compare__image" src={assets.heroStudioTinted} alt="" />
      </div>
      <div className="hero-compare__labels" aria-hidden="true"><span>COM PELÍCULA</span><span>SEM PELÍCULA</span></div>
      <div className="hero-compare__divider" style={{ left: `${position}%` }} aria-hidden="true"><i /><b>↔</b></div>
      <label className="hero-compare__control"><span className="sr-only">Movimente para comparar o carro com e sem película</span><input type="range" min="0" max="100" step="1" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-label="Comparar carro com e sem película" aria-describedby="hero-compare-instruction" aria-valuetext={`${position}% com película visível`} /></label>
      <p className="hero-compare__instruction" id="hero-compare-instruction">ARRASTE PARA APLICAR A PELÍCULA</p>
    </div>
  );
}

export default function Home() {
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(
    () => new URLSearchParams(window.location.search).get("orcamento") === "1",
  );

  const setQuoteDialogOpen = (open: boolean) => {
    setIsQuoteDialogOpen(open);
    const url = new URL(window.location.href);
    if (open) url.searchParams.set("orcamento", "1");
    else url.searchParams.delete("orcamento");
    window.history.replaceState({}, "", url);
  };

  const openQuoteDialog = () => setQuoteDialogOpen(true);

  return (
    <div className="site-shell">
      <header className="site-nav">
        <Brand />
        <nav aria-label="Navegação principal">
          <a href="#solucoes">Soluções</a>
          <a href="#metodo">Método</a>
          <a href="#trabalhos">Aplicações</a>
          <a href="#contato">Contato</a>
        </nav>
        <button type="button" onClick={openQuoteDialog} className="site-nav__quote">Orçamento <ArrowUpRight size={15} /></button>
      </header>

      <main>
        <section className="site-hero" id="inicio">
          <div className="site-hero__rail" aria-hidden="true"><span>01</span><i /><span>05</span></div>
          <div className="site-hero__copy">
            <p className="eyebrow">PELÍCULAS DE VIDRO · PPF · VEÍCULOS · MÁQUINAS</p>
            <h1>Proteção solar.<br /><em>Conforto</em><br />sob medida.</h1>
            <p className="site-hero__intro">Películas de vidro e PPF para proteger seu carro, sua máquina ou seu ambiente com a solução certa para cada rotina.</p>
            <div className="site-hero__actions">
              <QuoteButton label="Preencher formulário" onRequestQuote={openQuoteDialog} />
              <a href="#solucoes" className="site-text-link">Conheça as soluções <ArrowDownRight size={17} /></a>
            </div>
          </div>
          <div className="site-hero__media">
            <HeroFilmComparator />
            <div className="site-hero__overlay" />
            <div className="site-hero__caption"><span>Películas automotivas</span><b>PROTEÇÃO · ESTILO · CONFORTO</b></div>
            <div className="site-hero__stamp"><Crosshair size={17} /><span>ACABAMENTO<br />SOB MEDIDA</span></div>
          </div>
        </section>

        <div className="site-spec"><span />O resultado aparece antes de qualquer explicação<span /></div>

        <section className="site-services" id="solucoes">
          <div className="site-section-heading">
            <p className="eyebrow">SOLUÇÕES CR FILMS</p>
            <h2>Proteção que acompanha<br /><em>o seu ritmo.</em></h2>
            <p>Escolha uma frente ou conte o que você quer transformar. A indicação é feita para o seu veículo ou ambiente.</p>
          </div>
          <div className="site-services__grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button type="button" className="site-service" onClick={openQuoteDialog} key={service.number}>
                  <div className="site-service__meta"><span>{service.number}</span><Icon size={20} strokeWidth={1.5} /></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ArrowUpRight className="site-service__arrow" size={20} />
                </button>
              );
            })}
          </div>
        </section>

        <section className="site-proof" id="metodo">
          <div className="site-proof__visual"><img src={assets.ppf} alt="Aplicação de PPF em pintura automotiva azul" /><div /></div>
          <div className="site-proof__body">
            <p className="eyebrow">O MÉTODO CR FILMS</p>
            <h2>Menos dúvida.<br /><em>Mais resultado.</em></h2>
            <p className="site-proof__intro">Cada atendimento começa pelo cenário real: o carro, o vidro, a incidência de luz e o resultado que você procura.</p>
            <ol>
              <li><span>01</span><div><b>Entendemos o cenário.</b><p>Você mostra o veículo ou ambiente e explica o que precisa mudar.</p></div></li>
              <li><span>02</span><div><b>Indicamos a solução certa.</b><p>Uma recomendação clara para equilibrar função, estética e contexto de uso.</p></div></li>
              <li><span>03</span><div><b>Finalizamos com cuidado.</b><p>Aplicação e acabamento com atenção às linhas, superfícies e detalhes.</p></div></li>
            </ol>
          </div>
        </section>

        <section className="site-architecture" id="trabalhos">
          <div className="site-architecture__copy">
            <p className="eyebrow">DO VOLANTE À JANELA</p>
            <h2>Controle de luz.<br /><em>Presença no ambiente.</em></h2>
            <p>Películas para projetos residenciais e comerciais que pedem conforto, privacidade e melhor experiência nos espaços de vidro.</p>
            <button type="button" onClick={openQuoteDialog} className="site-text-link">Falar sobre meu ambiente <ArrowUpRight size={17} /></button>
          </div>
          <div className="site-architecture__media"><img src={assets.arquitetura} alt="Fachada residencial moderna com grandes superfícies de vidro" /><span>RESIDENCIAL · COMERCIAL</span></div>
        </section>

        <section className="site-work-grid" aria-label="Frentes de aplicação da CR Films">
          <article className="site-work-card site-work-card--machines"><img src={assets.maquinas} alt="Máquinas agrícolas e florestais com cabine envidraçada" /><div><p>MÁQUINAS AGRÍCOLAS E FLORESTAIS</p><span>Películas para cabines que pedem conforto e proteção durante a operação.</span></div></article>
          <article className="site-work-card site-work-card--ppf"><img src={assets.ppf} alt="Acabamento de película de proteção em superfície automotiva" /><div><p>PPF · PELÍCULAS · PROTEÇÃO</p><span>Camadas pensadas para preservar a presença do seu carro.</span></div></article>
          <article className="site-work-card site-work-card--contact" id="contato">
            <p className="eyebrow">PRÓXIMO PASSO</p>
            <h2>Seu próximo<br /><em>acabamento</em> começa<br />em uma conversa.</h2>
            <QuoteButton label="Preencher formulário" subtle onRequestQuote={openQuoteDialog} />
          </article>
        </section>

        <section className="site-contact">
          <div><p className="eyebrow">ATENDIMENTO LOCAL</p><h2>Telêmaco Borba,<br /><em>Paraná.</em></h2></div>
          <div className="site-contact__details">
            <button type="button" onClick={openQuoteDialog}><ClipboardList size={18} /><span><b>Solicite um orçamento</b>Preencha o formulário</span><ArrowUpRight size={17} /></button>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer"><MoveUpRight size={18} /><span><b>Instagram</b>@crfilmsoficial_</span><ArrowUpRight size={17} /></a>
            <span className="site-contact__location"><MapPin size={18} /><span><b>Base de atendimento</b>Telêmaco Borba · PR</span></span>
          </div>
        </section>
      </main>

      <QuoteDialog open={isQuoteDialogOpen} onOpenChange={setQuoteDialogOpen} />

      <footer className="site-footer">
        <Brand />
        <p>CR Films · Películas de Controle Solar</p>
        <a href="#inicio">Voltar ao topo <ChevronDown size={15} /></a>
      </footer>
    </div>
  );
}
