import React from 'react';
import ReactDOM from 'react-dom';

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
			 [1,1,0,0,0,0,0,1,1,1,
        1,0,0,0,0,0,0,0,1,1,
        1,0,0,1,1,1,1,0,0,1,
        1,0,0,1,1,1,1,0,0,1,
        1,1,0,0,1,1,0,0,1,1,
        1,1,1,1,1,0,0,1,1,1,
        1,1,1,1,0,0,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,0,0,1,1,1,1,
        1,1,1,1,0,0,1,1,1,1,];
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
  
  getData() {
  	return this.data;
  }
  
	getVerticalData(v) {
    const result = [];
    const totalLength = this.data.length;
    
    for (let index=v; index<totalLength; index += this.width)
			result.push(this.data[index]);
      
    return result
  }
  
	getHorizontalData(h) {
    let result = [];    
		let startIndex = Math.floor(h * this.height);
    
    result = this.data.slice(startIndex, startIndex + this.width);
    
    return result
  }
  
  getValuesFromData(data) {
  	let result = [];
    
    result = data
      .toString()
      .replace(/,/gi,'')
      .split('0')
      .filter(v => v != ',' && v != '')
      .map(v => v.length);
    return result;
  }
  
  getHorizontalValues(h) {
  	const horizontalData = this.getHorizontalData(h);
    return this.getValuesFromData(horizontalData);
  }
  
  getVerticalValues(v) {
  	const verticalData = this.getVerticalData(v);
    return this.getValuesFromData(verticalData);
  }
  
  getAllVerticalValues() {
  	const result = new Array(this.height)
    .fill(1)
    .map((v,i) => this.getVerticalValues(i));
    return result;
  }
  getAllHorizontalValues() {
  	const result = new Array(this.width)
    .fill(1)
    .map((v,i) => this.getHorizontalValues(i));
    return result;
  }
}

class GridService {
	constructor() {
  	this.sourceData = new GridData();
    this.calculatedData = new GridData();
  }
}

// region #Visual Part
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
              <div className='gridHorizontalValue' key={j*100+'ky'}>{k}</div>)
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

class JApp extends React.Component {
  constructor(props) {
    super(props);
    
    this.gridService = new GridService();
  }
  
  render() {
  	const {sourceData, calculatedData} = this.gridService;
    
    return (
      <div>
        <h2>Japan crossword</h2>
        <Crossword data={sourceData} />
      </div>
    )
  }
}

ReactDOM.render(<JApp />, document.querySelector("#root"));