import data from "./PeriodicTableJSON";

const symbols = data.elements.map((element) => element.symbol);

/**
 * Returns all ways to spell the given word with chemical symbols.
 * @param {String} word - The word to be spelt. Case-insensitive.
 *                        Whitespaces are omitted. TODO check needed
 * @returns {(String[])[]} - The ways to spell the given word with chemical symbols.
 *                           Each way is represented by an array of strings of chemical symbols.
 *                           If the word cannot be spelt, an empty array is returned.
 * @example
 * // returns [["C", "He", "Mo", "Ne"]]
 * spell("chemone")
 * @example
 * // returns [["P", "Ar", "I", "Si"], ["P", "Ar", "I", "S", "I"]]
 * spell("parisi")
 * @example
 * // returns []
 * spell("Jingle")
 */
export default function spell(word) {
  const spellings = [];
  word = word.toUpperCase().replace(" ", "");

  /**
   * Recursively derive ways to spell out the given word.
   * @param {String} word
   * @param {String[]} spelling
   * @private
   */
  function _spellRecursive(word, spelling = []) {
    if (word.length === 0 && spelling.length !== 0) {
      spellings.push([...spelling]);
    } else {
      for (const symbol of symbols) {
        // Notice `word` has been converted to upper case above.
        if (word.substring(0, symbol.length) === symbol.toUpperCase()) {
          _spellRecursive(word.substring(symbol.length), [...spelling, symbol]);
        }
      }
    }
  }

  _spellRecursive(word);
  return spellings;
}
