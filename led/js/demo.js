document.addEventListener('DOMContentLoaded', play())
 src = './assets/sound.mp3';
const audio = new Audio(src);
audio.volume = 0.4


function play() {
    let seconds = 0

    const leds = JSON.parse(window.sessionStorage.leds)

    leds.forEach(led => {
        const led_element = document.createElement('my-led')
        led_element.setAttribute('color', led.color)
        led_element.setAttribute('time', (led.time * 1000))
        led_element.setAttribute('id', 'led' + led.id)
        document.querySelector('.row').appendChild(led_element)
        led_element.start()
    })

    mmc1 = MMC(leds.map(led => led.time))
    mmc2 = mmc1 * 2
    mmc3 = mmc1 * 3

    setInterval(function () {
        seconds++
        document.querySelector('#timer').innerHTML = seconds

        if(seconds % mmc1 == 0){
            document.querySelector('#mmc1').innerHTML = mmc1
            audio.play()
        }
        
        if(seconds % mmc2 == 0){
            document.querySelector('#mmc2').innerHTML = mmc2
            audio.play()
        }

        if(seconds % mmc3 == 0){
            document.querySelector('#mmc3').innerHTML = mmc3
            audio.play()
        }

    }, 1000);
}



function MMC(numbers) {
    current = 2
    dividers = []

    while(numbers.filter(n => n > 1).length > 0){
        console.log(numbers)
        find_some_divider = false
        numbers.forEach((n, index) => {
            if(n % current == 0){
                numbers[index] = n / current
                find_some_divider = true
            }
        })

        if(find_some_divider)
            dividers.push(current)
        else
            current++

    }

    return dividers.reduce((a, b) => a * b)
}

    
