import React from 'react'
import ContentLoader from "react-content-loader"

const Skeleton = (props) =>
(
    <ContentLoader
    className="pizza-block" 
    speed={2}
    width={400}
    height={600}
    viewBox="0 0 400 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="367" rx="10" ry="10" width="280" height="88" /> 
    <circle cx="142" cy="149" r="142" /> 
    <rect x="0" y="312" rx="0" ry="0" width="280" height="33" /> 
    <rect x="80" y="569" rx="0" ry="0" width="1" height="0" /> 
    <rect x="0" y="471" rx="10" ry="10" width="95" height="30" /> 
    <rect x="167" y="504" rx="0" ry="0" width="0" height="1" /> 
    <rect x="127" y="468" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton