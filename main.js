document.addEventListener("DOMContentLoaded", () => {
    const c1 = document.querySelector("#c1");
    const c2 = document.querySelector("#c2");
    const c3 = document.querySelector("#c3");
    const c4 = document.querySelector("#c4");
    const c5 = document.querySelector("#c5");
    const div1 = document.querySelector("#div1");
    const buttonStart = document.querySelector("#button-start");
    const select = document.querySelector("#select");
    let curr = 0;
    const total = document.querySelector("#total");
    const valueBet = document.querySelector("#value");

    const horses = [
        { id: 1, name: "cavalo 1", odds: 3.5 },
        { id: 2, name: "cavalo 2", odds: 5.0 },
        { id: 3, name: "cavalo 3", odds: 2.5 },
        { id: 4, name: "cavalo 4", odds: 1.5 },
        { id: 5, name: "cavalo 5", odds: 7.5 },
    ]

    horses.forEach(horse => {
        const op = document.createElement("option");
        op.setAttribute("value", horse.id);
        op.innerHTML = horse.name + " odd: " + horse.odds;
        select.append(op);
    })
    const horseElements = [c1, c2, c3, c4, c5];
    // const values = [".8s", ".85s", ".9s",".93s", "1s"];
    const values = ["1.5s", "2s", "2.3s", "2.8s", "3.4s"];

    function generatePositions(horses) {
        const totalWeight = horses.reduce((sum, horse) => sum + 1 / horse.odds , 0);
        const racePositions = [];
        const horsesCopy = [...horses];

        while(horsesCopy.length > 0) {
            let randomValue = Math.random() * totalWeight;
            let cummulative = 0;

            for(const horse of horsesCopy) {
                cummulative += 1 / horse.odds;
                if(randomValue <= cummulative) {
                    racePositions.push(horse);
                    horsesCopy.splice(horsesCopy.indexOf(horse), 1);
                    break;
                }
            }
        }
        return racePositions;
    }

    buttonStart.addEventListener("click", () => {
        const betAmount = parseFloat(valueBet.value);
        if (isNaN(betAmount) || betAmount <= 0) {
            alert("Valor da aposta tem que ser maior que 0");
            return;
        }

        const raceResults = generatePositions(horses);

        raceResults.forEach((horse, index) => {
            const el = horseElements[horse.id - 1];
            const finishLine = div1.offsetWidth - el.offsetWidth - 10;

            el.style.transition = `left ${values[index]} linear`
            el.style.left = `${finishLine}px`;
        });

        const winner = raceResults[0];

        if (parseInt(select.value) === winner.id) {
            curr += winner.odds * betAmount;
        } else {
            if(curr <= 0) {
                curr = 0;
            } else {
                curr -= winner.odds * betAmount;
                if(curr <= 0) 
                    curr = 0;
            }
        }

        setTimeout(() => {
            total.innerHTML = "Total ganho: R$ " + curr.toFixed(2); 
            c1.style.transition = "none", c2.style.transition = "none", c3.style.transition = "none", c4.style.transition = "none", c5.style.transition = "none";
            c1.style.left = 0, c2.style.left = 0, c3.style.left = 0, c4.style.left = 0, c5.style.left = 0;
        }, 3400);
        
    });
});
