export default function formatPrice(price: number): string {
    return `Rp ${new Intl.NumberFormat("id-ID", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price)}`;
}
