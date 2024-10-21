export default function formatPrice(price: number): string {
    return `Rp ${new Intl.NumberFormat("id-ID", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price)}`;
}

export const prettyMoney = (money: number | string) => {
    if (typeof money === "string") {
        try {
            money = parseFloat(money);
        } catch (error) {
            return 0;
        }
    }

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
