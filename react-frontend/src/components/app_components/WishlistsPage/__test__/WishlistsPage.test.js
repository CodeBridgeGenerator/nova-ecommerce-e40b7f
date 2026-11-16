import React from "react";
import { render, screen } from "@testing-library/react";

import WishlistsPage from "../WishlistsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders wishlists page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <WishlistsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("wishlists-datatable")).toBeInTheDocument();
    expect(screen.getByRole("wishlists-add-button")).toBeInTheDocument();
});
