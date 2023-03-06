import { waitElement } from "m3-utils";

export default class Footer {
    constructor() {
        this.init();
    }

    async init() {
        await this.selectors();
        this.events();
        this.createFooter();
        this.addCarrossel();
        this.createPrateleira();
        this.onUpdate();
        this.createMainBtn();
    }
    events() {
        window.addEventListener("hashchange", () => {
            if (window.location.hash == "#/cart" && this.checkoutVazio.style.display == "none") {
                this.footerCheckoutPrateleira.style.display = "flex";
            }
            if (window.location.hash != "#/cart") {
                this.footerCheckoutPrateleira.style.display = "none";
            }
        });
        addEventListener("resize", () => {
            this.addCarrossel();
        });
    }

    async selectors() {
        this.footerCheckoutStamps = await waitElement(".footerCheckout__stamps");
        this.footerCheckoutDevelop = await waitElement(".footerCheckout__developedBy");
        this.footerCheckoutPrateleira = await waitElement(".footerCheckout__prateleira");
        this.checkoutVazio = await waitElement(".empty-cart-content");
        this.titleMain = await waitElement("#cart-title");
    }

    createFooter() {
        this.footerCheckoutStamps.innerHTML = `

             <li class="footerCheckout__listImage">
                 <img src="https://agenciamagma.vteximg.com.br/arquivos/masterCardM3Academy.png" />
             </li>
             <li class="footerCheckout__listImage">
                 <img src="https://agenciamagma.vteximg.com.br/arquivos/visaM3Academy.png" />
             </li>
             <li class="footerCheckout__listImage">
                 <img src="https://agenciamagma.vteximg.com.br/arquivos/amexM3Academy.png" />
             </li>

             <li class="footerCheckout__listImage">
                 <img src="https://agenciamagma.vteximg.com.br/arquivos/eloM3Academy.png" />
             </li>

             <li class="footerCheckout__listImage">
                 <img src="https://agenciamagma.vteximg.com.br/arquivos/hiperCardM3Academy.png" />
             </li>
             <li class="footerCheckout__listImage">
                 <img src="https://agenciamagma.vteximg.com.br/arquivos/payPalM3Academy.png" />
             </li>
             <li class="footerCheckout__listImage">
                 <img src="https://agenciamagma.vteximg.com.br/arquivos/boletoM3Academy.png" />
             </li>

             <li class="footerCheckout__stamps__divider"></li>

            <li class="footerCheckout__listImage">
                <img class="vtex" src="https://agenciamagma.vteximg.com.br/arquivos/vtexPCIM3Academy.png" />
            </li>

        `;
        this.footerCheckoutDevelop.innerHTML = `

                <li class="footerCheckout__developedBy__list">
                <a href="https://www.vtex.com/" target="_blank" title="vtex">
                <span>Powered By</span>
                <img class="vtex-right" src="https://agenciamagma.vteximg.com.br/arquivos/logoVTEXM3Academy.png" />
                </a>
                </li>

                <li class="footerCheckout__developedBy__list">
                <a href="https://www.vtex.com/" target="_blank" title="vtex">
                <span>Developed By</span>
                <img src="https://agenciamagma.vteximg.com.br/arquivos/logoM3M3Academy.png" />
                </a>
                </li>
        `;
    }

    async createPrateleira() {
        const slickPrat = this.footerCheckoutPrateleira;
        slickPrat.innerHTML = `<h2>Você também pode gostar:</h2>
        <ul class="container-carrossel"></ul>`;
        fetch(
            "https://m3academy.myvtex.com/api/catalog_system/pub/products/search/?fq=productClusterIds:319"
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.map((item) => {
                    const li = document.createElement("li");
                    li.setAttribute("id", item.productId);
                    li.innerHTML = `<img src="${item.items[0].images[0].imageUrl}" />
                                    <p class="prateleira-text">${item.productName}</p>
                                    <div class="btn-prateleira">
                                    ${item.items
                                        .map((sku) => {
                                            return `<button>${sku.name}</button>`;
                                        })
                                        .join("")}
                                    </div>
                                    <button class="btn-list-prateleira" href="${
                                        item.link
                                    }">Ver Produto</button>`;
                    slickPrat.children[1].appendChild(li);
                    this.footerCheckoutPrateleira.classList.add("ApiFetch");
                });
            })
            .then(() => {
                this.addCarrossel();
            });
    }

    createMainBtn() {
        const btnMainEmpty = document.querySelector("#cart-choose-products");
        const h2Empty = this.checkoutVazio.children[0];
        btnMainEmpty.textContent = `CONTINUAR COMPRANDO`;
        h2Empty.textContent = `SEU CARRINHO ESTÁ VAZIO`;
    }

    onUpdate() {
        let target = this.checkoutVazio;
        let list = this.footerCheckoutPrateleira;
        let newTitle = this.titleMain;

        if (target.style.display == "none" && window.location.hash == "#/cart") {
            list.style.display = "flex";
            newTitle.style.display = "flex";
            console.log("oioi", newTitle);
            this.createPrateleira();
        } else {
            list.style.display = "none";
            newTitle.style.display = "none";
        }
        let config = { childList: true, attributes: true };
        let observer = new MutationObserver((mutations) => {
            if (this.footerCheckoutPrateleira.classList.contains("ApiFetch")) {
                this.createPrateleira();
            }
            mutations.forEach(function (mutation) {
                if (mutation.target.style.display != "none") {
                    list.style.display = "none";
                    newTitle.style.display = "none";
                } else {
                    list.style.display = "flex";
                    newTitle.style.display = "flex";
                }
            });
        });

        observer.observe(target, config);
    }

    async addCarrossel() {
        const elemento = await waitElement(".container-carrossel");
        $(elemento).slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 720,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    },
                },
            ],
        });
    }
}
