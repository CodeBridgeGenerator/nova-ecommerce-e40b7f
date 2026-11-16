import React from "react";
import { render, screen } from "@testing-library/react";

import ShippingMethodsPage from "../ShippingMethodsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders shippingMethods page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ShippingMethodsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("shippingMethods-datatable")).toBeInTheDocument();
    expect(screen.getByRole("shippingMethods-add-button")).toBeInTheDocument();
});
