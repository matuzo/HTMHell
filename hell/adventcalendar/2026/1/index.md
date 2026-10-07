---
title: "HTML esoterica - en-GB vs en_GB"
author: "Terence Eden"
author_bio: "A normal human living in London, UK."
date: 2026-12-01
author_links:
  - label: "Site"
    url: "https://shkspr.mobi/blog/"
    link_label: "Website"
intro: "<p>Why does HTML sometimes use hyphens sometimes use underscores when specifying languages?</p>"
image: "advent26_1"
active: true
---
Here's a fun little historic mystery for HTML nerds.

Most websites report the language they're written in using the `lang` attribute.

```html
<html lang="en-GB">
```

But on the `<meta>` element, it's common to see:

```html
<meta content="en_GB" property="og:locale">
```

Why does that use an underscore rather than a hyphen?

## What is a language anyway?

Here's how the `lang` attribute works:

> The lang attribute specifies the primary language for the element's contents and for any of the element's attributes that contain text. Its value must be a valid BCP 47 language tag
>
> [3.2.6.2 The lang and xml:lang attributes](https://html.spec.whatwg.org/#the-lang-and-xml:lang-attributes)

OK, so what is a valid BCP 47 language tag?

> Language tags permit only the characters A-Z, a-z, 0-9, and HYPHEN-MINUS (%x2D).
>
> [6.  Character Set Considerations](https://www.rfc-editor.org/info/rfc4647/)

For example, `en` is English. `en-GB` is British English and `en-CA` is Canadian English.  The two parts are separated by a hyphen.

## Where else is language specificity useful?

That's not the *only* way language tags can appear in HTML. If you want your web page to show a little preview when you share it - perhaps on social media or a messaging app - you can use Open Graph Protocol. 

> `og:locale` - The locale these tags are marked up in. Of the format language_TERRITORY. Default is `en_US`.
>
>[Optional Metadata - Open Graph Protocol](https://ogp.me/#optional)

(Hurrah for American hegemony!)

Here's the example it gives:

```html
<meta 
   property="og:description" 
   content="Sean Connery found fame and fortune as the suave, sophisticated British agent, James Bond." />
<meta 
   property="og:locale"
   content="en_GB" />
```

That says the locale of the *tags* not the page is in British English. So you could have a page in the Japanese language but OGP tags written in Cherokee.

Now I have two questions.

1. Why doesn't this use the `lang` attribute?
1. Why does this use an underscore rather than a hyphen?

For example, this is valid HTML:

```html
<meta
   property="og:site_name" content="Les Misérables"
   lang="fr">
<meta 
   property="og:description" 
   content="A book by Victor Hugo."
   lang="en-GB">
```

That says the site's name is in French but the description is in English. That will parse perfectly.

## What's going on with OGP?

As I've ranted before, <a href="https://shkspr.mobi/blog/2022/11/is-open-graph-protocol-dead/">development of Open Graph Protocol is dead</a>. Facebook, who run it, recently reopened their GitHub repo - but only to add a proposed tag. Their discussion forum is full of spam.

There's no history of the development, no rationale for why things were chosen, just Facebook's edict.

The nearest I can find to an explanation is [this Pull Request](https://github.com/facebook/open-graph-protocol/pull/16) which references an obsolete page of Facebook's locales.

Despite Facebook removing the page, it lives on! Take a look at the [documentation for embedded posts](https://developers.facebook.com/documentation/plugins/embedded-posts). It says:

> When you load the SDK, change the value of js.src to use your locale. Replace en_US with your locale, e.g., fr_FR for French (France):
>
> `'https://connect.facebook.net/fr_FR/sdk.js';`

Which, I *think* leads us to the answer. An answer which was hidden in the question the whole time. A language is *not* the same as a locale.

A language *only* tells you about the language. A locale, by contrast, tells you about the user's preferences.

> A locale comprises the language, territory, and code set combination used to identify a set of language conventions. These conventions include information on collation, case conversion, and character classification, the language of message catalogs, date-and-time representation, the monetary symbol, and numeric representation.
>
> [Understanding locale - IBM](https://www.ibm.com/docs/en/aix/7.3.0?topic=locales-understanding-locale)

Do you know if 10/08/12 is the tenth of August or the 8th of October?

Is 5.99 describing the cost in a mark, a yen, a buck, or a pound?

If you know the locale, you do. So a locale can be more useful than just a plain language.

## OK, but *why* does it use an underscore?

As far as I can tell, [POSIX standardised it in ISO/IEC 15897](https://www.open-std.org/jtc1/sc22/wg20/docs/n610.pdf). It built on [a number of older standards](https://docs.oracle.com/cd/E19620-01/805-3916/intro-70963/index.html). And, for whatever reason, they used the underscore.

My final question before I let you get on with your lives - is a *locale* useful?

OGP defines [several data types](https://ogp.me/#data_types). The date is always in ISO8601 format, so no need for a locale there. Bools, strings, and enums don't benefit from a locale in any way that I can see. 

What about the [new payment property](https://ogp.me/#type_payment)? A locale might be useful there to show currency. Except the specification has:

> `payment:currency` - string - The currency code ISO 4217 of the payment.

The only thing I can see a locale being useful for is numbers. The thousand separator and decimal mark are [different depending on the locale](https://brilliantmaps.com/decimals/). So it might be useful to display "5,99" or "10.000,32" depending on the page's intended audience.

If Facebook were still interested in maintaining OGP, I think that asking them to deprecate `og:locale` and replace it with `lang` on specific meta elements would be sensible.

So there you have it. A language is <strong>not</strong> the same as a locale, and an underscore is <u>not</u> the same as a hyphen, and a Facebook recommendation is <strong><em><u>not</u></em></strong> the same as a living standard.

Right, that's enough yak shaving. I'm sure I was meant to be doing something important… Oh! Yes! Welcome to HTMHell 🎅
