import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
declare const JSC: any;

@Component({
  selector: 'arvore-cargos',
  templateUrl: './arvoreCargos.component.html',
  styleUrls: ['./arvoreCargos.component.css'],
})
export class ArvoreCargosComponent implements OnInit, OnChanges {
  chart: any; // Declare the chart variable
  @Input() integrantes : any;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.integrantes && changes.integrantes.currentValue && changes.integrantes.currentValue.orientador && changes.integrantes.currentValue.orientados) {
      this.chart = this.renderChart(this.makeSeriesRequest(this.integrantes));
    }
  }

  ngOnInit(): void {
    if (this.integrantes && this.integrantes.orientados && this.integrantes.orientados.length > 0) 
    {
      this.chart = this.renderChart(this.makeSeriesRequest(this.integrantes));
    }
  }

  renderChart(series: any) {
    return JSC.chart('chartDiv', {
      type: 'organizational down',
      defaultTooltip: {
        asHTML: true,
        outline: 'none',
        zIndex: 10,
      },
      defaultPoint: {
        focusGlow: false,
        connectorLine: {
          width: 1,
          color: '#e0e0e0',
        },
        tooltip:
          '<div style= "background-color: #666666; color: white; border-radius: 4px; padding: 4px;" class="tooltipBox">Email: <b>%email</b></div>',
        annotation: {
          padding: 3,
          asHTML: true,
          margin: [12, 2],
          label: {
            text:
              '<center><img width=64 height=64 margin_bottom=4 src=%photo></center> <br/><div style= "background-color: #eeeeee; padding: 6px; border-radius: 6px; margin-top: -4px;" class="personDescription"><b>%position</b><br/>%name<br/></div>',
            autoWrap: false,
          },
        },
        outline_width: 0,
        color: '#333333',
      },
      series: series,
    });
  }

  makeSeriesRequest(integrantes: any) {
    let retornoFuncao = [{
      points: []
    }];
  
    retornoFuncao[0].points.push({
      name: integrantes.orientador.nome,
      id: "md",
      parent: "",
      attributes: {
        position: `<span style="font-size:13px;">${integrantes.orientador.setorNome}</span>`,
        email: integrantes.orientador.email,
        photo: integrantes.orientador.linkSelfie,
      },
    });
  
    integrantes.orientados.forEach((orientado) => {
      retornoFuncao[0].points.push({
        name: orientado.nome,
        id: orientado.id,
        parent: "md",
        attributes: {
          position: `<span style="font-size:13px;">${orientado.setorNome}</span>`,
          email: orientado.email,
          photo: orientado.linkSelfie,
        },
      });
    });
  
    return retornoFuncao;
  }
}
