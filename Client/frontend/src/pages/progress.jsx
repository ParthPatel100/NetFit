import CircularProgress from '@mui/joy/CircularProgress';
import { useCountUp } from 'use-count-up';
import Typography from '@mui/joy/Typography';
import {GlassWater, Weight, UtensilsCrossed, Dumbbell, BedDouble, MoveRight} from "lucide-react";

import dayjs from 'dayjs';

import React, {useState} from 'react';
import {Link} from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {ResponsiveLine} from "@nivo/line";
import {sleepData, waterData, weightData} from "../utils/ProgressData.js";


const MyResponsiveLine = ({data, xLabel, yLabel}) => {
    const minYValue = Math.min(...data[0].data.map(item => item.y));
    return (<ResponsiveLine
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

        margin={{ top: 30, right: 30, bottom: 50, left: 70 }}
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
            tickRotation: 0,
            legend: yLabel,
            legendOffset: 36,
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
    const [fromDate, setFromDate] = useState(dayjs('2022-04-17'));
    const [toDate, setToDate] = useState(dayjs('2022-04-17'));
    const duration = 1;
    const workoutMinutes = 87

    const { value: workoutMinutes_value, workoutMinutes_reset } = useCountUp({
        isCounting: true,
        duration: duration,
        start: 0,
        end: workoutMinutes,
    });
    const caloriesGained = -49
    const { value: caloriesGained_value, caloriesGained_reset } = useCountUp({
        isCounting: true,
        duration: duration,
        start: 0,
        end: caloriesGained,
    });
    const caloriesBurnt = 94
    const { value: caloriesBurnt_value, caloriesBurnt_reset } = useCountUp({
        isCounting: true,
        duration: duration,
        start: 0,
        end: caloriesBurnt,
    });
    const sleep = 90
    const { value: sleep_value, sleep_reset } = useCountUp({
        isCounting: true,
        duration: duration,
        start: 0,
        end: sleep,
    });
    const water = 87
    const { value: water_value, water_reset } = useCountUp({
        isCounting: true,
        duration: duration,
        start: 0,
        end: water,
    });



    return(

        <div className={"flex md:mt-14 md:ml-[12rem] mb-16 md:mb-0 flex-col"}>
            <div
                className={"border-black border mx-4 mb-10 my-2 rounded-2xl p-2 flex justify-center flex-col bg-gray-800 text-white"}>

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
                                '.MuiCircularProgress-track':{
                                    stroke: '#a1a0a0',
                                }
                            }}
                            determinate={true}
                            value={parseInt(workoutMinutes_value)}>
                            <Typography textColor={"#e5e5e5"}>{workoutMinutes_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.6rem] mt-1.5 text-neutral-200 '}>
                            45/75 Min
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
                                '.MuiCircularProgress-track':{
                                    stroke: '#a1a0a0',
                                }
                            }}
                            determinate={true}
                            value={parseInt(caloriesGained_value)}>
                            <Typography textColor={"#e5e5e5"}>{caloriesGained_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.6rem] mt-1.5 text-neutral-200'}>
                            1400/4000 Cal
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
                                '.MuiCircularProgress-track':{
                                    stroke: '#a1a0a0',
                                }
                            }}
                            determinate={true}
                            value={parseInt(caloriesBurnt_value)}>
                            <Typography textColor={"#e5e5e5"}>{caloriesBurnt_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.6rem] mt-1.5 text-neutral-200'}>
                            400/900 Cal
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
                                '.MuiCircularProgress-track':{
                                    stroke: '#a1a0a0',
                                }
                            }}
                            determinate={true}
                            value={parseInt(sleep_value)}>
                            <Typography textColor={"#e5e5e5"}>{sleep_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.6rem] mt-1.5 text-neutral-200'}>
                            7.5/8 Hrs
                        </span>
                    </div>
                    <div className={"flex flex-col items-center text-center"}>
                        <span className={'text-[0.8rem] mb-1.5 text-neutral-300'}>
                            Water Drank
                        </span>
                        <CircularProgress
                            sx={{
                                '.MuiCircularProgress-progress': {
                                    stroke: '#c135ee',
                                },
                                '.MuiCircularProgress-track':{
                                    stroke: '#a1a0a0',
                                }
                            }}
                            determinate={true}
                            value={parseInt(water_value)}>
                            <Typography textColor={"#e5e5e5"}>{water_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.6rem] mt-1.5 text-neutral-200'}>
                            640/2000 mL
                        </span>
                    </div>
                </div>

                <Link to="/track" className={"self-end"}>
                    <button className={"mt-5 p-2 bg-sky-700 rounded-xl text-[0.8em] text-white"}>
                        Continue tracking
                    </button>
                </Link>
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
                className={"flex flex-col md:grid md:grid-cols-2 justify-center content-center items-center text-center mt-4 mx-4 gap-4"}>
                <div className={"bg-slate-300 rounded-lg flex justify-center content-center flex-col h-[25rem] w-full"}>
                    <div className={"ml-4 self-start flex flex-row gap-1 mt-3 text-gray-700"}>
                        <Weight/>
                        Weight
                    </div>
                    <div className={"self-center h-full w-full"}>
                        <MyResponsiveLine data={weightData} xLabel={"Weight (Kg)"} yLabel={"Month"}/>
                    </div>
                </div>


                <div className={"bg-slate-300 rounded-lg flex justify-center content-center flex-col h-[25rem] w-full"}>
                    <div className={"ml-4 self-start flex flex-row gap-1 mt-3 text-gray-700"}>
                        <GlassWater/>
                        Water
                    </div>
                    <div className={"self-center h-full w-full"}>
                        <MyResponsiveLine data={waterData} xLabel={"Water (mL)"} yLabel={"Month"}/>
                    </div>
                </div>
            </div>

            <div className={"mx-4 my-4 rounded-2xl p-2 flex justify-center flex-col bg-slate-300 text-black"}>

                <div className={"ml-4 self-start flex flex-row gap-1 mt-3 text-gray-700 mb-4"}>
                    <UtensilsCrossed/>
                    Food
                </div>

                <div className={"self-center gap-8 flex flex-row flex-wrap justify-center items-center content-center"}>
                    <div className={"flex flex-col items-center text-center"}>
                        <span className={'text-[0.8rem] mb-1.5 text-gray-7000'}>
                            Calories Consumed
                        </span>
                        <CircularProgress
                            sx={{
                                '.MuiCircularProgress-progress': {
                                    stroke: '#c204b2',
                                },
                            }}
                            determinate={true}
                            value={parseInt(workoutMinutes_value)}>
                            <Typography textColor={"#494645"}>{workoutMinutes_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.6rem] mt-1.5 text-gray-700'}>
                            1500/2000 Cal
                        </span>
                    </div>

                    <div className={"flex flex-col items-center text-center"}>
                        <span className={'text-[0.8rem] mb-1.5 text-gray-700'}>
                            Protein (g)
                        </span>
                        <CircularProgress
                            sx={{
                                '.MuiCircularProgress-progress': {
                                    stroke: '#ab039d',
                                },
                            }}
                            determinate={true}
                            value={parseInt(caloriesGained_value)}>
                            <Typography textColor={"#494645"}>{caloriesGained_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.6rem] mt-1.5 text-gray-700'}>
                            35/50 g
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
                            }}
                            determinate={true}
                            value={parseInt(caloriesBurnt_value)}>
                            <Typography textColor={"#494645"}>{caloriesBurnt_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.6rem] mt-1.5 text-gray-700'}>
                            10/25 g
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
                            }}
                            determinate={true}
                            value={parseInt(sleep_value)}>
                            <Typography textColor={"#494645"}>{sleep_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.6rem] mt-1.5 text-gray-700'}>
                            75/100 Carbs
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
                            }}
                            determinate={true}
                            value={parseInt(water_value)}>
                            <Typography textColor={"#494645"}>{water_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.6rem] mt-1.5 text-gray-700'}>
                            25/40 g
                        </span>
                    </div>
                </div>

            </div>

            <div className={"mx-4 my-4 mt-0 rounded-2xl p-2 flex justify-center flex-col bg-slate-300 text-black"}>

                <div className={"ml-4 self-start flex flex-row gap-1 mt-3 text-gray-700 mb-4"}>
                    <Dumbbell/>
                    Workouts
                </div>

                <div className={"self-center gap-8 flex flex-row flex-wrap justify-center items-center content-center"}>
                    <div className={"flex flex-col items-center text-center"}>
                        <span className={'text-[0.8rem] mb-1.5 text-gray-7000'}>
                            Calories Consumed
                        </span>
                        <CircularProgress
                            sx={{
                                '.MuiCircularProgress-progress': {
                                    stroke: '#08d958',
                                },
                            }}
                            determinate={true}
                            value={parseInt(workoutMinutes_value)}>
                            <Typography textColor={"#494645"}>{workoutMinutes_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.6rem] mt-1.5 text-gray-700'}>
                            1500/2000 Cal
                        </span>
                    </div>

                    <div className={"flex flex-col items-center text-center"}>
                        <span className={'text-[0.8rem] mb-1.5 text-gray-700'}>
                            Workout Minutes
                        </span>
                        <CircularProgress
                            sx={{
                                '.MuiCircularProgress-progress': {
                                    stroke: caloriesGained_value > 0 ? '#59ad48' : '#bb1313',
                                },
                            }}
                            determinate={true}
                            value={parseInt(caloriesGained_value)}>
                            <Typography textColor={"#494645"}>{caloriesGained_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.6rem] mt-1.5 text-gray-700 flex flex-row justify-center content-center items-center gap-1'}>
                            24 min <MoveRight size={"15"}/> 50 min
                        </span>
                    </div>
                    <div className={"flex flex-col items-center text-center"}>
                        <span className={'text-[0.8rem] mb-1.5 text-gray-700'}>
                            Fats (g)
                        </span>
                        <CircularProgress
                            sx={{
                                '.MuiCircularProgress-progress': {
                                    stroke: '#089d43',
                                },
                            }}
                            determinate={true}
                            value={parseInt(caloriesBurnt_value)}>
                            <Typography textColor={"#494645"}>{caloriesBurnt_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.6rem] mt-1.5 text-gray-700'}>
                            10/25 g
                        </span>
                    </div>
                    <div className={"flex flex-col items-center text-center"}>
                        <span className={'text-[0.8rem] mb-1.5 text-gray-700'}>
                            Calories Burnt
                        </span>
                        <CircularProgress
                            sx={{
                                '.MuiCircularProgress-progress': {
                                    stroke: '#206c3e',
                                },
                            }}
                            determinate={true}
                            value={parseInt(caloriesBurnt_value)}>
                            <Typography textColor={"#494645"}>{sleep_value}%</Typography>
                        </CircularProgress>

                        <span className={'text-[0.6rem] mt-1.5 text-gray-700 flex flex-row justify-center content-center items-center gap-1'}>
                            530 Cal <MoveRight size={"15"}/> 480 Cal
                        </span>
                    </div>
                </div>

            </div>

            <div
                className={"flex flex-col md:grid md:grid-cols-2 justify-center content-center items-center text-center mx-4 gap-4 mb-4"}>
                <div className={"bg-slate-300 rounded-lg flex justify-center content-center flex-col h-[25rem] w-full"}>
                    <div className={"ml-4 self-start flex flex-row gap-1 mt-3 text-gray-700"}>
                        <BedDouble/>
                        Sleep
                    </div>
                    <div className={"self-center h-full w-full"}>
                        <MyResponsiveLine data={sleepData} xLabel={"Sleep (Hrs)"} yLabel={"Month"}/>
                    </div>
                </div>


            </div>

        </div>
    )
}