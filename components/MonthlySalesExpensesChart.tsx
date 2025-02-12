import { getMonthName } from '@/utils/getMonthName'
import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { MonthlyResultRow } from '@/types/types'

export default function MonthlySalesExpensesChart({ data }: { data: MonthlyResultRow[] }) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const sanitizedData = data.map(item => ({
      month: getMonthName(item.month),
      sales: item.sales,
      expenses: item.cost,
    }))

    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = 800
    const height = 500

    // Set the dimensions of the SVG container
    svg.attr('width', width)
      .attr('height', height)
      .style('background', '#f4f4f4')
      .style('padding-left', '0.5rem')
      .style('padding-bottom', '0.5rem')

    // Set margins and inner chart area
    const margin = { top: 20, right: 120, bottom: 80, left: 80 } // Increased right margin for legend
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Create X scale
    const xScale = d3.scaleBand()
      .domain(sanitizedData.map(d => d.month))
      .range([0, chartWidth])
      .padding(0.1)

    // Create Y scale
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(sanitizedData, d => Math.max(d.sales, d.expenses)) || 0])
      .nice()
      .range([chartHeight, 0])

    // Add bars for sales (blue)
    g.selectAll('.sales-bar')
      .data(sanitizedData)
      .enter()
      .append('rect')
      .attr('class', 'sales-bar')
      .attr('x', d => xScale(d.month) || 0)
      .attr('y', d => yScale(d.sales))
      .attr('width', xScale.bandwidth())
      .attr('height', d => chartHeight - yScale(d.sales))
      .attr('fill', 'steelblue') // Color representing sales

    // Add bars for expenses (orange)
    g.selectAll('.expenses-bar')
      .data(sanitizedData)
      .enter()
      .append('rect')
      .attr('class', 'expenses-bar')
      .attr('x', d => xScale(d.month) || 0)
      .attr('y', d => yScale(d.expenses))
      .attr('width', xScale.bandwidth() / 2) // Smaller width for expenses bars
      .attr('height', d => chartHeight - yScale(d.expenses))
      .attr('fill', 'orange') // Color representing expenses

    // Add X axis
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale))

    // Add Y axis
    g.append('g')
      .call(d3.axisLeft(yScale))

    // Add labels for axes
    svg.append('text')
      .attr('transform', `translate(${width / 2}, ${height - 10})`)
      .style('text-anchor', 'middle')
      .text('Month')

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', 15)
      .style('text-anchor', 'middle')
      .text('Amount')

    // Add legend to top-right corner
    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 10}, 20)`)

    legend.append('rect')
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', 'steelblue')

    legend.append('text')
      .attr('x', 30)
      .attr('y', 15)
      .style('font-size', '14px')
      .text('Sales')

    legend.append('rect')
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', 'orange')
      .attr('y', 30)

    legend.append('text')
      .attr('x', 30)
      .attr('y', 45)
      .style('font-size', '14px')
      .text('Expenses')

  }, [data])

  return (
    <div className="flex flex-col justify-center items-center my-[5rem]">
      <h1 className="text-xl font-semibold text-center mb-4">Monthly Sales vs. Expenses</h1>
      <svg className='m-2 rounded-lg overflow-hidden shadow-sm' ref={svgRef}></svg>
    </div>
  )
}
