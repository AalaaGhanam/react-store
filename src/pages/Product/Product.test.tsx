import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import Product from './Products';
import { CATEGORY } from '../../enums/product';

const mockStore = configureStore([]);

describe('Product Component', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({
            product: {
                products: [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }],
                categories: [CATEGORY.ALL, 'Electronics', 'Men'],
            },
        });
        store.clearActions();
    });

    it('renders tabs and displays all products by default', () => {
        render(
            <Provider store={store}>
                <I18nextProvider i18n={i18n}>
                    <Product />
                </I18nextProvider>
            </Provider>
        );
        expect(screen.getByText('All')).toBeInTheDocument();
        expect(screen.getByText('Electronics')).toBeInTheDocument();
        expect(screen.getByText('Men')).toBeInTheDocument();
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Product 2')).toBeInTheDocument();
    });

    it('dispatches correct actions when tabs are clicked', () => {
        render(
            <Provider store={store}>
                <I18nextProvider i18n={i18n}>
                    <Product />
                </I18nextProvider>
            </Provider>
        );
        fireEvent.click(screen.getByText('Men'));
        const actions = store.getActions();
        expect(actions).toContainEqual({
            type: 'product/getProductsByCategory',
            payload: 'Men',
        });
    });

    it('renders the correct products based on the selected tab', () => {
        store = mockStore({
            product: {
                products: [{ id: 3, name: 'Book 1' }],
                categories: [CATEGORY.ALL, 'Electronics', 'Men'],
            },
        });

        render(
            <Provider store={store}>
                <I18nextProvider i18n={i18n}>
                    <Product />
                </I18nextProvider>
            </Provider>
        );

        fireEvent.click(screen.getByText('Men'));
        expect(screen.getByText('Book 1')).toBeInTheDocument();
        expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
    });
});
