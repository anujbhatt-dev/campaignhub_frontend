import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { TableRow } from '@/types/types'

export default function ScatterPlot({ data }: { data: TableRow[] }) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    // Step 1: Sanitize and format the data to make it easier to work with
    const formattedData = data.map(item => ({
      id: item.id,
      totalCost: item.total_cost,
      netROI: item.net_roi
    }))

    // Exit early if there's no reference to the SVG element
    if (!svgRef.current) return

    // Step 2: Select the SVG element and set its dimensions
    const svg = d3.select(svgRef.current)
    const width = 800
    const height = 500

    svg.attr('width', width)
      .attr('height', height)
      .style('background', '#f4f4f4')

    // Step 3: Create scales for mapping data points to the graph coordinates
    const xScale = d3.scaleLinear()
      .domain([d3.min(formattedData, d => d.totalCost) || 0, d3.max(formattedData, d => d.totalCost) || 0])
      .range([50, width - 50])  // Padding on both sides to avoid circles touching the edge

    const yScale = d3.scaleLinear()
      .domain([d3.min(formattedData, d => d.netROI) || 0, d3.max(formattedData, d => d.netROI) || 0])
      .range([height - 50, 50]) // Padding at top and bottom

    // Step 4: Add circles for each data point
    svg.selectAll('circle')
      .data(formattedData)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.totalCost))  // x position based on totalCost
      .attr('cy', d => yScale(d.netROI))    // y position based on netROI
      .attr('r', 5)
      .attr('fill', 'steelblue')

    // Step 5: Add X-axis with custom ticks and labels
    svg.append('g')
      .attr('transform', `translate(0, ${height - 50})`)
      .call(d3.axisBottom(xScale).ticks(6)) // Number of ticks
      .selectAll('text')
      .style('font-size', '12px') // Font size for readability

    // Step 6: Add Y-axis with custom ticks and labels
    svg.append('g')
      .attr('transform', 'translate(50, 0)')
      .call(d3.axisLeft(yScale).ticks(6)) // Number of ticks
      .selectAll('text')
      .style('font-size', '12px') // Font size for readability

    // Step 7: Add axis labels
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

  }, [data])  // Re-run the effect whenever the data changes

  return (
    <div className='flex flex-col justify-center items-center my-[5rem]'>
        <h1 className="text-xl font-semibold text-center mb-4">Scatter Plot: Total Cost vs Net ROI</h1>
        <svg className='m-2 rounded-lg overflow-hidden shadow-sm' ref={svgRef}></svg>
    </div>
  )
}
