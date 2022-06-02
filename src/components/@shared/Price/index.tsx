import React, { ReactElement } from 'react'
import styles from './index.module.css'
import Loader from '../atoms/Loader'
import Tooltip from '../atoms/Tooltip'
import PriceUnit from './PriceUnit'
import { AccessDetails, OrderPriceAndFees } from 'src/@types/Price'

export interface PriceProps {
  accessDetails: AccessDetails
  orderPriceAndFees?: OrderPriceAndFees
  className?: string
  conversion?: boolean
  size?: 'small' | 'mini' | 'large'
  locale: string
}

export default function Price({
  accessDetails,
  orderPriceAndFees,
  className,
  size,
  conversion,
  locale
}: PriceProps): ReactElement {
  return accessDetails?.price || accessDetails?.type === 'free' ? (
    <PriceUnit
      price={`${orderPriceAndFees?.price || accessDetails?.price}`}
      symbol={accessDetails.baseToken?.symbol}
      className={className}
      size={size}
      conversion={conversion}
      type={accessDetails.type}
      locale={locale}
    />
  ) : !accessDetails || accessDetails?.type === '' ? (
    <div className={styles.empty}>
      No price set{' '}
      <Tooltip content="No pricing mechanism has been set on this asset yet." />
    </div>
  ) : (
    // TODO: Hacky hack, put back some check for low liquidity
    // ) : price.isConsumable !== 'true' ? (
    //   <div className={styles.empty}>
    //     Low liquidity{' '}
    //     <Tooltip content="This pool does not have enough liquidity for using this data set." />
    //   </div>
    <Loader message="Retrieving price..." />
  )
}
