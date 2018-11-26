# ember-computed-getter-codemod


## Usage

```
npx ember-computed-getter-codemod ember-computed-getter-codemod path/of/files/ or/some**/*glob.js

# or

yarn global add ember-computed-getter-codemod
ember-computed-getter-codemod ember-computed-getter-codemod path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
* [formatted](#formatted)
* [setter](#setter)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.js](transforms\ember-computed-getter-codemod\__testfixtures__\basic.input.js)</small>):
```js
Ember.Object.extend({
    myComputed: computed(function() {
        return "myComputed";
    })
});

```

**Output** (<small>[basic.input.js](transforms\ember-computed-getter-codemod\__testfixtures__\basic.output.js)</small>):
```js
Ember.Object.extend({
    myComputed: computed({
        get() {
            return "myComputed";
        }
    })
});

```
---
<a id="formatted">**formatted**</a>

**Input** (<small>[formatted.input.js](transforms\ember-computed-getter-codemod\__testfixtures__\formatted.input.js)</small>):
```js
Ember.Object.extend({
    myComputed: computed({
        get() {
            return "myComputed";
        }
    })
});

```

**Output** (<small>[formatted.input.js](transforms\ember-computed-getter-codemod\__testfixtures__\formatted.output.js)</small>):
```js
Ember.Object.extend({
    myComputed: computed({
        get() {
            return "myComputed";
        }
    })
});

```
<!--FIXTURE_CONTENT_END-->