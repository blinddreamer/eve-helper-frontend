// Turns a pasted EVE inventory / list into [{ name, quantity }].
//
// Handles the EVE client's tab-separated copy ("Tritanium\t32 000\tMineral\t...") and
// "Name Qty" lines, with any thousands separator the client's language uses:
// 32,000 / 32.000 / 32 000 / 32 000 (nbsp, narrow nbsp). Lines without a quantity count as 1.
// Duplicate names are merged so the same item isn't priced twice.

const SEPARATORS = /[,.\s  ]/g;
// Qty is either digit groups ("2 500", "6.000", "32,000") or plain digits, followed by nothing
// or by more columns. Grouped form is tried first so "Mexallon 2 500" isn't read as 2.
const NAME_THEN_QTY = /^(.+?)\s+(\d{1,3}(?:[,.   ]\d{3})+|\d+)(?:\s+.*)?$/;

function toQuantity(text) {
  const n = parseInt(String(text ?? "").replace(SEPARATORS, ""), 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

function parseLine(line) {
  if (line.includes("\t")) {
    const [name, qty] = line.split("\t");
    return { name: name.trim(), quantity: toQuantity(qty) };
  }
  const match = line.match(NAME_THEN_QTY);
  return match
    ? { name: match[1].trim(), quantity: toQuantity(match[2]) }
    : { name: line, quantity: 1 };
}

export function parseAppraisal(text) {
  const byName = new Map();
  for (const raw of String(text ?? "").split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const item = parseLine(line);
    if (!item.name) continue;
    const key = item.name.toLowerCase();
    const existing = byName.get(key);
    if (existing) existing.quantity += item.quantity;
    else byName.set(key, item);
  }
  return [...byName.values()];
}
