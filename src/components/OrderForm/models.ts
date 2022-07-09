export type CheckOption = [string]
export type RangeOption = [string, number]
export type RangeValueOptions = [string, RangeOption[]]
export type RangePercentOptions = [string, RangeOption[]]
export type Option = (RangeValueOptions | RangePercentOptions| CheckOption) 
export type OfferSelection = [string, number]
export type Options = {
    JobBoards: RangeValueOptions
    NumberOfBumps: RangePercentOptions
    SocialMedias: RangeValueOptions
    HeadHunter: CheckOption
}

export type SelectedOptions = {
    JobBoards: RangeOption
    NumberOfBumps: RangeOption
    SocialMedias: RangeOption
    HeadHunter: boolean
}