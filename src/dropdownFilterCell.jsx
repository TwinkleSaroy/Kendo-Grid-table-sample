import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { filterBy } from '@progress/kendo-data-query';

import RangeFilterCell from './rangeFilterCell.jsx';
import dropdownFilterCell from './dropdownFilterCell.jsx';
import { sampleProducts } from './sample-products.jsx';

const categories = Array.from(new Set(sampleProducts.map(p => p.Category.CategoryName)));
const CategoryFilterCell = dropdownFilterCell(categories, 'Select category');

class App extends React.Component {
    state = {
        data: [ ...sampleProducts ],
        filter: undefined
    }

    filterChange = (event) => {
        this.setState({
            data: filterBy(sampleProducts, event.filter),
            filter: event.filter
        });
    }

    render() {
        return (
            <Grid
                style={{ height: '400px' }}
                data={this.state.data}

                filterable={true}
                filter={this.state.filter}
                onFilterChange={this.filterChange}
            >
                <Column field="ProductID" title="ID" filterable={false} width="60px" />
                <Column field="ProductName" title="Product Name" />
                <Column field="Category.CategoryName" title="Category Name" filterCell={CategoryFilterCell} />
                <Column field="UnitPrice" title="Unit Price" format="{0:c}" filterCell={RangeFilterCell} />
            </Grid>
        );
    }
}

export default dropdownFilterCell;