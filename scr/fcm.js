const cheerio = require("cheerio");

const BASE_URL = "https://www.fcmobileforum.com/fcmobile-redeem-codes";

let headersList = {
  "authority": "www.fcmobileforum.com",
  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,ru;q=0.6",
  "cache-control": "max-age=0",
  "priority": "u=0, i",
  "sec-ch-ua": '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "document",
  "sec-fetch-mode": "navigate",
  "sec-fetch-site": "none",
  "sec-fetch-user": "?1",
  "upgrade-insecure-requests": "1",
  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"
}

async function req(url) {
  const rs = await fetch(BASE_URL, {
    method: "GET",
    headers: headersList
  })

  return rs;
}

async function GetCode() {
  const results = [];

  const ss = await req(BASE_URL);
  const html = await ss.text();
  const $ = cheerio.load(html);
  $('[id^="comp-"][role="listitem"]').each((i, el) => {
    let cl1 = [];
    let cl2 = [];

    let c1 = $(el).find(".rM7ckN.YJEKQk.comp-m5f6yb46-container.comp-m5f6yb46.wixui-box");
    let txt = $(c1).find(".wixui-rich-text__text[style]");
    txt.each((_, tx) => {
      cl1.push($(tx).text().trim());
    })
    cl1 = cl1.filter((_, __, a) => a.includes("Live"))
    
    c1 = $(el).find(".rM7ckN.YJEKQk.comp-m5f76dti-container.comp-m5f76dti.wixui-box");
    txt = $(c1).find(".wixui-rich-text__text[style]");
    txt.each((_, tx) => {
      cl2.push($(tx).text().trim());
    })
    
    cl1.length && cl2.length ? results.push({
      date: cl1[0] || "unknown",
      code: cl1[1].replace(/\s?\"\s?/gi, "") || "unknown",
      status: (cl1[3] === "Live") ? "Active" : "Expired" || "unknown",
      reward: cl2[1] || "unknown"
    }) : null;
  });

  return results;
}

module.exports = {
  GetCode
}