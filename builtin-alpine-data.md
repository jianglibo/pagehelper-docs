---
title: Builtin Alpine.js data
layout: default
nav_order: 14
has_children: false
---

# Builtin Alpine.js data

The code bellow will not show the functions.

```html
<div x-data="{...ph(),...selectors()}" x-init="console.log(JSON.stringify($data))">
  <p x-text="paramkvs()"></p>
</div>
```

ph data helper:

```typescript
import Alpine from "alpinejs"
import { Cfg } from "./cfg"
import htmlUtil from "./html-util"
import pjaxPageLoader from "./pjax-page-loader"
import urlUtil from "./url-utils"
import consoleLog from "./console-log-with-switcher"

/**
 * ph data helper use $el to get the element, so it's mostly limited in the element itself
 * @param cfg 
 * @returns 
 */
function phdata(cfg?: Cfg) {
	return () => ({
		pjax(p?: string) {
			const ele = (this as any).$el as HTMLInputElement
			const elname = ele.name
			let value = ele.value
			if (htmlUtil.isCheckbox(ele)) {
				value = ele.checked ? 'true' : 'false'
			}
			const params = htmlUtil.getParams(ele)
			params[elname] = value
			const newurl = urlUtil.setUrlParamAndReturnFullUrl(params)
			const phId = htmlUtil.getPhId(ele)
			pjaxPageLoader.loadPage({ url: newurl, phId, cfg, fromPopState: false })
		},
		query() {
			const ele = (this as any).$el
			const params = htmlUtil.getParams(ele)
			const value = ele.value
			params[ele.name] = value
			const newurl = urlUtil.setUrlParamAndReturnFullUrl(params)
			window.location.href = newurl
		},
		paramkvs() {
			const qs = new URLSearchParams(window.location.search)
			return qs
		},
		qsValue(name: string, def?: string, toCompare?: any): string | boolean {
			const qs = new URLSearchParams(window.location.search)
			if (toCompare !== undefined) {
				const v = qs.get(name) || def
				consoleLog.log(`name: ${name}, def: ${def}, toCompare: ${toCompare}, qs.get(name): ${qs.get(name)}, v: ${v}`)
				return v === (toCompare + '')
			} else {
				return qs.get(name) || def || ''
			}
		},
		qsToValue(qsname: string) {
			const ele = (this as any).$el as HTMLInputElement
			Alpine.nextTick(() => {
				const qsv = urlUtil.getUrlParam(qsname) || ''
				if (ele instanceof HTMLInputElement && ele.type === 'checkbox') {
					const vlowcase = qsv.toLowerCase()
					ele.checked = vlowcase === 'true' || vlowcase === 'on' || vlowcase === 'yes' || vlowcase === '1'
				} else {
					(ele as HTMLInputElement).value = qsv
				}
			})
		}
	})
}

export default phdata

```

selectors data helper:

```typescript
export default (globalSelectCfg: SelectCfg) => (selectCfg: SelectCfg, ...names: string[]): any => {
	const selectCfgCombined = { ...globalSelectCfg, ...selectCfg }
	return {
		selectors: {} as { [key: string]: SelectState },
		debug: selectCfgCombined.debug || false,
		init() {
			names.forEach(name => {
				this.selectors[name] = new SelectState(name, selectCfgCombined)
			})
		},
	}
}
```