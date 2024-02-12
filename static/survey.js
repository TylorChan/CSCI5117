// Trigger the conditional field in question4
function TriggerConditional_1() {
    var checkbox = document.getElementById("q4_5");
    console.log(checkbox)
    var textarea = document.getElementById("conditional_1");
    console.log(checkbox)
    textarea.style.display = checkbox.checked ? "block" : "none";
}

// Chart for question
const data_table = [
    ["id", "Q2. What is your favorite Marvel movies?", "Q5. Do you think superheroes movie becomes less attractive? Why? or Why not?"]
];// This dataset is used for creating table for text question

count = {"q1":{}, "q3":{}, "q4":{}, "date":{}} // collect the total count of each value

id = 1 // making an incremetal number

for(const element of serverData1){
    q1_answer = element["q1"]
    q2_answer = element["q2"]
    q3_answer = element["q3"]
    q4_answer = element["q4"]
    date = element["date"]
    q5_answer = element["q5"]

    // create the list for our text table
    data_table.push([id, q2_answer, q5_answer])

    // make a dictionary for our chart
    if(q1_answer in count["q1"]){
        count["q1"][q1_answer]++
    }else{
        count["q1"][q1_answer]= 1
    }

    if(q3_answer in count["q3"]){
        count["q3"][q3_answer]++
    }else{
        count["q3"][q3_answer]= 1
    }

    for(const each of q4_answer){
        if(each != ""){
            if(each in count["q4"]){
                count["q4"][each]++
            }else{
                count["q4"][each]= 1
            }
        }
    }

    if(date in count["date"]){
        count["date"][date]++
    }else{
        count["date"][date]= 1
    }

    id++;
}
console.log(count)
console.log(serverData1)

let datasets_q = []  // store the count of anwser of question q1, q3 and q4. Use it in chart

for(const key in count){
    for(const key1 in count[key]){
        if(key == "q1"){
            datasets_q.push({label:key1, data:[count[key][key1],0,0], backgroundColor:'#fefefe'})
        }else if(key == "q3"){
            datasets_q.push({label:key1, data:[0,count[key][key1],0], backgroundColor:'#fefefe'})
        }else if(key == "q4"){
            datasets_q.push({label:key1, data:[0,0,count[key][key1]], backgroundColor:'#fefefe'})
        }
    }
}

ctx = document.getElementById('myChart')
const surveyData = {
    labels: ['Q1. Had you seen the Marvel movies before', 'Q3. Which character from a Marvel movie do you like the best', 'Q4. What are your favorite super powers?'],
    datasets: datasets_q
    // datasets: [
    //     {
    //         label: 'Yes (Q1)',
    //         data: [3,0,0], // countYesQ1: number of 'Yes' answers for Question 1
    //         backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //     },
    //     {
    //         label: 'No (Q1)',
    //         data: [4, 0, 0], // countNoQ1: number of 'No' answers for Question 1
    //         backgroundColor: 'rgba(54, 162, 235, 0.2)',
    //     },
    //     {
    //         label: 'Black Panther (Q3)',
    //         data: [0, 5, 0], // countBP: number of 'Black Panther' answers for Question 3
    //         backgroundColor: 'rgba(255, 206, 86, 0.2)',
    //     },
    //     // ... Add other characters with their counts here
    //     {
    //         label: 'Super Strength (Q4)',
    //         data: [0, 0, 6], // countSS: number of 'Super Strength' answers for Question 4
    //         backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //     },
    //     {
    //         label: 'Flight (Q4)',
    //         data: [0, 0, 7], // countFlight: number of 'Flight' answers for Question 4
    //         backgroundColor: 'rgba(153, 102, 255, 0.2)',
    //     },
    //     {
    //         label: 'Flight (Q4)',
    //         data: [0, 0, 7], // countFlight: number of 'Flight' answers for Question 4
    //         backgroundColor: 'rgba(153, 102, 255, 0.2)',
    //     },
    //     {
    //         label: 'Flight (Q4)',
    //         data: [0, 0, 7], // countFlight: number of 'Flight' answers for Question 4
    //         backgroundColor: 'rgba(153, 102, 255, 0.2)',
    //     }
    //     // ... Add other superpowers with their counts here
    // ]
};
const config = {
    type: 'bar',
    data: surveyData,
    plugins: [ChartDataLabels],
    options: {
        scales: {
            x: {
                stacked: false,
                ticks:{
                    color: 'white',
                },
                grid:{
                    color:'white'
                }
            },
            y: {
                beginAtZero: true,
                ticks:{
                    color: 'white',
                },
                grid:{
                    color:'white'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                anchor:"center",
                align:"center",
                formatter: function(value, context) {
                    if(value > 0){
                        return
                    }else{
                        return ""
                    }
                }
            },
            title: {
                display: true,
                text: 'Summary of Q1, Q3 and Q4 (choice/checkbox)',
                color: 'white' // Title text color
            }
        }
    }
};
const myChart = new Chart(
    ctx,
    config
);



// Chart for timeseries
datasets_timeseries = []
timeseries_labels = []
for(const key in count["date"]){
    timeseries_labels.push(key)
    datasets_timeseries.push(count["date"][key])
}
const data_t = {
  labels: timeseries_labels,
  datasets: [{
    label: 'Timeseries Chart',
    data: datasets_timeseries,
    backgroundColor: [
      '#fefefe'
    ],
    borderColor: [
      '#FFFFFF'
    ]
  }]
};
const config_t = {
    type: 'bar',
    data: data_t,
    plugins: [ChartDataLabels],
    options: {
        scales: {
            x: {
                stacked: false,
                ticks:{
                    color: 'white',
                },
                grid:{
                    color:'white'
                }
            },
            y: {
                beginAtZero: true,
                ticks:{
                    color: 'white',
                },
                grid:{
                    color:'white'
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'white' // Legend labels color
                }
            },
            title: {
                display: true,
                text: 'Timeseries Chart',
                color: 'white' // Title text color
            }
        }
    },
};

// create chart for timeseries chart
ctx_t = document.getElementById('timeseriesChart')
const myChart_t = new Chart(
    ctx_t,
    config_t
);

// Change the font size globally
Chart.defaults.font.size = 14.4;

// Create table
function generateTable(data) {
    const table = document.createElement("table");
    table.className = "pure-table"
    const thead = table.createTHead();
    const tbody = table.createTBody();

    // Create header row
    const headerRow = thead.insertRow();
    for (let headerText of data[0]) {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    }

    // Create body rows
    for (let i = 1; i < data.length; i++) {
        const row = tbody.insertRow();
        for (let cellText of data[i]) {
        const cell = row.insertCell();
        cell.textContent = cellText;
        }
    }

    // Append the table to the container
    document.getElementById("table").appendChild(table);
}

// Call the function with your data
generateTable(data_table);
  

//// test chart
// new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: ['foo', 'bar'],
//       datasets: [{
//         data: [42, 24]
//       }]
//     },
//     plugins: [ChartDataLabels],
//     options: {
//         plugins: {
//             legend: {
//                 display: false
//             },
//             datalabels: {
//                 formatter: function(value, context) {
//                     return context.chart.data.labels[context.dataIndex];;
//                 }
//             }
//         }
//     }
//   });
  
