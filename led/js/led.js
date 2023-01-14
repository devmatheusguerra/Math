class Led extends HTMLElement {
  constructor() {
    super();
    this.color = null
    this.status = null
    this.time = null
    this.tempo = 0
    this.key = "__" + Math.random().toString(36).substr(2, 9)

    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });



    document.addEventListener('DOMContentLoaded', () => {
      new MutationObserver(() => {
        init()
      }).observe(this, { attributes: true })

      init()
      if (this.time == null) {
        return
      }
    })


    const init = () => {
      this.color = this.getAttribute('color');
      this.status = this.getAttribute('status');
      this.time = parseInt(this.getAttribute('time'));

      shadow.innerHTML = `
      <style>
      .led${this.key} {
        width: 100px;
        height: 200px;
        border-radius: 40% 40% 0 0;
        background-color: #0004;
        box-shadow: 0 0 10px #0000;
        margin: 0 auto;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all .1s ease-in-out;
        color: #fff9;
        
    }

    .led${this.key}::after {
        content: "";
        position: absolute;
        bottom: -80px;
        left: 0;
        width: 5px;
        height: 80px;
        background-color: rgb(218, 218, 218);
        border-radius: 0 0 10px 10px;
    }


    .led${this.key}::before {
        content: "";
        position: absolute;
        bottom: -100px;
        right: 0;
        width: 5px;
        height: 100px;
        background-color: rgb(218, 218, 218);
        border-radius: 0 0 10px 10px;
    }

    .led${this.key}.on {
        background-color: ${this.color};
        box-shadow: 0 0 15px ${this.color};
        color: #0009;
    }
      </style>

      ${this.status === 'on' ? `<div class="led${this.key} on">${this.time / 1000}
      </div>` : `<div class="led${this.key}">${this.time / 1000}
      </div>`}

    `;
    }
  }

  start() {
    setInterval(() => {
      this.tempo += 1

      if (this.tempo % (this.time / 1000) === 0) {
        this.setAttribute('status', 'on')
      } else {
        this.setAttribute('status', 'off')
      }


    }, 1000)
  }


  connectedCallback() {
    
  }

  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  static get observedAttributes() {
    return [/* array of attribute names to monitor for changes */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // called when one of attributes listed above is modified
  }

  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
  }

  // there can be other element methods and properties
}

customElements.define('my-led', Led);
