"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { MonthlyResultRow } from "@/app/page";



interface SalesCostLineChartProps {
  data: MonthlyResultRow[];
}

const SalesCostLineChart: React.FC<SalesCostLineChartProps> = ({ data }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data.length || !chartRef.current) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .html("") // Clear previous content
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Accessor functions
    const getId = (d: MonthlyResultRow) => d.id;
    const getSales = (d: MonthlyResultRow) => d.sales;
    const getCost = (d: MonthlyResultRow) => d.cost;

    // Format data
    const formattedData = data.map((d) => ({
      id: getId(d),
      sales: getSales(d),
      cost: getCost(d),
    }));

    // Scales
    const xScale = d3
      .scaleLinear()
      .domain([d3.min(formattedData, (d) => d.id) || 0, d3.max(formattedData, (d) => d.id) || 0])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(formattedData, (d) => Math.max(d.sales, d.cost)) || 0])
      .range([height, 0]);

    // Line generators
    const lineSales = d3
      .line<{ id: number; sales: number }>()
      .x((d) => xScale(d.id))
      .y((d) => yScale(d.sales))
      .curve(d3.curveMonotoneX);

    const lineCost = d3
      .line<{ id: number; cost: number }>()
      .x((d) => xScale(d.id))
      .y((d) => yScale(d.cost))
      .curve(d3.curveMonotoneX);

    // Axes
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(5).tickFormat(d3.format("d"))); // Format as whole numbers

    svg.append("g").call(d3.axisLeft(yScale));

    // Draw sales line
    svg.append("path")
      .datum(formattedData)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("d", lineSales as any);

    // Draw cost line
    svg.append("path")
      .datum(formattedData)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", lineCost as any);

    // Labels
    svg.append("text")
      .attr("x", width - 20)
      .attr("y", yScale(formattedData[formattedData.length - 1].sales))
      .attr("fill", "blue")
      .style("font-size", "12px")
      .text("Sales");

    svg.append("text")
      .attr("x", width - 20)
      .attr("y", yScale(formattedData[formattedData.length - 1].cost))
      .attr("fill", "red")
      .style("font-size", "12px")
      .text("Cost");
  }, [data]);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold mb-2">Sales & Cost Trends</h3>
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default SalesCostLineChart;
