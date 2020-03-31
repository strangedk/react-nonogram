import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

import Crossword from './Crossword';
import NonogramAlgorythm from './NonogramAlgorythm';

class MockData {
	constructor() {
  	this.width = 10;
    this.height = 10;
    this.fullData = 
       [1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,];   
    this.emptyData =
       [0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,];
    this.data =
			 [1,1,1,1,0,0,0,1,1,1,
        1,0,0,0,0,0,0,0,1,1,
        1,0,0,1,1,1,1,0,0,1,
        1,0,0,1,1,1,1,0,0,1,
        1,1,0,0,1,1,0,0,1,1,
        1,1,1,1,1,0,0,1,1,1,
        1,1,1,1,0,0,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,0,0,1,1,1,1,
        1,1,1,0,1,1,0,1,1,1,];
  }
}

class GridData {
  constructor(width, height, data) {
  	if (data) {
      this.width = width;
      this.height = height;
      this.data = data;
    } else {
    	const mockData = new MockData();
    	this.width = mockData.width;
      this.height = mockData.height;
      this.data = mockData.data;
    }
  }
  
  getData = () => {
  	return this.data;
  };
  
	getVerticalData = (v) => {
    const result = [];
    const totalLength = this.data.length;
    
    for (let index=v; index<totalLength; index += this.width)
			result.push(this.data[index]);
      
    return result
  };
  
	getHorizontalData = (h) => {
    let result = [];    
		let startIndex = Math.floor(h * this.height);
    
    result = this.data.slice(startIndex, startIndex + this.width);
    
    return result
  };
  
  getValuesFromData = (data) => {
  	let result = [];
    
    result = data
      .toString()
      .replace(/,/gi,'')
      .split('0')
      .filter(v => v != ',' && v != '')
      .map(v => v.length);
    return result;
  };
  
  getHorizontalValues = (h) => {
  	const horizontalData = this.getHorizontalData(h);
    return this.getValuesFromData(horizontalData);
  };
  
  getVerticalValues = (v) => {
  	const verticalData = this.getVerticalData(v);
    return this.getValuesFromData(verticalData);
  }
  
  getAllVerticalValues = () => {
  	const result = new Array(this.height)
    .fill(1)
    .map((v,i) => this.getVerticalValues(i));
    return result;
  }
  getAllHorizontalValues = () => {
  	const result = new Array(this.width)
    .fill(1)
    .map((v,i) => this.getHorizontalValues(i));
    return result;
  }
}

class GridService {
	constructor() {
  	this.sourceData = new GridData();
  }
  
  getValuesFromSource(sourceData) {
  	const {width,
    			 height,
           getAllVerticalValues,
           getAllHorizontalValues} = sourceData;
  	return new NonogramAlgorythm(
    	width,
    	height,
      getAllVerticalValues(),
      getAllHorizontalValues()
    ).result;
  };
}

class JApp extends React.Component {
  constructor(props) {
    super(props);
    
    this.gridService = new GridService();
  }
    
  render() {
  	const {sourceData, getValuesFromSource} = this.gridService;
    
    return (
      <div>
        <h2><i>Nonogram</i></h2>
        <div className='crosswordsWrapper'>
          <Crossword data={sourceData} />
          <Crossword data={getValuesFromSource(sourceData)} />
        </div>
      </div>
    )    
  }
}

// region #Components
const GridItem = (props) =>
(<div
  className='gridItem'
  style={{background: (props.value ? '#111' : '#12f')}}>
  &nbsp;
</div>);

const Grid = (props) => 
<div className='grid'>
  {props.values.map((v,i) =>
  	<GridItem value={v} index={i} key={'key' + i} />)}
</div>;
      
const ValuesVertical = (props) => 
<div className='gridVerticalValuesWrapper'>
  {props.data
    .getAllVerticalValues()
    .map((v,i) =>
      <div className='gridVerticalValues' key={i+'key'}>{
              v.map((k,j) => 
              <div className='gridVerticalValue' key={j+'key'}>{k}</div>)
      }</div>
    )}
</div>;

const ValuesHorizontal = (props) => 
<div className='gridHorizontalValuesWrapper'>
  {props.data
    .getAllHorizontalValues()
    .map((v,i) =>
      <div className='gridHorizontalValues' key={i+'key'}>{
              v.map((k,j) =>
              <div className='gridHorizontalValue' key={j+'key'}>{k}</div>)
      }</div>
    )}
</div>;

const Crossword = (props) => 
<table>
    <tbody>
      <tr>
        <td></td>
        <td>
          <ValuesVertical data={props.data} />
        </td>
      </tr>
      <tr>
        <td>
          <ValuesHorizontal data={props.data} />
        </td>
        <td>
          <Grid values={props.data.getData()} />
        </td>
      </tr>
    </tbody>
</table>;
// endregion


class NonogramAlgorythm {
	constructor(width, height, verticalValues, horizontalValues) {
  	this.width = width;
    this.height = height;
    this.verticalValues = verticalValues;
    this.horizontalValues = horizontalValues;
    this.result = this.calculate(width, height, verticalValues, horizontalValues);
  }
  
  calculate = (width, height, verticalValues, horizontalValues) => {
  	let result = new GridData(width, height, new MockData().emptyData);
    
    this.data = result.data;
    
    // Algorithm starts here. Be careful with initial data
    // and look at the algorithm repeatment
    this.fillFullLines(horizontalValues, 'horizontal');
    this.fillFullLines(verticalValues, 'vertical');
    this.fillKnownBorders();
    
    return result;
  };
  
  fillFullLines = (lines, direction) => {
  	const {setData} = this;
    const isHorizontal = direction === 'horizontal' || direction === 'h';
  	const fullLines = lines
    											// Try to search fullfilled rows
    											.map((v,i) => ({
                          	value : v.reduce((acc,curr) => acc + curr + 1),
                            index : i}))
                          .filter(v => v.value == (isHorizontal ? this.width : this.height))
                          // Remember and filter row and his index
                          .map(v => ({
                          	value: lines[v.index],
                            index: v.index
                          }));
                          
		fullLines.forEach((v,i) => {
    	const currentLine = v.index;
      let offset = 0;
      v.value.forEach(item => {
      	for (let i=offset; i<item + offset; ++i) {
        	if (isHorizontal)
          	setData(i, currentLine);
          else
          	setData(currentLine, i);
        }
        offset += item + 1;
     })
    });
  }
  
  fillKnownBorders = () => {
  	const {data, horizontalValues, verticalValues, width, height} = this;
    const walkArrayWidth = new Array(width).fill(1);
    const walkArrayHeight = new Array(height).fill(1);
    
    // left border
    walkArrayHeight
    .map((v,i) => i)
    .filter(v => this.getData(0,v,data) === 1)
    .map(v => ({x:0,y:v,value:horizontalValues[v][0]}))
		.forEach(item => {
    	for (let i=0; i<item.value; ++i) {
      	this.setData(i,item.y);
      }
    })
    
    // right border
		walkArrayHeight
    .map((v,i) => i)
    .filter(v => this.getData(width-1,v,data) === 1)
    .map(v => ({x:width-1,y:v,value:horizontalValues[v][horizontalValues[v].length-1]}))
 		.forEach(item => {
		      for (let i=width-1; i>=width-item.value; --i) {
		        this.setData(i,item.y);
		      }
		})
  }
  
  getData = (x,y) => {
  	const index = '' + (y?y:'') + x;
    const result = this.data[index];
    return result;
  }
  
  setData = (x,y,value=1) => {
  	const index = '' + (y?y:'') + x;
    this.data[index] = value;
  }
}

class MockData {
	constructor() {
  	this.width = 10;
    this.height = 10;
    this.fullData = 
       [1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,];   
    this.emptyData =
       [0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,];
    this.data =
			 [1,1,1,1,0,0,0,1,1,1,
        1,0,0,0,0,0,0,0,1,1,
        1,0,0,1,1,1,1,0,0,1,
        1,0,0,1,1,1,1,0,0,1,
        1,1,0,0,1,1,0,0,1,1,
        1,1,1,1,1,0,0,1,1,1,
        1,1,1,1,0,0,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,0,0,1,1,1,1,
        1,1,1,0,1,1,0,1,1,1,];
  }
}

class GridData {
  constructor(width, height, data) {
  	if (data) {
      this.width = width;
      this.height = height;
      this.data = data;
    } else {
    	const mockData = new MockData();
    	this.width = mockData.width;
      this.height = mockData.height;
      this.data = mockData.data;
    }
  }
  
  getData = () => {
  	return this.data;
  };
  
	getVerticalData = (v) => {
    const result = [];
    const totalLength = this.data.length;
    
    for (let index=v; index<totalLength; index += this.width)
			result.push(this.data[index]);
      
    return result
  };
  
	getHorizontalData = (h) => {
    let result = [];    
		let startIndex = Math.floor(h * this.height);
    
    result = this.data.slice(startIndex, startIndex + this.width);
    
    return result
  };
  
  getValuesFromData = (data) => {
  	let result = [];
    
    result = data
      .toString()
      .replace(/,/gi,'')
      .split('0')
      .filter(v => v != ',' && v != '')
      .map(v => v.length);
    return result;
  };
  
  getHorizontalValues = (h) => {
  	const horizontalData = this.getHorizontalData(h);
    return this.getValuesFromData(horizontalData);
  };
  
  getVerticalValues = (v) => {
  	const verticalData = this.getVerticalData(v);
    return this.getValuesFromData(verticalData);
  }
  
  getAllVerticalValues = () => {
  	const result = new Array(this.height)
    .fill(1)
    .map((v,i) => this.getVerticalValues(i));
    return result;
  }
  getAllHorizontalValues = () => {
  	const result = new Array(this.width)
    .fill(1)
    .map((v,i) => this.getHorizontalValues(i));
    return result;
  }
}

class GridService {
	constructor() {
  	this.sourceData = new GridData();
  }
  
  getValuesFromSource(sourceData) {
  	const {width,
    			 height,
           getAllVerticalValues,
           getAllHorizontalValues} = sourceData;
  	return new NonogramAlgorythm(
    	width,
    	height,
      getAllVerticalValues(),
      getAllHorizontalValues()
    ).result;
  };
}

class JApp extends React.Component {
  constructor(props) {
    super(props);
    
    this.gridService = new GridService();
  }
    
  render() {
  	const {sourceData, getValuesFromSource} = this.gridService;
    
    return (
      <div>
        <h2><i>Nonogram</i></h2>
        <div className='crosswordsWrapper'>
          <Crossword data={sourceData} />
          <Crossword data={getValuesFromSource(sourceData)} />
        </div>
      </div>
    )    
  }
}

ReactDOM.render(<JApp />, document.querySelector("#root"));