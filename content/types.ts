/** Card numerado de passo/explicação */
export interface StepCard {
  n: string;
  t: string;
  d: string;
}

/** Conteúdo completo da seção Linha Segredo */
export interface LinhaSegredoContent {
  eyebrow: string;
  titleStart: string;
  titleHighlight: string;
  description: string;
  cards: StepCard[];
  ctaLabel: string;
  doneBadge: string;
  imageSrc: string;
  imageAlt: string;
  advisoryBadge: string;
  productLine: string;
  productSubtitle: string;
}

/**
 * Mapa que associa cada slug de seção ao seu tipo de conteúdo.
 * Adicione novos pares aqui à medida que mais seções forem migradas.
 */
export type SectionContentMap = {
  "linha-segredo": LinhaSegredoContent;
};
