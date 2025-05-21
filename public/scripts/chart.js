const TOKEN_MINT = "Cuizqj9fDdanLNiRhtRE6aeTiHsBLPhm4eL8WYyZVLBG";
const SOL_MINT = "So11111111111111111111111111111111111111112";
const API = "https://public-api.birdeye.so/public";

const priceElement = document.getElementById("thingPrice");
const priceUsdElement = document.getElementById("thingPriceUSD");
const ctx = document.getElementById("thingChart");

const getPrice = async (mint) => {
    const r = await fetch(`${API}/price?address=${mint}`);
    if (!r.ok) throw new Error("price API error");
    return (await r.json()).data.value;
};
