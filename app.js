const artworks = [
  { title: "Sol de bolso", artist: "Lia Nascimento", initials: "LN", price: "0.84", edition: "01/12", image: "assets/artwork/sol-de-bolso.svg", color: "#f6c6a9", imageAlt: "Composição abstrata com formas solares em coral e amarelo" },
  { title: "Jardim elétrico", artist: "Caio Mori", initials: "CM", price: "1.20", edition: "03/08", image: "assets/artwork/jardim-eletrico.svg", color: "#d3e89d", imageAlt: "Flores geométricas coloridas sobre fundo verde" },
  { title: "Maré lunar", artist: "Nina Okafor", initials: "NO", price: "0.62", edition: "02/16", image: "assets/artwork/mare-lunar.svg", color: "#c5d8f3", imageAlt: "Paisagem abstrata azul com uma lua em forma de arco" },
  { title: "Quase domingo", artist: "Davi Luz", initials: "DL", price: "2.05", edition: "01/05", image: "assets/artwork/quase-domingo.svg", color: "#f0d487", imageAlt: "Natureza morta digital com formas laranja e amarelas" },
  { title: "Ponto de fuga", artist: "Bia Campos", initials: "BC", price: "0.95", edition: "04/10", image: "assets/artwork/ponto-de-fuga.svg", color: "#dfc5ec", imageAlt: "Formas geométricas em perspectiva sobre fundo lilás" },
  { title: "Nuvem baixa", artist: "Rui Tanaka", initials: "RT", price: "1.48", edition: "01/07", image: "assets/artwork/nuvem-baixa.svg", color: "#c1e2dc", imageAlt: "Escultura digital abstrata em tons de verde e azul" },
];

const favoriteIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.7c0 4.2-8.8 10.1-8.8 10.1S3.2 12.9 3.2 8.7A4.2 4.2 0 0 1 12 6.5a4.2 4.2 0 0 1 8.8 2.2Z" /></svg>';

document.querySelector("#card-list").innerHTML = artworks.map((artwork, index) => `
  <article class="nft-card">
    <div class="nft-card__entrance animate__animated animate__fadeInUp" style="--delay: ${index * 90}ms">
      <div class="nft-card__visual">
        <img class="nft-card__image" src="${artwork.image}" alt="${artwork.imageAlt}" loading="${index < 3 ? "eager" : "lazy"}" />
        <span class="nft-card__index">NO. ${String(index + 1).padStart(2, "0")}</span>
        <button class="favorite" type="button" aria-label="Favoritar ${artwork.title}" aria-pressed="false">${favoriteIcon}</button>
      </div>
      <div class="nft-card__details">
        <div class="nft-card__heading"><h3>${artwork.title}</h3><span class="nft-card__edition">${artwork.edition}</span></div>
        <div class="nft-card__creator">
          <span class="creator"><span class="creator__avatar" style="--avatar: ${artwork.color}">${artwork.initials}</span><span class="creator__name">${artwork.artist}</span></span>
          <span class="price"><span>ETH</span> ${artwork.price}</span>
        </div>
      </div>
    </div>
  </article>
`).join("");

const cardList = document.querySelector("#card-list");

cardList.addEventListener("click", (event) => {
  const button = event.target.closest(".favorite");
  if (button) {
    const isFavorite = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!isFavorite));
    button.setAttribute("aria-label", `${isFavorite ? "Favoritar" : "Remover dos favoritos"} ${button.closest(".nft-card").querySelector("h3").textContent}`);
    return;
  }

  if (window.matchMedia("(hover: hover)").matches) return;

  const card = event.target.closest(".nft-card");
  if (!card) return;

  const shouldExpand = !card.classList.contains("is-expanded");
  cardList.querySelectorAll(".nft-card.is-expanded").forEach((expandedCard) => {
    expandedCard.classList.remove("is-expanded");
  });
  card.classList.toggle("is-expanded", shouldExpand);
});

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Abrir menu" : "Fechar menu");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (!event.target.closest("a")) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  navigation.classList.remove("is-open");
});