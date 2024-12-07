import React from 'react'
import { render, screen } from '@testing-library/react'
import { getRecord } from '../../utils'
import { Cart } from './Cart'

jest.mock('../../utils', () => ({
    getRecord: jest.fn(),
}))

jest.mock('../../components/Product/List/List', () => ({
    __esModule: true,
    default: ({ productsItems }: { productsItems: any[] }) => (
        <div>
            {productsItems.length > 0 ? (
                <ul>
                    {productsItems.map((item, index) => (
                        <li key={index}>{item.title}</li>
                    ))}
                </ul>
            ) : (
                <p>No items in the cart.</p>
            )}
        </div>
    ),
}))

describe('Cart Component', () => {
    it('renders with products in the shopping cart', () => {
        (getRecord as jest.Mock).mockReturnValueOnce([
            { id: 1, title: 'Product 1' },
            { id: 2, title: 'Product 2' },
        ])

        render(<Cart />)

        expect(screen.getByText('Product 1')).toBeInTheDocument()
        expect(screen.getByText('Product 2')).toBeInTheDocument()
    })

    it('renders with no products in the shopping cart', () => {
        (getRecord as jest.Mock).mockReturnValueOnce([])

        render(<Cart />)

        expect(screen.getByText('No items in the cart.')).toBeInTheDocument()
    })
})
