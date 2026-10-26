const $ = (id) => document.getElementById(id);
const rp = (n) => "Rp" + n.toLocaleString("id-ID");
const ALL = ["kering", "berminyak", "kombinasi", "normal", "sensitif"];

/* ---------- Data contoh (ganti dengan data asli kapan saja) ---------- */
const PRODUCTS = [
  { id: 1, name: "Gentle Foaming Cleanser 100ml", seller: "Dermalia Official", cat: "Pembersih", price: 42000, old: 55000, rating: 4.8, sold: 5200, types: ["berminyak", "kombinasi", "normal"], concerns: ["jerawat", "berminyak"], icon: "🧼" },
  { id: 2, name: "Hydrating Milk Cleanser 100ml", seller: "Kulitku Lab", cat: "Pembersih", price: 58000, rating: 4.7, sold: 2100, types: ["kering", "sensitif", "normal"], concerns: ["kering", "sensitif"], icon: "🧴" },
  { id: 3, name: "Salicylic Acid 2% Toner", seller: "Dermalia Official", cat: "Toner", price: 65000, old: 78000, rating: 4.7, sold: 3400, types: ["berminyak", "kombinasi"], concerns: ["jerawat", "berminyak"], icon: "💧" },
  { id: 4, name: "Hyaluronic Essence Toner", seller: "Aqua Skin Store", cat: "Toner", price: 72000, rating: 4.6, sold: 1800, types: ALL, concerns: ["kering", "kusam"], icon: "💦" },
  { id: 5, name: "Niacinamide 10% Serum 20ml", seller: "Kulitku Lab", cat: "Serum", price: 79000, old: 99000, rating: 4.8, sold: 8900, types: ["berminyak", "kombinasi", "normal"], concerns: ["kusam", "flek", "berminyak", "jerawat"], icon: "🧪" },
  { id: 6, name: "Vitamin C Brightening Serum", seller: "Glow Nusantara", cat: "Serum", price: 95000, rating: 4.6, sold: 4300, types: ["normal", "kering", "kombinasi"], concerns: ["kusam", "flek"], icon: "🍊" },
  { id: 7, name: "Retinol 0.3% Night Serum", seller: "Glow Nusantara", cat: "Serum", price: 119000, old: 140000, rating: 4.5, sold: 1200, types: ["normal", "kering", "kombinasi"], concerns: ["penuaan", "flek"], icon: "🌙" },
  { id: 8, name: "Centella Calming Serum", seller: "Aqua Skin Store", cat: "Serum", price: 85000, rating: 4.7, sold: 2600, types: ["sensitif", "kering", "kombinasi"], concerns: ["sensitif", "jerawat"], icon: "🌿" },
  { id: 9, name: "Oil-Free Gel Moisturizer", seller: "Dermalia Official", cat: "Pelembap", price: 59000, rating: 4.6, sold: 3900, types: ["berminyak", "kombinasi"], concerns: ["berminyak", "jerawat"], icon: "🫧" },
  { id: 10, name: "Ceramide Barrier Cream", seller: "Kulitku Lab", cat: "Pelembap", price: 88000, old: 105000, rating: 4.9, sold: 6100, types: ["kering", "sensitif", "normal"], concerns: ["kering", "sensitif"], icon: "🛡️" },
  { id: 11, name: "Peptide Anti-Aging Cream", seller: "Glow Nusantara", cat: "Pelembap", price: 135000, rating: 4.5, sold: 900, types: ["normal", "kering"], concerns: ["penuaan"], icon: "✨" },
  { id: 12, name: "Sunscreen Gel SPF50 PA++++", seller: "Aqua Skin Store", cat: "Tabir surya", price: 69000, old: 85000, rating: 4.8, sold: 12400, types: ALL, concerns: ["flek", "penuaan", "kusam"], icon: "☀️" },
  { id: 13, name: "Mineral Sunscreen Sensitive SPF35", seller: "Kulitku Lab", cat: "Tabir surya", price: 82000, rating: 4.7, sold: 2700, types: ["sensitif", "kering"], concerns: ["sensitif", "flek"], icon: "🌤️" },
  { id: 14, name: "Acne Spot Patch isi 24", seller: "Dermalia Official", cat: "Perawatan khusus", price: 28000, rating: 4.7, sold: 9800, types: ["berminyak", "kombinasi", "normal", "sensitif"], concerns: ["jerawat"], icon: "🔴" },
  { id: 15, name: "Pore Clear Clay Mask", seller: "Glow Nusantara", cat: "Masker", price: 48000, old: 60000, rating: 4.4, sold: 2300, types: ["berminyak", "kombinasi"], concerns: ["berminyak", "jerawat"], icon: "🏺" },
  { id: 16, name: "Hydra Sheet Mask isi 5", seller: "Aqua Skin Store", cat: "Masker", price: 55000, rating: 4.6, sold: 3100, types: ["kering", "sensitif", "normal", "kombinasi"], concerns: ["kering", "kusam"], icon: "🎭" },
];

const CONCERNS = [
  ["jerawat", "Jerawat"], ["berminyak", "Berminyak"], ["kering", "Kering & mengelupas"],
  ["kusam", "Kusam"], ["flek", "Flek hitam"], ["penuaan", "Tanda penuaan"], ["sensitif", "Sensitif & kemerahan"],
];

const SKIN = {
  kering: "Kulit cenderung kencang dan kasar. Pilih produk yang melembapkan dan menguatkan skin barrier.",
  berminyak: "Produksi minyak tinggi di seluruh wajah. Pilih tekstur ringan dan oil-free.",
  kombinasi: "Berminyak di dahi dan hidung, normal atau kering di pipi. Pilih produk ringan yang tetap melembapkan.",
  normal: "Kulit seimbang dan jarang bermasalah. Fokus pada perlindungan dan perawatan dasar.",
  sensitif: "Mudah merah atau perih. Pilih produk lembut tanpa bahan keras dan uji dulu di area kecil.",
};

const QUESTIONS = [
  { q: "30 menit setelah cuci muka, kulitmu terasa...", o: [
    ["Kencang atau menarik", { kering: 2 }], ["Nyaman, tidak berminyak", { normal: 2 }],
    ["Berminyak di seluruh wajah", { berminyak: 2 }], ["Berminyak hanya di dahi dan hidung", { kombinasi: 2 }] ] },
  { q: "Bagaimana pori-pori wajahmu?", o: [
    ["Hampir tidak terlihat", { kering: 1, normal: 1 }], ["Besar di seluruh wajah", { berminyak: 2 }],
    ["Besar hanya di hidung dan dahi", { kombinasi: 2 }], ["Terlihat biasa saja", { normal: 2 }] ] },
  { q: "Saat memakai produk baru, kulitmu...", o: [
    ["Jarang bereaksi", { normal: 1 }], ["Kadang kemerahan", { sensitif: 1 }],
    ["Sering merah, gatal, atau perih", { sensitif: 3 }] ] },
  { q: "Menjelang siang, wajahmu biasanya...", o: [
    ["Mengilap merata", { berminyak: 2 }], ["Mengilap di T-zone saja", { kombinasi: 2 }],
    ["Kering atau mengelupas", { kering: 2 }], ["Tidak banyak berubah", { normal: 2 }] ] },
];

/* ---------- State ---------- */
const state = { type: null, concern: null, cat: "Semua", q: "", sort: "rec" };
const cart = {};

/* ---------- Render produk ---------- */
function score(p) {
  return (state.type && p.types.includes(state.type) ? 2 : 0) + (state.concern && p.concerns.includes(state.concern) ? 2 : 0);
}

function render() {
  let list = PRODUCTS.filter((p) =>
    (state.cat === "Semua" || p.cat === state.cat) &&
    (!state.concern || p.concerns.includes(state.concern)) &&
    (!state.type || p.types.includes(state.type)) &&
    p.name.toLowerCase().includes(state.q));
  const sorts = {
    rec: (a, b) => score(b) - score(a) || b.sold - a.sold,
    low: (a, b) => a.price - b.price,
    high: (a, b) => b.price - a.price,
    sold: (a, b) => b.sold - a.sold,
  };
  list.sort(sorts[state.sort]);

  const label = [state.type && "kulit " + state.type, state.concern && CONCERNS.find((c) => c[0] === state.concern)[1].toLowerCase()].filter(Boolean);
  $("listTitle").textContent = label.length ? "Rekomendasi untuk " + label.join(", ") : "Semua produk";
  $("empty").hidden = list.length > 0;

  $("grid").innerHTML = list.map((p) => `
    <article class="card">
      <div class="thumb" aria-hidden="true">${p.icon}
        ${state.type && p.types.includes(state.type) ? '<span class="badge">Cocok untukmu</span>' : ""}
        ${p.old ? `<span class="disc">-${Math.round((1 - p.price / p.old) * 100)}%</span>` : ""}
      </div>
      <div class="info">
        <div class="name">${p.name}</div>
        <div class="seller">${p.seller}</div>
        <div class="price">${rp(p.price)}${p.old ? `<span class="old">${rp(p.old)}</span>` : ""}</div>
        <div class="meta">★ ${p.rating} · ${p.sold.toLocaleString("id-ID")} terjual</div>
        <button class="add" data-id="${p.id}">+ Keranjang</button>
      </div>
    </article>`).join("");
}

function renderChips() {
  $("concerns").innerHTML = CONCERNS.map(([k, t]) =>
    `<button class="chip" data-k="${k}" aria-pressed="${state.concern === k}">${t}</button>`).join("");
}

/* ---------- Keranjang ---------- */
function renderCart() {
  const ids = Object.keys(cart);
  $("cartCount").textContent = ids.reduce((s, id) => s + cart[id], 0);
  $("cartItems").innerHTML = ids.length ? ids.map((id) => {
    const p = PRODUCTS.find((x) => x.id == id);
    return `<div class="row"><div>${p.name}<small>${rp(p.price)}</small></div>
      <div class="qty"><button data-d="-1" data-id="${id}" aria-label="Kurangi">−</button> ${cart[id]}
      <button data-d="1" data-id="${id}" aria-label="Tambah">+</button></div></div>`;
  }).join("") : '<p class="empty">Keranjang masih kosong.</p>';
  $("cartTotal").textContent = rp(ids.reduce((s, id) => s + cart[id] * PRODUCTS.find((x) => x.id == id).price, 0));
}

/* ---------- Tes jenis kulit ---------- */
let step = 0, points = {};

function showQuestion() {
  const { q, o } = QUESTIONS[step];
  $("quizBody").innerHTML = `
    <small>Pertanyaan ${step + 1} dari ${QUESTIONS.length}</small>
    <div class="prog"><i style="width:${(step / QUESTIONS.length) * 100}%"></i></div>
    <h2>${q}</h2>
    ${o.map((x, i) => `<button class="opt" data-i="${i}">${x[0]}</button>`).join("")}`;
}

function finishQuiz() {
  const entries = Object.entries(points).sort((a, b) => b[1] - a[1]);
  state.type = points.sensitif >= 3 ? "sensitif" : entries[0][0];
  $("quizBody").innerHTML = `<div class="res"><small>Hasil tes</small>
    <strong>Kulit ${state.type}</strong><p>${SKIN[state.type]}</p>
    <button class="btn" id="seeResult">Lihat produk yang cocok</button></div>`;
  $("skinName").textContent = "Kulit " + state.type;
  $("skinDesc").textContent = SKIN[state.type];
  $("skinCard").hidden = false;
  $("startQuiz").textContent = "Ulangi tes";
  render();
}

/* ---------- Event ---------- */
$("startQuiz").onclick = () => { step = 0; points = {}; showQuestion(); $("quiz").showModal(); };
$("resetSkin").onclick = () => { state.type = null; $("skinCard").hidden = true; $("startQuiz").textContent = "Cek jenis kulit saya"; render(); };

$("quizBody").onclick = (e) => {
  if (e.target.id === "seeResult") { $("quiz").close(); $("grid").scrollIntoView({ behavior: "smooth" }); return; }
  const b = e.target.closest(".opt"); if (!b) return;
  const add = QUESTIONS[step].o[b.dataset.i][1];
  for (const k in add) points[k] = (points[k] || 0) + add[k];
  step++;
  step < QUESTIONS.length ? showQuestion() : finishQuiz();
};

$("concerns").onclick = (e) => {
  const b = e.target.closest(".chip"); if (!b) return;
  state.concern = state.concern === b.dataset.k ? null : b.dataset.k;
  renderChips(); render();
};

$("grid").onclick = (e) => {
  const b = e.target.closest(".add"); if (!b) return;
  cart[b.dataset.id] = (cart[b.dataset.id] || 0) + 1;
  renderCart(); $("drawer").classList.add("open");
};

$("cartItems").onclick = (e) => {
  const b = e.target.closest("[data-d]"); if (!b) return;
  const id = b.dataset.id; cart[id] += +b.dataset.d;
  if (cart[id] <= 0) delete cart[id];
  renderCart();
};

$("cartBtn").onclick = () => $("drawer").classList.add("open");
$("closeCart").onclick = () => $("drawer").classList.remove("open");
$("search").oninput = (e) => { state.q = e.target.value.trim().toLowerCase(); render(); };
$("sort").onchange = (e) => { state.sort = e.target.value; render(); };
$("cat").onchange = (e) => { state.cat = e.target.value; render(); };

/* ---------- Init ---------- */
$("cat").innerHTML = ["Semua", ...new Set(PRODUCTS.map((p) => p.cat))].map((c) => `<option>${c}</option>`).join("");
renderChips(); renderCart(); render();
