// Forecast parameters
const callsForecast = 47; // number of forecasted calls
const serviceLevelGoal = 80; // desired service level (%)
let aht = 63 / 60; // average handling time in minutes

// Erlang B class
class ErlangB {
    constructor(calls, averageHandlingTime) {
        this.erlangs = this.calculateErlangs(calls, averageHandlingTime);
    }

    calculateErlangs(calls, aht) {
        return calls * aht;
    }

    factorial(n) {
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    denominator(agents) {
        let sum = 0;
        for (let i = 0; i <= agents; i++) {
            sum += Math.pow(this.erlangs, i) / this.factorial(i);
        }
        return sum;
    }

    probabilityOfBlocking(agents) {
        const numerator = Math.pow(this.erlangs, agents) / this.factorial(agents);
        const denominator = this.denominator(agents);
        return numerator / denominator;
    }
}

// Perform the calculation
const erlang = new ErlangB(callsForecast, aht);

let agents = 0;
let calculatedSL = 0;

do {
    agents++;
    const blocking = erlang.probabilityOfBlocking(agents);
    calculatedSL = (1 - blocking) * 100;
} while (calculatedSL < serviceLevelGoal);

// Output
console.log(`Required agents: ${agents}`);
console.log(`Resulting service level: ${calculatedSL.toFixed(2)}%`);
