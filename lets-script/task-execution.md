---
title: Task Execution
layout: default
nav_order: 17 
has_children: false
parent: Lets-script
---

## Queued tasks

Task triggered by request the http `/cmd` endpoint. The scheduled cron tasks also trigger by visit the endpoint.

When interactive running browser will initiate a websock connection to show the outputs in realtime.

`wss://lets-script.com/ws/cmd-live/1398?live=true&secret=aiX8qFpFPNsGJFm21vYK50E~gSmqd19fU`


## codemirror side code to start a task interactively.

First create a execution object, then start the task.

```typescript
const tmpExecutionScript = (ev: EditorView, parsedBlock: CommandAndBlockContent) => {
	const urlpath = window.location.pathname
	const query = new URLSearchParams(window.location.search)
	const selectedIds = query.get('selectedIds')
	const cmdid = (urlpath.endsWith('/usercmds/edit') && selectedIds) ? selectedIds : null
	const hello = encode(parsedBlock.content)
	let argsary = parsedBlock.cmd?.params || []
	let args = ""
	if (argsary.length > 1) {
		args = argsary.slice(1).join(' ')
	}
	fetch("/cmd", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			args,
			cmdid: cmdid,
			cmdContent: hello,
			from: 'eval'
		})
	}).then((response) => {
		try {
			return response.json();
		} catch (error) {
			console.log(error)
		}
	}).then(data => {
		const dd = data.data
		let message
		if (dd.error) {
			message = dd.error
		} else {
			message = dd.output
		}
		const prefx = parsedBlock?.cmd?.params[0] === 'javascript' ? '// ' : '# '
		const line = util1.getLineSeperator(prefx, 'evalresult')
		const lines = []
		lines.push("\n" + line)
		lines.push("The task has queued, when started the live stream will show bellow.")
		lines.push("Move the cursor to the line bellow and hit Ctrl-enter to query the result of the task.")
		lines.push(message)
		util.appendToTheBlock(ev, lines.join('\n'))
		if (!dd.error) {
			const lastIdx = (dd.output as string).lastIndexOf('/')
			if (lastIdx != -1) {
				const idAndQuery = dd.output.substring(lastIdx + 1)
				if (idAndQuery) {
					const slr = new StreamLineReader(`/ws/cmd-live/${idAndQuery}`, (line) => {
						util.appendToTheBlock(ev, line.line + '\n')
					})
					slr.onclose((event) => {
						util.appendToTheBlock(ev, 'websocket closed.\n')
					})
					slr.onerror((event) => {
						console.log('ws onerror:', event)
						util.appendToTheBlock(ev, 'error: ' + 'websocket throw an error.\n')
					})
					slr.start(["executionid:" + idAndQuery]);
				}
			}
		}
	});
}
```