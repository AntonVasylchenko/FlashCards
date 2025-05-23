import React from "react"
import { useNavigate } from "react-router"
import { LocalesContext } from "../main.tsx"



type PageHeaderProps = {
    title: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
    const { t } = React.useContext(LocalesContext);
    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/");
    };

    
    return (
        <div className="flex items-center justify-between mb-6">
            <button onClick={handleBack} className="text-2xl text-blue-500 dark:text-blue-400">←</button>
            <h1 className="text-xl font-bold text-black dark:text-white">{t(title)}</h1>
            <div className="w-6"></div>
        </div>
    )
}

export default PageHeader