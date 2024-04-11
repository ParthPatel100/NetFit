import axios from "axios";


function extractData(data){
    return data.map((data) => {
        const formattedDate = data.date.split('T')[0]
        return ({
            x: formattedDate,
            y: data.amount
        })
    })
}

export async function getWeightData(fromDate, toDate){
    const { data } = await axios.get('/progress/getWeightData', {
        params:{
            from: new Date(fromDate),
            to: new Date(toDate)
        }
    });
    const graphData = extractData(data)

    const finalData = [{
        data: graphData,
        id: 'Weight'
    }]

    console.log("Graph data: " , graphData)
    return finalData
}

export async function getWaterData(fromDate, toDate){
    const { data } = await axios.get('/progress/getWaterData', {
        params:{
            from: new Date(fromDate),
            to: new Date(toDate)
        }
    });
    const graphData = extractData(data)

    const finalData = [{
        data: graphData,
        id: 'Water'
    }]

    console.log("Graph data: " , graphData)
    return finalData
}

export async function getSleepData(fromDate, toDate){
    const { data } = await axios.get('/progress/getSleepData', {
        params:{
            from: new Date(fromDate),
            to: new Date(toDate)
        }
    });
    const graphData = data.map((data) => {
        const formattedDate = data.date.split('T')[0]
        return ({
            x: formattedDate,
            y: data.duration
        })
    })

    const finalData = [{
        data: graphData,
        id: 'Sleep'
    }]

    console.log("Graph data: " , graphData)
    return finalData
}


export async function getCalConsumedData(fromDate, toDate){
    const { data } = await axios.get('/progress/getCalConsumedData', {
        params:{
            from: new Date(fromDate),
            to: new Date(toDate)
        }
    });
    const graphData = data.map((data) => {
        const formattedDate = data.date.split('T')[0]
        return ({
            x: formattedDate,
            y: data.calories
        })
    })

    const finalData = [{
        data: graphData,
        id: 'Calories Consumed'
    }]

    console.log("Graph data: " , graphData)
    return finalData
}


export async function getWorkoutInformation(fromDate, toDate){
    const { data } = await axios.get('/progress/getWorkoutData', {
        params:{
            from: new Date(fromDate),
            to: new Date(toDate)
        }
    });
    const calData = data.map((data) => {
        const formattedDate = data.date.split('T')[0]
        return ({
            x: formattedDate,
            y: data.calories
        })
    })

    const durData = data.map((data) => {
        const formattedDate = data.date.split('T')[0]
        return ({
            x: formattedDate,
            y: data.duration
        })
    })

    const workoutDurationGraphData = [{
        data: durData,
        id: 'Duration'
    }]

    const caloriesBurntGraphData = [{
        data: calData,
        id: 'Calories'
    }]

    return {
        workoutDurData: workoutDurationGraphData,
        calBurntData: caloriesBurntGraphData
    }
}