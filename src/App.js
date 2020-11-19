import * as React from "react";

import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { process } from '@progress/kendo-data-query';

import products from "./products.json";
const dataState = {
    sort: [{ field: "code", dir: "asc" }],
    take: 10,
    skip: 0
};

class App extends React.Component {
    state = {
        dataState: dataState
    };
    
    render() {
        return (
            <Grid
                pageable
                sortable
                filterable
                style={{ height: "400px" }}
                data={process(products, this.state.dataState)}
                {...this.state.dataState}
                onDataStateChange={(e) => {
                    this.setState({ dataState: e.dataState })
                }}
               >
                <Column field="ProductID" title="ID" width="80px" filterable={false} />
                <Column field="ProductName" title="Name" width="250px" />
                <Column field="UnitPrice" title="Price" filter='numeric' width="150px" />
                <Column field="UnitsInStock" title="In stock" filter='numeric' width="150px" />
                <Column
                    field="Discontinued"
                    filter='boolean'
                    cell={props => (
                        <td>
                            <input
                                disabled
                                type="checkbox"
                                checked={props.dataItem[props.field]}
                            />
                        </td>
                    )}
                />
            </Grid>
        );
    }
}

export default App;