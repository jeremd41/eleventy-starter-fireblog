// required packages
const fetch = require("node-fetch");

// Fireblog token
const url = process.env.FIREBLOG_GRAPHQL_ENDPOINT;
let before = "";

// get data
async function getAllData() {
  // max number of records to fetch per query
  const recordsPerQuery = 100;

  // number of records to skip (start at 0)
  let recordsToSkip = 0;

  // do we make a query ?
  let makeNewQuery = true;

  // Data array
  let data = [];

  // make queries until makeNewQuery is set to false
  while (makeNewQuery) {
    try {
      // initiate fetch
      const fireblog = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `{
            blog {
              name
              description
              image {
                url
                alt
              }
              HTMLMetadata(url: "${url}") {
                title
                meta
              }
            }
            posts(last: 20, before: "${before}"){
              totalCount
              pageInfo {
                hasNextPage
                endCursor
              }
              edges {
                node {
                  HTMLMetadata(url: "${url}") {
                    meta
                    title
                  }
                  teaser
                  slug
                  title
                  content
                  publishedAt
                  updatedAt
                  image {
                    url
                    alt
                  }
                  author {
                    name
                    picture
                  }
                }
              }
            }
          }`
        })
      });

      // store the JSON response when promise resolves
      const response = await fireblog.json();

      // handle DatoCMS errors
      if (response.errors) {
        let errors = response.errors;
        errors.map((error) => {
          console.log(error.message);
        });
        throw new Error("Aborting: Fireblog errors");
      }

      // update array with the data from the JSON response
      config = data.concat(response.data.blog);
      blogposts = data.concat(response.data.posts.edges);

      // prepare for next query
      recordsToSkip += recordsPerQuery;

      // check if we are getting back less than the records we fetch per query
      // if yes, stop querying
      if (response.data.posts.totalCount < recordsPerQuery) {
        makeNewQuery = false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // format blogposts objects
  const postsFormatted = blogposts.map((item) => {
    return {
      title: item.node.title,
      teaser: item.node.teaser,
      content: item.node.content,
      slug: item.node.slug,
      date: item.node.publishedAt,
      image: item.node.image,
      author: item.node.author,
      HTMLMetadata: item.node.HTMLMetadata
    };
  });

  let result = {
    "config": config[0],
    "posts": postsFormatted
  }

  // return results
  return result;
}

// export for 11ty
module.exports = getAllData;
