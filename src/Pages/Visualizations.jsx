import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar } from 'react-chartjs-2';

const Visualizations = () => {
const [stats, setStat] = useState([]);
// const[projectStats, setProjectStat] = useState([]);
const [chartData, setChartData] = useState(null);

const money = (amount) => {
  return Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      notation: 'compact',
      compactDisplay: 'short'
  }).format(amount);

}

  useEffect(() => {
    const fetchStat = async () => {
      try {
        const res = await axios.get('https://api.edostateocds.cloudware.ng/api/v1/stats')
        setStat(res.data);
      } catch (error) {
        console.log('Error Fetching data', error);
      }
    };
      fetchStat();
  }, [])
  console.log(stats)

  useEffect(() => {
  }, [stats])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.edostateocds.cloudware.ng/api/v1/stats/projects');
        const data = await response.json();

        // Assuming the API response has a property named 'data' containing the required data
        const projects = data.projects;

        // Extracting labels and values for the chart
        const labels = projects.map((project) => project.year);
        const values = projects.map((project) => project.total);

        // Creating the chart data
        const chartData = {
          labels: values,
          datasets: [
            {
              label: 'Project Count',
              data: labels,
              backgroundColor: 'rgba(75,192,192,0.6)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className='py-32'>
       <div className="bg-[url('./assets/table.png')] bg-cover bg-center bg-no-repeat py-20">
          <h1 className="text-gray-50 pl-16 text-3xl">Visualizations</h1>
      </div>

        <div className='max-w-6xl mx-auto flex flex-col sm:grid grid-cols-3 py-4 gap-4'>
                <div className='shadow-xl flex flex-col text-center py-6 rounded-xl mt-6'>
                  <div className='text-4xl font-bold text-green-900'>
                    {stats.projects}+
                  </div>
                  <div className='pt-4 text-2xl font-semibold'>Projects</div>
                  <div className='text-2xl py-2'>Total Projects</div>
                </div>

                <div className='shadow-xl flex flex-col text-center py-6 rounded-xl mt-6'>
                  <div className='text-4xl font-bold text-green-900'>
                    {stats.awards}+
                  </div>
                  <div className='pt-4 text-2xl font-semibold'>Awards</div>
                  <div className='text-2xl py-2'>Total Awards</div>
                </div>

                <div className='shadow-xl flex flex-col text-center py-6 rounded-xl mt-6'>
                  <div className='text-4xl font-bold text-green-900'>
                    {stats.contracts}+
                  </div>
                  <div className='pt-4 text-2xl font-semibold'>Contracts</div>
                  <div className='text-2xl py-2'>Total Contracts</div>
                </div>

                <div className='shadow-xl flex flex-col text-center py-6 rounded-xl mt-6'>
                  <div className='text-4xl font-bold text-green-900'>
                    {money(stats.tender_sum)}
                  </div>
                  <div className='pt-4 text-2xl font-semibold'>Tender</div>
                  <div className='text-2xl font-semibold'>Total Tenders Amount</div>
                </div>

                <div className='shadow-xl flex flex-col text-center py-6 rounded-xl mt-6'>
                  <div className='text-4xl font-bold text-green-900'>
                    {money(stats.award_sum)}
                  </div>
                  <div className='pt-4 text-2xl font-semibold'>Award</div>
                  <div className='text-2xl py-2'>Total Awards Amount</div>
                </div>

                <div className='shadow-xl flex flex-col text-center py-6 rounded-xl mt-6'>
                  <div className='text-4xl font-bold text-green-900'>
                    {money(stats.contract_sum)}
                  </div>
                  <div className='pt-4 text-2xl font-semibold'>Contrats</div>
                  <div className='text-2xl py-2'>Total Contracts Amount</div>
                </div>
          </div>

          <div>
              {chartData && (
                <Bar
                  data={chartData}
                  options={{
                    scales: {
                      x: {
                        type: 'category',
                        title: 
                        { display: true, text: 'Year' },
                        offsetX: 0,
                        offsetY: 90
                        
                        },
                      y: { 
                        type: 'category',
                        title: { display: true, text: 'Total' } 
                        
                        },
                    },
                    plugins: {
                      legend: { display: true, position: 'top'},
                      title: { display: true, text: 'Projects by Status'},
                    },
                  }}
                />
              )}
    </div>
    </div>
  )
}

export default Visualizations