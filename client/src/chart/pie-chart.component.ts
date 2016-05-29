import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChange, HostBinding, ElementRef} from '@angular/core';
import * as d3 from 'd3';
import {D3Base} from './d3-base';
import {pick} from 'lodash';

export interface PieChartData {
  label: string;
  value: number;
  color?: string;
}

@Component({
  moduleId: module.id,
  selector: 'ws-pie-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
  styles: [`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
    }

    .arc path {
      stroke: #fff;
    }

  `]
})
export class PieChartComponent extends D3Base {

  @Input() data: PieChartData[];

  color: any;
  pie: any;
  pieContainer: any;

  radius: any;
  arc: any;

  xScale: any;
  yScale: any;
  xAxisElement: any;
  yAxisElement: any;
  xAxis: any;
  yAxis: any;
  barElement: any;

  //@HostBinding('class.bar-chart') componentClass = true;

  constructor(element: ElementRef) {
    super(element);
  }

  init() {
    /************************************************************
     * Set Axis and Colors
     ***********************************************************/
    this.color = d3.scale.ordinal();

    this.pie = d3.layout.pie()
      .sort(null)
      .value(d => d.value);

    this.pieContainer = this.chart
      .append('g');
  }

  render() {

    if (!this.data && this.data.length === 0) {
      return;
    }

    /************************************************************
     * Set Data
     ***********************************************************/

    this.radius = d3.min([this.chartWidth, this.chartHeight]) / 2;

    this.arc = d3.svg.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(0);

    this.color
      .range(pick(this.data, 'color'))
      .domain(pick(this.data, 'label'));

    let arcs = this.pieContainer
      .selectAll('.arc')
      .data(this.pie(this.data));

    /************************************************************
     * D3 Enters
     ***********************************************************/

    this.pieContainer
      .attr('transform', `translate(${this.chartWidth / 2}, ${this.chartHeight / 2})`);

    let arcEnter = arcs.enter()
      .append('g')
      .attr('class', 'arc');

    arcEnter.append('path')
      .attr('d', this.arc)
      .style('fill', d => this.color(d.data.label));

    /*arcEnter.append('text')
      .attr('transform', d => 'translate(' + this.arc.centroid(d) + ')')
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .text(d => d.data.label);*/

    /************************************************************
     * D3 Transitions
     ***********************************************************/

    //arcs.transition().attr('d', d => this.pie(d.data));

    /************************************************************
     * D3 Exits
     ***********************************************************/
    arcs.exit().transition().remove();
  }

}
