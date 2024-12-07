import { Layout } from 'antd'
import { Content, Footer } from 'antd/lib/layout/layout'
import AppHeader from '../AppHeader/AppHeader'
import classes from './Container.module.scss'

interface PopUpWrapperProps {
    onClickOutside?: () => void
    children?: any
}

const Container = (props: PopUpWrapperProps) => {
    return (
        <Layout className={classes.layout}>
            {<AppHeader />}
            <Content className={classes.content}>
                <div className={classes.children}>{props?.children}</div>
            </Content>
            <Footer className={classes.footer}></Footer>
        </Layout>
    )
}

export default Container
