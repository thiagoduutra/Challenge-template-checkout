// import waitForEl from "../helpers/waitForEl";
import { waitElement } from "m3-utils";

export default class Header {
    constructor() {
        this.init();
    }

    async init() {
        await this.selectors();
        this.progressBarDesktop();
        await this.stepBarProcess();
    }

    async selectors() {
        this.progressBar = await waitElement("#progressBar");

        // this.item = await waitElement("#my-element", {
        //     //#my-element pode ser a class ou o id do elemento html qeu vocÊ quer pegar
        //     timeout: 5000, // vai esperar 5 segundos antes de rejeitar a promise
        //     interval: 1000, // vai verificar a cada 1 segundo se o elemento existe
        // });
    }

    progressBarDesktop() {
        if (this.progressBar && window.innerWidth > 1024) {
            this.progressBar.innerHTML = `
        <ul>
            <li>
                <div class="containerList">
                    <div class="containerList__div">
                    <p class="containerList__text">Meu carrinho</p>
                    <p id="containerList__circle1" class="containerList__circle1"></p>
                    <p class="containerList__line"></p>
                    </div>
                </div>
            </li>

            <li class="liMeio">
            <div class="containerList">
                  <div class="containerList__div">
                    <p class="containerList__text">Dados Pessoais</p>
                    <p id="containerList__circle2" class="containerList__circle2"></p>
                 </div>
            </div>
            </li>

            <li>
            <div class="containerList" >
                 <div class="containerList__div">
                    <p class="containerList__text">Pagamento</p>
                    <p id="containerList__circle3" class="containerList__circle3"></p>
                    <p class="containerList__line2"></p>
                  <div/>
            </div>
            </li>

        </ul>
        `;
        }
        if (this.progressBar && window.innerWidth < 1024) {
            this.progressBar.innerHTML = "";
        }
    }

    circle1(li) {
        if (li.children[0].children[0].children["containerList__circle1"]) {
            li.children[0].children[0].children["containerList__circle1"].classList.add("active");
        }
        if (li.children[0].children[0].children["containerList__circle2"]) {
            if (
                li.children[0].children[0].children["containerList__circle2"].classList.contains(
                    "active"
                )
            ) {
                li.children[0].children[0].children["containerList__circle2"].classList.remove(
                    "active"
                );
            }
        }

        if (li.children[0].children[0].children["containerList__circle3"]) {
            if (
                li.children[0].children[0].children["containerList__circle3"].classList.contains(
                    "active"
                )
            ) {
                li.children[0].children[0].children["containerList__circle3"].classList.remove(
                    "active"
                );
            }
        }
    }

    circle2(li) {
        if (li.children[0].children[0].children["containerList__circle1"]) {
            if (
                li.children[0].children[0].children["containerList__circle1"].classList.contains(
                    "active"
                )
            ) {
                li.children[0].children[0].children["containerList__circle1"].classList.remove(
                    "active"
                );
            }
        }
        if (li.children[0].children[0].children["containerList__circle2"]) {
            li.children[0].children[0].children["containerList__circle2"].classList.add("active");
        }

        if (li.children[0].children[0].children["containerList__circle3"]) {
            if (
                li.children[0].children[0].children["containerList__circle3"].classList.contains(
                    "active"
                )
            ) {
                li.children[0].children[0].children["containerList__circle3"].classList.remove(
                    "active"
                );
            }
        }
    }

    circle3(li) {
        if (li.children[0].children[0].children["containerList__circle1"]) {
            if (
                li.children[0].children[0].children["containerList__circle1"].classList.contains(
                    "active"
                )
            ) {
                li.children[0].children[0].children["containerList__circle1"].classList.remove(
                    "active"
                );
            }
        }

        if (li.children[0].children[0].children["containerList__circle2"]) {
            if (
                li.children[0].children[0].children["containerList__circle2"].classList.contains(
                    "active"
                )
            ) {
                li.children[0].children[0].children["containerList__circle2"].classList.remove(
                    "active"
                );
            }
        }
        if (li.children[0].children[0].children["containerList__circle3"]) {
            li.children[0].children[0].children["containerList__circle3"].classList.add("active");
        }
    }

    async stepBarProcess() {
        if (this.progressBar && window.innerWidth > 1024) {
            const listProgressBar = document.querySelectorAll("#progressBar ul li");
            listProgressBar.forEach((li) => {
                if (window.location.href === "https://m3academy.myvtex.com/checkout/#/cart") {
                    this.circle1(li);
                } else if (
                    window.location.href === "https://m3academy.myvtex.com/checkout/#/email" ||
                    window.location.href === "https://m3academy.myvtex.com/checkout/#/profile" ||
                    window.location.href === "https://m3academy.myvtex.com/checkout/#/shipping"
                ) {
                    this.circle2(li);
                } else if (
                    window.location.href === "https://m3academy.myvtex.com/checkout/#/payment"
                ) {
                    this.circle3(li);
                }

                window.addEventListener("hashchange", () => {
                    if (window.location.hash == "#/cart") {
                        this.circle1(li);
                    } else if (
                        window.location.hash == "#/email" ||
                        window.location.hash == "#/profile" ||
                        window.location.hash == "#/shipping"
                    ) {
                        this.circle2(li);
                    } else if (window.location.hash == "#/payment") {
                        this.circle3(li);
                    }
                });
            });
        }
    }
}
