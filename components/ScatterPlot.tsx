import { TableRow } from '@/app/page'
import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function ScatterPlot({ data }: { data: TableRow[] }) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    // Sanitize the data inside the useEffect
    const sanitizedData = data.map(item => ({
      id: item.id,
      totalCost: item.total_cost,
      netROI: item.net_roi
    }))

    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = 800
    const height = 500

    // Set the dimensions of the SVG container
    svg.attr('width', width)
      .attr('height', height)
      .style('background', '#f4f4f4')

    // Create scales for x (totalCost) and y (netROI)
    const xScale = d3.scaleLinear()
      .domain([d3.min(sanitizedData, d => d.totalCost) || 0, d3.max(sanitizedData, d => d.totalCost) || 0]) // Adjusting to data range
      .range([50, width - 50])  // Padding on both sides to avoid circles at the edge

    const yScale = d3.scaleLinear()
      .domain([d3.min(sanitizedData, d => d.netROI) || 0, d3.max(sanitizedData, d => d.netROI) || 0]) // Adjusting to data range
      .range([height - 50, 50]) // Padding at top and bottom

    // Add circles for each data point
    svg.selectAll('circle')
      .data(sanitizedData)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.totalCost)) // x position based on totalCost
      .attr('cy', d => yScale(d.netROI))   // y position based on netROI
      .attr('r', 5)
      .attr('fill', 'steelblue')

    // Add X-axis with ticks and custom formatting
    svg.append('g')
      .attr('transform', `translate(0, ${height - 50})`)
      .call(d3.axisBottom(xScale).ticks(6)) // Set the number of ticks here
      .selectAll('text')
      .style('font-size', '12px') // Adjust font size for readability

    // Add Y-axis with ticks and custom formatting
    svg.append('g')
      .attr('transform', 'translate(50, 0)')
      .call(d3.axisLeft(yScale).ticks(6)) // Set the number of ticks here
      .selectAll('text')
      .style('font-size', '12px') // Adjust font size for readability

    // Add labels for axes
    svg.append('text')
      .attr('transform', `translate(${width / 2}, ${height - 10})`)
      .style('text-anchor', 'middle')
      .text('Total Cost')

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', 15)
      .style('text-anchor', 'middle')
      .text('Net ROI')

  }, [data])

  return (
    <div className='flex flex-col justify-center items-center mt-[10rem]'>
        <h1 className="text-xl font-semibold text-center mb-4">Scatter Plot: Total Cost vs Net ROI</h1>
        <svg className='m-2 rounded-lg overflow-hidden shadow-sm' ref={svgRef}></svg>
    </div>
  )
}
