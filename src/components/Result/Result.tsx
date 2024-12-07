import { Button, Result } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ROUTES, STATUS_CODE } from '../../enums/routes'

const statusMap = (status: string) => {
    switch (status) {
        case STATUS_CODE.UNATHORIZED:
            return 'Sorry, you are not authorized to access this page.'
        case STATUS_CODE.NOT_FOUND:
            return 'Sorry, the page you visited does not exist.'
        case STATUS_CODE.SERVER_ERROR:
            return 'Sorry, something went wrong'
    }
}

const ResultComponent = ({ status }: { status: STATUS_CODE | string }) => {
    const { t } = useTranslation()

    const navigate = useNavigate()

    const backToHome = () => {
        navigate(`/${ROUTES.HOME}`, { replace: true })
    }

    return (
        <Result
            status={STATUS_CODE.NOT_FOUND}
            title={status}
            subTitle={statusMap(status!)}
            extra={
                <Button type="primary" onClick={backToHome}>
                    {t('BACK_TO_HOME')}
                </Button>
            }
        />
    )
}

export default ResultComponent
