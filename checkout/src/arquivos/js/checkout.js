import CheckoutUI from "./components/CheckoutUI";
import { Container } from "m3-utils";
import "slick-carousel";
import Header from "./components/Header";
import Footer from "./components/Footer";

const m3Checkout = new Container({
    appName: "m3-checkout",
    components: [CheckoutUI, Header, Footer],
});

m3Checkout.start();
