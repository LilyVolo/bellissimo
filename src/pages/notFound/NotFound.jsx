import React from 'react'

import styles from './NotFound.module.scss'



function NotFound () {
  return (
    <div className={styles.root}>
    <span > &#128532;</span>
    <h1 className={styles.root}> Not found :( </h1>
    <p className={styles.description}>Unfortunately, this page does not exist. Please try your search again</p>
      </div>
  )
}

export default NotFound;
