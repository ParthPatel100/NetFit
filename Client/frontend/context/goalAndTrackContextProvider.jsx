import {createContext, useEffect, useState} from 'react'
import axios from "axios";

export const GoalAndTrackContext = createContext({})

export function GoalAndTrackContextProvider({children}){
    const [caloriesGoals, setCaloriesGoals] = useState(-1)
    const [carbsGoals, setCarbsGoals] = useState(-1)
    const [fatsGoals, setFatsGoals] = useState(-1)
    const [proteinGoals, setProteinGoals] = useState(-1)
    const [sugarGoals, setSugarGoals] = useState(-1)

    const [sleepGoals, setSleepGoals] = useState(-1)
    const [weightGoals, setWeightGoals] = useState(-1)
    const [waterGoals, setWaterGoals] = useState(-1)

    const [caloriesBurnGoals, setCaloriesBurnGoals] = useState(-1)
    const [workoutSessionsGoals, setWorkoutSessionsGoals] = useState(-1)
    const [workoutDurationGoals, setWorkoutDurationGoals] = useState(-1)

    function setAllInfo(data){
        setCaloriesGoals(data.calories)
        setCarbsGoals(data.carbohydrates)
        setFatsGoals(data.fat)
        setProteinGoals(data.protein)
        setSugarGoals(data.sugar)
        setSleepGoals(data.sleep)
        setWeightGoals(data.weight)
        setWaterGoals(data.water)
        setCaloriesBurnGoals(data.calories_burn)
        setWorkoutSessionsGoals(data.workouts)
        setWorkoutDurationGoals(data.workout_duration)
    }

    async function getCurrentGoals(){
        try {
            const { data } = await axios.get('/goal/getCurrentGoals');
            if (data.error) {
                console.log(data.error);
            } else {
                console.log("Current goals from mongo DB: " , data)
                setAllInfo(data)
            }
        } catch (error) {
            console.error('Error Getting Data', error);
        }
    }

    useEffect(() => {
        getCurrentGoals().then()
    } ,[] )

    return (
        <GoalAndTrackContext.Provider value={{ caloriesGoals, carbsGoals, fatsGoals, proteinGoals, sugarGoals, sleepGoals, weightGoals, waterGoals, caloriesBurnGoals, workoutSessionsGoals, workoutDurationGoals,
            setCaloriesGoals, setCarbsGoals, setFatsGoals, setProteinGoals, setSugarGoals, setSleepGoals, setWeightGoals, setWaterGoals, setCaloriesBurnGoals, setWorkoutSessionsGoals, setWorkoutDurationGoals}}>
            {children}
        </GoalAndTrackContext.Provider>
    )
}