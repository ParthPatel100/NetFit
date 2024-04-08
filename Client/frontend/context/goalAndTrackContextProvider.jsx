import {createContext, useState} from 'react'

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

    return (
        <GoalAndTrackContext.Provider value={{ caloriesGoals, carbsGoals, fatsGoals, proteinGoals, sugarGoals, sleepGoals, weightGoals, waterGoals, caloriesBurnGoals, workoutSessionsGoals, workoutDurationGoals,
            setCaloriesGoals, setCarbsGoals, setFatsGoals, setProteinGoals, setSugarGoals, setSleepGoals, setWeightGoals, setWaterGoals, setCaloriesBurnGoals, setWorkoutSessionsGoals, setWorkoutDurationGoals}}>
            {children}
        </GoalAndTrackContext.Provider>
    )
}