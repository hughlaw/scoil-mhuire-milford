module.exports = {
  pathPrefix: '/gatsby-react-bootstrap-starter',
  siteMetadata: {
    title: `Scoil Mhuire Milford`,
    description: `Providing a holistic education for the children of Milford and surrounding areas`,
    author: `Hugh Law`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Schoil Mhuire Milford`,
        short_name: `Scoil Mhuire`,
        start_url: `/`,
        background_color: `#38409a`,
        theme_color: `#38409a`,
        icon: 'src/images/crest.svg',
        display: `minimal-ui`,
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        watchMode: true,
        projectId: 'i3ln9d71',
        dataset: 'production',
        token: process.env.SANITY_TOKEN,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
