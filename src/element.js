class Element {
	constructor({tagName, props={}, children=[]}) {
		this.tagName = tagName;
		this.props = props;
		this.children = children;
	}
	render() {
		let el = document.createElement(this.tagName);

		Element.addProps(el, this.props);
		Element.addChildren(el, this.children);

		this.el = el;

		return el;
	}
	static addProps(el, props={}) {
		for (let propName in props) {
			let propValue = props[propName];
				
			el.setAttribute(propName, propValue);
		}
	}
	static addChildren(el, children=[]) {
		for (let child of children) {
			let childEl;

			if (child instanceof Element) {
				childEl = child.render();
			} else {
				childEl = document.createTextNode(child);
			}

			el.appendChild(childEl);
		}
	}
};

function el(tagName, props, children) {
	return new Element({tagName, props, children});
};

export { el, Element }