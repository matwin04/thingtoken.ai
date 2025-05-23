// rss.js
import { sql } from "./db.js";
import { format } from "date-fns";

export async function generateRSSFeed() {
    const posts = await sql`SELECT * FROM blogposts ORDER BY created_at DESC`;

    const items = posts
        .map(
            (post) => `
        <item>
            <title>${post.title}</title>
            <link>https://thingtoken.win/blog/${post.id}</link>
            <description>${post.content?.slice(0, 200).replace(/&/g, "&amp;").replace(/</g, "&lt;")}</description>
            <pubDate>${format(new Date(post.created_at), "EEE, dd MMM yyyy HH:mm:ss 'GMT'")}</pubDate>
            <guid>https://thingtoken.win/blog/${post.id}</guid>
        </item>`
        )
        .join("");

    return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
    <title>Thing News</title>
    <link>https://thingtoken.win</link>
    <description>The only news that matters... to Things.</description>
    <language>en-us</language>
    <lastBuildDate>${format(new Date(), "EEE, dd MMM yyyy HH:mm:ss 'GMT'")}</lastBuildDate>
    ${items}
</channel>
</rss>`;
}
