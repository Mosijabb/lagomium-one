/* ============================================================
   Lagomium — site template (single source of truth)
   renderSite(data) -> full index.html string
   ============================================================ */

const defaultContent = {
  meta: {
    siteName: "Lagomium",
    domain: "https://lagomium.com",
    title: "Lagomium — Websites, booking and local SEO for local businesses in Göteborg",
    description:
      "Lagomium builds and runs the website, booking and local search that small clinics and local businesses depend on. Everything you need online. Nothing you don't.",
    ogImage: "https://lagomium.com/og.png",
    lang: "en",
    city: "Göteborg",
    region: "Västra Götaland",
    country: "SE",
    email: "hello@lagomium.com",
    phone: "+46 76 772 85 73",
    formEndpoint: "",
    bookingUrl: ""
  },

  theme: {
    preset: "pine",
    ink: "#101A16",
    pine: "#14453A",
    pineDeep: "#0E3229",
    chalk: "#F1F0EA",
    paper: "#FFFFFF",
    moss: "#E2E7DC",
    amber: "#D99A2B",
    line: "#D8D8CE",
    muted: "#5A6560",
    fontDisplay: "'Familjen Grotesk'",
    fontBody: "'Inter'",
    fontMono: "'JetBrains Mono'",
    googleFonts:
      "family=Familjen+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500",
    radius: 14
  },

  nav: [
    { label: "What we do", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "The Audit", href: "#audit" },
    { label: "Questions", href: "#faq" }
  ],
  navCta: { label: "Free audit", href: "#contact" },

  hero: {
    eyebrow: "Web studio · Göteborg",
    h1a: "Websites that keep",
    h1b: "local businesses booked.",
    sub:
      "We build the site, connect your booking, handle local search, and answer the enquiries you miss. One partner, one monthly fee, no agency theatre.",
    ctaPrimary: { label: "Get a free Lagom Audit", href: "#contact" },
    ctaSecondary: { label: "See what's included", href: "#services" },
    railCaption: "lagom · not too much, not too little"
  },

  proof: {
    line: "Currently looking after Marzi Skincare & Laser Clinic — Kelowna, BC.",
    facts: [
      { value: "90+", label: "PageSpeed on every site we ship" },
      { value: "1 day", label: "Reply time on support requests" },
      { value: "0", label: "Lock-in. Cancel any month" }
    ]
  },

  idea: {
    eyebrow: "The idea",
    h2: "Lagom is a measurement, not a mood.",
    body:
      "It means not too little, not too much — the right amount. Small business websites usually fail in one of two directions: bloated with plugins nobody uses, or missing the basics that actually bring customers through the door. Our whole job is finding the line and building exactly to it.",
    pull: "Everything you need online. Nothing you don't."
  },

  services: {
    eyebrow: "What we do",
    h2: "One partner for the whole thing",
    sub: "Six pieces. Together they are a working digital presence — not a list of invoices.",
    items: [
      {
        icon: "bolt",
        title: "Websites",
        body:
          "Fast, clear sites that load in under a second and read properly on a phone. Built to be found and to convert, not to win awards."
      },
      {
        icon: "calendar",
        title: "Booking & forms",
        body:
          "Your booking system wired into the site so it actually gets used. Enquiry forms that land in your inbox, not a spam folder."
      },
      {
        icon: "search",
        title: "Local SEO",
        body:
          "Google Business Profile, local listings, and the on-page work that puts you in the map results when someone nearby searches."
      },
      {
        icon: "chat",
        title: "AI assistant",
        body:
          "A receptionist that knows your services, prices and hours. Answers the routine questions at 22:00 and captures the ones ready to book."
      },
      {
        icon: "mail",
        title: "Email & hosting",
        body:
          "A proper address at your own domain, on hosting that stays up. Set up once, then it is simply not your problem again."
      },
      {
        icon: "shield",
        title: "Lagom Care",
        body:
          "Updates, backups, security, small edits whenever you need them, and a one-page monthly report you can read in two minutes."
      }
    ]
  },

  audit: {
    eyebrow: "Start here",
    h2: "The Lagom Audit",
    sub:
      "A free, honest read on your current website. We measure it in three directions and tell you where it actually sits.",
    states: [
      {
        key: "little",
        tab: "Too little",
        title: "Too little",
        body:
          "No booking link, thin service pages, missing business profile, nothing to build trust. Customers arrive, find no answer, and leave.",
        pos: 12
      },
      {
        key: "right",
        tab: "Just right",
        title: "Just right",
        body:
          "Loads instantly, says what you do and what it costs, one obvious way to book, and it appears when someone nearby searches. That is the whole job.",
        pos: 50
      },
      {
        key: "much",
        tab: "Too much",
        title: "Too much",
        body:
          "Forty plugins, three chat widgets, a sliding banner nobody reads, and a five-second load. You are paying for weight that costs you customers.",
        pos: 88
      }
    ],
    checks: [
      "Load speed on a real phone",
      "Mobile layout and tap targets",
      "Local search visibility",
      "How easy it is to book",
      "Trust signals and reviews",
      "Content clarity"
    ],
    deliverable:
      "You get a short PDF and a 20-minute call. No pitch deck, no obligation, no follow-up sequence."
  },

  pricing: {
    eyebrow: "Pricing",
    h2: "Plain numbers",
    sub: "No quotes-on-request. Prices exclude VAT.",
    tiers: [
      {
        name: "Foundation",
        price: "från 14 900 kr",
        period: "one-time",
        blurb: "A new site, built and launched.",
        features: [
          "Up to 6 pages",
          "Booking system connected",
          "Your own domain and email",
          "Local SEO groundwork",
          "Live in 2–3 weeks"
        ],
        cta: "Start here",
        featured: false
      },
      {
        name: "Care",
        price: "990 kr",
        period: "per month",
        blurb: "We keep it running so you don't think about it.",
        features: [
          "Hosting, backups, security",
          "Professional email",
          "Updates and monitoring",
          "Small edits on request",
          "One-page monthly report"
        ],
        cta: "Most chosen",
        featured: true
      },
      {
        name: "Growth",
        price: "2 490 kr",
        period: "per month",
        blurb: "Care, plus the work that brings people in.",
        features: [
          "Everything in Care",
          "Ongoing local SEO",
          "Google Business Profile managed",
          "AI assistant included",
          "Quarterly strategy call"
        ],
        cta: "Talk it through",
        featured: false
      }
    ],
    note: "Not sure which? The audit is free and ends with a straight recommendation."
  },

  industries: {
    eyebrow: "Who we build for",
    h2: "Local businesses that live on bookings",
    items: [
      "Laser & beauty clinics",
      "Dental practices",
      "Physiotherapy & chiropractic",
      "Salons & barbers",
      "Restaurants & cafés",
      "Electricians",
      "Plumbers",
      "Trades & contractors"
    ]
  },

  faq: {
    eyebrow: "Questions",
    h2: "The things people ask first",
    items: [
      {
        q: "How long does a new site take?",
        a: "Two to three weeks from the day your content is ready. The delay is almost always photos and text, so we help you get those sorted first."
      },
      {
        q: "Do I own the site?",
        a: "Yes. The domain, the content and the code are yours. If you ever leave, we hand everything over and help you move it."
      },
      {
        q: "Am I locked into a contract?",
        a: "No. Care and Growth are month to month. Cancel whenever you like and the site stays yours."
      },
      {
        q: "Can you work with the site I already have?",
        a: "Usually, yes. If your WordPress site has good bones we improve and maintain it rather than charge you for a rebuild you don't need."
      },
      {
        q: "What exactly is the AI assistant?",
        a: "A chat widget trained on your services, prices and opening hours. It answers routine questions around the clock and passes real enquiries to you with the details already collected."
      },
      {
        q: "Do you work in Swedish and English?",
        a: "Both. Sites can be built bilingual if your customers need it."
      }
    ]
  },

  contact: {
    eyebrow: "Next step",
    h2: "Let's see where your site actually sits.",
    sub: "Send the address and a sentence about the business. You'll hear back within a business day.",
    fields: {
      name: "Your name",
      business: "Business name",
      email: "Email",
      website: "Current website (if you have one)",
      message: "What's not working right now?"
    },
    submit: "Request the free audit",
    fallback: "Prefer email?"
  },

  footer: {
    tagline: "Everything you need online. Nothing you don't.",
    legal: "Lagomium · Göteborg, Sverige",
    links: [
      { label: "What we do", href: "#services" },
      { label: "Pricing", href: "#pricing" },
      { label: "The Audit", href: "#audit" },
      { label: "Contact", href: "#contact" }
    ]
  }
};

/* ---------- helpers ---------- */
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function escAttr(s) {
  return esc(s).replace(/'/g, "&#39;");
}

const ICONS = {
  bolt: '<path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12z"/>',
  calendar:
    '<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="m9.5 15.5 1.8 1.8 3.4-3.6"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  chat:
    '<path d="M4 5h16a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 20 17h-7l-5 4v-4H4a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 4 5Z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/>',
  mail: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  shield: '<path d="M12 2.5 20 6v6c0 5-3.4 8.4-8 9.5C7.4 20.4 4 17 4 12V6Z"/><path d="m9 12 2.2 2.2L15.5 10"/>'
};

function icon(name) {
  const d = ICONS[name] || ICONS.bolt;
  return (
    '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
    d +
    "</svg>"
  );
}

function levelMark(size) {
  const w = size || 34;
  return (
    '<svg class="mark" width="' + w + '" height="' + Math.round(w * 0.44) + '" viewBox="0 0 100 44" ' +
    'aria-hidden="true" focusable="false">' +
    '<rect x="1.5" y="1.5" width="97" height="41" rx="20.5" fill="none" stroke="currentColor" stroke-width="3"/>' +
    '<path d="M38 8v28M62 8v28" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".45"/>' +
    '<circle class="mark-bubble" cx="50" cy="22" r="9.5" fill="var(--amber)"/>' +
    "</svg>"
  );
}

/* ---------- render ---------- */
function renderSite(d) {
  const m = d.meta,
    t = d.theme;
  const year = new Date().getFullYear();

  const favicon =
    "data:image/svg+xml," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="' +
        t.pine +
        '"/><rect x="14" y="36" width="72" height="28" rx="14" fill="none" stroke="' +
        t.chalk +
        '" stroke-width="5"/><circle cx="50" cy="50" r="8" fill="' +
        t.amber +
        '"/></svg>'
    );

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: m.siteName,
    description: m.description,
    url: m.domain,
    email: m.email,
    telephone: m.phone,
    image: m.ogImage,
    address: {
      "@type": "PostalAddress",
      addressLocality: m.city,
      addressRegion: m.region,
      addressCountry: m.country
    },
    areaServed: m.city,
    slogan: d.footer.tagline,
    knowsLanguage: ["en", "sv"],
    makesOffer: d.pricing.tiers.map(function (x) {
      return { "@type": "Offer", name: x.name, description: x.blurb };
    })
  };

  const faqld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: d.faq.items.map(function (f) {
      return {
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a }
      };
    })
  };

  const navHtml = d.nav
    .map(function (n) {
      return '<a href="' + escAttr(n.href) + '">' + esc(n.label) + "</a>";
    })
    .join("");

  const factsHtml = d.proof.facts
    .map(function (f) {
      return (
        '<div class="fact"><span class="fact-v">' +
        esc(f.value) +
        '</span><span class="fact-l">' +
        esc(f.label) +
        "</span></div>"
      );
    })
    .join("");

  const servicesHtml = d.services.items
    .map(function (s) {
      return (
        '<article class="card"><span class="card-ic">' +
        icon(s.icon) +
        "</span><h3>" +
        esc(s.title) +
        "</h3><p>" +
        esc(s.body) +
        "</p></article>"
      );
    })
    .join("");

  const tabsHtml = d.audit.states
    .map(function (s, i) {
      return (
        '<button class="tab' +
        (i === 1 ? " is-on" : "") +
        '" type="button" role="tab" aria-selected="' +
        (i === 1 ? "true" : "false") +
        '" aria-controls="state-' +
        escAttr(s.key) +
        '" data-pos="' +
        escAttr(s.pos) +
        '" data-key="' +
        escAttr(s.key) +
        '">' +
        esc(s.tab) +
        "</button>"
      );
    })
    .join("");

  const panelsHtml = d.audit.states
    .map(function (s, i) {
      return (
        '<div class="panel' +
        (i === 1 ? " is-on" : "") +
        '" id="state-' +
        escAttr(s.key) +
        '" role="tabpanel"' +
        (i === 1 ? "" : " hidden") +
        "><h3>" +
        esc(s.title) +
        "</h3><p>" +
        esc(s.body) +
        "</p></div>"
      );
    })
    .join("");

  const checksHtml = d.audit.checks
    .map(function (c) {
      return "<li>" + esc(c) + "</li>";
    })
    .join("");

  const tiersHtml = d.pricing.tiers
    .map(function (p) {
      return (
        '<article class="tier' +
        (p.featured ? " is-featured" : "") +
        '">' +
        (p.featured ? '<span class="tier-flag">' + esc(p.cta) + "</span>" : "") +
        "<h3>" +
        esc(p.name) +
        "</h3>" +
        '<p class="tier-blurb">' +
        esc(p.blurb) +
        "</p>" +
        '<p class="tier-price">' +
        esc(p.price) +
        '<span class="tier-per">' +
        esc(p.period) +
        "</span></p><ul>" +
        p.features
          .map(function (f) {
            return "<li>" + esc(f) + "</li>";
          })
          .join("") +
        '</ul><a class="btn ' +
        (p.featured ? "btn-amber" : "btn-ghost") +
        '" href="#contact">' +
        (p.featured ? "Get started" : esc(p.cta)) +
        "</a></article>"
      );
    })
    .join("");

  const industriesHtml = d.industries.items
    .map(function (i) {
      return '<li class="tag">' + esc(i) + "</li>";
    })
    .join("");

  const faqHtml = d.faq.items
    .map(function (f) {
      return (
        "<details class=\"qa\"><summary><span>" +
        esc(f.q) +
        '</span><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></summary><p>' +
        esc(f.a) +
        "</p></details>"
      );
    })
    .join("");

  const formOpen = m.formEndpoint
    ? '<form class="form" method="POST" action="' + escAttr(m.formEndpoint) + '">'
    : '<form class="form" method="POST" action="' + escAttr("mailto:" + m.email) + '" enctype="text/plain">';

  const F = d.contact.fields;

  return (
    "<!DOCTYPE html>\n" +
    '<html lang="' + escAttr(m.lang) + '">\n<head>\n' +
    '<meta charset="UTF-8">\n' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    "<title>" + esc(m.title) + "</title>\n" +
    '<meta name="description" content="' + escAttr(m.description) + '">\n' +
    '<link rel="canonical" href="' + escAttr(m.domain) + '/">\n' +
    '<meta name="robots" content="index, follow">\n' +
    '<meta name="theme-color" content="' + escAttr(t.pine) + '">\n' +
    '<meta property="og:type" content="website">\n' +
    '<meta property="og:site_name" content="' + escAttr(m.siteName) + '">\n' +
    '<meta property="og:title" content="' + escAttr(m.title) + '">\n' +
    '<meta property="og:description" content="' + escAttr(m.description) + '">\n' +
    '<meta property="og:url" content="' + escAttr(m.domain) + '/">\n' +
    '<meta property="og:image" content="' + escAttr(m.ogImage) + '">\n' +
    '<meta name="twitter:card" content="summary_large_image">\n' +
    '<meta name="twitter:title" content="' + escAttr(m.title) + '">\n' +
    '<meta name="twitter:description" content="' + escAttr(m.description) + '">\n' +
    '<meta name="twitter:image" content="' + escAttr(m.ogImage) + '">\n' +
    '<link rel="icon" href="' + escAttr(favicon) + '">\n' +
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?' + escAttr(t.googleFonts) + '&display=swap">\n' +
    '<script type="application/ld+json">' + JSON.stringify(jsonld) + "<\/script>\n" +
    '<script type="application/ld+json">' + JSON.stringify(faqld) + "<\/script>\n" +
    "<style>\n" + styles(d) + "\n</style>\n</head>\n<body>\n" +
    '<a class="skip" href="#main">Skip to content</a>\n' +

    /* ---- header ---- */
    '<header class="hdr" id="hdr">\n<div class="wrap hdr-in">\n' +
    '<a class="brand" href="#top" aria-label="' + escAttr(m.siteName) + ' home">' +
    levelMark(30) +
    '<span class="brand-t">' + esc(m.siteName) + "</span></a>\n" +
    '<nav class="nav" aria-label="Main">' + navHtml + "</nav>\n" +
    '<a class="btn btn-amber btn-sm nav-cta" href="' + escAttr(d.navCta.href) + '">' + esc(d.navCta.label) + "</a>\n" +
    '<button class="burger" type="button" aria-expanded="false" aria-controls="mnav" aria-label="Open menu">' +
    '<span></span><span></span></button>\n' +
    "</div>\n" +
    '<div class="mnav" id="mnav" hidden>' + navHtml +
    '<a class="btn btn-amber" href="' + escAttr(d.navCta.href) + '">' + esc(d.navCta.label) + "</a></div>\n" +
    "</header>\n" +

    '<main id="main">\n<span id="top"></span>\n' +

    /* ---- hero ---- */
    '<section class="hero">\n<div class="wrap">\n' +
    '<p class="eyebrow">' + esc(d.hero.eyebrow) + "</p>\n" +
    "<h1>" + esc(d.hero.h1a) + '<br><span class="h1-alt">' + esc(d.hero.h1b) + "</span></h1>\n" +
    '<p class="lede">' + esc(d.hero.sub) + "</p>\n" +
    '<div class="cta-row">' +
    '<a class="btn btn-amber" href="' + escAttr(d.hero.ctaPrimary.href) + '">' + esc(d.hero.ctaPrimary.label) + "</a>" +
    '<a class="btn btn-ghost" href="' + escAttr(d.hero.ctaSecondary.href) + '">' + esc(d.hero.ctaSecondary.label) + "</a>" +
    "</div>\n" +
    '<div class="rail" aria-hidden="true"><div class="rail-line"></div>' +
    '<div class="rail-ticks"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>' +
    '<div class="rail-gate"></div><div class="rail-bubble" id="heroBubble"></div></div>\n' +
    '<p class="rail-cap">' + esc(d.hero.railCaption) + "</p>\n" +
    "</div>\n</section>\n" +

    /* ---- proof ---- */
    '<section class="proof"><div class="wrap proof-in">' +
    '<p class="proof-line">' + esc(d.proof.line) + "</p>" +
    '<div class="facts">' + factsHtml + "</div>" +
    "</div></section>\n" +

    /* ---- idea ---- */
    '<section class="sec idea"><div class="wrap idea-in">' +
    '<div><p class="eyebrow">' + esc(d.idea.eyebrow) + '</p><h2>' + esc(d.idea.h2) + "</h2></div>" +
    '<div><p class="big">' + esc(d.idea.body) + '</p><p class="pull">' + esc(d.idea.pull) + "</p></div>" +
    "</div></section>\n" +

    /* ---- services ---- */
    '<section class="sec" id="services"><div class="wrap">' +
    '<p class="eyebrow">' + esc(d.services.eyebrow) + "</p>" +
    '<h2 class="sec-h">' + esc(d.services.h2) + "</h2>" +
    '<p class="sec-sub">' + esc(d.services.sub) + "</p>" +
    '<div class="cards">' + servicesHtml + "</div>" +
    "</div></section>\n" +

    /* ---- audit ---- */
    '<section class="sec audit" id="audit"><div class="wrap">' +
    '<div class="audit-box">' +
    '<p class="eyebrow eyebrow-on-dark">' + esc(d.audit.eyebrow) + "</p>" +
    "<h2>" + esc(d.audit.h2) + "</h2>" +
    '<p class="audit-sub">' + esc(d.audit.sub) + "</p>" +
    '<div class="tabs" role="tablist" aria-label="Website balance">' + tabsHtml + "</div>" +
    '<div class="rail rail-dark"><div class="rail-line"></div>' +
    '<div class="rail-ticks"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>' +
    '<div class="rail-gate"></div><div class="rail-bubble" id="auditBubble"></div></div>' +
    '<div class="panels">' + panelsHtml + "</div>" +
    '<div class="audit-foot"><ul class="checks">' + checksHtml + "</ul>" +
    '<p class="audit-deliv">' + esc(d.audit.deliverable) + "</p></div>" +
    "</div></div></section>\n" +

    /* ---- pricing ---- */
    '<section class="sec" id="pricing"><div class="wrap">' +
    '<p class="eyebrow">' + esc(d.pricing.eyebrow) + "</p>" +
    '<h2 class="sec-h">' + esc(d.pricing.h2) + "</h2>" +
    '<p class="sec-sub">' + esc(d.pricing.sub) + "</p>" +
    '<div class="tiers">' + tiersHtml + "</div>" +
    '<p class="price-note">' + esc(d.pricing.note) + "</p>" +
    "</div></section>\n" +

    /* ---- industries ---- */
    '<section class="sec"><div class="wrap">' +
    '<p class="eyebrow">' + esc(d.industries.eyebrow) + "</p>" +
    '<h2 class="sec-h">' + esc(d.industries.h2) + "</h2>" +
    '<ul class="tags">' + industriesHtml + "</ul>" +
    "</div></section>\n" +

    /* ---- faq ---- */
    '<section class="sec" id="faq"><div class="wrap faq-in">' +
    '<div><p class="eyebrow">' + esc(d.faq.eyebrow) + '</p><h2 class="sec-h">' + esc(d.faq.h2) + "</h2></div>" +
    '<div class="qas">' + faqHtml + "</div>" +
    "</div></section>\n" +

    /* ---- contact ---- */
    '<section class="sec" id="contact"><div class="wrap">' +
    '<div class="contact-box">' +
    '<div class="contact-copy">' +
    '<p class="eyebrow eyebrow-on-dark">' + esc(d.contact.eyebrow) + "</p>" +
    "<h2>" + esc(d.contact.h2) + "</h2>" +
    "<p>" + esc(d.contact.sub) + "</p>" +
    '<p class="contact-alt">' + esc(d.contact.fallback) + " " +
    '<a href="mailto:' + escAttr(m.email) + '">' + esc(m.email) + "</a>" +
    (m.phone ? ' · <a href="tel:' + escAttr(m.phone.replace(/\s/g, "")) + '">' + esc(m.phone) + "</a>" : "") +
    "</p>" +
    (m.bookingUrl
      ? '<p class="contact-alt"><a href="' + escAttr(m.bookingUrl) + '">Or book a 20-minute call →</a></p>'
      : "") +
    "</div>" +
    formOpen +
    '<div class="f-row"><label for="f-name">' + esc(F.name) + '</label><input id="f-name" name="name" type="text" autocomplete="name" required></div>' +
    '<div class="f-row"><label for="f-biz">' + esc(F.business) + '</label><input id="f-biz" name="business" type="text" autocomplete="organization"></div>' +
    '<div class="f-row"><label for="f-mail">' + esc(F.email) + '</label><input id="f-mail" name="email" type="email" autocomplete="email" required></div>' +
    '<div class="f-row"><label for="f-web">' + esc(F.website) + '</label><input id="f-web" name="website" type="url" placeholder="https://"></div>' +
    '<div class="f-row"><label for="f-msg">' + esc(F.message) + '</label><textarea id="f-msg" name="message" rows="4"></textarea></div>' +
    '<div class="hp" aria-hidden="true"><label for="f-hp">Leave this empty</label><input id="f-hp" name="_gotcha" type="text" tabindex="-1" autocomplete="off"></div>' +
    '<button class="btn btn-amber btn-full" type="submit">' + esc(d.contact.submit) + "</button>" +
    "</form>" +
    "</div></div></section>\n" +

    "</main>\n" +

    /* ---- footer ---- */
    '<footer class="ftr"><div class="wrap ftr-in">' +
    '<div class="ftr-brand"><a class="brand" href="#top">' + levelMark(28) +
    '<span class="brand-t">' + esc(m.siteName) + "</span></a>" +
    '<p class="ftr-tag">' + esc(d.footer.tagline) + "</p></div>" +
    '<nav class="ftr-nav" aria-label="Footer">' +
    d.footer.links
      .map(function (l) {
        return '<a href="' + escAttr(l.href) + '">' + esc(l.label) + "</a>";
      })
      .join("") +
    "</nav>" +
    '<p class="ftr-legal">© ' + year + " " + esc(d.footer.legal) + "</p>" +
    "</div></footer>\n" +
    "<script>\n" + script() + "\n<\/script>\n</body>\n</html>\n"
  );
}

/* ---------- styles ---------- */
function styles(d) {
  const t = d.theme;
  return `:root{
  --ink:${t.ink}; --pine:${t.pine}; --pine-deep:${t.pineDeep}; --chalk:${t.chalk};
  --paper:${t.paper}; --moss:${t.moss}; --amber:${t.amber}; --line:${t.line}; --muted:${t.muted};
  --f-display:${t.fontDisplay},"Helvetica Neue",Arial,sans-serif;
  --f-body:${t.fontBody},-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;
  --f-mono:${t.fontMono},ui-monospace,"SF Mono",Menlo,monospace;
  --r:${t.radius}px; --r-lg:${Math.round(t.radius * 1.9)}px;
  --wrap:1120px; --s:clamp(64px,9vw,116px);
}
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{margin:0;background:var(--chalk);color:var(--ink);font-family:var(--f-body);font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased}
img,svg{max-width:100%}
h1,h2,h3{font-family:var(--f-display);font-weight:600;letter-spacing:-.028em;line-height:1.08;margin:0}
p{margin:0 0 1em}
a{color:inherit}
ul{margin:0;padding:0;list-style:none}
.wrap{width:min(var(--wrap),92%);margin-inline:auto}
.sec{padding:var(--s) 0}
.skip{position:absolute;left:-9999px;top:0;background:var(--ink);color:var(--chalk);padding:12px 18px;z-index:99}
.skip:focus{left:12px;top:12px}
:focus-visible{outline:3px solid var(--amber);outline-offset:3px;border-radius:4px}

.eyebrow{font-family:var(--f-mono);font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin:0 0 14px}
.eyebrow-on-dark{color:color-mix(in srgb,var(--chalk) 72%,transparent)}
.sec-h{font-size:clamp(2rem,4vw,2.9rem);max-width:18ch}
.sec-sub{color:var(--muted);max-width:56ch;margin-top:16px;font-size:1.05rem}

.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:13px 26px;border:1.5px solid transparent;border-radius:999px;font:inherit;font-weight:600;font-size:.98rem;text-decoration:none;cursor:pointer;transition:background .2s ease,color .2s ease,border-color .2s ease,transform .2s ease}
.btn-amber{background:var(--amber);color:var(--ink);border-color:var(--amber)}
.btn-amber:hover{background:var(--ink);color:var(--chalk);border-color:var(--ink)}
.btn-ghost{background:transparent;color:var(--ink);border-color:var(--line)}
.btn-ghost:hover{border-color:var(--ink);background:var(--paper)}
.btn-sm{min-height:42px;padding:9px 20px;font-size:.9rem}
.btn-full{width:100%}

/* header */
.hdr{position:sticky;top:0;z-index:50;background:color-mix(in srgb,var(--chalk) 88%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid transparent;transition:border-color .2s ease}
.hdr.is-stuck{border-bottom-color:var(--line)}
.hdr-in{display:flex;align-items:center;gap:20px;padding:16px 0}
.brand{display:inline-flex;align-items:center;gap:11px;text-decoration:none;color:var(--pine)}
.brand-t{font-family:var(--f-display);font-weight:700;font-size:1.32rem;letter-spacing:-.045em;color:var(--ink)}
.mark-bubble{transition:transform .5s cubic-bezier(.34,1.4,.5,1)}
.brand:hover .mark-bubble{transform:translateX(6px)}
.nav{display:none;gap:28px;margin-left:auto}
.nav a{text-decoration:none;font-size:.95rem;color:var(--muted);padding:6px 0;border-bottom:1.5px solid transparent}
.nav a:hover{color:var(--ink);border-bottom-color:var(--amber)}
.nav-cta{display:none}
.burger{margin-left:auto;width:48px;height:48px;display:grid;place-content:center;gap:6px;background:none;border:1.5px solid var(--line);border-radius:999px;cursor:pointer}
.burger span{display:block;width:18px;height:1.8px;background:var(--ink);transition:transform .2s ease,opacity .2s ease}
.burger[aria-expanded="true"] span:first-child{transform:translateY(4px) rotate(45deg)}
.burger[aria-expanded="true"] span:last-child{transform:translateY(-4px) rotate(-45deg)}
.mnav{display:grid;gap:4px;padding:8px 4% 22px;border-top:1px solid var(--line)}
.mnav a{text-decoration:none;padding:14px 4px;font-size:1.05rem;border-bottom:1px solid var(--line)}
.mnav .btn{margin-top:14px;border-bottom:none}

/* hero */
.hero{padding:clamp(52px,8vw,96px) 0 clamp(30px,5vw,44px)}
.hero h1{font-size:clamp(2.6rem,7.4vw,5.1rem);max-width:15ch}
.h1-alt{color:var(--pine)}
.lede{max-width:54ch;margin-top:26px;font-size:clamp(1.05rem,1.7vw,1.24rem);color:var(--muted)}
.cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:34px}

/* the level rail — signature */
.rail{position:relative;height:56px;margin-top:clamp(48px,7vw,76px);border:1.5px solid var(--line);border-radius:999px;background:var(--paper);overflow:hidden}
.rail-line{position:absolute;inset:50% 26px auto;height:1px;background:var(--line);transform:translateY(-50%)}
.rail-ticks{position:absolute;inset:0;display:flex;justify-content:space-between;padding:0 26px;align-items:center}
.rail-ticks i{width:1.5px;height:12px;background:var(--line);border-radius:2px}
.rail-gate{position:absolute;left:50%;top:8px;bottom:8px;width:52px;transform:translateX(-50%);border-left:1.5px solid var(--line);border-right:1.5px solid var(--line)}
.rail-bubble{position:absolute;top:50%;left:50%;width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:50%;background:var(--amber);box-shadow:0 2px 0 rgba(0,0,0,.06) inset;transition:left .75s cubic-bezier(.32,1.24,.44,1)}
.rail-cap{font-family:var(--f-mono);font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-align:center;margin-top:16px}
@media(prefers-reduced-motion:no-preference){
  .rail-bubble{animation:drift 7s ease-in-out infinite}
  @keyframes drift{0%,100%{transform:translateX(-7px)}50%{transform:translateX(7px)}}
}

/* proof */
.proof{padding:clamp(30px,5vw,46px) 0;border-block:1px solid var(--line)}
.proof-in{display:grid;gap:26px}
.proof-line{margin:0;font-size:.98rem;color:var(--muted)}
.facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:22px}
.fact-v{display:block;font-family:var(--f-display);font-size:1.9rem;font-weight:700;letter-spacing:-.04em;color:var(--pine)}
.fact-l{display:block;font-size:.88rem;color:var(--muted);margin-top:4px}

/* idea */
.idea-in{display:grid;gap:32px}
.idea h2{font-size:clamp(1.9rem,3.6vw,2.7rem);max-width:16ch}
.big{font-size:1.1rem;color:var(--muted);max-width:60ch}
.pull{font-family:var(--f-display);font-size:clamp(1.3rem,2.4vw,1.75rem);font-weight:600;letter-spacing:-.03em;color:var(--ink);border-left:3px solid var(--amber);padding-left:20px;margin:28px 0 0;max-width:26ch}

/* cards */
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:18px;margin-top:44px}
.card{background:var(--paper);border:1px solid var(--line);border-radius:var(--r-lg);padding:30px 28px;transition:border-color .2s ease,transform .2s ease}
.card:hover{border-color:var(--pine);transform:translateY(-3px)}
.card-ic{display:inline-grid;place-content:center;width:44px;height:44px;border-radius:12px;background:var(--moss);color:var(--pine);margin-bottom:20px}
.ic{width:21px;height:21px}
.card h3{font-size:1.18rem;margin-bottom:10px}
.card p{margin:0;color:var(--muted);font-size:.97rem}

/* audit */
.audit-box{background:var(--pine);color:var(--chalk);border-radius:var(--r-lg);padding:clamp(34px,5.5vw,64px)}
.audit-box h2{font-size:clamp(2rem,4vw,2.9rem);color:var(--chalk)}
.audit-sub{color:color-mix(in srgb,var(--chalk) 74%,transparent);max-width:56ch;margin-top:16px}
.tabs{display:flex;flex-wrap:wrap;gap:8px;margin:36px 0 26px}
.tab{min-height:44px;padding:10px 20px;border-radius:999px;border:1.5px solid color-mix(in srgb,var(--chalk) 26%,transparent);background:transparent;color:var(--chalk);font:inherit;font-size:.92rem;font-weight:500;cursor:pointer;transition:background .2s ease,color .2s ease,border-color .2s ease}
.tab:hover{border-color:var(--amber)}
.tab.is-on{background:var(--amber);color:var(--ink);border-color:var(--amber);font-weight:600}
.rail-dark{background:var(--pine-deep);border-color:color-mix(in srgb,var(--chalk) 20%,transparent)}
.rail-dark .rail-line,.rail-dark .rail-ticks i,.rail-dark .rail-gate{background:color-mix(in srgb,var(--chalk) 22%,transparent)}
.rail-dark .rail-gate{background:none;border-color:color-mix(in srgb,var(--chalk) 30%,transparent)}
.rail-dark .rail-bubble{animation:none}
.panels{margin-top:26px;min-height:120px}
.panel h3{font-size:1.3rem;color:var(--amber);margin-bottom:8px}
.panel p{color:color-mix(in srgb,var(--chalk) 80%,transparent);max-width:62ch;margin:0}
.audit-foot{display:grid;gap:26px;margin-top:40px;padding-top:32px;border-top:1px solid color-mix(in srgb,var(--chalk) 18%,transparent)}
.checks{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px}
.checks li{position:relative;padding-left:24px;font-size:.95rem;color:color-mix(in srgb,var(--chalk) 84%,transparent)}
.checks li::before{content:"";position:absolute;left:0;top:.6em;width:9px;height:9px;border-radius:50%;background:var(--amber)}
.audit-deliv{margin:0;font-size:.95rem;color:color-mix(in srgb,var(--chalk) 66%,transparent);max-width:52ch}

/* pricing */
.tiers{display:grid;grid-template-columns:repeat(auto-fit,minmax(276px,1fr));gap:18px;margin-top:44px}
.tier{position:relative;background:var(--paper);border:1px solid var(--line);border-radius:var(--r-lg);padding:34px 30px;display:flex;flex-direction:column}
.tier.is-featured{border:1.5px solid var(--pine);box-shadow:0 18px 40px -28px rgba(16,26,22,.5)}
.tier-flag{position:absolute;top:-13px;left:30px;background:var(--amber);color:var(--ink);font-family:var(--f-mono);font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;padding:6px 13px;border-radius:999px}
.tier h3{font-size:1.32rem}
.tier-blurb{color:var(--muted);font-size:.95rem;margin:8px 0 0}
.tier-price{font-family:var(--f-display);font-size:1.85rem;font-weight:700;letter-spacing:-.04em;margin:22px 0 24px;color:var(--pine)}
.tier-per{display:block;font-family:var(--f-mono);font-size:.72rem;font-weight:400;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-top:5px}
.tier ul{display:grid;gap:11px;margin-bottom:28px}
.tier ul li{position:relative;padding-left:24px;font-size:.95rem;color:var(--muted)}
.tier ul li::before{content:"";position:absolute;left:2px;top:.52em;width:9px;height:2px;background:var(--amber);border-radius:2px}
.tier .btn{margin-top:auto}
.price-note{margin-top:26px;font-size:.92rem;color:var(--muted);text-align:center}

/* tags */
.tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:36px}
.tag{background:var(--paper);border:1px solid var(--line);border-radius:999px;padding:11px 20px;font-size:.94rem}

/* faq */
.faq-in{display:grid;gap:32px}
.qas{display:grid}
.qa{border-top:1px solid var(--line)}
.qa:last-child{border-bottom:1px solid var(--line)}
.qa summary{display:flex;align-items:center;justify-content:space-between;gap:20px;min-height:56px;padding:20px 0;cursor:pointer;list-style:none;font-family:var(--f-display);font-size:1.08rem;font-weight:500;letter-spacing:-.02em}
.qa summary::-webkit-details-marker{display:none}
.qa summary svg{flex:0 0 20px;width:20px;height:20px;color:var(--pine);transition:transform .25s ease}
.qa[open] summary svg{transform:rotate(45deg)}
.qa p{margin:-4px 0 22px;color:var(--muted);max-width:64ch;font-size:.98rem}

/* contact */
.contact-box{background:var(--pine);color:var(--chalk);border-radius:var(--r-lg);padding:clamp(34px,5.5vw,60px);display:grid;gap:36px}
.contact-box h2{font-size:clamp(1.9rem,3.6vw,2.6rem);color:var(--chalk);max-width:16ch}
.contact-copy p{color:color-mix(in srgb,var(--chalk) 76%,transparent);max-width:44ch}
.contact-alt a{color:var(--chalk);text-decoration-color:var(--amber);text-decoration-thickness:2px;text-underline-offset:4px}
.form{display:grid;gap:16px;align-content:start}
.f-row{display:grid;gap:7px}
.f-row label{font-family:var(--f-mono);font-size:.68rem;letter-spacing:.13em;text-transform:uppercase;color:color-mix(in srgb,var(--chalk) 70%,transparent)}
.f-row input,.f-row textarea{width:100%;min-height:48px;padding:13px 15px;border:1.5px solid color-mix(in srgb,var(--chalk) 24%,transparent);border-radius:var(--r);background:color-mix(in srgb,var(--pine-deep) 70%,transparent);color:var(--chalk);font:inherit;font-size:1rem}
.f-row textarea{min-height:104px;resize:vertical}
.f-row input::placeholder{color:color-mix(in srgb,var(--chalk) 42%,transparent)}
.f-row input:focus,.f-row textarea:focus{border-color:var(--amber);outline:none}
.hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}

/* footer */
.ftr{border-top:1px solid var(--line);padding:52px 0 40px}
.ftr-in{display:grid;gap:26px}
.ftr-tag{margin:14px 0 0;color:var(--muted);font-size:.95rem;max-width:34ch}
.ftr-nav{display:flex;flex-wrap:wrap;gap:22px}
.ftr-nav a{text-decoration:none;font-size:.93rem;color:var(--muted)}
.ftr-nav a:hover{color:var(--ink)}
.ftr-legal{margin:0;font-family:var(--f-mono);font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}

/* responsive */
@media(min-width:760px){
  .proof-in{grid-template-columns:1fr 1.5fr;align-items:center;gap:44px}
  .idea-in{grid-template-columns:1fr 1.2fr;gap:60px}
  .faq-in{grid-template-columns:.8fr 1.4fr;gap:56px;align-items:start}
  .audit-foot{grid-template-columns:1.6fr 1fr;gap:44px}
  .contact-box{grid-template-columns:1fr 1fr;gap:52px;align-items:start}
  .ftr-in{grid-template-columns:1.4fr 1fr auto;align-items:end}
}
@media(min-width:980px){
  .nav,.nav-cta{display:flex}
  .burger,.mnav{display:none!important}
}
@media(prefers-reduced-motion:reduce){
  *{animation-duration:.01ms!important;transition-duration:.01ms!important;scroll-behavior:auto!important}
}`;
}

/* ---------- runtime script (no template literals inside) ---------- */
function script() {
  return [
    "(function(){",
    "  var hdr=document.getElementById('hdr');",
    "  var onScroll=function(){ hdr.classList.toggle('is-stuck', window.scrollY>8); };",
    "  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});",
    "",
    "  var burger=document.querySelector('.burger'), mnav=document.getElementById('mnav');",
    "  if(burger&&mnav){",
    "    burger.addEventListener('click',function(){",
    "      var open=burger.getAttribute('aria-expanded')==='true';",
    "      burger.setAttribute('aria-expanded', String(!open));",
    "      burger.setAttribute('aria-label', open?'Open menu':'Close menu');",
    "      mnav.hidden=open;",
    "    });",
    "    mnav.addEventListener('click',function(e){",
    "      if(e.target.tagName==='A'){ burger.setAttribute('aria-expanded','false'); mnav.hidden=true; }",
    "    });",
    "  }",
    "",
    "  var tabs=Array.prototype.slice.call(document.querySelectorAll('.tab'));",
    "  var bubble=document.getElementById('auditBubble');",
    "  var panels=Array.prototype.slice.call(document.querySelectorAll('.panel'));",
    "  function setState(tab){",
    "    tabs.forEach(function(t){ t.classList.toggle('is-on',t===tab); t.setAttribute('aria-selected',String(t===tab)); });",
    "    if(bubble){ bubble.style.left=tab.getAttribute('data-pos')+'%'; }",
    "    var key=tab.getAttribute('data-key');",
    "    panels.forEach(function(p){ var on=p.id==='state-'+key; p.classList.toggle('is-on',on); p.hidden=!on; });",
    "  }",
    "  tabs.forEach(function(t){",
    "    t.addEventListener('click',function(){ setState(t); });",
    "    t.addEventListener('keydown',function(e){",
    "      var i=tabs.indexOf(t), n=null;",
    "      if(e.key==='ArrowRight') n=tabs[(i+1)%tabs.length];",
    "      if(e.key==='ArrowLeft') n=tabs[(i-1+tabs.length)%tabs.length];",
    "      if(n){ e.preventDefault(); n.focus(); setState(n); }",
    "    });",
    "  });",
    "})();"
  ].join("\n");
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { renderSite: renderSite, defaultContent: defaultContent };
}
