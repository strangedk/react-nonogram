import GridData from "./GridData";
import NonogramAlgorythm from "./NonogramAlgorythm";

class GridService {
  constructor() {
    this.sourceData = new GridData();
  }

  getValuesFromSource(sourceData) {
    const {
      width,
      height,
      getAllVerticalValues,
      getAllHorizontalValues
    } = sourceData;
    return new NonogramAlgorythm(
      width,
      height,
      getAllVerticalValues(),
      getAllHorizontalValues()
    ).result;
  }
}

export default GridService;
