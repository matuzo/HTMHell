---
layout: layouts/base.njk
title: Contribution
---

# {{ title }}

Did you encounter markup that's worth adding to this prestigious collection? Please contribute!

## Rules

* Please only contribute examples you copy from production websites.
* Remove attributes that don’t add any value.
* Remove any pointers that show where you've copied the code. We don’t want to blame anyone.
* Only copy code from modern websites.

## How to contribute

### Git

1. [Fork the repository](https://github.com/matuzo/HTMHell) and install the dependencies.

```html
npm install
```

2. Run the project

```html
npm run start
```

3. Take screenshot While the server is still running, run the following command to take a screenshot of your code.

```html
npm run screenshot
```

4. Push and create a pull request.

### E-Mail or Twitter DM

You can send me an <a href="mailto:manuel@matuzo.at">email</a> or a <a href="{{ hell.twitter_url }}" rel="noopener">DM on Twitter</a> with your submission.

## Adding content



### Adding authors

Add an author in `./hell/_data/authors.js` if they're not listed.

```json
{
  "id": "UNIQUE ID",
  "name": "DISPLAY NAME",
  "link": "WEBSITE/TWITTER/GITHUB"
}
```

### Adding a submission

Add a submission in `./hell/entries` by copying any other markdown file in this folder.

1. Show bad code
2. Explain how to fix it
3. Show good code

### Snippets

I’m afraid that many suggestions will recur. To avoid duplicate content, there’s a file with snippets in `hell/_data/snippets.js` that you can use like this:

```django
{% raw %}{{ snippets.sr_only }}{% endraw %}
```
