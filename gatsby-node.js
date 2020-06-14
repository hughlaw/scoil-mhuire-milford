exports.createPages = async function({ graphql, actions }) {
  const { data } = await graphql(`
    query {
      allSanityPage {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
      allSanityClassPage {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
      allSanityNewsArticle(limit: 50, sort: { order: DESC, fields: date }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
      allSanityEvent(limit: 50, sort: { order: DESC, fields: startDate }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `);

  // Create single pages
  data.allSanityPage.edges.forEach(edge => {
    const slug = edge.node.slug.current;
    const id = edge.node.id;
    actions.createPage({
      path: `/${slug}`,
      component: require.resolve('./src/templates/page.js'),
      context: { id },
    });
  });

  // Create single pages
  data.allSanityClassPage.edges.forEach(edge => {
    const slug = edge.node.slug.current;
    const id = edge.node.id;
    actions.createPage({
      path: `/classes/${slug}`,
      component: require.resolve('./src/templates/classPage.js'),
      context: { id },
    });
  });

  // create paginated pages for news articles
  const postsPerPage = 6;
  const numPagesArticles = Math.ceil(
    data.allSanityNewsArticle.edges.length / postsPerPage
  );
  const numPagesEvents = Math.ceil(
    data.allSanityEvent.edges.length / postsPerPage
  );

  // Create paginated news pages
  Array.from({ length: numPagesArticles }).forEach((_, idx) => {
    actions.createPage({
      path: idx === 0 ? `/news` : `/news/${idx + 1}`,
      component: require.resolve('./src/templates/allNewsPosts.js'),
      context: {
        limit: postsPerPage,
        skip: idx * postsPerPage,
        numPagesArticles,
        currentPage: idx + 1,
      },
    });
  });

  // Create single article page
  data.allSanityNewsArticle.edges.forEach(edge => {
    const slug = edge.node.slug.current;
    const id = edge.node.id;
    actions.createPage({
      path: `/news/${slug}`,
      component: require.resolve('./src/templates/singleNewsPost.js'),
      context: { id },
    });
  });

  // Create paginated event pages
  Array.from({ length: numPagesEvents }).forEach((_, idx) => {
    actions.createPage({
      path: idx === 0 ? `/events` : `/events/${idx + 1}`,
      component: require.resolve('./src/templates/allEventPosts.js'),
      context: {
        limit: postsPerPage,
        skip: idx * postsPerPage,
        numPagesEvents,
        currentPage: idx + 1,
      },
    });
  });

  // create an events page for when there are no events
  if (numPagesEvents === 0) {
    actions.createPage({
      path: `/events`,
      component: require.resolve('./src/templates/allEventPosts.js'),
      context: {
        limit: postsPerPage,
        skip: 0,
        numPagesEvents,
        currentPage: 1,
      },
    });
  }

  // Create single event page
  data.allSanityEvent.edges.forEach(edge => {
    const slug = edge.node.slug.current;
    const id = edge.node.id;
    actions.createPage({
      path: `/events/${slug}`,
      component: require.resolve('./src/templates/singleEventPost.js'),
      context: { id },
    });
  });
};
