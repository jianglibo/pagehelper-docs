---
title: How to use linters in codemirror6
layout: default
nav_order: 60
has_children: false
description: Access our remote JavaScript and CSS linting service directly from your web-based editor. Validate your code in real-time, ensuring adherence to best practices and high quality standards. Streamline your development workflow with our efficient and accessible linting solution.
parent: Blogs for pagehelper
---

# Linters in the Codemirror6

Codemirror's official site provides a clear description of how linting works in Codemirror 6.
>There's two ways to do this:
> * Find a linter that you can run in the browser, run it on the content, and translate its output into the expected format.
> * Write one from scratch, possibly using the syntax tree kept by the editor.

 What is the format? It's the `Diagnostic` interface in the `@codemirror/lint` package.

If there's a linter that works in the browser, the whole process is straightforward: passing the editView.state.doc.toString() to the linter to obtain the lint results and then converting the results to `Diagnostic`.

**What if there's no working linter in browser or it's too big to bundle?**, let's consider another option.

## Lint remotely
If there's a service endpoint that accepts a string of code and returns the lint results, the entire process is also very clear.

![cm6-eslint-1](/assets/imgs/cm6-eslint-1.png)

**remote response:**
```json
{
    "data": [
        {
            "ruleId": "no-undef",
            "severity": 2,
            "message": "'hello' is not defined.",
            "line": 1,
            "column": 1,
            "nodeType": "Identifier",
            "messageId": "undef",
            "endLine": 1,
            "endColumn": 6
        }
    ]
}
```

Codemirror has a `linter` function to crete a `Extension`.

```typescript
declare function linter(source: LintSource, config?: LintConfig): Extension;
type LintSource = (view: EditorView) => readonly Diagnostic[] | Promise<readonly Diagnostic[]>;
```

A simple implement of codemirror linter which parse eslint results. It's easy to implement others like `stylelint` etc.

```typescript
import { Diagnostic, linter } from "@codemirror/lint";
import { EditorView } from "@codemirror/view";
import { Linter } from "eslint";

function eslintMessageToDiagnostic(ev: EditorView, input: Linter.LintMessage): Diagnostic {
	return {
		from: ev.state.doc.line(input.line).from + input.column,
		to: ev.state.doc.line(input.endLine || input.line).from + (input.endColumn || input.column),
		message: input.message,
		severity: input.severity === 1 ? "warning" : "error"
	}
}

type ToLint = {
	code: string,
	rules: Record<string, any>,
	params: Record<string, any>
}

type EslintResponse = {
	data: Linter.LintMessage[]
}

const createEslint = (params: string[] = []) => {
	let url = "https://pagehelper.lets-script.com/linters/eslint/js"
	let delay = 5000
	if (params.length > 0) {
		url = params[0]
	}
	if (params.length > 1) {
		delay = parseInt(params[1])
	}
	return linter(async (ev) => {
		const code = ev.state.doc.toString()
		if (!code || code.length < 4) {
			return []
		}
		const res = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				code,
				rules: {},
				params: {}
			} as ToLint),
			headers: {
				"Content-Type": "application/json"
			}
		});
		const res_1 = await (res.json() as Promise<EslintResponse>);
		return res_1.data.map((it) => eslintMessageToDiagnostic(ev, it));
	}, {
		delay: delay
	})
}

export default createEslint
```

## And make the linter configurable for codemirror instance

Add lint accordingly on parameters, like this:

```typescript
if (this.stateInUrl.linter) {
  // linter: eslint:parameters
  const parts = this.stateInUrl.linter.split(':')
  const linterName = parts[0]
  if (linterName === 'eslint') { 
    this.extensions = this.extensions.concat(createEslint(parts.slice(1)));
  } else if (linterName === 'stylelint') {
    this.extensions = this.extensions.concat(createStylelint(parts.slice(1)));
  }
}
```

Go live demo in this page.
<button
  type="button"
  ph-params="id::9"
  ph-pjax-link="../../playground/"
  class="btn btn-sm">
<span x-text="btnLabel">Live DEMO</span>
</button>

```html
<div class="cm-editor-wrap"
  id="js-cm-wrap"
 x-show="activetab === 'js'">
  <input
    type="hidden"
    name="js"
    id="playground-js"
    x-on:demo-change.window="
      $el.value=$store.demos.currentItem.jsvalue;
      $dispatch('writeback', {value: $store.demos.currentItem.jsvalue})"
    x-on:cmwritein.debounce.1000ms="if($event.detail.cmid === 'playground-js'){ 
      $store.demos.currentItem.jsvalue = $event.detail.value;
      $dispatch('js-change', {});
      }"
    data-lang="javascript"
    x-bind:data-height="cmheight"
    x-bind:data-max-height="cmSizes['js-cm-wrap']"
    data-firewritein
    data-resizable
    data-linter="eslint"
    data-mode="normal"
  />
</div>
```

## Benefits of Using a Remote Solution

* No additional bundle size, even if you have tens of linters on one page.
* Stay updated with the latest versions of linters without waiting for updates to an npm package.
