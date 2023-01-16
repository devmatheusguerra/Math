const leds = JSON.parse(window.sessionStorage.leds)
const aviso = document.querySelector('.aviso > h1');
const mmc1 = MMC(leds.map(led => led.time))
const mmc2 = mmc1 * 2
const mmc3 = mmc1 * 3
let timer = null
let seconds = 0

leds.forEach(led => {
  const led_element = document.createElement('my-led')
  led_element.setAttribute('color', led.color)
  led_element.setAttribute('time', led.time * 1000)
  led_element.setAttribute('id', 'led' + led.id)
  document.querySelector('.row').appendChild(led_element)
})


src = './assets/sound.mp3'
const audio = new Audio(src)
audio.volume = 0.4

function play () {
  
  timer = setInterval(function () {
    seconds++
    document.querySelector('#timer').innerHTML = seconds

    if (seconds % mmc1 == 0) {
      document.querySelector('#mmc1').innerHTML = mmc1
      audio.play()
    }

    if (seconds % mmc2 == 0) {
      document.querySelector('#mmc2').innerHTML = mmc2
      audio.play()
    }

    if (seconds % mmc3 == 0) {
      document.querySelector('#mmc3').innerHTML = mmc3
      audio.play()
    }
  }, 1000)

  document.querySelectorAll('my-led').forEach(led => {
    led.start()
  })
  aviso.innerHTML = "<h1>Utilize a <code>Barra de Espaço</code> para pausar!</h1>"
}

function pause () {
  clearInterval(timer)
  document.querySelectorAll('my-led').forEach(led => {
    led.pause()
    aviso.innerHTML = "<h1>Utilize a <code>Barra de Espaço</code> para continuar!</h1>"
  })
}

function MMC (numbers) {
  current = 2
  dividers = []

  while (numbers.filter(n => n > 1).length > 0) {
    console.log(numbers)
    find_some_divider = false
    numbers.forEach((n, index) => {
      if (n % current == 0) {
        numbers[index] = n / current
        find_some_divider = true
      }
    })

    if (find_some_divider) dividers.push(current)
    else current++
  }

  return dividers.reduce((a, b) => a * b)
}

function time(){
    return (new Date()).getTime() / 1000;
}

let status = false
let last_click = time()
window.addEventListener('keyup', e => {
  if (e.keyCode == 32) {
    if(last_click < 2)
        return 
    else
        last_click = time()
    status = !status
    if (status) play()
    else pause()
  }
})
