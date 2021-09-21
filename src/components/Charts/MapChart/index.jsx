import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap  from 'highcharts/modules/map';
import { cloneDeep } from 'lodash';

highchartsMap(Highcharts);

const initOption = {
    chart: {
        height: 500
    },
    title: {
        text: null
    },
    mapNavigation: {
        enabled: true
    },
    colorAxis: {
        min: 0,
        stops: [
            [0.2, "#ffc4aa"],
            [0.4, "#ff8a66"],
            [0.6, "#ff392b"],
            [0.8, "#b71525"],
            [1, "#7a0826"]
        ]
    },
    legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "bottom"
    },
    series: [
        {
            mapData: {},
            name: "Dân số",
            joinBy: ['hc-key','key']
        }
    ]
}

const HighMap = ({mapData}) => {
    const [options, setOptions] = useState({});
    const [configLoaded, setConfigLoaded] = useState(false);
    const chartRef = useRef(null);

    useEffect(() => {
        if(mapData && Object.keys(mapData).length) {
            const fakeData = mapData.features.map((feature, index) => ({
                key: feature.properties['hc-key'],
                value: index,
            }));
    
            setOptions({
                ...initOption,
                series: [
                    {
                        ...initOption.series[0],
                        mapData,
                        data: fakeData
                    }
                ],
            });

            if(!configLoaded) setConfigLoaded(true);
        }
    },[mapData,configLoaded]);

    useEffect(() => {
        if(chartRef && chartRef.current){
            chartRef.current.chart.series[0].update({
                mapData,
            })
        }
    },[mapData])
    
    if(!configLoaded) return null;

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={cloneDeep(options)}
            constructorType={'mapChart'}
            ref={chartRef}
        />
    )
}

HighMap.defaultProps = {
    mapData: {},
};
  
export default React.memo(HighMap);
