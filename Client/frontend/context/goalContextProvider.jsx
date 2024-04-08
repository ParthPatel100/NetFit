import {createContext, useState} from 'react'

export const GoalContext = createContext({})

export function GoalContextProvider({children}){
    const [calories, setCaloriesGoal] = useState(-1)
    const [carbs, setCarbsGoal] = useState(-1)
    const [fats, setFats] = useState(-1)
    const [protein, setProtein] = useState(-1)
    const [sugar, setSugar] = useState(-1)

    const [sleep, setSleep] = useState(-1)
    const [weight, setWeight] = useState(-1)
    const [water, setWater] = useState(-1)

    const [caloriesBurn, setCaloriesBurn] = useState(-1)
    const [workoutSessions, setWorkoutSessions] = useState(-1)
    const [workoutDuration, setWorkoutDuration] = useState(-1)

    return (
        <GoalContext.Provider value={{ calories, carbs, fats, protein, sugar, sleep, weight, water, caloriesBurn, workoutSessions, workoutDuration,
            setCaloriesGoal, setCarbsGoal, setFats, setProtein, setSugar, setSleep, setWeight, setWater, setCaloriesBurn, setWorkoutSessions, setWorkoutDuration}}>
            {children}
        </GoalContext.Provider>
    )
}