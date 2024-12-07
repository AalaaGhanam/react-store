import { Avatar, List as ListAnt, Card, Rate, message, Row, Col } from 'antd'
import { Product } from '../../../models/product.model'
import { ROUTES } from '../../../enums/routes'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../store/hooks'
import {
    addToCart,
    removeFromCart,
} from '../../../store/product/ProductActions'
import {
    DeleteOutlined,
    EyeOutlined,
    RightOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons'
import Meta from 'antd/es/card/Meta'
import Link from 'antd/es/typography/Link'
import { getRecord } from '../../../utils'
import { STORAGE } from '../../../enums/storage'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ListProps {
    productsItems: Product[]
    category: string
    cart: boolean
}

const ListComponent = ({ productsItems, category, cart }: ListProps) => {
    const { t } = useTranslation()

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [productsList, setProductsList] = useState(productsItems)
    const [messageApi, contextHolder] = message.useMessage()

    const viewDetailsButtonEvents = (product: Product) => ({
        onClick: () => {
            navigate(`/${ROUTES.PRODUCT_DETAILS}/${product.id}`)
        },
    })

    const removeFromCartButtonEvents = (product: Product) => ({
        onClick: async () => {
            await dispatch(removeFromCart(product)).unwrap()
            setProductsList((productsList) =>
                productsList.filter((item) => item?.id !== product.id)
            )
        },
    })

    const addToCartButtonEvents = (product: Product) => ({
        onClick: async () => {
            const shoppingCart = getRecord(STORAGE.SHOPPING_CART)
            const inShoppingCart = shoppingCart?.filter(
                (item: any) => item.id === Number(product.id)
            )
            if (inShoppingCart?.length > 0) {
                messageApi.open({
                    key: product.id,
                    type: 'error',
                    content: `${product.title} ${t('PRODUCT.CART.INMESSAGE')}`,
                    duration: 2,
                })
            } else {
                await dispatch(addToCart(product)).unwrap()
                messageApi.open({
                    key: product.id,
                    type: 'success',
                    content: `${product.title} ${t('PRODUCT.CART.MESSAGE')}`,
                    duration: 2,
                })
            }
        },
    })
    const products = cart ? productsList : productsItems
    const totalPrice = products.reduce((total, curVal) => {
        return total + curVal.price
    }, 0)
    return (
        <>
            {contextHolder}
            <>
                {products.length > 0 ? (
                    <ListAnt
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 4,
                            xxl: 3,
                        }}
                        pagination={{
                            onChange: (page) => {
                                console.log(page)
                            },
                            pageSize: 8,
                        }}
                        header={
                            <div>
                                <Row>
                                    <Col span={8}>
                                        <b>{t('PRODUCT.LIST')} </b>{' '}
                                        <RightOutlined /> {category}
                                    </Col>
                                    {cart ? (
                                        <>
                                            <Col span={8}>
                                                {t('PRODUCT.TOTAL.ITEMS')}{' '}
                                                <b> {products.length}</b>
                                            </Col>
                                            <Col span={8}>
                                                {' '}
                                                {t('PRODUCT.TOTAL.PRICE')}{' '}
                                                <b>{totalPrice.toFixed(2)}$</b>
                                            </Col>{' '}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </Row>{' '}
                            </div>
                        }
                        dataSource={products}
                        renderItem={(product) => (
                            <ListAnt.Item>
                                <Card
                                    style={{
                                        width: '95%',
                                        height: '95%',
                                        padding: '1rem',
                                    }}
                                    hoverable
                                    extra={
                                        <Link
                                            {...viewDetailsButtonEvents(
                                                product
                                            )}
                                        >
                                            {t('PRODUCT.CARD.MORE')}
                                        </Link>
                                    }
                                    actions={[
                                        <>
                                            {' '}
                                            {cart ? (
                                                <DeleteOutlined
                                                    style={{
                                                        fontSize: '24px',
                                                        color: '#08c',
                                                    }}
                                                    {...removeFromCartButtonEvents(
                                                        product
                                                    )}
                                                    key={t(
                                                        'PRODUCT.CARD.REMOVE'
                                                    )}
                                                />
                                            ) : (
                                                <ShoppingCartOutlined
                                                    style={{
                                                        fontSize: '24px',
                                                        color: '#08c',
                                                    }}
                                                    {...addToCartButtonEvents(
                                                        product
                                                    )}
                                                    key={t('PRODUCT.CARD.ADD')}
                                                />
                                            )}
                                        </>,

                                        <EyeOutlined
                                            style={{
                                                fontSize: '24px',
                                                color: '#08c',
                                            }}
                                            {...viewDetailsButtonEvents(
                                                product
                                            )}
                                        />,
                                    ]}
                                    cover={
                                        <img
                                            style={{ height: '28rem' }}
                                            alt={product.title}
                                            src={product.image}
                                        />
                                    }
                                >
                                    <Meta
                                        avatar={<Avatar src={product.image} />}
                                        title={product.title}
                                        description={
                                            <>
                                                `${product.price}$` <br />
                                                <Rate
                                                    disabled
                                                    value={product?.rating.rate}
                                                />
                                            </>
                                        }
                                    />
                                </Card>
                            </ListAnt.Item>
                        )}
                    />
                ) : (
                    <h2>{t('PRODUCT.LIST.EMPTY')}</h2>
                )}
            </>
        </>
    )
}

export default ListComponent
