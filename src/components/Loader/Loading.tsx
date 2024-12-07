import { Spin } from 'antd'
import { useAppSelector } from '../../store/hooks'
import classes from './Loading.module.scss'
import { useTranslation } from 'react-i18next'

const Loading = () => {
    const { t } = useTranslation()

    const comomonLoading = useAppSelector((state) => state.common.loading)
    if (comomonLoading)
        return (
            <div className={classes.backdrop}>
                <Spin
                    className={classes.spinner}
                    tip={t('LOADER')}
                    size="large"
                />
            </div>
        )
    return <></>
}

export default Loading
