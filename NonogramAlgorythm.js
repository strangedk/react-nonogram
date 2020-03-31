import GridData from "./GridData";
import MockData from "./MockData";

class NonogramAlgorythm {
  constructor(width, height, verticalValues, horizontalValues) {
    this.width = width;
    this.height = height;
    this.verticalValues = verticalValues;
    this.horizontalValues = horizontalValues;
    this.result = this.calculate(
      width,
      height,
      verticalValues,
      horizontalValues
    );
  }

  calculate = (width, height, verticalValues, horizontalValues) => {
    let result = new GridData(width, height, new MockData().emptyData);

    this.data = result.data;

    // Algorithm starts here. Be careful with initial data
    // and look at the algorithm repeatment
    this.fillFullLines(horizontalValues, "horizontal");
    this.fillFullLines(verticalValues, "vertical");
    this.fillKnownBorders();

    return result;
  };

  fillFullLines = (lines, direction) => {
    const { setData } = this;
    const isHorizontal = direction === "horizontal" || direction === "h";
    const fullLines = lines
      // Try to search fullfilled rows
      .map((v, i) => ({
        value: v.reduce((acc, curr) => acc + curr + 1),
        index: i
      }))
      .filter(v => v.value == (isHorizontal ? this.width : this.height))
      // Remember and filter row and his index
      .map(v => ({
        value: lines[v.index],
        index: v.index
      }));

    fullLines.forEach((v, i) => {
      const currentLine = v.index;
      let offset = 0;
      v.value.forEach(item => {
        for (let i = offset; i < item + offset; ++i) {
          if (isHorizontal) setData(i, currentLine);
          else setData(currentLine, i);
        }
        offset += item + 1;
      });
    });
  };

  fillKnownBorders = () => {
    const { data, horizontalValues, verticalValues, width, height } = this;
    const walkArrayWidth = new Array(width).fill(1);
    const walkArrayHeight = new Array(height).fill(1);

    // left border
    walkArrayHeight
      .map((v, i) => i)
      .filter(v => this.getData(0, v, data) === 1)
      .map(v => ({ x: 0, y: v, value: horizontalValues[v][0] }))
      .forEach(item => {
        for (let i = 0; i < item.value; ++i) {
          this.setData(i, item.y);
        }
      });

    // right border
    walkArrayHeight
      .map((v, i) => i)
      .filter(v => this.getData(width - 1, v, data) === 1)
      .map(v => ({
        x: width - 1,
        y: v,
        value: horizontalValues[v][horizontalValues[v].length - 1]
      }))
      .forEach(item => {
        for (let i = width - 1; i >= width - item.value; --i) {
          this.setData(i, item.y);
        }
      });
  };

  getData = (x, y) => {
    const index = "" + (y ? y : "") + x;
    const result = this.data[index];
    return result;
  };

  setData = (x, y, value = 1) => {
    const index = "" + (y ? y : "") + x;
    this.data[index] = value;
  };
}

export default NonogramAlgorythm;
