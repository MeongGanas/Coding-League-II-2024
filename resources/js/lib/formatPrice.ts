export default function formatPrice(price: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    })
        .format(price)
        .replace(/\./g, ",");
}

export const prettyMoney = (money: number) => {
    if (money < 1000) {
        return `Rp${money}+`;
    } else if (money < 1000000) {
        return `Rp${(money / 1000).toFixed(2)}RB+`;
    } else if (money < 1000000000) {
        return `Rp${(money / 1000000).toFixed(2)}JT+`;
    } else if (money < 1000000000000) {
        return `Rp${(money / 1000000000).toFixed(2)}M+`;
    } else {
        return `Rp${(money / 1000000000000).toFixed(2)}T+`;
    }
}
