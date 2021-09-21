import React, { useEffect, useState } from 'react';
import HighChart from 'highcharts';
import HighChartReact from 'highcharts-react-official';
import moment from 'moment';
import { Button, ButtonGroup } from '@material-ui/core';

const generateOption = (data) => {
    const categories = data.map((item) => moment(item.Date).format('DD/MM/YYYY'));
    return {
        chart: {
            height: 500
        },
        title: {
            text: "Tổng ca nhiễm"
        },
        xAxis: {
            categories: categories,
            crosshair: true,
        },
        colors: ['#F35858'],
        yAxis: {
            min: 0,
            title: {
                text: null
            },
        },
        tooltip: {
            headerFormat: '<span style="font-size: 10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color: {series.color}; padding: 0">{series.name}: </td>'+
                '<td style="padding: 0"><b>{point.y} ca</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            }
        },
        series: {
            name: "Tổng ca nhiễm",
            data: data.map((item) => item.Confirmed)
        }
    }
}

function LineChart({data}) {

    // console.log(customData);
    const [options,setOption] = useState({});
    const [reportType,setReportType] = useState('all');

    useEffect(() => {
        // change report type by filter date

        let customData = [];
        switch(reportType){
            case 'all': {
                    customData = data;
                    break;
                }

            case '30': {
                    customData = data.splice(data.length - 30);
                break;
            }

            case '7': {
                    customData = data.splice(data.length - 7);
                break;
            }
            default:
                customData = data;
            break;
        }
        
        
        setOption(generateOption(customData))
    },[data, reportType])

    return (
        <div>
            <ButtonGroup size='small' style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button color={reportType === 'all' ? 'secondary' : ''} onClick={() => setReportType('all')}>Tất cả</Button>
                <Button color={reportType === '30' ? 'secondary' : ''} onClick={() => setReportType('30')}>30 ngày</Button>
                <Button color={reportType === '7' ? 'secondary' : ''} onClick={() => setReportType('7')}>7 ngày</Button>
            </ButtonGroup>
            <HighChartReact
                highcharts={HighChart}
                options={options}
            />
        </div>
    );
}

export default LineChart;