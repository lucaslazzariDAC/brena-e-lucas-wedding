import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "pt" | "en";

type Dict = Record<string, string>;

const pt: Dict = {
  // Envelope
  "envelope.open": "Abrir convite",
  "envelope.tagline": "AXÉ · AMOR · UNIÃO",
  "envelope.seal_aria": "Abrir convite",

  // Hero
  "hero.blessing_line1": "Com a proteção de Ogum",
  "hero.blessing_line2": "e as bênçãos de Iemanjá",
  "hero.invite": "convidamos você para celebrar nosso casamento",
  "hero.date": "29 · MARÇO · 2027",
  "hero.time": "ÀS 16H30",
  "hero.state": "Santa Catarina",
  "hero.tagline": "axé, amor e união",

  // Sections
  "section.countdown.eyebrow": "Faltam",
  "section.countdown.title": "Contagem Regressiva",
  "section.orixa.eyebrow": "Mensagem dos Orixás",
  "section.orixa.title": "Ogum & Iemanjá",
  "section.orixa.values": "União · Fé · Proteção · Amor",
  "section.orixa.ogum_text": "Que Ogum\nabra nossos caminhos\ne nos dê força\npara seguir juntos.",
  "section.orixa.iemanja_text":
    '“Assim como as ondas\ndo mar, que nosso amor\nseja eterno, fluido\ne infinito.”',
  "section.orixa.footer":
    "Um encontro abençoado sob a proteção de nossos orixás, guiando nossa união e nosso caminho.",
  "section.story.eyebrow": "Nossa Jornada",
  "section.story.title": "Nossa História",
  "section.gallery.eyebrow": "Memórias",
  "section.gallery.title": "Galeria",
  "section.location.eyebrow": "Os Locais",
  "section.location.title": "Como Chegar",
  "section.lodging.eyebrow": "Para sua estadia",
  "section.lodging.title": "Hospedagem",
  "section.lodging.subtitle":
    "Sugerimos buscar acomodações no Airbnb para mais flexibilidade e variedade.",
  "section.gift.eyebrow": "Presentes",
  "section.gift.title": "Lista de Presentes",
  "section.rsvp.eyebrow": "RSVP",
  "section.rsvp.title": "Confirmação de Presença",

  // Countdown
  "countdown.days": "Dias",
  "countdown.hours": "Horas",
  "countdown.minutes": "Minutos",
  "countdown.seconds": "Segundos",

  // Story
  "story.2019.title": "O primeiro olhar",
  "story.2019.text": "Um encontro casual que mudaria nossos caminhos.",
  "story.2021.title": "A jornada juntos",
  "story.2021.text": "Construindo memórias, viagens e um lar.",
  "story.2024.title": "O pedido",
  "story.2024.text": "Diante do mar, sob a bênção de Iemanjá.",
  "story.2027.title": "O sim",
  "story.2027.text": "Nossas águas se encontram para sempre.",

  // Locations
  "loc.ceremony.label": "Cerimônia",
  "loc.ceremony.name": "Praia da Guarda do Embaú",
  "loc.ceremony.time": "16h30",
  "loc.reception.label": "Festa",
  "loc.reception.name": "Big Bamboo Engenho Eventos",
  "loc.reception.time": "a seguir",
  "loc.directions": "Traçar rota →",
  "loc.view_map": "Ver no mapa",
  "loc.map_title": "Mapa da localização do casamento",

  // Hotels
  "hotel.airbnb.name": "Airbnb · Guarda do Embaú",
  "hotel.airbnb.description": "Reserve com antecedência — a procura é alta em março.",

  "hotel.airbnb.cta": "Buscar hospedagens",

  // Gift
  "gift.title": "LISTA DE PRESENTES",
  "gift.quote":
    '“Sua presença é o nosso maior presente. Caso deseje nos presentear, disponibilizamos nossa chave PIX.”',
  "gift.beneficiary": "Favorecido",
  "gift.key": "Chave PIX",
  "gift.copy": "Copiar Chave PIX",
  "gift.copied": "Chave PIX copiada!",
  "gift.copy_error": "Não foi possível copiar. Copie manualmente.",

  // RSVP
  "rsvp.closed": "O prazo para confirmação encerrou em {date}.",
  "rsvp.closed_help": "Em caso de dúvidas, entre em contato diretamente com os noivos.",
  "rsvp.confirm_until": "Confirme até {date}",
  "rsvp.name": "Nome completo",
  "rsvp.name_placeholder": "Seu nome completo",
  "rsvp.guests": "Quantidade de convidados (incluindo você)",
  "rsvp.companions": "Nome dos acompanhantes",
  "rsvp.companions_placeholder": "Um nome por linha",
  "rsvp.phone": "Telefone (WhatsApp)",
  "rsvp.message": "Mensagem (opcional)",
  "rsvp.message_placeholder": "Deixe uma mensagem carinhosa para os noivos",
  "rsvp.submit": "Confirmar Presença",
  "rsvp.submitting": "Enviando…",
  "rsvp.success": "Presença confirmada!",
  "rsvp.success_desc": "Obrigado! Recebemos sua confirmação.",
  "rsvp.err_name": "Informe seu nome completo",
  "rsvp.err_guests_min": "Mínimo 1",
  "rsvp.err_guests_max": "Máximo 20",
  "rsvp.err_phone": "Telefone inválido",
  "rsvp.err_save": "Não foi possível salvar. Tente novamente.",
  "rsvp.deadline_label": "30 de setembro de 2026",

  // Modal RSVP
  "modal.rsvp.title": "Por favor, confirme sua presença",
  "modal.rsvp.message_part1": "Sua confirmação é muito importante para nós! Por favor, confirme sua presença até ",
  "modal.rsvp.message_part2": " para que possamos organizar tudo com carinho.",
  "modal.rsvp.ok": "Entendi",

  // Footer
  "footer.quote": '“Com a proteção de Ogum e as bênçãos de Iemanjá, celebramos nossa união.”',

  // Lang toggle
  "lang.label": "Idioma",
};

const en: Dict = {
  "envelope.open": "Open invitation",
  "envelope.tagline": "AXÉ · LOVE · UNITY",
  "envelope.seal_aria": "Open invitation",

  "hero.blessing_line1": "Under the protection of Ogum",
  "hero.blessing_line2": "and the blessings of Iemanjá",
  "hero.invite": "we invite you to celebrate our wedding",
  "hero.date": "MARCH · 29 · 2027",
  "hero.time": "AT 4:30 PM",
  "hero.state": "Santa Catarina, Brazil",
  "hero.tagline": "axé, love and unity",

  "section.countdown.eyebrow": "Counting down",
  "section.countdown.title": "Countdown",
  "section.orixa.eyebrow": "Message from the Orixás",
  "section.orixa.title": "Ogum & Iemanjá",
  "section.orixa.values": "Unity · Faith · Protection · Love",
  "section.orixa.ogum_text":
    "May Ogum\nopen our paths\nand grant us strength\nto walk together.",
  "section.orixa.iemanja_text":
    '“Like the waves\nof the sea, may our love\nbe eternal, flowing\nand infinite.”',
  "section.orixa.footer":
    "A blessed gathering under the protection of our orixás, guiding our union and our path.",
  "section.story.eyebrow": "Our Journey",
  "section.story.title": "Our Story",
  "section.gallery.eyebrow": "Memories",
  "section.gallery.title": "Gallery",
  "section.location.eyebrow": "The Venues",
  "section.location.title": "How to Get There",
  "section.lodging.eyebrow": "For your stay",
  "section.lodging.title": "Lodging",
  "section.lodging.subtitle":
    "We suggest searching on Airbnb for more flexibility and variety.",
  "section.gift.eyebrow": "Gifts",
  "section.gift.title": "Gift Registry",
  "section.rsvp.eyebrow": "RSVP",
  "section.rsvp.title": "Confirm Your Presence",

  "countdown.days": "Days",
  "countdown.hours": "Hours",
  "countdown.minutes": "Minutes",
  "countdown.seconds": "Seconds",

  "story.2019.title": "The first glance",
  "story.2019.text": "A casual encounter that would change our paths.",
  "story.2021.title": "The journey together",
  "story.2021.text": "Building memories, travels and a home.",
  "story.2024.title": "The proposal",
  "story.2024.text": "Before the sea, under the blessing of Iemanjá.",
  "story.2027.title": 'The "I do"',
  "story.2027.text": "Our waters meet, forever.",

  "loc.ceremony.label": "Ceremony",
  "loc.ceremony.name": "Guarda do Embaú Beach",
  "loc.ceremony.time": "4:30 PM",
  "loc.reception.label": "Reception",
  "loc.reception.name": "Big Bamboo Engenho Eventos",
  "loc.reception.time": "after the ceremony",
  "loc.directions": "Get directions →",
  "loc.view_map": "View on map",
  "loc.map_title": "Wedding location map",

  "hotel.airbnb.name": "Airbnb · Guarda do Embaú",
  "hotel.airbnb.description": "Book early — March is high season.",

  "hotel.airbnb.cta": "Browse stays",

  "gift.title": "GIFT REGISTRY",
  "gift.quote":
    '“Your presence is our greatest gift. If you\'d like to gift us, our PIX key is below.”',
  "gift.beneficiary": "Recipient",
  "gift.key": "PIX Key",
  "gift.copy": "Copy PIX Key",
  "gift.copied": "PIX key copied!",
  "gift.copy_error": "Couldn't copy. Please copy manually.",

  "rsvp.closed": "RSVPs closed on {date}.",
  "rsvp.closed_help": "If you have questions, please reach out to the couple directly.",
  "rsvp.confirm_until": "Please RSVP by {date}",
  "rsvp.name": "Full name",
  "rsvp.name_placeholder": "Your full name",
  "rsvp.guests": "Number of guests (including you)",
  "rsvp.companions": "Names of additional guests",
  "rsvp.companions_placeholder": "One name per line",
  "rsvp.phone": "Phone (WhatsApp)",
  "rsvp.message": "Message (optional)",
  "rsvp.message_placeholder": "Leave a kind note for the couple",
  "rsvp.submit": "Confirm Attendance",
  "rsvp.submitting": "Sending…",
  "rsvp.success": "Attendance confirmed!",
  "rsvp.success_desc": "Thank you! We've received your RSVP.",
  "rsvp.err_name": "Please enter your full name",
  "rsvp.err_guests_min": "Minimum 1",
  "rsvp.err_guests_max": "Maximum 20",
  "rsvp.err_phone": "Invalid phone",
  "rsvp.err_save": "Couldn't save. Please try again.",
  "rsvp.deadline_label": "September 30, 2026",

  // Modal RSVP
  "modal.rsvp.title": "Please confirm your attendance",
  "modal.rsvp.message_part1": "Your confirmation is very important to us! Please confirm your attendance by ",
  "modal.rsvp.message_part2": " so we can plan everything with love.",
  "modal.rsvp.ok": "Got it",

  // Footer
  "footer.quote": '“Under the protection of Ogum and the blessings of Iemanjá, we celebrate our union.”',

  "lang.label": "Language",
};

const dicts: Record<Lang, Dict> = { pt, en };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "pt" || saved === "en") {
      setLangState(saved);
    } else {
      const browser = navigator.language?.toLowerCase() ?? "";
      if (browser.startsWith("pt")) setLangState("pt");
      else setLangState("en");
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (key: string, vars?: Record<string, string | number>) => {
    const raw = dicts[lang][key] ?? dicts.pt[key] ?? key;
    if (!vars) return raw;
    return raw.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Safe fallback during SSR / before provider mounts
    return {
      lang: "pt",
      setLang: () => {},
      t: (k, vars) => {
        const raw = pt[k] ?? k;
        return vars ? raw.replace(/\{(\w+)\}/g, (_, x) => String(vars[x] ?? "")) : raw;
      },
    };
  }
  return ctx;
}
