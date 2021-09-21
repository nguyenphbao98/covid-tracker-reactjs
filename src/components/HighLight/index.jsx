import { Grid } from '@material-ui/core';
import React from 'react';
import HighLightCard from './HighLightCard';

function HighLight({report}) {

    const data = report && report.length ? report[report.length - 1] : [];

    const summary = [
        {
            title: 'Số ca nhiễm',
            count : data.Confirmed,
            type: 'confirmed',
        },

        {
            title: 'Số ca khỏi',
            count : data.Recovered,
            type: 'recovered',
        },

        {
            title: 'Số ca tử vong',
            count : data.Deaths,
            type: 'death',
        }
    ]
    return (
        <Grid spacing={3} container>
            { summary.map((item) => {
                return (
                    <Grid item sm={4} xs={12} key={item.type}>
                        <HighLightCard title={item.title} count={item.count} type={item.type} />
                    </Grid>
                )
            })}
        </Grid>
    );
}

export default HighLight;