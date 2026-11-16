import React from "react";
import { render, screen } from "@testing-library/react";

import ShippingMethodsEditDialogComponent from "../ShippingMethodsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders shippingMethods edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ShippingMethodsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("shippingMethods-edit-dialog-component")).toBeInTheDocument();
});
