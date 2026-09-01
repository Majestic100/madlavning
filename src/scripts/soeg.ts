/* Klientside-søgning med vægtet scoring: titel > kategori > nøgleord > resumé > ingredienser. */

interface Post {
  titel: string; url: string; kategori: string; resume: string;
  billede: string; alt: string; tid: string; ingredienser: string; noegleord: string;
}

const form = document.querySelector<HTMLFormElement>("[data-soegeform]");
const input = document.querySelector<HTMLInputElement>("#soeg-input");
const status = document.querySelector<HTMLElement>("[data-soegestatus]");
const resultater = document.querySelector<HTMLElement>("[data-soegeresultater]");
const chips = document.querySelector<HTMLElement>("[data-soegechips]");

if (form && input && status && resultater) {
  let data: Post[] = [];

  const normaliser = (s: string) =>
    s.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/æ/g, "ae").replace(/ø/g, "oe").replace(/å/g, "aa");

  const undgaaHtml = (s: string) =>
    s.replace(/[&<>"']/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[t]!);

  const fremhaev = (tekst: string, ord: string[]) => {
    let ud = undgaaHtml(tekst);
    for (const o of ord) {
      if (o.length < 2) continue;
      ud = ud.replace(new RegExp(`(${o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"), "<mark>$1</mark>");
    }
    return ud;
  };

  const tegn = (fund: Post[], ord: string[]) => {
    if (!fund.length) {
      resultater.innerHTML =
        '<p class="tom-besked">Ingen opskrifter matchede. Prøv et bredere søgeord, fx "chokolade" i stedet for "mørk chokolade 70&nbsp;%".</p>';
      return;
    }
    resultater.innerHTML =
      '<ul class="kort-net">' +
      fund
        .map(
          (p) => `
        <li class="kort">
          <div class="kort-billede">
            <img src="${undgaaHtml(p.billede)}" alt="${undgaaHtml(p.alt)}" loading="lazy" width="640" height="480">
            <span class="kort-kat">${undgaaHtml(p.kategori)}</span>
          </div>
          <h3><a href="${undgaaHtml(p.url)}">${fremhaev(p.titel, ord)}</a></h3>
          <p class="kort-resume">${fremhaev(p.resume, ord)}</p>
          <p class="kort-meta"><span>${undgaaHtml(p.tid)}</span></p>
        </li>`,
        )
        .join("") +
      "</ul>";
  };

  const soeg = (raa: string) => {
    const q = raa.trim();
    if (!q) {
      status.textContent = `Skriv et søgeord for at lede i ${data.length} opskrifter og guides.`;
      resultater.innerHTML = "";
      return;
    }
    const ord = q.split(/\s+/).filter(Boolean);
    const nOrd = ord.map(normaliser);

    const fund = data
      .map((p) => {
        const felt = {
          titel: normaliser(p.titel),
          kategori: normaliser(p.kategori),
          noegleord: normaliser(p.noegleord),
          resume: normaliser(p.resume),
          ingredienser: normaliser(p.ingredienser),
        };
        let point = 0;
        for (const o of nOrd) {
          if (felt.titel.includes(o)) point += 10;
          if (felt.titel.startsWith(o)) point += 5;
          if (felt.kategori.includes(o)) point += 6;
          if (felt.noegleord.includes(o)) point += 5;
          if (felt.resume.includes(o)) point += 3;
          if (felt.ingredienser.includes(o)) point += 3;
        }
        return { p, point };
      })
      .filter((r) => r.point > 0)
      .sort((a, b) => b.point - a.point)
      .map((r) => r.p);

    status.textContent = fund.length
      ? `${fund.length} ${fund.length === 1 ? "resultat" : "resultater"} for “${q}”.`
      : `Ingen resultater for “${q}”.`;
    tegn(fund, ord);
  };

  const start = async () => {
    try {
      const svar = await fetch(form.dataset.indeks!);
      data = await svar.json();
    } catch {
      status.textContent = "Kunne ikke indlæse søgeindekset. Prøv at genindlæse siden.";
      return;
    }

    const fraUrl = new URLSearchParams(location.search).get("q");
    if (fraUrl) {
      input.value = fraUrl;
      soeg(fraUrl);
    } else {
      status.textContent = `Skriv et søgeord for at lede i ${data.length} opskrifter og guides.`;
    }

    let timer: ReturnType<typeof setTimeout>;
    input.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => soeg(input.value), 150);
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      soeg(input.value);
      const u = new URL(location.href);
      if (input.value) u.searchParams.set("q", input.value);
      else u.searchParams.delete("q");
      history.replaceState(null, "", u);
    });
    chips?.querySelectorAll<HTMLButtonElement>("[data-soegeord]").forEach((chip) =>
      chip.addEventListener("click", () => {
        input.value = chip.dataset.soegeord!;
        soeg(input.value);
        input.focus();
      }),
    );
  };
  start();
}
