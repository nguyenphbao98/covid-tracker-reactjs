import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import LineChart from '../Charts/LineChart';
import HighMap from '../Charts/MapChart';

function Summary({report, selectedCountryId}) {

    const [mapData,setMapData] = useState({})
    useEffect(() => {
        if(selectedCountryId){
            import(`@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`)
            .then(res => setMapData(res));
        }
    },[selectedCountryId])

    // console.log("here");
    return (
        <Grid spacing={3} container>
            <Grid sm={8} xs={12} item>
                <LineChart data={report} />
            </Grid>

            <Grid sm={4} xs={12} item>
                <HighMap mapData={mapData} />
            </Grid>
        </Grid>
    );
}

export default Summary;