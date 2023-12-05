let kosar = []
let osszeg = 0

document.getElementById('kosarba').addEventListener('click', () => {
    let utvonal = document.getElementById('foglalas1').value
    let osztaly = document.getElementById('foglalas2').value
    let datum = document.getElementById('datum').value

    if (!datum) {
        alert('Válasszon ki egy időpontot!')
        return
    }

    let par = document.createElement("p")
    par.innerHTML = `${utvonal}<br>${osztaly}<br>${datum}`
    kosar.push([utvonal.slice(0, utvonal.indexOf('-') - 1), osztaly.slice(0, osztaly.indexOf('-') - 1), datum])

    osszeg = osszeg + parseInt(osztaly.slice(-8, -3))
    let par2 = document.createElement("p")
    par2.innerHTML = `Összeg: ${osszeg} Ft`


    if (document.getElementById('kosar').innerHTML != '') {
        document.getElementById('kosar').removeChild(document.getElementById('kosar').lastChild)
    }

    document.getElementById('kosar').appendChild(par)
    document.getElementById('kosar').appendChild(par2)
    document.getElementById('kosar').style.backgroundColor = '#4682B4'
})



document.getElementById('veglegesites').addEventListener("click", () => {
    if (document.getElementById('kosar').innerHTML == '') {
        alert('Kérjük először válassza ki hova szeretne utazni és mikor!')
    }
    else {
        let hiddenInput = document.createElement('input')
        hiddenInput.type = 'hidden'
        hiddenInput.name = 'foglalas'
        hiddenInput.value = kosar

        rendeles = document.body.removeChild(document.getElementById('rendeles'))
        let fizetes = document.createElement("div")
        fizetes.classList.add("fizetes")
        fizetes.innerHTML = `
        <form method="post" action="http://szamtud.uni-corvinus.hu/receive.php" id="book">
        <p>Személyes adatok</p>
        <label for="veznev">Vezetéknév: </label> <input type="text" id="veznev" name="veznev"> <br>
        <label for="keresztnev">Keresztnév: </label> <input type="text" id="keresztnev" name="keresztnev"> <br>
        <label for="email">Email cím: </label> <input type="text" id="email" name="email"> <br>
        <p>Számlázási cím</p>
        <label for="irszam">Irányítószám: </label> <input type="text" id="irszam" name="irszam"> <br>
        <label for="varos">Város: </label> <input type="text" id="varos" name="varos"> <br>
        <label for="utca">Közterület neve: </label> <input type="text" id="utca" name="utca"> <br>
        <label for="hazszam">Házszám: </label> <input type="text" id="hazszam" name="hazszam"> <br>
        <p>Bankkártya adatok</p>
        <label for="kartyaszam">Bankkártyaszám: </label> <input type="text" id="kartyaszam" name="kartyaszam"> <br>
        <label for="kartyanev">Kártyára írt név: </label> <input type="text" id="kartyanev" name="kartyanev"> <br>
        <label for="lejarat">Lejárat: </label> <input type="month" id="lejarat" name="lejarat"> <br>
        <label for="cvccvv">CVC/CVV kód: </label> <input type="text" id="cvccvv" name="cvccvv" size="1"> <br>
        <input type="submit" value="Rendelés véglegesítése">
        <input type="button" value="Vissza az előző oldalra" id="vissza">
        </form>
        `
        document.body.insertBefore(fizetes, document.body.children[2]);
        document.getElementById('book').appendChild(hiddenInput)

        $("#book").validate({
            rules: {
                veznev: "required",
                keresztnev: "required",
                email: {
                    email: true,
                    required: true,
                },
                irszam: {
                    required: true,
                    digits: true,
                    minlength: 4,
                    maxlength: 4,
                },
                varos: "required",
                utca: "required",
                hazszam: "required",
                kartyaszam: {
                    required: true,
                    digits: true, 
                    minlength: 12, 
                    maxlength: 12,
                },
                kartyanev: "required",
                lejarat: {
                    required: true,
                },
                cvccvv: {
                    required: true,
                    minlength: 3,
                    maxlength: 3,
                    digits: true,
                },
            },

            messages: {
                veznev: "Kérjük adja meg a vezetéknevét!",
                keresztnev: "Kérjük adja meg a keresztnevét!",
                email: "Kérjük valós email címet adjon meg!",
                irszam: "Kérjük valós irányítószámot adjon meg!",
                varos: "Kérjük adja meg lakcímét!",
                utca: "Kérjük adja meg a közterület nevét!",
                hazszam: "Kérjük adja meg házszámát",
                kartyaszam: "Kérjük érvényes kártyaszámot adjon meg! (Például: 012345678910)",
                kartyanev: "Kérjük adja meg a kártyára rt nevet!",
                lejarat: "Kérjük adja meg a kártya lejárati dátumát!",
                cvccvv: "Kérjük adja meg a kártya hátoldalán lévő háromjegyű kódot!",
            },
        });


        document.getElementById('vissza').addEventListener('click', () => {
            document.body.removeChild(document.getElementsByClassName('fizetes')[0])
            document.body.insertBefore(rendeles, document.body.children[2]);
        })
    }
})


document.getElementById('kosarurites').addEventListener('click', () => {
    document.getElementById('kosar').innerHTML = '' 
    document.getElementById('kosar').style.backgroundColor = ''
})
