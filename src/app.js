import ResultsPage from './components/results-page';
import { uploadTransformedData } from './data/algolia';

class SpencerAndWilliamsSearch {
  constructor() {
    this._initSearch();
    uploadTransformedData();
  }

  _initSearch() {
    this.resultPage = new ResultsPage();
  }
}

const app = new SpencerAndWilliamsSearch();
