import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import * as shape from 'd3-shape';
import moment from 'moment';

const TOOLTIP_HEIGHT = 32;
const TOOLTIP_WIDTH = 185;
const TOOLTIP_OFFSET_X = 44;

const ChartContainer = styled.div`
  svg {
    background: #c4c4c433;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    position: relative;
    bottom: 2px;
  }

  .axis path,
  .axis line {
    fill: none;
    stroke: #c4c4c4;
    shape-rendering: crispEdges;
  }

  .line {
    stroke: #21825c;
    stroke-width: 1.5px;
    fill: none;
  }

  .lineDots {
    fill: #21825c;
  }

  .hoverTooltip {
    height: 20px;
    width: 20px;
    background: #ffffff;
  }

  .y.axis {
    path.domain {
      display: none;
    }

    .tick:first-of-type {
      line {
        display: none;
      }
    }
  }

  .x.axis {
    path.domain {
      display: none;
    }
    .tick {
      line {
        display: none;
      }
    }
  }

  .tooltip {
    padding: 4px 8px;
    background: #ffffff;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    position: relative;
    height: ${TOOLTIP_HEIGHT}px;
    width: ${TOOLTIP_WIDTH}px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100000;
    
    .col-left {
      color: #172a3a;
      margin-right: 8px;
    }

    .col-right {
      color: #c4c4c433;
      margin-left: 8px;
    }

    .divider {
      color: #c4c4c4;
    }
  }
`;

const StackedAreaChart = (props) => {
    console.log("🚀 ~ file: area-chart.js:96 ~ StackedAreaChart ~ StackedAreaChart", StackedAreaChart)
    const chartContainerRef = useRef();
    const [xOffset, setXOffset] = useState(null);
    const [yOffset, setYOffset] = useState(null);
    const [point, setPoint] = useState(null);
    const [cursorOut, setCursorOut] = useState(null);

    useEffect(() => {
        const { id, data: dataset } = props;
        let margin = { top: 20, right: 12, bottom: 25, left: 12 },
            width = (400) - margin.left - margin.right,
            height = (300) - margin.top - margin.bottom;
        height -= TOOLTIP_HEIGHT;

        const min = d3.min(dataset, (d) => d.y) - 1;
        const max = d3.max(dataset, (d) => d.y);

        const xScale = d3
            .scaleTime()
            .domain(
                d3.extent(dataset, d => d.x))
            .rangeRound([0, width]);


        const yScale = d3.scaleLinear().domain([min, max]).range([height, 0]);

        function formatTickXAxis(d, index) {
            const formatMinute = d3.timeFormat('%_H:%M'),
                formatHour = d3.timeFormat('%H:%M'),
                formatDay = d3.timeFormat('%a %_d'),
                formatMonth = d3.timeFormat('%B'),
                formatYear = d3.timeFormat('%Y');

            function multiFormat(date) {
                return (d3.timeHour(date) < date ? formatMinute : d3.timeDay(date) < date ? formatHour : d3.timeMonth(date) < date ? formatDay : d3.timeYear(date) < date ? formatMonth : formatYear)(date);
            }
            return d3.timeDay(d) < d ? multiFormat(d) : formatDay(d);
        }
        const hours = dataset.length;
        let interval = 1;
        while (width / (hours - 1) * interval < 45) {
            interval += 1;
        }
        const xValues = dataset.filter((d, i) => i % interval === 0).map(d => d.x);

        const xAxis = (g) =>
            g
                .call(
                    d3
                        .axisBottom(xScale)
                        .tickValues(xValues)
                        .tickFormat((d, i) => formatTickXAxis(d, i))

                )
                .call((g) => g.select('.domain').remove())
                .call((g) => g.selectAll('line').attr('stroke-opacity', 1).attr('width', 4).attr('height', 4));

        const yAxis = d3.axisLeft(yScale).tickSizeInner(-width).ticks(4);

        // Initiate the area line function
        const areaFunction = d3
            .area()
            .curve(shape.curveCatmullRom.alpha(0.5))
            .x(function (d) {
                return xScale(d.x);
            })
            .y0(height)
            .y1(function (d) {
                return yScale(d.y || min);
            });

        d3.select(`#chart-${props.id}`).select('svg').remove();

        // Add the svg canvas for the line chart
        const svg = d3
            .select(`#chart-${props.id}`)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // Define the gradient below the line chart
        const areaGradient = svg.append('defs').append('linearGradient').attr('id', `areaGradient-${props.id}`).attr('x1', '0%').attr('y1', '0%').attr('x2', '0%').attr('y2', '150%');

        // Append the first stop - the color at the top
        areaGradient.append('stop').attr('offset', '0%').attr('stop-color', "#c4c4c433").attr('stop-opacity', 1);

        // Append the second stop - white transparant almost at the end
        areaGradient.append('stop').attr('offset', '100%').attr('stop-color', "#c4c4c433").attr('stop-opacity', 0);

        // Add the X Axis
        svg
            .append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis)
            .call((g) => g.selectAll('.tick text').attr('x', 0).attr('dy', 5))
            .attr('font-weight', '500')
            .attr('font-size', '10px')
            .attr('color', '#172A3A');

        //Add the Y Axis
        svg
            .append('g')
            .attr('class', 'y axis')
            .call(yAxis)
            .style('stroke-dasharray', '5 5')
            .call((g) => g.selectAll('.tick text').attr('x', 16).attr('dy', -8))
            .attr('font-weight', '500')
            .attr('font-size', '9px')
            .attr('color', '#172A3A');

        // Draw the underlying area chart filled with the gradient
        svg.append('path').attr('class', 'area').style('fill', `url(#areaGradient-${id})`).attr('d', areaFunction(dataset));

        svg.append('line').classed('hoverLine', true);
        svg.append('circle').classed('hoverPoint', true);

        const mouseMove = (d) => {
            const { offsetX } = d;
            const xValue = xScale.invert(offsetX);

            svg.selectAll('.hoverLine').style('display', 'block');
            svg.selectAll('.hoverPoint').style('display', 'block');
            setCursorOut(false);

            const closest = dataset.reduce((prev, curr) => {
                return Math.abs(curr.x - xValue) < Math.abs(prev.x - xValue) ? curr : prev;
            }, dataset[0]);

            setXOffset(xScale(closest.x));
            setYOffset(yScale(closest.y));
            setPoint({
                x: moment(closest.x).format("MMM-Do HH:00"),
                y: closest.y
            });

            svg.selectAll('.hoverLine').attr('x1', xScale(closest.x)).attr('y1', yScale(closest.y)).attr('x2', xScale(closest.x)).attr('y2', height).attr('stroke', '#172A3A').attr('stroke-opacity', 0.25);

            svg.selectAll('.hoverPoint').attr('cx', xScale(closest.x)).attr('cy', yScale(closest.y)).attr('r', '8').attr('stroke', color).attr('stroke-width', 3).attr('fill', '#FFFFFF');
        };

        svg.on('mousemove', mouseMove);
        svg.on('mouseout', () => {
            svg.selectAll('.hoverLine').style('display', 'none');
            svg.selectAll('.hoverPoint').style('display', 'none');
            setCursorOut(true);
        });
    }, [props.data]);

    return (
        <ChartContainer ref={chartContainerRef} id={`chart-${props.id}`} >

            {/* <div className="tooltip" style={{ top: yOffset, left: xOffset - TOOLTIP_OFFSET_X, visibility: !cursorOut && point ? 'visible' : 'hidden' }} id={`tooltip-${props.id}`}>
                {point && point.x && point.y && (
                    <>
                        <span className="col-left">{point.x}</span>
                        <span className="divider">|</span>
                        <span className="col-right">{point.y}</span>
                    </>
                )}
            </div> */}
        </ChartContainer>
    );
}

export default StackedAreaChart;
