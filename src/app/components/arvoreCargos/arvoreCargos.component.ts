import { Component, OnInit } from '@angular/core';
declare const JSC: any;

@Component({
  selector: 'arvore-cargos',
  templateUrl: './arvoreCargos.component.html',
  styleUrls: ['./arvoreCargos.component.css'],
})
export class ArvoreCargosComponent implements OnInit {
  chart: any; // Declare the chart variable

  constructor() {}

  ngOnInit(): void {
    // Fetch the CSV data and render the chart
    var csv = `name,position,photo,phone,address,email,id,parent,work_quality,initiative,cooperative,link
Devlin Cowins,Managing director,1,+86 (452) 988-6713,483 Clyde Gallagher Plaza,dcowins0@example.com,md,,5,5,5,https://banner2.cleanpng.com/20180711/iqy/kisspng-github-computer-icons-github-logo-5b459a3d238b60.4061479515312881251456.jpg
Frasco Hatchell,Secretary,2,+55 (958) 156-6342,13 School Court,fhatchell4@reddit.com,s,md,5,3,5,https://banner2.cleanpng.com/20180711/iqy/kisspng-github-computer-icons-github-logo-5b459a3d238b60.4061479515312881251456.jpg
Dorthea Duffit,Sales and managing director,3,+237 (116) 938-0593,0 Caliangt Hill,dduffit1@auda.org.au,smd,md,5,5,5,https://banner2.cleanpng.com/20180711/iqy/kisspng-github-computer-icons-github-logo-5b459a3d238b60.4061479515312881251456.jpg
Stanislas Pickersail,Production director,4,+62 (951) 772-6189,18 Macpherson Lane,spickersail5@biblegateway.com,pd,md,5,5,4,https://banner2.cleanpng.com/20180711/iqy/kisspng-github-computer-icons-github-logo-5b459a3d238b60.4061479515312881251456.jpg
Rachel Steinhammer,Human resources director,5,+62 (372) 366-4281,365 Springview Crossing,rsteinhammer2@reverbnation.com,hrd,md,5,4,5,https://banner2.cleanpng.com/20180711/iqy/kisspng-github-computer-icons-github-logo-5b459a3d238b60.4061479515312881251456.jpg
Coreen Ambrozik,Finance director,6,+387 (831) 655-8093,9 Orin Avenue,cambrozik3@ucsd.edu,fd,md,5,4,5,https://banner2.cleanpng.com/20180711/iqy/kisspng-github-computer-icons-github-logo-5b459a3d238b60.4061479515312881251456.jpg
Dorothee Weavers,Factory manager,7,+63 (623) 830-0091,6587 Arizona Drive,dweavers8@timesonline.co.uk,fm,pd,4,4,4,https://banner2.cleanpng.com/20180711/iqy/kisspng-github-computer-icons-github-logo-5b459a3d238b60.4061479515312881251456.jpg
Jaime Loughlan,Quality control manager,8,+51 (272) 196-7234,1497 Birchwood Circle,jloughlan7@prweb.com,qcm,pd,5,5,3,https://banner2.cleanpng.com/20180711/iqy/kisspng-github-computer-icons-github-logo-5b459a3d238b60.4061479515312881251456.jpg
Bell Finden,Management accountant,9,+7 (218) 895-1228,22152 Dakota Lane,bfinden9@jigsy.com,ma,fd,5,4,4,https://banner2.cleanpng.com/20180711/iqy/kisspng-github-computer-icons-github-logo-5b459a3d238b60.4061479515312881251456.jpg
Cobbie Gerbl,Financial accountant,10,+420 (875) 172-6994,01306 Trailsway Junction,cgerbl6@arizona.edu,fa,fd,4,5,4,https://banner2.cleanpng.com/20180711/iqy/kisspng-github-computer-icons-github-logo-5b459a3d238b60.4061479515312881251456.jpg`
  const data = JSC.csv2Json(csv);
  this.chart = this.renderChart(this.makeSeries(data));
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
          '<div style= "background-color: #666666; color: white; border-radius: 4px; padding: 4px;" class="tooltipBox">Phone: <b>%phone</b><br>Email: <b>%email</b><br>Address: <b>%address</b></div>',
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

  makeSeries(data: any) {
    return [
      {
        points: data.map((item) => ({
          name: item.name,
          id: item.id,
          parent: item.parent,
          attributes: {
            position: `<span style="font-size:13px;">${item.position}</span>`,
            phone: item.phone,
            address: item.address,
            email: item.email,
            photo: item.link,
          },
        })),
      },
    ];
  }
}
