---
layout: doc
date: 2023-12-15
title: vitepress-copy-helper - A simple copy button helper for VitePress
tags:
    - vitepress
    - vue
    - javascript
    - copy
    - clipboard
    - component
---

<Title/>

See [vitepress-copy-helper's readme](https://github.com/Mtillmann/vitepress-copy-helper) for installation and configuration instructions.

Below are some examples of how to use the component in your vitepress markdown files.

## Examples

### Positioning Buttons relative to `code`-blocks
| markdown | html |
| --- | --- | 
| <nobr>`` `button at the end`<C/> ``</nobr> | <nobr>`button at the end`<C/></nobr> 
| <nobr>`` <C/>`button at the start` ``</nobr> | <nobr><C/>`button at the start`</nobr> |

The button is rendered on the inside of the code block in order of occurence. 

You can force the button to be rendered on a specific side by setting the `position` prop to `start` or `end`:

| markdown | html |
| --- | --- | 
| <nobr>`` `button at the end, rendered at start`<C position="start"/> ``</nobr> | <nobr>`button at the end, rendered at start`<C position="start"/></nobr> 
| <nobr>`` <C position="end"/>`button at the start, rendered at end` ``</nobr> | <nobr><C position="end"/>`button at the start, rendered at end`</nobr> |

In the examples above, the natural order of the button is reversed by setting the `position` prop.

> Default behaviour can be changed globally by setting the `position` default setting to `start` or `end`.


### Selecting `code`-block targets

| markdown | html |
| --- | --- |
| <nobr>`` `before` <C/> `after` ``</nobr> | <nobr>`before` <C/> `after`</nobr> |

The button attaches itself to the _previous_ code-sibling by default. 
This can be changed on a per-button basis by setting the `target` prop to `next`:

| markdown | html |
| --- | --- |
| <nobr>`` `before` <C target="next"/> `after` ``</nobr> | <nobr>`before` <C target="next"/> `after`</nobr> |
| <nobr>`` `before` <C target="next" position="end"/> `after` ``</nobr> | <nobr>`before` <C target="next" position="end"/> `after`</nobr> |


The button is attached to the _next_ code-sibling. The first button is rendered at the start of the code block, because it uses implicit `position="auto"` and is attached from the left.   

> By default, a button wedged between two code-nodes is attached to the previous code-sibling. This can be changed globally by changing the `preferSibling` default setting to `next`.

### Labels and Messages

| markdown | html |
| --- | --- |
| <nobr>`` `node_nodules`<C label="copy & paste to .gitignore"/> ``</nobr> | <nobr>`node_nodules`<C label="copy & paste to .gitignore"/></nobr> |
| <nobr>`` `ls -la`<C message="paste in shell">sh</C> ``</nobr> | <nobr>`ls -la`<C message="paste in shell">sh</C></nobr> |
| <nobr>`` `ls -la`<C message="内容已复制到剪贴板"/> ``</nobr> | <nobr>`ls -la`<C message="内容已复制到剪贴板"/></nobr> |
| <nobr>`` `npm init -y`<C message="copied '$CONTENT'" /> ``</nobr> | <nobr>`npm init -y`<C message="copied '$CONTENT'" /></nobr> |

The button label can be set by using the `label` prop or by using the default slot, although the `label` prop takes precedence over the default slot. 

Also, using the prop does not pollute the source markdown, so it's recommended to use the `label` prop.

Labels are very useful to provide context on where to paste the copied content.

As demonstrated in the last example, you can reference the copied content by using the `$CONTENT` placeholder in the `message` prop.

> Both `label` and `message` props can be set globally by changing the `label` and `message` default settings. This is useful if you want to translate the button label and message.

### Standalone Buttons

| markdown | html |
| --- | --- |
| <nobr>`` No content-prop - no button <C/> ``</nobr> | <nobr>No content-prop - no button <C/></nobr> |
| <nobr>`` This will render a button <C content="yo :D"/> ``</nobr> | <nobr>This will render a button <C content="yo :D"/></nobr> |
| <nobr>`` <C content="very good">Click here to copy!</C> ``</nobr> | <nobr><C content="very good">Click here to copy!</C></nobr> |

Standalone buttons can be created by including the `content` prop. This is useful if you want to create a button that is not attached to a code block. 

If you omit the `content` prop, the button will not be rendered. `position` and `target` props have no effect on standalone buttons.

<Comment/>