import ShowHideTabData from '../../utils/showHideTabData'
import QuickGuideTableList from './components/QuickGuideTableList'
import QuickGuideForm from './components/QuickGuideForm'
const QuickGuide = () => {
    return (
        <ShowHideTabData
            ListData={QuickGuideTableList}
            TabFormData={QuickGuideForm}
            modalType={true}
            height={"100%"}
            showdialogbox={false}
        />
    )
}

export default QuickGuide