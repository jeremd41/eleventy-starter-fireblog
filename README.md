# Eleventy starter theme for fireblog CMS.

Eleventy is a great and simple static site generator: https://www.11ty.dev/
Fireblog is a new headless CMS dedicated to blogging, with a very simple but powerful writing interface. Try it here for free (one month trial): https://fireblogcms.com/ )

## getting started

First, you need to set your environment variables by creating a `.env` file.

```sh
cp .env.template .env
```

Build your static blog

```sh
npm run build
```

You can now serve static files from `_site` directory.

```
# note: we are using serve package here; https://www.npmjs.com/package/serve
serve _site
```
