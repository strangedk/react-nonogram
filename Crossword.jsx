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

export const Crossword = (props) => 
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
