let leds = [
    {
        id: '1',
        color: '#00ff00',
        time: 1
    }
]

function addLed() {
    leds.push({
        id: leds.length + 1,
        color: '#00ff00',
        time: 1
    })
}

function updateLeds(el) {
    const id = el.id.replace(/[a-z]/gi, '')
    leds[id - 1].color = document.querySelector(`#color${id}`).value
    leds[id - 1].time = parseInt(document.querySelector(`#time${id}`).value)
}

function removeLed(id) {
    leds.splice(id - 1, 1)
    leds.forEach((led, index) => {
        led.id = index + 1
    })
}

function plus(el) {
    total = el.parentElement.parentElement.querySelector('input').value;
    if (total < 99) {
        total++;
    }
    el.parentElement.parentElement.querySelector('input').value = total;
    updateLeds(el.parentElement.parentElement.querySelector('input'))
}

function minus(el) {
    total = el.parentElement.parentElement.querySelector('input').value;
    if (total > 1) {
        total--;
    }
    el.parentElement.parentElement.querySelector('input').value = total;
    updateLeds(el.parentElement.parentElement.querySelector('input'))
}

document.querySelectorAll('.times').forEach(function (el) {
    el.addEventListener('mousewheel', function (e) {
        if (!(e.deltaY > 0)) {
            if (el.value < 99)
                el.value = parseInt(el.value) + 1;

        }
        else {
            if (el.value > 1)
                el.value = parseInt(el.value) - 1;
        }
    })
});



let total_leds = 0;
function verifyChanges() {
    if (total_leds != leds.length) {
        const tbody = document.querySelector('tbody')
        total_leds = leds.length

        if (leds.length == 0) {
            tbody.innerHTML = `
            <tr>
                <td colspan="4" style='padding: 20px 0; font-size: 35px'>Nenhum led</td>
            </tr>
            `
            document.querySelector('.play').style.display = 'none'

            return
        }


        tbody.innerHTML = ''
        document.querySelector('.play').style.display = 'block'
        leds.forEach(function (led) {
            tbody.innerHTML += `
                <tr class='leds-tr'>
                    <td>#${led.id}</td>
                    <td>
                        <input onchange="updateLeds(this)" type="color" class="colors" name="color" id="color${led.id}" value="${led.color}">
                    </td>
                    <td class="td-control">
                        <div>
                            <input onchange="updateLeds(this)" class="times" readonly type="number" name="time" id="time${led.id}" value="${led.time}" min="1" max="99" step="1">
                            <div>
                                <button onclick="plus(this)">+</button>
                                <button onclick="minus(this)">-</button>
                            </div>
                        </div>

                    </td>
                    <td>
                        <button class='remove' onclick='removeLed(${led.id})'>
                            Excluir Led
                        </button>
                    </td>
                </tr>
            `
        })

    }
}


setInterval(() => {
    verifyChanges()
}, 500);



function playSimulation() {
    window.sessionStorage.setItem('leds', JSON.stringify(leds))
    window.location.href = './simulator.html'
}