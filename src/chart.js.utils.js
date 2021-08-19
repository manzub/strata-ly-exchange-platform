import { getChartData } from "./api"
// getChartData()
// const chart_data = JSON.parse(window.localStorage.getItem('chart_data'))
const chart_data =  [
    "0.000009344995320773777","0.000009344995320773777","0.000009344995320773777","0.000009344995320773777","0.000009344995320773777","0.000009344995320773777","0.000009344995320773777","0.000009344995320773777","0.000009344995320773777","0.000009344995320773777","0.000009344995320773777","0.000009344995320773777","0.000009344995320773777",""
]

export const lineChartData = {
    type:"line",
    data: {
        labels: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
        datasets: [
            {
                data: chart_data,
                borderColor: "#6236FF",
                borderWidth: 3
            }
        ]
    },
    options:{
        plugins:{
            legend:{display:false},
        }
    }
}