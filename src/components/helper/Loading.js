import React from 'react'
import ReactDOM from 'react-dom'
import { Spin, Icon } from 'antd'

const loadingRoot = document.getElementById('component-loading')
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

const SpinStyle = {
    position: 'absolute',
    right: '20px',
    top: '20px'
}

export const SpinLoading = () => {
    return ReactDOM.createPortal(
        <Spin indicator={antIcon} style={SpinStyle} />,
        loadingRoot
    )
}

const LoadStyle = {
    position: 'absolute',
    top: '200px',
    left: '43%',
}

const Loading = () => {
    return (
        <div className="loading">
            <Spin tip="Loading..." style={LoadStyle} size="large" />
        </div>
    )
}

export default Loading