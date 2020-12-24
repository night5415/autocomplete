customElements.define(
  "me-autocomplete",
  class extends HTMLElement {
    constructor() {
      super();
      this._list = [];
      this._input;
      this._shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.render();
      window.mike = this;
    }

    get list() {
      return this._list;
    }

    set list(value) {
      if (!Array.isArray(value)) throw new Error("List must be of type array");
      this._list = value;
    }

    static get observedAttributes() {
      return ["list"];
    }

    attributeChangedCallback(attr, oldVal, newVal) {
      const self = this;

      if (self._input) {
        self._input.setAttribute(attr, newVal);
      }
    }

    render() {
      const self = this,
        template = getTemplate(this.attributes),
        style = getStyle();

      self._shadow.appendChild(style);
      self._shadow.appendChild(template);
      self._input = self._shadow.querySelector("input");
    }
  }
);

function onTextChange() {
  const self = this;
  console.dir(arguments);
}

function getTemplate(args) {
  const input = document.createElement("input"),
    div = document.createElement("div"),
    dataList = document.createElement("datalist"),
    slot = document.createElement("slot"),
    attributes = Array.from(args);

  input.addEventListener("keydown", onTextChange);

  input.setAttribute("type", "text");
  input.setAttribute("list", "xx");
  var x = ["mike", "tami"];
  dataList.id = "xx";

  x.map((y) => {
    const option = document.createElement("option");
    option.value = y;
    dataList.appendChild(option);
  });

  attributes.forEach((a) => input.setAttribute(a.name, a.value));
  div.appendChild(slot);
  div.appendChild(input);
  div.appendChild(dataList);

  return div;
}

function getStyle() {
  const style = document.createElement("style");
  style.textContent = `
         input {
            border: 1px solid gray;
            border-radius: 4px; 
            padding:5px;
            font-size:1.2em;
            color:brown;
        }
      `;
  return style;
}
