---
title: Fire and Receive Events
layout: default
nav_order: 13 
has_children: false
---

# Fire events

Because pagehelper bundled with Alpine.js so it's easy to fire or receive events on Alpine.js managed elements in the page. However Pagehelper support firing events for 3 helper attributes.

* [ph-ajax](ph-ajax/)  
* [ph-ajax-upload](ph-ajax-upload/)
* [ph-form](ph-form/)

Add `ph-fire-event="eventname:target"` to these HTML elements will fire the event after the client receive the response from the server side.

## System wide events

Two events will be fired: `selector-changed`, `row-deleted`.

```typescript
const ids = item.params.ids as { name: string, id: number }[]
window.dispatchEvent(new CustomEvent('row-deleted', { detail: { ids } }))
```

```typescript
window.dispatchEvent(new CustomEvent('selector-changed',
	{
		detail: {
			obname: this.obname,
			selected: this.getSelectedIds()
		}
	}));
```