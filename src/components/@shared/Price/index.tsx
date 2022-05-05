import React, { ReactElement } from 'react'
import styles from './index.module.css'
import Loader from '../atoms/Loader'
import Tooltip from '../atoms/Tooltip'
import PriceUnit from './PriceUnit'
import { AccessDetails, OrderPriceAndFees } from 'src/@types/Price'

export default function Price({
  accessDetails,
  orderPriceAndFees,
  className,
  size,
  conversion,
  loading
}: {
  accessDetails: AccessDetails
  orderPriceAndFees?: OrderPriceAndFees
  className?: string
  conversion?: boolean
  size?: 'small' | 'mini' | 'large'
  loading?: boolean
}): ReactElement {
  return loading ? (
    <Loader message="Retrieving price..." />
  ) : accessDetails?.price || accessDetails?.type === 'free' ? (
    <PriceUnit
      price={`${orderPriceAndFees?.price || accessDetails?.price}`}
      symbol={accessDetails.baseToken?.symbol}
      className={className}
      size={size}
      conversion={conversion}
      type={accessDetails.type}
    />
  ) : (
    <div className={styles.empty}>
      No price set{' '}
      <Tooltip content="No pricing mechanism has been set on this asset yet." />
    </div>
  )
}
