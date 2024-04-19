const ___f__1 = (PageHelper, Cm6Enricher, makecm6) => {
	const srcCache = [];
	const pageHelper = new PageHelper({
		debug: false,
		demo_mode: true,
		alpine_before_start: function (Alpine) {
			window.Alpine = Alpine;
			Alpine.data("demos", () => ({
				runjsAt: Alpine.$persist("both"),
				initLoading: false,
				cmSizes: Alpine.$persist({
					"js-cm-wrap": "400px",
					"css-cm-wrap": "400px",
					"json-cm-wrap": "400px",
					"html-cm-wrap": "400px",
				}),
				updateCmSizes(id, size) {
					const s = (size && size + "px") || "400px";
					this.cmSizes[id] = s;
				},
				loadalldemos: {
					["@click.prevent"]() {
						const qs = new URLSearchParams(window.location.search);
						this.$data.loading = true;
						qs.delete("id");
						fetch(
							"https://lets-script.com/devtools/pagehelpers" +
							"?" +
							qs.toString()
						)
							.then((res) => res.json())
							.then((j) => {
								Alpine.store("demos").all = [
									...j.data,
									Alpine.store("demos").currentItem,
								];
								history.pushState({}, "", window.location.pathname);
								if (Alpine.store("demos").all.length > 0) {
									Alpine.store("demos").currentItem = JSON.parse(
										JSON.stringify(Alpine.store("demos").all[0])
									);
									Alpine.nextTick(() => {
										const ce = new CustomEvent("demo-change", {});
										window.dispatchEvent(ce);
									});
								}
								this.$data.loading = false;
								this.$data.showLoadAll = false;
							});
					},
				},
				_runjs() {
					if (this.runjsAt === "both" || this.runjsAt === "before") {
						this.evalJs();
					}
					this.$el.innerHTML = Alpine.store("demos").currentItem.html;
					if (this.runjsAt === "both" || this.runjsAt === "after") {
						this.evalJs();
					}
				},
				setResultInnerHTML: {
					["@demo-change.window"]() {
						this._runjs();
					},
					["@json-change.window"]() {
						this._runjs();
					},
					["@js-change.window"]() {
						this._runjs();
					},
					["@html-change.window"]() {
						this._runjs();
					},
					["@css-change.window"]() {
						let el = document.createElement("style");
						el.type = "text/css";
						el.innerText = Alpine.store("demos").currentItem.cssvalue;
						document.head.appendChild(el);
					},
				},
				evalJs() {
					let cit = Alpine.store("demos").currentItem;
					cit = cit.jsvalue;
					if (cit) {
						try {
							const scriptElement = document.createElement("script");
							scriptElement.textContent = cit;
							document.body.appendChild(scriptElement);
						} catch (error) {
							console.error(error);
						}
					}
				},
				initdemo: {
					["x-init"]() {
						const qs = new URLSearchParams(window.location.search);
						this.$watch("$store.demos.currentItem.html", (v, ov) => {
							pageHelper.executeScriptTags(v, {}, srcCache);
						});
						this.$watch("$store.demos.currentItem", (v, ov) => {
							pageHelper.executeScriptTags(v.html, {}, srcCache);
						});
						if (qs.has("id")) {
							this.$data.showLoadAll = true;
							const id = qs.get("id");
							const currentId = Alpine.store("demos").currentItem?.id + "";
							if (id !== currentId) {
								let search = window.location.search;
								this.initLoading = true;
								fetch("https://lets-script.com/devtools/pagehelpers" + search)
									.then((res) => res.json())
									.then((j) => {
										if (Array.isArray(j.data)) {
											return j.data;
										} else {
											return [j.data];
										}
									})
									.then((items) => {
										Alpine.store("demos").all = items;
										const id = qs.get("id");
										this.$data.loading = false;
										this.initLoading = false;
										if (id) {
											Alpine.store("demos").setCurrentItem(id);
											Alpine.nextTick(() => {
												const ce = new CustomEvent("demo-change", {});
												window.dispatchEvent(ce);
											});
										}
									});
								return;
							}
						}
						if (Alpine.store("demos").currentItem.html) {
							pageHelper.executeScriptTags(
								Alpine.store("demos").currentItem.html,
								{},
								srcCache
							);
							Alpine.nextTick(() => {
								const ce = new CustomEvent("demo-change", {});
								window.dispatchEvent(ce);
							});
							if (Alpine.store("demos").all.length === 0) {
								this.$data.showLoadAll = true;
							}
							return;
						}
					},
				},
				dumpStore() {
					const all = JSON.stringify(Alpine.store("demos").all);
					const currentItem = JSON.stringify(
						Alpine.store("demos").currentItem
					);
					const v = {
						all: JSON.parse(all),
						currentItem: JSON.parse(currentItem),
					};
					return JSON.stringify(v, null, 2);
				},
			}));
			Alpine.store("demos", {
				init() {
					this.all = [];
				},
				all: [],
				currentItem: Alpine.$persist({})
					.as("last_editing_item")
					.using(sessionStorage),
				setCurrentItem(id) {
					const found = this.find(id);
					this.currentItem = JSON.parse(JSON.stringify(found));
				},
				find(id) {
					return this.all.find((demo) => {
						return demo.id + "" === id;
					});
				},
				currentLink(demoname) {
					const qs = new URLSearchParams();
					if (demoname) {
						this.currentItem.name = demoname;
					}
					if (!this.currentItem.name) {
						this.currentItem.name = "A Pagehelper Demo";
					}
					if (!this.currentItem.id) {
						this.currentItem.id =
							Math.floor(Math.random() * 1000000) + 1000000;
					}
					qs.set("item", JSON.stringify(this.currentItem));
					return `${window.location.origin}${window.location.pathname
						}?${qs.toString()}`;
				},
				copyCurrentLink(demoname) {
					navigator.clipboard.writeText(this.currentLink(demoname));
				},
			});
		},
	});

	pageHelper.add(new Cm6Enricher({ makecm6 }));

	window.pageHelper = pageHelper;
	pageHelper.enrich();

	window.addEventListener("pjaxPageLoaded", (e) => {
		var domContentLoadedEvent = new Event("DOMContentLoaded", {
			bubbles: true,
			cancelable: true,
		});
		document.dispatchEvent(domContentLoadedEvent);
	});
};