import CircularProgress from '@mui/joy/CircularProgress';
import { useCountUp } from 'use-count-up';
import Typography from '@mui/joy/Typography';
import {
    GlassWater,
    Weight,
    UtensilsCrossed,
    Dumbbell,
    BedDouble,
    MoveRight,
    CakeSlice,
    Clock,
    Timer, Flame
} from "lucide-react";

import dayjs from 'dayjs';

import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {ResponsiveLine} from "@nivo/line";
import {
    getWeightData,
    getWaterData,
    getSleepData,
    getCalConsumedData,
    getWorkoutInformation,
    getTodayWorkout
} from "../utils/ProgressData.js";
import {GoalAndTrackContext} from "../../context/goalAndTrackContextProvider.jsx";


const MyResponsiveLine = ({data, xLabel, yLabel}) => {
    const minYValue = Math.min(...data[0].data.map(item => item.y));

    return (<ResponsiveLine
        enableCrosshair
        data={data}
        animate={true}
        curve="monotoneX"
        defs={[
            {
                colors: [
                    {
                        color: 'inherit',
                        offset: 0
                    },
                    {
                        color: 'inherit',
                        offset: 1000,
                        opacity: 0
                    }
                ],
                id: 'gradientA',
                type: 'linearGradient'
            }
        ]}
        areaBaselineValue={minYValue}
        enableArea
        colors={"#ba23cb"}
        fill={[
            {
                id: 'gradientA',
                match: '*'
            }
        ]}

        margin={{ top: 30, right: 60, bottom: 70, left: 70 }}
        xScale={{ type: 'point'}}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 45,
            legend: yLabel,
            legendOffset: 63,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{

            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: xLabel,

            legendOffset: -48,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        lineWidth={2}
        pointSize={5}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        areaOpacity={0.20}
        enableTouchCrosshair={true}
        isInteractive={true}
        useMesh={true}
        legends={[]}
        enableSlices="x"
        enableGridX={true}
        enableGridY={true}
    />)
}

export default function Progress(){

    const {caloriesGoals, carbsGoals,fatsGoals,proteinGoals,sugarGoals,
        sleepGoals,waterGoals,caloriesBurnGoals,workoutDurationGoals} = useContext(GoalAndTrackContext)


    const [weightData, setWeightData] = useState([])
    const [waterData, setWaterData] = useState([])
    const [sleepData, setSleepData] = useState([])
    const [calConsumedData, setCalConsumedData] = useState([])
    const [workoutDurationData, setWorkoutDurationData] = useState([])
    const [calBurntData, setCalBurntData] = useState([])

    const [workoutDurProgress, setWorkoutDurProgress] = useState(0)
    const [calGainedProgress, setCalGainedProgress] = useState(0)
    const [calBurntProgress, setCalBurntProgress] = useState(0)
    const [sleepProgress, setSleepProgress] = useState(0)
    const [waterProgress, setWaterProgress] = useState(0)
    const [proteinGainedProgress, setProteinGainedProgress] = useState(0)
    const [fatGainedProgress, setFatGainedProgress] = useState(0)
    const [carbGainedProgress, setCarbGainedProgress] = useState(0)
    const [sugarGainedProgress, setSugarGainedProgress] = useState(0)


    const [fromDate, setFromDate] = useState(dayjs('2023-04-17'));
    const [toDate, setToDate] = useState(dayjs('2024-04-17'));
    const duration = 1;


    useEffect(() => {
        console.log(fromDate, toDate)
        if(fromDate && toDate){
            const fromDateFormatted = fromDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
            const toDateFormatted = toDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
            getWeightData(fromDateFormatted, toDateFormatted).then((data) => {setWeightData(data)})
            getWaterData(fromDateFormatted, toDateFormatted).then((data) => {setWaterData(data)})
            getSleepData(fromDateFormatted, toDateFormatted).then((data) => {setSleepData(data)})
            getCalConsumedData(fromDateFormatted, toDateFormatted).then((data) => {setCalConsumedData(data)})
            getWorkoutInformation(fromDateFormatted, toDateFormatted).then((data) => {
                setWorkoutDurationData(data.workoutDurData)
                setCalBurntData(data.calBurntData)
            })
        }

    }, [fromDate, toDate]);

    useEffect(() => {
        getTodayWorkout().then((data) => {
            setWorkoutDurProgress( () => {
                if(data.workoutData.length > 0){
                    return data.workoutData[0].totalDuration
                }
                else{
                    return 0
                }
            })
            setCalGainedProgress(
                () => {
                    if(data.foodData.length > 0){
                        return data.foodData[0].totalCalGained
                    }
                    else{
                        return 0
                    }
                }
                )
            setCalBurntProgress(
                () => {
                    if(data.workoutData.length > 0){
                        return data.workoutData[0].totalCalBurnt
                    }
                    else{
                        return 0
                    }
                })
            setSleepProgress(() => {
                if(data.sleepData.length > 0){
                    return data.sleepData[0].totalDuration
                }
                else{
                    return 0
                }
            })
            setWaterProgress(() => {
                if(data.waterData.length > 0){
                    return data.waterData[0].totalAmount
                }
                else{
                    return 0
                }
            })
            setProteinGainedProgress(() => {
                if(data.foodData.length > 0){
                    return data.foodData[0].totalProteinGained
                }
                else{
                    return 0
                }
            })
            setFatGainedProgress(() => {
                if(data.foodData.length > 0){
                    return data.foodData[0].totalFatsGained
                }
                else{
                    return 0
                }
            })
            setCarbGainedProgress(() => {
                if(data.foodData.length > 0){
                    return data.foodData[0].totalCarbsGained
                }
                else{
                    return 0
                }
            })
            setSugarGainedProgress(() => {
                if(data.foodData.length > 0){
                    return data.foodData[0].totalSugarGained
                }
                else{
                    return 0
                }
            })
        })
    }, [])



    const { value: workoutMinutes_value } = useCountUp({
        isCounting: true,
        duration: duration,
        start: 0,
        end: (()=>{
            if(workoutDurationGoals > 0){
                return parseFloat(((workoutDurProgress / workoutDurationGoals) * 100).toFixed(1));
            }
            return 0;
        })(),
    });
    const { value: caloriesGained_value } = useCountUp({
        isCounting: true,
        duration: duration,
        start: 0,
        end: (()=>{
            if(caloriesGoals > 0){
                return parseFloat(((calGainedProgress / caloriesGoals) * 100).toFixed(1));
            }
            return 0;
        })(),
    });
    const { value: proteinConsumed_value } = useCountUp({
        isCounting: true,
        duration: duration,
        start: 0,
        end: (()=>{
            if(proteinGoals > 0){
                return parseFloat(((proteinGainedProgress / proteinGoals) * 100).toFixed(1));
            }
            return 0;
        })(),
    });
    const { value: caloriesBurntToday_value } = useCountUp({
        isCounting: true,
        duration: duration,
        start: 0,
        end: (()=>{
            if(caloriesBurnGoals > 0){
                return parseFloat(((calBurntProgress / caloriesBurnGoals) * 100).toFixed(1));
            }
            return 0;
        })(),
    });
    const { value: fatGained_value } = useCountUp({
        isCounting: true,
        duration: duration,
        start: 0,
        end: (()=>{
            if(fatsGoals > 0){
                return parseFloat(((fatGainedProgress / fatsGoals) * 100).toFixed(1));
            }
            return 0;
        })(),
    });
    const { value: sleep_value} = useCountUp({
        isCounting: true,
        duration: duration,
        start: 0,
        end: (()=>{
            if(sleepGoals > 0){
                return parseFloat(((sleepProgress / sleepGoals) * 100).toFixed(1));
            }
            return 0;
        })(),
    });
    const { value: water_value} = useCountUp({
        isCounting: true,
        duration: duration,
        start: 0,
        end: (()=>{
            if(waterGoals > 0){
                return parseFloat(((waterProgress / waterGoals) * 100).toFixed(1));
            }
            return 0;
        })(),
    });

    const { value: carbsConsumed_value} = useCountUp({
        isCounting: true,
        duration: duration,
        start: 0,
        end: (()=>{
            if(carbsGoals > 0){
                return parseFloat(((carbGainedProgress / carbsGoals) * 100).toFixed(1));
            }
            return 0;
        })(),
    });

    const { value: sugarConsumed_value} = useCountUp({
        isCounting: true,
        duration: duration,
        start: 0,
        end: (()=>{
            if(sugarGoals > 0){
                return parseFloat(((sugarGainedProgress / sugarGoals) * 100).toFixed(1));
            }
            return 0;
        })(),
    });


    return(

        <div className={"bg-gray-100 flex md:mt-14 md:ml-[12rem] mb-16 md:mb-0 flex-col"}>
            <div
                className={"border-black border mx-4 mb-4 my-2 rounded-2xl p-2 flex justify-center flex-col bg-gray-800 text-white"}>

                <div className={"flex w-full flex-row justify-between px-3 py-4"}>
                    <span className={"font-bold text-[1.5rem] text-center text-neutral-300"}>
                        Today's Progress
                    </span>
                </div>

                <div className={"self-center gap-8 flex flex-row flex-wrap justify-center items-center content-center"}>
                    <div className={"flex flex-col items-center text-center"}>
                        <span className={'text-[0.8rem] mb-1.5 text-neutral-300'}>
                            Workout Minutes
                        </span>
                        <CircularProgress
                            sx={{
                                '.MuiCircularProgress-progress': {
                                    stroke: '#c135ee',
                                },
                                '.MuiCircularProgress-track': {
                                    stroke: `${workoutMinutes_value > 100 ? '#c135ee' : '#a1a0a0'}`,
                                }
                            }}
                            determinate={true}
                            value={parseInt(workoutMinutes_value)}>
                            <Typography textColor={"#e5e5e5"}>{workoutMinutes_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.8rem] mt-1.5 text-neutral-200 '}>
                            {workoutDurProgress}{workoutDurationGoals > 0 ? `/${workoutDurationGoals}` : ""} Min
                        </span>
                    </div>

                    <div className={"flex flex-col items-center text-center"}>
                        <span className={'text-[0.8rem] mb-1.5 text-neutral-300'}>
                            Calories Gained
                        </span>
                        <CircularProgress
                            sx={{
                                '.MuiCircularProgress-progress': {
                                    stroke: '#c135ee',
                                },
                                '.MuiCircularProgress-track': {
                                    stroke: `${caloriesGained_value > 100 ? '#c135ee' : '#a1a0a0'}`,
                                }
                            }}
                            determinate={true}
                            value={parseInt(caloriesGained_value)}>
                            <Typography textColor={"#e5e5e5"}>{caloriesGained_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.8rem] mt-1.5 text-neutral-200'}>
                            {calGainedProgress}{caloriesGoals > 0 ? `/${caloriesGoals}` : ""} Cal
                        </span>
                    </div>
                    <div className={"flex flex-col items-center text-center"}>
                        <span className={'text-[0.8rem] mb-1.5 text-neutral-300'}>
                            Calories Burnt
                        </span>
                        <CircularProgress
                            sx={{
                                '.MuiCircularProgress-progress': {
                                    stroke: '#c135ee',
                                },
                                '.MuiCircularProgress-track': {
                                    stroke: `${caloriesBurntToday_value > 100 ? '#c135ee' : '#a1a0a0'}`,
                                }
                            }}
                            determinate={true}
                            value={parseInt(caloriesBurntToday_value)}>
                            <Typography textColor={"#e5e5e5"}>{caloriesBurntToday_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.8rem] mt-1.5 text-neutral-200'}>
                            {calBurntProgress}{caloriesBurnGoals > 0 ? `/${caloriesBurnGoals}` : ""} Cal
                        </span>
                    </div>
                    <div className={"flex flex-col items-center text-center"}>
                        <span className={'text-[0.8rem] mb-1.5 text-neutral-300'}>
                            Hours of Sleep
                        </span>
                        <CircularProgress
                            sx={{
                                '.MuiCircularProgress-progress': {
                                    stroke: '#c135ee',
                                },
                                '.MuiCircularProgress-track': {
                                    stroke: `${sleep_value > 100 ? '#c135ee' : '#a1a0a0'}`,
                                }
                            }}
                            determinate={true}
                            value={parseInt(sleep_value)}>
                            <Typography textColor={"#e5e5e5"}>{sleep_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.8rem] mt-1.5 text-neutral-200'}>
                            {sleepProgress}{sleepGoals > 0 ? `/${sleepGoals}` : ""} Hrs
                        </span>
                    </div>
                    <div className={"flex flex-col items-center text-center"}>
                        <span className={'text-[0.8rem] mb-1.5 text-neutral-300'}>
                            Water Drank
                        </span>
                        <CircularProgress
                            sx={{
                                '.root': {
                                    '--CircularProgress-size': 'min(22vw, 100px)',
                                    '--CircularProgress-thickness': 'min(1.9vw, 12px)'
                                },
                                '.MuiCircularProgress-progress': {
                                    stroke: '#c135ee',
                                },
                                '.MuiCircularProgress-track': {
                                    stroke: `${water_value > 100 ? '#c135ee' : '#a1a0a0'}`,
                                }
                            }}
                            determinate={true}
                            value={parseInt(water_value)}>
                            <Typography textColor={"#e5e5e5"}>{water_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.8rem] mt-1.5 text-neutral-200'}>
                            {waterProgress}{waterGoals > 0 ? `/${waterGoals}` : ""} mL
                        </span>
                    </div>
                </div>

                <div className={"flex justify-between"}>
                    <Link to="/goals">
                        <button className={"mt-5 p-2 bg-emerald-500 rounded-xl text-[0.8em] text-black"}>
                            Edit Goals
                        </button>
                    </Link>

                    <Link to="/track" className={"self-end"}>
                        <button className={"mt-5 p-2 bg-emerald-500 rounded-xl text-[0.8em] text-black"}>
                            Continue tracking
                        </button>
                    </Link>
                </div>

            </div>

            <div className={"mx-4 my-2 mb-10 rounded-2xl p-2 flex justify-center flex-col bg-slate-300 text-black"}>

                <div
                    className={"ml-4 self-start flex flex-row gap-1 mt-3 text-purple-500 mb-4 text-xl justify-center content-center items-center"}>
                    <UtensilsCrossed/>
                    Food
                </div>

                <div className={"self-center gap-8 flex flex-row flex-wrap justify-center items-center content-center"}>
                    <div className={"flex flex-col items-center text-center"}>
                        <span className={'text-[0.8rem] mb-1.5 text-gray-700'}>
                            Protein (g)
                        </span>
                        <CircularProgress
                            sx={{
                                '.MuiCircularProgress-progress': {
                                    stroke: '#ab039d',
                                },
                                '.MuiCircularProgress-track': {
                                    stroke: `${proteinConsumed_value > 100 ? '#ab039d' : '#f3f2f2'}`,
                                }
                            }}
                            determinate={true}
                            value={parseInt(proteinConsumed_value)}>
                            <Typography textColor={"#494645"}>{proteinConsumed_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.8rem] mt-1.5 text-gray-700'}>
                            {proteinGainedProgress}{proteinGoals > 0 ? `/${proteinGoals}` : ""} g
                        </span>
                    </div>
                    <div className={"flex flex-col items-center text-center"}>
                        <span className={'text-[0.8rem] mb-1.5 text-gray-700'}>
                            Fats (g)
                        </span>
                        <CircularProgress
                            sx={{
                                '.MuiCircularProgress-progress': {
                                    stroke: '#98048d',
                                },
                                '.MuiCircularProgress-track': {
                                    stroke: `${fatGained_value > 100 ? '#98048d' : '#f3f2f2'}`,
                                }
                            }}
                            determinate={true}
                            value={parseInt(fatGained_value)}>
                            <Typography textColor={"#494645"}>{fatGained_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.8rem] mt-1.5 text-gray-700'}>
                            {fatGainedProgress}{fatsGoals > 0 ? `/${fatsGoals}` : ""} g
                        </span>
                    </div>
                    <div className={"flex flex-col items-center text-center"}>
                        <span className={'text-[0.8rem] mb-1.5 text-gray-700'}>
                            Carbohydrates
                        </span>
                        <CircularProgress
                            sx={{
                                '.MuiCircularProgress-progress': {
                                    stroke: '#7e0275',
                                },
                                '.MuiCircularProgress-track': {
                                    stroke: `${carbsConsumed_value > 100 ? '#7e0275' : '#f3f2f2'}`,
                                }
                            }}
                            determinate={true}
                            value={parseInt(carbsConsumed_value)}>
                            <Typography textColor={"#494645"}>{carbsConsumed_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.8rem] mt-1.5 text-gray-700'}>
                            {carbGainedProgress}{carbsGoals > 0 ? `/${carbsGoals}` : ""} Cal
                        </span>
                    </div>
                    <div className={"flex flex-col items-center text-center"}>
                        <span className={'text-[0.8rem] mb-1.5 text-gray-700'}>
                            Sugar
                        </span>
                        <CircularProgress
                            sx={{
                                '.MuiCircularProgress-progress': {
                                    stroke: '#7a0370',
                                },
                                '.MuiCircularProgress-track': {
                                    stroke: `${sugarConsumed_value > 100 ? '#7a0370' : '#f3f2f2'}`,
                                }
                            }}
                            determinate={true}
                            value={parseInt(sugarConsumed_value)}>
                            <Typography textColor={"#494645"}>{sugarConsumed_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.8rem] mt-1.5 text-gray-700'}>
                            {sugarGainedProgress}{sugarGoals > 0 ? `/${sugarGoals}` : ""} g
                        </span>
                    </div>
                </div>

            </div>

            <div className={"ml-6 text-[1.5rem] font-bold text-neutral-600"}>
                Progress History
            </div>

            <div className={"mx-4 flex gap-2 items-center content-center justify-center mt-3"}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        className={"px-0"}
                        label="From"
                        value={fromDate}
                        sx={{
                            '.MuiInputBase-input': {
                                padding: '0.5rem 0.25rem',
                                fontSize: '0.75rem',
                            }
                        }}
                        onChange={(newValue) => {
                            if (!toDate || newValue.isBefore(toDate, 'day')) {
                                setFromDate(newValue);
                            } else {
                                setFromDate(newValue);
                                setToDate(null);
                            }
                        }}
                        maxDate={toDate}
                    />
                    <div>
                        -
                    </div>
                    <DatePicker
                        label="To"
                        value={toDate}
                        sx={{
                            '.MuiInputBase-input': {
                                padding: '0.5rem 0.25rem',
                                fontSize: '0.75rem',
                            },
                            'MuiSvgIcon-fontSizeMedium': {
                                width: '0.75em'
                            }
                        }}
                        onChange={(newValue) => {
                            if (!fromDate || newValue.isAfter(fromDate, 'day')) {
                                setToDate(newValue);
                            } else {
                                setToDate(newValue);
                                setFromDate(null); // or set it to a valid date
                            }
                        }}
                        minDate={fromDate}
                    />
                </LocalizationProvider>

            </div>

            <div
                className={"flex flex-col md:grid md:grid-cols-2 justify-center content-center items-center text-center my-4 mx-4 gap-4"}>
                <div className={"bg-slate-300 rounded-lg flex justify-center content-center flex-col h-[30rem] w-full"}>
                    <div
                        className={"ml-4 self-start flex flex-row gap-1 mt-3 text-purple-500 text-xl justify-center content-center items-center"}>
                        <Weight/>
                        Weight
                    </div>
                    <div className={"self-center h-[90%] w-full"}>
                        {weightData.length > 0 && weightData[0].data.length > 0 ?
                            <MyResponsiveLine data={weightData} xLabel={"Weight (Kg)"} yLabel={"Date"}/> : <div
                                className={"flex w-full h-full justify-center items-center content-center text-2xl text-slate-600"}>
                                No data available for the dates chosen.
                            </div>}

                    </div>
                </div>


                <div className={"bg-slate-300 rounded-lg flex justify-center content-center flex-col h-[30rem] w-full"}>
                    <div
                        className={"ml-4 self-start flex flex-row gap-1 mt-3 text-purple-500 font-medium text-xl justify-center content-center items-center"}>
                        <GlassWater/>
                        Water
                    </div>
                    <div className={"self-center h-[90%] w-full"}>

                        {waterData.length > 0 && waterData[0].data.length > 0 ?
                            <MyResponsiveLine data={waterData} xLabel={"Water (mL)"} yLabel={"Date"}/> : <div
                                className={"flex w-full h-full justify-center items-center content-center text-2xl text-slate-600"}>
                                No data available for the dates chosen.
                            </div>}
                    </div>
                </div>
            </div>


            <div
                className={"flex flex-col md:grid md:grid-cols-2 justify-center content-center items-center text-center mx-4 gap-4"}>


                <div className={"bg-slate-300 rounded-lg flex justify-center content-center flex-col h-[25rem] w-full"}>
                    <div
                        className={"ml-4 self-start flex flex-row gap-1 mt-3 text-purple-500 text-xl justify-center content-center items-center"}>
                        <BedDouble/>
                        Sleep
                    </div>
                    <div className={"self-center h-full w-full"}>
                        {sleepData.length > 0  && sleepData[0].data.length > 0?
                            <MyResponsiveLine data={sleepData} xLabel={"Sleep (Hrs)"} yLabel={"Date"}/> : <div
                                className={"flex w-full h-full justify-center items-center content-center text-2xl text-slate-600"}>
                                No data available for the dates chosen.
                            </div>}
                    </div>
                </div>

                <div className={"bg-slate-300 rounded-lg flex justify-center content-center flex-col h-[25rem] w-full"}>
                    <div
                        className={"ml-4 self-start flex flex-row gap-1 mt-3 text-purple-500 text-xl justify-center content-center items-center"}>
                        <CakeSlice/>
                        Calories Consumed
                    </div>
                    <div className={"self-center h-full w-full"}>
                        {calConsumedData.length > 0  && calConsumedData[0].data.length > 0?
                            <MyResponsiveLine data={calConsumedData} xLabel={"Consumed (Cal)"} yLabel={"Date"}/> : <div
                                className={"flex w-full h-full justify-center items-center content-center text-2xl text-slate-600"}>
                                No data available for the dates chosen.
                            </div>}
                    </div>
                </div>

            </div>


            {/*<div className={"mx-4 my-4 rounded-2xl p-2 flex justify-center flex-col bg-slate-300 text-black"}>*/}

            {/*    <div*/}
            {/*        className={"ml-4 self-start flex flex-row gap-1 mt-3 text-purple-500 mb-4 text-xl justify-center content-center items-center"}>*/}
            {/*        <Dumbbell/>*/}
            {/*        Workouts*/}
            {/*    </div>*/}

            {/*    <div className={"self-center gap-8 flex flex-row flex-wrap justify-center items-center content-center"}>*/}


            {/*        <div className={"flex flex-col items-center text-center"}>*/}
            {/*            <span className={'text-[0.8rem] mb-1.5 text-gray-700'}>*/}
            {/*                Workout Minutes*/}
            {/*            </span>*/}
            {/*            <CircularProgress*/}
            {/*                sx={{*/}
            {/*                    '.MuiCircularProgress-progress': {*/}
            {/*                        stroke: workoutMinutes > 0 ? '#72be73' : '#be3636',*/}
            {/*                    },*/}
            {/*                }}*/}
            {/*                determinate={true}*/}
            {/*                value={workoutMinutes_value}>*/}
            {/*                <Typography textColor={"#494645"}>{workoutMinutes_value}%</Typography>*/}
            {/*            </CircularProgress>*/}

            {/*            <span*/}
            {/*                className={'text-[0.8rem] mt-1.5 text-gray-700 flex flex-row justify-center content-center items-center gap-1'}>*/}
            {/*                24 min <MoveRight size={"15"}/> 45 min*/}
            {/*            </span>*/}
            {/*        </div>*/}


            {/*        <div className={"flex flex-col items-center text-center"}>*/}
            {/*            <span className={'text-[0.8rem] mb-1.5 text-gray-700'}>*/}
            {/*                Calories Burnt*/}
            {/*            </span>*/}
            {/*            <CircularProgress*/}
            {/*                sx={{*/}
            {/*                    '.MuiCircularProgress-progress': {*/}
            {/*                        stroke: caloriesBurnt > 0 ? '#72be73' : '#be3636',*/}
            {/*                    },*/}
            {/*                }}*/}
            {/*                determinate={true}*/}
            {/*                value={parseInt(caloriesBurnt_value)}>*/}
            {/*                <Typography textColor={"#494645"}>{caloriesBurnt_value}%</Typography>*/}
            {/*            </CircularProgress>*/}

            {/*            <span*/}
            {/*                className={'text-[0.8rem] mt-1.5 text-gray-700 flex flex-row justify-center content-center items-center gap-1'}>*/}
            {/*                530 Cal <MoveRight size={"15"}/> 480 Cal*/}
            {/*            </span>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*</div>*/}

            <div
                className={"flex flex-col md:grid md:grid-cols-2 justify-center content-center items-center text-center mx-4 gap-4 mb-6 my-4"}>


                <div className={"bg-slate-300 rounded-lg flex justify-center content-center flex-col h-[25rem] w-full"}>
                    <div
                        className={"ml-4 self-start flex flex-row gap-1 mt-3 text-purple-500 text-xl justify-center content-center items-center"}>
                        <Timer/>
                        Workout Duration
                    </div>
                    <div className={"self-center h-full w-full"}>
                        {workoutDurationData.length > 0 && workoutDurationData[0].data.length > 0 ?
                            <MyResponsiveLine data={workoutDurationData} xLabel={"Duration (Min)"} yLabel={"Date"}/> :
                            <div
                                className={"flex w-full h-full justify-center items-center content-center text-2xl text-slate-600"}>
                                No data available for the dates chosen.
                            </div>}
                    </div>
                </div>

                <div className={"bg-slate-300 rounded-lg flex justify-center content-center flex-col h-[25rem] w-full"}>
                    <div
                        className={"ml-4 self-start flex flex-row gap-1 mt-3 text-purple-500 text-xl justify-center content-center items-center"}>
                        <Flame/>
                        Calories Burnt
                    </div>
                    <div className={"self-center h-full w-full"}>
                        {calBurntData.length > 0 && calBurntData[0].data.length > 0 ?
                            <MyResponsiveLine data={calBurntData} xLabel={"Burnt (Cal)"} yLabel={"Date"}/> :
                            <div className={"flex w-full h-full justify-center items-center content-center text-2xl text-slate-600"}>
                                No data available for the dates chosen.
                            </div>
                        }
                    </div>
                </div>

            </div>


        </div>
    )
}