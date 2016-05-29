import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChange, HostBinding, ElementRef} from '@angular/core';
import * as d3 from 'd3';
import * as moment from 'moment';
import {pick, flatten, isFunction} from 'lodash';

import {D3Base} from './d3-base';

export interface TimeLineData {
  date: Date;
  value: number;
}

export interface TimeLineChartData {
  label: string;
  color: string;
  data: TimeLineData[];
}

export class TimeChartOptions {
  public dateFormat: string = 'yyyy-MM-dd';
  public unit: string = '€';
}

@Component({
  moduleId: module.id,
  selector: 'ws-time-line-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
  styles: [`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
    }

    .axis path,
    .axis line {
      fill: none;
      stroke: #ccc;
      shape-rendering: crispEdges;
    }

    .x.axis path {
      display: none;
    }

    .grid {
      fill: none;
      stroke: #e6e6e6;
    }

    .line {
      fill: none;
      stroke: steelblue;
      stroke-width: 1.5px;
    }

    .dot {
      //fill: rgba(0,0,0,0.1);
      fill: none;
      pointer-events: visible;
    }

    .no-data {
      font-family: "Open Sans";
      font-size: 20px;
      text-anchor: middle;
    }

    .tooltip {
      position: absolute;
      cursor: pointer;
      pointer-events: none;
    }
  `]
})
export class TimeLineChartComponent extends D3Base {

  @Input() data: TimeLineChartData[];
  @Input() options: TimeChartOptions = new TimeChartOptions();

  timeFormat: d3.time.Format;

  color: d3.scale.Ordinal<string, string>;
  xScale: d3.time.Scale<Date, number>;
  yScale: d3.scale.Linear<number, number>;
  xAxisElement: d3.Selection<any>;
  yAxisElement: d3.Selection<any>;
  yGridElement: d3.Selection<any>;
  legendContainer: d3.Selection<any>;
  xAxis: d3.svg.Axis;
  yAxis: d3.svg.Axis;
  yGrid: d3.svg.Axis;
  line: d3.svg.Line<number>;

  // @HostBinding('class.bar-chart') componentClass = true;

  constructor(element: ElementRef) {
    super(element);

    this.margin = {top: 30, right: 40, bottom: 40, left: 80};

    this.timeFormat = d3.time.format.utc.multi([
      ['.%L', function(d) { return d.getMilliseconds(); }],
      [':%S', function(d) { return d.getSeconds(); }],
      ['%H:%M', function(d) { return d.getMinutes(); }],
      ['%H:%M', function(d) { return d.getHours(); }],
      ['%e %b', function(d) { return d.getDay() && d.getDate() !== 1; }],
      ['%e %b', function(d) { return d.getDate() !== 1; }],
      ['%B', function(d) { return d.getMonth(); }],
      ['%Y', function () { return true; }]
    ]);
  }

  init() {
    /************************************************************
     * Set Axis and Colors
     ***********************************************************/
    this.color = d3.scale.ordinal<string, string>().range(['#000033', '#003462', '#006699', '#0099cc', '#666666', '#999999', '#cccccc', '#db9815', '#999900', '#d1d17c', '#669933', '#666633', '#333333']);

    this.xScale = d3.time.scale<Date, number>()
      // Default domain
      .domain([moment().subtract(1, 'months').toDate(), new Date()]);
      //.range([0, 0]);

    this.yScale = d3.scale.linear()
      // Default domain
      .domain([0, 100])
      .range([0, 0]);

    this.xAxis = d3.svg.axis()
      .scale(this.xScale)
      .tickFormat(this.options.dateFormat)
      .orient('bottom');

    this.yAxis = d3.svg.axis()
      .scale(this.yScale)
      .ticks(6)
      .orient('left');

    this.yGrid = d3.svg.axis()
      .scale(this.yScale)
      .orient('left')
      .ticks(6)
      .tickSize(0, 0)
      .tickFormat('');

    this.line = d3.svg.line()
      .interpolate('linear')
      .x(d => this.xScale(d.date))
      .y(d => this.yScale(d.value))
      .defined(d => d.value && d.value > 0);

    /************************************************************
     * Add Elements
     ***********************************************************/
    this.xAxisElement = this.chart
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,0)')
      .call(this.xAxis);

    this.yAxisElement = this.chart
      .append('g')
      .attr('class', 'y axis')
      .call(this.yAxis);

    this.yGridElement = this.chart
      .append('g')
      .attr('class', 'grid')
      .call(this.yGrid);

    this.legendContainer = this.svg
      .append('g')
      .attr('class', 'legend-container')
      .attr('transform', `translate(${this.margin.left}, 0)`);
  }

  render() {

    if (!this.data && this.data.length === 0) {
      return;
    }

    /************************************************************
     * Set Data
     ***********************************************************/

    let series = this.data;

    // Create
    let legend = this.legendContainer
      .selectAll('.legend')
      .data(series, d => d.label);

    let lines = this.chart
      .selectAll('.line')
      .data(series, d => d.label);

    //let dotGroup = this.chart
    //  .selectAll('.dot-group')
    //  .data(series, d => d.label);

    //dotGroup.enter().append('g').attr('class', 'dot-group');
    //dotGroup.exit().remove();

    //let dots = dotGroup
    //  .selectAll('.dot')
    //  .data(d => d.values);

    /************************************************************
     * Set Ranges and Axis
     ***********************************************************/
    this.color
      .range(pick(this.data, 'color'))
      .domain(pick(this.data, 'label'));


    let data = flatten(pick(series, 'data'));

    this.xScale.domain(d3.extent(data, d => d.date));
    this.yScale.domain(d3.extent(data, d => d.value));

    this.xScale.rangeRound([0, this.chartWidth]);
    this.yScale.rangeRound([this.chartHeight, 0]);

    this.xAxisElement.attr('transform', `translate(0, ${this.chartHeight})`);
    this.yGridElement.call(this.yGrid.tickSize(-this.chartWidth, 0));

    this.xAxis.scale(this.xScale);
    this.yAxis.scale(this.yScale);

    this.xAxisElement.transition().call(this.xAxis);
    this.yAxisElement.transition().call(this.yAxis);

    /************************************************************
     * D3 Enters
     ***********************************************************/

    // Legend
    let legendEnter = legend.enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', 'translate(0, 0)');

    legendEnter
      .append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .style('fill', d => this.color(d.label));

    legendEnter
      .append('text')
      .attr('x', 20)
      .attr('y', 8)
      .attr('dy', '.30em')
      .text(d => d.label);

    let legendOffset = 0;
    let legendTransform = () => {
      let ret = `translate(${legendOffset}, 0)`;
      let w = isFunction(this.getBBox) ? this.getBBox().width : 90;
      if (w === 0) {
        w = 110;
      }
      legendOffset += w + 10;
      return ret;
    };

    legendEnter.attr('transform', legendTransform);
    // Reset legend offset for next run
    legendOffset = 0;

    // Lines
    lines.enter()
      .append('path')
      .attr('class', 'line')
      .attr('d', d => this.line(d.data))
      .style('stroke', d => this.color(d.label));

    /************************************************************
     * D3 Transitions
     ***********************************************************/

    legend.transition().attr('transform', legendTransform);

    lines.transition().attr('d', d => this.line(d.data));

    /************************************************************
     * D3 Exits
     ***********************************************************/

    legend.exit().transition().remove();
    lines.exit().transition().remove();
  }

}
