function getJSON(url) {
  var xmlhttprequest = new XMLHttpRequest();
  xmlhttprequest.open('GET', url, true);
  xmlhttprequest.responseType = 'json';
  xmlhttprequest.onload = function() {
    init(xmlhttprequest.response);
  };
  xmlhttprequest.send();
}

getJSON('https://storage.googleapis.com/ducky_static_assets/helpers/footprintExercise.json');

const arc = document.getElementsByClassName('arc_fill');
const hole = document.getElementsByClassName('hole');
const hoverBorderLeft = document.getElementsByClassName('hover_border_left');
const hoverBorderRight = document.getElementsByClassName('hover_border_right');
var hoverBorderWidth;
var hoverBorderColor;

function init(data) {
  hoverBorderWidth = getComputedStyle(document.getElementById('container')).getPropertyValue('--hoverBorder');
  hoverBorderColor = getComputedStyle(document.getElementById('container')).getPropertyValue('--hoverBorderColor');
  const extractedData = [
    data.categories.food.percent,
    data.categories.consumption.percent,
    data.categories.energy.percent,
    data.categories.transport.percent,
    data.categories.public.percent
  ];
  const chart = document.getElementById('container');
  const legendValue = document.getElementsByClassName('legend_value');
  for(var i = 0; i < extractedData.length; i++) {
    chart.style.setProperty('--segment'+i+'', extractedData[i]);
    legendValue[i].innerHTML = Math.round(extractedData[i]) + '%';
  }
}

function hoverArc(x) {
  arc[x].style.border = hoverBorderWidth + ' solid ' + hoverBorderColor;
  hole[x].style.border = hoverBorderWidth + ' solid ' + hoverBorderColor;
  hoverBorderLeft[x].style.display = 'block';
  if(x == 4) {
    hoverBorderRight[0].style.display = 'block';
  } else {
    hoverBorderRight[x+1].style.display = 'block';
  }
}

function unhoverArc(x) {
  arc[x].style.border = 'none';
  hole[x].style.border = 'none';
  hoverBorderLeft[x].style.display = 'none';
  if(x == 4) {
    hoverBorderRight[0].style.display = 'none';
  } else {
    hoverBorderRight[x+1].style.display = 'none';
  }
}
