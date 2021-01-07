const prettier = require("prettier");

const getDate = new Date().toISOString();
const YOUR_AWESOME_DOMAIN = "https://byrayray.dev";

const formatted = sitemap => prettier.format(sitemap, { parser: "html" });


export function generatePostsSitemap(posts) {
  const postListSitemap = `
    ${posts
      .map(postItem => {
        return `
          <url>
            <loc>${`${YOUR_AWESOME_DOMAIN}/post/${postItem.slug}`}</loc>
            <lastmod>${new Date(postItem.data.date).toISOString()}</lastmod>
          </url>`;
      })
      .join("")}
  `;

  const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${postListSitemap}
    </urlset>
  `;

  return formatted(generatedSitemap);
}
