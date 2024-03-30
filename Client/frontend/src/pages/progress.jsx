import {CartesianGrid, Line, XAxis, YAxis, LineChart, Tooltip, Label} from "recharts";
import CircularProgress from '@mui/joy/CircularProgress';
import { useCountUp } from 'use-count-up';
import Typography from '@mui/joy/Typography';


import React from 'react';


export default function Progress(){
    const progressWeight = 50
    const { value: value2, reset } = useCountUp({
        isCounting: true,
        duration: 1,
        start: 0,
        end: progressWeight,
    });

    let counter = 0
    const data = [{name: '1', uv: 400, pv: 2400, amt: 2400}, {name: '2', uv: 200, pv: 2800, amt: 240}, {name: '3', uv: 200, pv: 2800, amt: 240}];
    const percentage = 66;
    return(

        <div className={"flex md:mt-16 md:ml-[12.5rem]"}>
        <LineChart width={600} height={400} data={data} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
            <Line type="monotone" dataKey="pv" stroke="purple" />
                <XAxis dataKey="name" padding={{ left: 20, right: 20 }}>
                    <Label value="Pages" position="insideBottom" offset={-10}  />
                </XAxis>
                <YAxis />
            <Tooltip />
        </LineChart>


            <div className={"progress-bar"}>
                <CircularProgress
                    determinate={true}
                    value={parseInt(value2)} className={""}>
                    <Typography>{value2}%</Typography>
                </CircularProgress>
            </div>






        </div>
    )
}