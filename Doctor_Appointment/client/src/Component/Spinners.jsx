import React from 'react'
import { Spin } from 'antd';
import 'antd/dist/reset.css'; // Ensure Ant Design CSS is imported

const Spinners = () => {
  return (
    <div className="bg-dark d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw' }}>
        <Spin size="large" />
    </div>
  );
}

export default Spinners;
