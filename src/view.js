class View {
	constructor(options) {
		this.el = options.el;
		this.components = options.components || [];
		this._init();
	}
	_init() {
		const components = this.components;

		for (let component of components) {
			this.addComponent(component);
		}
	}
	addComponent(component) {
		this.el.appendChild(component);
	}
}

function vm(options) {
	return new View(options);
}

export default vm;