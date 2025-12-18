import React from 'react'
import Breadcrumb from './Breadcrumb'

function AddNewDriver() {
  return (
    <div>
      <Breadcrumb
        items={[
          { href: "/dashboard", isHome: true },
          { label: "Driver Profiles", href: "/driver-profiles" },
          { label: "Profile Add New Driver" },
        ]}
      />




    </div>
  )
}

export default AddNewDriver