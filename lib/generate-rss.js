const generateRssItem = (post) => `
  <item>
    <guid>https://byrayray.dev/post/${post.slug}</guid>
    <title>${post.data.title}</title>
    <link>https://byrayray.dev/post/${post.slug}</link>
    <description>${post.data.description || ''}</description>
    <pubDate>${new Date(post.data.date).toUTCString()}</pubDate>
  </item>
`;

export const generateRss = (posts) => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Dev By RayRay</title>
      <link>https://byrayray.dev</link>
      <description>Building awesome projects with HTML, CSS, JavaScript and a lot more</description>
      <language>en</language>
      <lastBuildDate>${new Date(posts[0].data.date).toUTCString()}</lastBuildDate>
      <atom:link href="https://byrayray.dev/rss.xml" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`;