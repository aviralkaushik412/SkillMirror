import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const DifficultyDonutChart = ({ solvedData }) => {

  const data = solvedData;
  const totalSolved = data.reduce((sum, item) => sum + item.solved, 0);
  const totalProblems = data.reduce((sum, item) => sum + item.total, 0);


  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };
  const normalizedData = data.map(item => ({
    ...item,
    value: item.total > 0 ? (item.solved / item.total) * 100 : 0
  }));
  const backgroundData = [{ value: 100, color: '#374151' }];

  return (
    <div className="relative w-full h-80 bg-gray-800 rounded-xl p-4 shadow-md flex flex-col">
      <div className="flex-1 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={backgroundData}
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="90%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell key="cell-background" fill="#374151" />
            </Pie>

            <Pie
              data={normalizedData.filter(item => item.solved > 0)}
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="90%"
              paddingAngle={0}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              startAngle={90}
              endAngle={-270}
            >
              {normalizedData.filter(item => item.solved > 0).map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.7}
                />
              ))}
            </Pie>
            
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'transparent' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-4xl font-bold text-white">{totalSolved}</div>
          <div className="text-sm text-gray-300 mt-1">Solved</div>
          <div className="text-xs text-gray-400 mt-1">{totalProblems} Total</div>
        </div>
      </div>

      <div className="mt-4 flex justify-center space-x-6">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="flex items-center mb-1">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-white text-sm font-medium">{item.name}</span>
            </div>
            <span className="text-gray-300 text-xs">
              {item.solved}/{item.total}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-700 p-3 rounded-lg border border-indigo-400 text-white shadow-lg min-w-[120px]">
        <p className="font-bold text-center">{data.name}</p>
        <div className="mt-2 text-center">
          <p className="text-sm">
            <span style={{ color: data.color }}>{data.solved}</span>/{data.total}
          </p>
          <p className="text-xs mt-1">
            {Math.round((data.solved / data.total) * 100)}% complete
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default DifficultyDonutChart;