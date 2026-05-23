import type { SectionContentMap } from "./types";
import { linhaSegredoContent } from "./sections/linha-segredo";

// ---------------------------------------------------------------------------
// Fonte de dados local (estática).
//
// FUTURO: quando o WordPress headless estiver no ar, substitua o corpo de
// `getSectionContent` por um fetch à API REST do WordPress
// (ex.: GET /wp-json/wp/v2/sections?slug=linha-segredo).
// Esse será o ÚNICO ponto do código a mudar — os componentes permanecem
// inalterados pois continuam chamando getSectionContent() normalmente.
// ---------------------------------------------------------------------------

const LOCAL_CONTENT: SectionContentMap = {
  "linha-segredo": linhaSegredoContent,
};

/**
 * Retorna o conteúdo tipado de uma seção pelo slug.
 *
 * Uso: `const c = getSectionContent("linha-segredo")`
 */
export function getSectionContent<K extends keyof SectionContentMap>(
  section: K
): SectionContentMap[K] {
  return LOCAL_CONTENT[section];
}
