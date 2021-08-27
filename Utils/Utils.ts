import colors from "./colors";

export function getTextColor(pokemonColor: string) {
  const shouldBeWhiteText = pokemonColor !== 'white' && pokemonColor !== 'yellow';
  return shouldBeWhiteText ? colors.white : colors.regularText;
}