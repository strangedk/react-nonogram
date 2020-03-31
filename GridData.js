import MockData from "./MockData";

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

  getVerticalData = v => {
    const result = [];
    const totalLength = this.data.length;

    for (let index = v; index < totalLength; index += this.width)
      result.push(this.data[index]);

    return result;
  };

  getHorizontalData = h => {
    let result = [];
    let startIndex = Math.floor(h * this.height);

    result = this.data.slice(startIndex, startIndex + this.width);

    return result;
  };

  getValuesFromData = data => {
    let result = [];

    result = data
      .toString()
      .replace(/,/gi, "")
      .split("0")
      .filter(v => v != "," && v != "")
      .map(v => v.length);
    return result;
  };

  getHorizontalValues = h => {
    const horizontalData = this.getHorizontalData(h);
    return this.getValuesFromData(horizontalData);
  };

  getVerticalValues = v => {
    const verticalData = this.getVerticalData(v);
    return this.getValuesFromData(verticalData);
  };

  getAllVerticalValues = () => {
    const result = new Array(this.height)
      .fill(1)
      .map((v, i) => this.getVerticalValues(i));
    return result;
  };
  getAllHorizontalValues = () => {
    const result = new Array(this.width)
      .fill(1)
      .map((v, i) => this.getHorizontalValues(i));
    return result;
  };
}

export default GridData;
