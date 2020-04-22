module.exports = {
    // default language of your site, also used as a html attribute
    lang: "en",
    site: {
      url: "https://myblog.com"
    },
    // links for the top menu
    menuLinks: [{
        title: "Home",
        props: {
          to: "/"
        }
      },
      {
        title: "Back to site",
        props: {
          to: "https://fireblogcms.com",
          target: "_blank",
          id: "back-to-site"
        }
      }
    ],
    readMoreText: "Read more",
    followUsText: "Follow us",
    // Used when users install your blog to their
    // home screen on most mobile browsers
    manifestName: "Fireblog",
    manifestShortName: "Fireblog",

    // links to your social accounts.
    // @see components/socials.js
    // Use an empty string as value to disable a specific social network
    socials: {
      linkedin: "https://www.linkedin.com/",
      instagram: "https://www.instagram.com/",
      twitter: "https://twitter.com/",
      facebook: "https://www.facebook.com/",
      youtube: "https://www.youtube.com/"
    },

    displayAuthor: false
}
