const leds = JSON.parse(window.sessionStorage.leds)
const avisos = document.querySelectorAll('.aviso');
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
  avisos.forEach(aviso =>{
    aviso.innerHTML = `
    <img onclick="pause()" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA3lJREFUaEPtWYFRFUEMfalArUCoQOkAK1ArACpQKlAqECoQKhAqACsQKhAqECqI85ycsz+3u9nbf189h8z8+TD7bzcveUk2OcHCRRauPx4B/G0PzuYBVX0J4DUAfm/Zd4rvGsAtgCsAX0WE/68tawFQVSr6DsAbU3qKQgRzDuBERPh3l3QBUNWnAD4AeN916vihYwBHInI/db/JAFSV1v4MgCDmFCp/ICL0SrNMAqCqnwKrXxgtSIn7gecWHwRMytEAjJWSHIvIYSuCJgBGGVqdh3t5MFDnrRSw/bgXqfMks+cpgMOW/VoBfCkof0QlWg7KWdSAMI4YT15OReQg8kQIQFVpJWaaVGj13blSoVGM6dV7gxmqmiiqACxgaf1Ubkz5yRmjZk1LyQzgF+53b2uBXQRg7v3usg0tv9VLmYgOBoIFLvUEDbVdOrMGgIG05w7dmYs2JTBGp29uvUilLACzBK2fCgvNx8iKc6yrKs/xgU0vjCp2CYAP3I1Sx4M2+lLZlEpZA5YA0PosOoOwQpJSf0xUdd8q/nDmrYhsewVGAAocfBYFrqpqurmIrOwdrRe88COKwRwAz78LEclV4JW9IwWj9ZxrVZVpNb12sDqT3r8lB8A/1ESfSMFovQCARYz3r0FGxswBYApjUzLIKxFhlaxKpGC0XgCwC+AyWbsWkZ3IAytcBtCU+yMFo/UCABpypSb42Mp5oBqMJTdECkbrvfv+/wCWSCFeptIb4b8UxDcikiaY8WArk3sXl0YXX8hGqQvAcq4STGeqypvg8yS1NdEoKnZT1jOXuTsRSS+Yv7ZrvU5Xu6IpirX8ttANTrpOE+lyGxqj0XJbSgPASZrvijZKJWtlefdJx5bVbrBnrMJCx1FH90S5cHEjbTnCWSlUdlZxXto72KInWKFnmfFbF8hrsx8YrzfYGiylqrl44DKLHg/pGnJZtuHULzftOBMR9sVVCT2QxANbOT8n4jKVZ+fEbqkJiCnOVpF75sb0Z9yzZb8mAIkncnPS1ELkKj+Mjwc3XueIhPxml1XrsUPaVDuyyGU2LyWlcmPx6PHaOrPN/kZfcCSeoNvJWz+17gVwwv1aKOMPmEQh/7DlbfKflEjvTi1A7gDQk3wP0J2S1wKQammpkPzmhzndj8k5lh9es17NlYJnA9Bi8k385hHAJqw6Zc/Fe+AnqzHoQF4Iy68AAAAASUVORK5CYII="/>
  `
  })

}

function pause () {
  clearInterval(timer)
  document.querySelectorAll('my-led').forEach(led => {
    led.pause()
    avisos.forEach(aviso =>{
      aviso.innerHTML = `
        <img onclick='play()' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA6xJREFUaEPtWctRVFEQPR2BGoEQgZIBRqBGIESgLF0pCShEIOx0JUQgVrkXIhAiELZu2jpWX+tOz/3PG/WVdBU1WvNe33u6T39HMHORmd8ftwD+tgcn84CqPgTwGAA/N+wzxncO4BLAGYDPIsL/rywrAVBVXvQ5gCd26Z4LEcwJgEMR4b+HZAiAqt4F8ArAi6FTl186ALAvIte9+roBqCqt/Q4AQUwpvPyuiNArzdIFQFXfVqx+arQgJa4Dzy0+CJiUowEYKzk5EJG9VgRNAIwytDoP93JjoE5aKWD6qIvUuZPQeQRgr0VfK4CPmcvv8xItB6UsakAYR4wnL0cislvzRBWAqtJKzDSx0OrbU6VCoxjTq/cGM1QxURQBWMDS+rFc2OW7M0bJmpaSGcAP3HNPS4GdBWDu/eayDS2/MUqZGh0MBAtc7AkaajN3ZgkAA+mZO3QrRxtVfQ/gpYgQ9LAYnb46BVkqJQGYJfxFWGhe526mqgrgh4F4M4wAgKryHB/Y9MJSxc4B8IFbpY4BCPf+YkD42S1GX142plLSgDkAtD6LThBWSFIqKw5AeI6eIK3omS5R1R2r+OG9SxHZ9EqWAGQ4eK8WuBkAPI/GIIgPPQjMC99rMZgC4Pl3KiKpCryguwAgPEcAXUGuqkyrcdvB6kx6/5YUAP9SlT7U1gCAj3UFuaqyiLH/CrJkzBQApjAOJUEeiQirZFEaAQQdTUGuqtsAPkUHn4vIVs0DTIexZHN//FAngPBqMchT8SgiC0ZPeWABgH8h54ZBAFRXDHKv9/8DAGB2FGIzFXeE/1IQX4hInGCWF1uJ3Du7NDr7QkYX+XZ2Pq2EVVV2gvejlFml0R9o5q5EJG4wf12vtZ0uTkWJVqKp0hZqClcwfhrsaqeJdL4DjVl0viOlAaAb/VRUpVKt6St9b6MsE0i8tixOgyNrFRY6rjqGN8opEHZ5rnAWCpWdld2Xji626AlW6El2/NZ1sm32C+PVFlvBUqqaigd+zaLHQ4aWXDY2cuuX2nYciwjn4qJUPRDFA0c5vyfi17w8JydOS01A7OIcFakztaY/ps4WfU0AIk+k9qSxhchV/jE+btx6nSsS8ptTVmnGrtKmOJHVXGb7UlIqtRavvV76ntlmZ60/cESeoNvJW7+1HgVwSH0tlPEHdFHIv2ypj/wnJeLeqQXIFQB6kr8DDKfklQDEt7RUSH7zj62IX5NzLR9+Zj2bKgVPBqDF5Ot45hbAOqzao3P2HvgJeMD+QKiZBZUAAAAASUVORK5CYII="/>
      `
    })
  })
}

function MMC (numbers) {
  current = 2
  dividers = []

  while (numbers.filter(n => n > 1).length > 0) {
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
