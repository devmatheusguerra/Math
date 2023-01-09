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



    window.addEventListener('load', () => {
      new MutationObserver(async () => {
        await init()
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
    }
      </style>

      ${this.status === 'on' ? `<div class="led${this.key} on">
      </div>` : `<div class="led${this.key}"> 
      </div>`}

    `;
    }
  }

  start() {
    setInterval(() => {
      this.tempo += 1

      if(this.tempo % (this.time / 1000) === 0) {
        this.setAttribute('status', 'on')
      } else {
        this.setAttribute('status', 'off')
      }
     

    }, 1000)
  }
}

customElements.define('my-led', Led);