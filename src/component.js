import { Element } from "./element"

class Component {
	constructor(options={}) {
		if (!options.template) {
			return "";
		}

		this.template = options.template;
		this.data = options.data || {};
		this.methods = options.methods || {};

		return this._init();
	}
	_init() {
		this.el = this.template(this.data);
		console.log(this.el);
		let elem = this.el.render();
		this.addHandler();

		return elem;
	}
	addHandler() {
		let eventList = getEventList(this.el);
		let methods
		console.log(eventList);

		for (let ev of eventList) {
			let elem = ev.elem;
			let handler = this.methods[ev.eventHandler];
			let eventType = ev.eventType;
			let args = ev.eventArgs;
			let _this = this;

			args = args.map(function(arg) {
				return arg.trim().replace(/[\'\"]/g, "");
			});

			elem.addEventListener(eventType, function() {
				handler.bind(_this, ...args)();
			});
		}
	}
}

function getEventList(el) {
	let eventList = [];
	let props = el.props;
	let children = el.children;

	for (let propName in props) {
		if (propName.startsWith("v-")) {
			let eventType = propName.replace("v-", "");
			let propValue = props[propName] + "";
			console.log(propValue);
			let eventHandler = propValue.split("(")[0];
			let eventArgs = propValue.substring(propValue.indexOf("(")).replace(/[\(\)]/g, "").split(",");
			let elem = el.el;

			eventList.push({eventType, eventHandler, eventArgs, elem});
		}
	}

	console.log(el.children);

	for (let child of children) {
		if (child instanceof Element) {
			console.log(child);
			eventList = eventList.concat(getEventList(child));
		}
	}

	return eventList;
}

function component(options) {
	return new Component(options);
}

export default component;