const express = require('express');
const { DateTime } = require('luxon');
const easter = require('date-easter');

const app = express();
const port = 3000;

function calculateNewYearsObserved(year) {
    let nyd = DateTime.fromFormat(`${year}-01-01`, 'yyyy-MM-dd');
    if (nyd.weekday === 5) {
        nyd = nyd.minus({ days: 1 });
    }
    if (nyd.weekday === 6) {
        nyd = nyd.plus({ days: 1 });
    }
    return nyd.toFormat('yyyy-MM-dd');
}

function calculateMLKDay(year) {
    let mlk = DateTime.fromFormat(`${year}-01-01`, 'yyyy-MM-dd');
    while (mlk.weekday !== 1) {
        mlk = mlk.plus({ days: 1 });
    }
    mlk = mlk.plus({ days: 14 });
    return mlk.toFormat('yyyy-MM-dd');
}

function calculateWashingtonBDay(year) {
    let wbd = DateTime.fromFormat(`${year}-02-01`, 'yyyy-MM-dd');
    while (wbd.weekday !== 1) {
        wbd = wbd.plus({ days: 1 });
    }
    wbd = wbd.plus({ days: 14 });
    return wbd.toFormat('yyyy-MM-dd');
}

function calculateGoodFriday(year) {
    let eday = DateTime.fromFormat(easter.easter(year).toString(), 'yyyy-mm-dd');
    let gfd = eday.minus({ days: 2 });
    return gfd.toFormat('yyyy-MM-dd');
}

function calculateMemorialDay(year) {
    let mem = DateTime.fromFormat(`${year}-05-31`, 'yyyy-MM-dd');
    while (mem.weekday !== 1) {
        mem = mem.minus({ days: 1 });
    }
    return mem.toFormat('yyyy-MM-dd');
}

function calculateJuneteenthObserved(year) {
    let jth = DateTime.fromFormat(`${year}-06-19`, 'yyyy-MM-dd');
    if (jth.weekday === 5) {
        jth = jth.minus({ days: 1 });
    }
    if (jth.weekday === 6) {
        jth = jth.plus({ days: 1 });
    }
    return jth.toFormat('yyyy-MM-dd');
}

function calculateIndependenceDayObserved(year) {
    let iday = DateTime.fromFormat(`${year}-07-04`, 'yyyy-MM-dd');
    if (iday.weekday === 5) {
        iday = iday.minus({ days: 1 });
    }
    if (iday.weekday === 6) {
        iday = iday.plus({ days: 1 });
    }
    return iday.toFormat('yyyy-MM-dd');
}

function calculateLaborDay(year) {
    let lab = DateTime.fromFormat(`${year}-09-01`, 'yyyy-MM-dd');
    while (lab.weekday !== 1) {
        lab = lab.plus({ days: 1 });
    }
    return lab.toFormat('yyyy-MM-dd');
}

function calculateThanksgiving(year) {
    let thk = DateTime.fromFormat(`${year}-11-01`, 'yyyy-MM-dd');
    while (thk.weekday !== 3) {
        thk = thk.plus({ days: 1 });
    }
    thk = thk.plus({ days: 21 });
    return thk.toFormat('yyyy-MM-dd');
}

function calculateChristmas(year) {
    let chr = DateTime.fromFormat(`${year}-12-25`, 'yyyy-MM-dd');
    if (chr.weekday === 5) {
        chr = chr.minus({ days: 1 });
    }
    if (chr.weekday === 6) {
        chr = chr.plus({ days: 1 });
    }
    return chr.toFormat('yyyy-MM-dd');
}

function calculateVeteransDayObserved(year) {
    let vet = DateTime.fromFormat(`${year}-11-11`, 'yyyy-MM-dd');
    if (vet.weekday === 5) {
        vet = vet.minus({ days: 1 });
    }
    if (vet.weekday === 6) {
        vet = vet.plus({ days: 1 });
    }
    return vet.toFormat('yyyy-MM-dd');
}

function calculateColumbusDay(year) {
    let col = DateTime.fromFormat(`${year}-10-01`, 'yyyy-MM-dd');
    while (col.weekday !== 1) {
        col = col.plus({ days: 1 });
    }
    col = col.plus({ days: 7 });
    return col.toFormat('yyyy-MM-dd');
}

function holidaysByYear(year) {
    const holidays = [
        calculateNewYearsObserved(year),
        calculateMLKDay(year),
        calculateWashingtonBDay(year),
        calculateGoodFriday(year),
        calculateMemorialDay(year),
        calculateJuneteenthObserved(year),
        calculateIndependenceDayObserved(year),
        calculateLaborDay(year),
        calculateColumbusDay(year),
        calculateVeteransDayObserved(year),
        calculateThanksgiving(year),
        calculateChristmas(year),
    ];
    return holidays;
}

app.get('/holidays/:year', (req, res) => {
    const year = req.params.year;
    if (!isNaN(year) && (1000 <= parseInt(year) && parseInt(year) <= 9999)) {
        res.json(holidaysByYear(year));
    } else {
        res.status(400).send('Invalid Year Parameter (1000-9999)');
    }
});

app.get('/next-business-day/:date', (req, res) => {
    const date = req.params.date;
    if (!DateTime.fromFormat(date, 'yyyy-MM-dd').isValid) {
        res.status(400).send('Invalid Date Format: YYYY-MM-DD');
        return;
    }
    const holidays = holidaysByYear(date.slice(0, 4));
    let nextBusinessDay = DateTime.fromFormat(date, 'yyyy-MM-dd');
    while (
        holidays.includes(nextBusinessDay.toFormat('yyyy-MM-dd')) ||
        nextBusinessDay.weekday >= 5
    ) {
        nextBusinessDay = nextBusinessDay.plus({ days: 1 });
    }
    res.json({ next_business_day: nextBusinessDay.toFormat('yyyy-MM-dd') });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
