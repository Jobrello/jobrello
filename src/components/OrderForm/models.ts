export type CheckOption = [string, boolean, number]
export type RangeOption = [string, number]
export type RangeOptions = [string, RangeOption[]]
export type Option = (RangeOptions | CheckOption) 
export type OfferSelection = [string, number]