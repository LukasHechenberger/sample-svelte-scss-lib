# sample-svelte-scss-lib-app

> This repository demonstrates how one can build a svelte component library with svelte-preprocess-sass.

_Assuming you provide styles via a package published as `my-lib` on npm_

You can provide variables and default variables in a file called _theme.scss_ (note the `!default`):

```scss
// theme.scss inside the 'my-lib' package
$primary: red !default;
$primary-inverted: white !default;
```

To import these, add _node_modules_ to _includePaths_:

```js
// rollup.config.js
import { join } from 'path';
import svelte from 'rollup-plugin-svelte';
import { sass } from 'svelte-preprocess-sass';

export default {
  // ...
  plugins: [
    svelte({
      preprocess: {
        style: sass(
          {
            includePaths: [
              // Allow imports from 'node_modules'
              join(__dirname, 'node_modules'),
            ],
          },
          { name: 'scss' }
        ),
      },
    }),
  ],
};
```

In svelte components, import the theme file:

```svelte
<!-- src/components/Button.svelte -->
<style type="text/scss">
  @import 'my-lib/theme.scss';

  button {
    background-color: $primary;
    color: $primary-inverted;
  }
</style>

<button on:click>Click me</button>
```

As of now, your component renders a button with a red background and white text.

**So, now you want to override these theme styles**

Add another include path:

```js
// rollup.config.js
sass({
  includePaths: [
    // Allow imports from 'src/styles/overrides'
    './src/styles/overrides',

    // Allow imports from 'node_modules'
    join(__dirname, 'node_modules'),
  ],
});
```

And provide an override stylesheet for _my-lib_:

```scss
// src/styles/overrides/my-lib/theme.scss
$primary: blue;

// Import original theme
@import '../../../../node_modules/my-lib/theme.scss';
```

As a result your component will be rendered with a _blue_ background and a _white_ text color.
