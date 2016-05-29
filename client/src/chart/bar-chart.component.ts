import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChange, HostBinding, ElementRef} from '@angular/core';
import * as d3 from 'd3';
import {D3Base} from './d3-base';

export interface BarChartData {
  label: string;
  value: number;
}

@Component({
  moduleId: module.id,
  selector: 'ws-bar-chart',
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
      stroke-width: 1.5px;
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
  `]
})
export class BarChartComponent extends D3Base {

  @Input() data: BarChartData[];

  color: d3.scale.Ordinal<string, string>;
  xScale: d3.scale.Ordinal<string, number>;
  yScale: d3.scale.Linear<number, number>;
  xAxisElement: d3.Selection<any>;
  yAxisElement: d3.Selection<any>;
  xAxis: d3.svg.Axis;
  yAxis: d3.svg.Axis;
  barElement: d3.Selection<any>;

  //@HostBinding('class.bar-chart') componentClass = true;

  constructor(element: ElementRef) {
    super(element);

    this.margin = {top: 10, right: 0, bottom: 30, left: 80};
  }

  init() {
    /************************************************************
     * Set Axis and Colors
     ***********************************************************/

    //this.color = d3.scale.ordinal();
    this.color = d3.scale.ordinal<string, string>().range(['#000033', '#003462', '#006699', '#0099cc', '#666666', '#999999', '#cccccc', '#db9815', '#999900', '#d1d17c', '#669933', '#666633', '#333333']);

    this.xScale = d3.scale.ordinal<string, number>()
      .range([0, 0]);

    this.yScale = d3.scale.linear()
      // Default domain
      .domain([0, 100])
      .range([0, 0]);

    this.xAxis = d3.svg.axis()
      .scale(this.xScale)
      .orient('bottom');

    this.yAxis = d3.svg.axis()
      .scale(this.yScale)
      .orient('left')
      .ticks(6);


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

    this.barElement = this.chart
      .append('g')
      .attr('class', 'bars');
  }

  render() {

    if (!this.data && this.data.length === 0) {
      return;
    }

    this.xScale
      .domain(this.data.map(d => d.label))
      .rangeRoundBands([0, this.chartWidth], .1);

    this.yScale
      .domain([0, d3.max(this.data, d => d.value)])
      .range([this.chartHeight, 0]);

    this.xAxisElement.attr('transform', `translate(0, ${this.chartHeight})`);
    //this.yGridElement.call(this.yGrid.tickSize(-this.chartWidth, 0, 0));

    this.xAxis.scale(this.xScale);
    this.yAxis.scale(this.yScale);

    this.xAxisElement.transition().call(this.xAxis);
    this.yAxisElement.transition().call(this.yAxis);

    let bars = this.barElement
      .selectAll('.bar')
      .data(this.data);

    /************************************************************
     * D3 Enters
     ***********************************************************/

    bars.enter()
      .append('rect')
      .attr('class', 'bar')
      .style('fill', d => this.color(d.label))
      .attr('x', d => this.xScale(d.label))
      .attr('width', this.xScale.rangeBand())
      .attr('y', d => this.yScale(d.value))
      .attr('height', d => this.chartHeight - this.yScale(d.value));

    /************************************************************
     * D3 Transitions
     ***********************************************************/

    bars.transition()
      .attr('x', d => this.xScale(d.label))
      .attr('width', this.xScale.rangeBand())
      .attr('y', d => this.yScale(d.value))
      .attr('height', d => this.chartHeight - this.yScale(d.value));

    //arcs.transition().attr('d', d => this.pie(d.data));

    /************************************************************
     * D3 Exits
     ***********************************************************/
    bars.exit().transition().remove();
  }

}
