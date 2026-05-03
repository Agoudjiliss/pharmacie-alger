const KEY = "gpa_cart_items";

export interface LocalCartItem {
  id: number;
  productId: number;
  productName: string;
  productImageUrl: string | null;
  pole: string;
  price: number;
  quantity: number;
}

export interface LocalCart {
  sessionId: string;
  items: LocalCartItem[];
  total: number;
  itemCount: number;
}

let _nextId = Date.now();

function load(): LocalCartItem[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { return []; }
}

function save(items: LocalCartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

function build(sessionId: string, items: LocalCartItem[]): LocalCart {
  return {
    sessionId,
    items,
    total: items.reduce((s, i) => s + i.price * i.quantity, 0),
    itemCount: items.reduce((s, i) => s + i.quantity, 0),
  };
}

export function cartGet(sessionId: string): LocalCart {
  return build(sessionId, load());
}

export function cartAdd(
  sessionId: string,
  productId: number,
  quantity: number,
  details: { productName: string; productImageUrl: string | null; pole: string; price: number }
): LocalCart {
  const items = load();
  const existing = items.find((i) => i.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ id: _nextId++, productId, quantity, ...details });
  }
  save(items);
  return build(sessionId, items);
}

export function cartRemove(itemId: number): LocalCart {
  const items = load();
  const item = items.find((i) => i.id === itemId);
  const next = items.filter((i) => i.id !== itemId);
  save(next);
  return build(item ? "" : "", next);
}
