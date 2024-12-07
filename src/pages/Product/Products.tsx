import { useEffect } from 'react'
import { Tabs } from 'antd'
import {
    getAllCategories,
    getAllProducts,
    getProductsByCategory,
} from '../../store/product/ProductActions'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import ListComponent from '../../components/Product/List/List'
import { CATEGORY } from '../../enums/product'
import { useTranslation } from 'react-i18next'

const { TabPane } = Tabs

const Product = () => {
    const { t } = useTranslation()

    const dispatch = useAppDispatch()
    const [productsItems] = useAppSelector((state) => [state.product.products])
    const [categories] = useAppSelector((state) => [state.product.categories])

    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getAllCategories())
    }, [])

    const onTabChange = (key: string) => {
        if (key === CATEGORY.ALL) dispatch(getAllProducts())
        else dispatch(getProductsByCategory(key))
    }
    return (
        <>
            <Tabs onChange={onTabChange} type="card">
                <TabPane tab={t('PRODUCT.CATEGORY.ALL')} key={CATEGORY.ALL}>
                    <ListComponent
                        productsItems={productsItems}
                        category={CATEGORY.ALL}
                        cart={false}
                    />
                </TabPane>
                {categories.map((category: any) => (
                    <>
                        <TabPane tab={category} key={category}>
                            <ListComponent
                                productsItems={productsItems}
                                category={category}
                                cart={false}
                            />
                        </TabPane>
                    </>
                ))}
            </Tabs>
        </>
    )
}

export default Product
