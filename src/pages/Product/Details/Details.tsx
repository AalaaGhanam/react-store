import { useEffect } from 'react'
import { Button, Descriptions, Space, Image, Rate, message } from 'antd'
import classes from './Details.module.scss'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '../../../enums/routes'
import {
    addToCart,
    getSelectedProduct,
} from '../../../store/product/ProductActions'
import { Product } from '../../../models/product.model'
import { BackwardOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { getRecord } from '../../../utils'
import { STORAGE } from '../../../enums/storage'
import { useTranslation } from 'react-i18next'

const Details = () => {
    const { t } = useTranslation()

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { productId } = useParams()

    const [selectedProduct] = useAppSelector((state) => [
        state.product.selectedProduct,
    ])
    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        if (!productId) navigate(`/${ROUTES.HOME}`, { replace: true })
        else dispatch(getSelectedProduct(productId!))
    }, [])

    const addToCartButtonEvents = (product: Product) => ({
        onClick: async () => {
            const shoppingCart = getRecord(STORAGE.SHOPPING_CART)
            const inShoppingCart = shoppingCart.filter(
                (item: Product) => Number(item.id) === Number(productId)
            )
            if (inShoppingCart.length > 0) {
                messageApi.open({
                    key: product.id,
                    type: 'error',
                    content: `${product.title} already in your Cart.`,
                    duration: 2,
                })
            } else {
                await dispatch(addToCart(product)).unwrap()
                messageApi.open({
                    key: product.id,
                    type: 'success',
                    content: `${product.title} added to your Cart.`,
                    duration: 2,
                })
            }
        },
    })

    const onBack = async () => {
        navigate(-1)
    }

    return (
        <>
            {contextHolder}
            <Button
                icon={<BackwardOutlined />}
                size={'large'}
                shape="round"
                onClick={onBack}
            >
                {t('BACK')}
            </Button>
            <br /> <br />
            <div className={classes.descriptionWrapper}>
                <Space size={2}>
                    <Descriptions
                        title={selectedProduct?.title}
                        bordered
                        size={'middle'}
                    >
                        <Descriptions.Item label={t('PRODUCT.ITEM')} span={3}>
                            {selectedProduct?.title}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={t('PRODUCT.DESCRIPTION')}
                            span={3}
                        >
                            {selectedProduct?.description}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={t('PRODUCT.CATEGORY')}
                            span={3}
                        >
                            {selectedProduct?.category}
                        </Descriptions.Item>
                        <Descriptions.Item label={t('PRODUCT.PRICE')} span={3}>
                            {selectedProduct?.price}$
                        </Descriptions.Item>
                        <Descriptions.Item label={t('PRODUCT.RATING')} span={3}>
                            <Rate
                                disabled
                                value={selectedProduct?.rating.rate}
                            />
                        </Descriptions.Item>
                    </Descriptions>
                    <Image
                        width={'50%'}
                        src={selectedProduct?.image}
                        placeholder={
                            <Image
                                preview={false}
                                src={selectedProduct?.image}
                                width={200}
                            />
                        }
                    />
                </Space>
            </div>
            <div className={classes.buttonWrapper}>
                <Button
                    icon={<ShoppingCartOutlined />}
                    size="large"
                    shape="round"
                    type="primary"
                    className={classes.button}
                    {...addToCartButtonEvents(selectedProduct as Product)}
                >
                    {t('PRODUCT.CARD.ADD')}
                </Button>
            </div>
        </>
    )
}

export default Details
